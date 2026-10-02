/*
 * One-time import of the pre-CMS content into Sanity.
 *
 *   npm run sanity:import                  everything; creates missing documents only
 *   npm run sanity:import -- projects      projects + showcases only
 *   npm run sanity:import -- home          homepage sections only (brand logos, testimonials, app partners)
 *   npm run sanity:import -- home --force  overwrite those documents with the seed data
 *
 * Projects (scripts/seed/legacy-projects.ts):
 * - Uploads each screenshot from scripts/seed/images.
 * - Creates one `project` document per legacy project.
 * - Creates one `showcase` document per listing in src/lib/projects/listings.ts,
 *   with projects in the legacy order (membership position, else project position).
 *
 * Homepage (scripts/seed/home-content.ts): one document per section with a
 * fixed ID, images uploaded from public/.
 *
 * Images are deduplicated by SHA-1, so re-runs don't upload again. Without
 * --force existing documents are left alone, but a document deleted in the
 * Studio (e.g. a project) is created again, so pass a scope when re-running.
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor) in .env.local.
 */
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient, type IdentifiedSanityDocumentStub } from "@sanity/client";
import { LISTINGS, projectId, showcaseId } from "../src/lib/projects/listings.ts";
import type { ProjectRecord } from "../src/lib/projects/types.ts";
import {
  appPartners,
  brandStripBottom,
  brandStripTop,
  testimonials,
  type BrandSeed,
} from "./seed/home-content.ts";
import { projectRecords } from "./seed/legacy-projects.ts";

const FORCE = process.argv.includes("--force");
const SCOPES = ["projects", "home"] as const;
const requested = SCOPES.filter((scope) => process.argv.includes(scope));
const scopes = new Set(requested.length ? requested : SCOPES);
const {
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_API_VERSION,
  SANITY_API_WRITE_TOKEN,
} = process.env;

if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_DATASET || !SANITY_API_WRITE_TOKEN) {
  console.error(
    "Missing Sanity settings. Fill NEXT_PUBLIC_SANITY_* and SANITY_API_WRITE_TOKEN in .env.local.",
  );
  process.exit(1);
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-10-01",
  token: SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const key = (value: string) => createHash("md5").update(value).digest("hex").slice(0, 12);

const SEED_IMAGES = path.join("scripts", "seed", "images");

/** Upload an image file once; returns the asset _id (existing asset if the file was uploaded before). */
async function uploadImage(file: string): Promise<string | undefined> {
  if (!existsSync(file)) return undefined;
  const buffer = await readFile(file);
  const sha1 = createHash("sha1").update(buffer).digest("hex");
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && sha1hash == $sha1][0]._id`,
    { sha1 },
  );
  if (existing) return existing;
  const asset = await client.assets.upload("image", buffer, { filename: path.basename(file) });
  return asset._id;
}

function projectDocument(record: ProjectRecord, assetId: string | undefined): IdentifiedSanityDocumentStub {
  return {
    _id: projectId(record.slug),
    _type: "project",
    name: record.name,
    slug: { _type: "slug", current: record.slug },
    domain: record.domain,
    platform: record.platform,
    category: record.category,
    features: record.features,
    tags: record.tags,
    ...(assetId && {
      image: { _type: "image", asset: { _type: "reference", _ref: assetId }, alt: `${record.name} website` },
    }),
  };
}

/** Legacy order for a listing: placement position, else the project's own position (stable on ties). */
function orderedSlugs(list: "pages" | "services", listingKey: string): string[] {
  return projectRecords
    .flatMap((record, index) => {
      const placement = record[list]?.find((p) => p.key === listingKey);
      return placement ? [{ slug: record.slug, order: placement.position ?? record.position, index }] : [];
    })
    .sort((a, b) => a.order - b.order || a.index - b.index)
    .map((entry) => entry.slug);
}

/** Image field value for a file in public/ (e.g. "/assets/brands/x.webp"). Throws if the file is missing. */
async function publicImage(publicPath: string, alt?: string) {
  const assetId = await uploadImage(path.join("public", publicPath));
  if (!assetId) throw new Error(`Image not found: public${publicPath}`);
  return { _type: "image", asset: { _type: "reference", _ref: assetId }, ...(alt && { alt }) };
}

/** Maps sequentially (keeps the API happy and logs readable), with a progress line. */
async function mapSequential<In, Out>(label: string, items: In[], map: (item: In) => Promise<Out>) {
  const out: Out[] = [];
  for (const [i, item] of items.entries()) {
    out.push(await map(item));
    process.stdout.write(`\r  ${label} ${i + 1}/${items.length}`);
  }
  console.log();
  return out;
}

function brandItems(row: string, brands: BrandSeed[]) {
  return mapSequential(`${row} brand logos`, brands, async (brand) => ({
    _key: key(brand.logo),
    _type: "brandLogo",
    name: brand.name,
    logo: await publicImage(brand.logo),
    shape: brand.shape ?? "default",
  }));
}

/** Homepage sections (fixed IDs read by src/lib/home). */
async function homeDocuments(): Promise<IdentifiedSanityDocumentStub[]> {
  const top = await brandItems("top", brandStripTop);
  const bottom = await brandItems("bottom", brandStripBottom);

  const testimonialItems = await mapSequential("testimonials", testimonials, async (t) => {
    const highlight = t.badges.find((badge) => typeof badge !== "string");
    return {
      _key: key(`${t.name}:${t.company.name}`),
      _type: "testimonial",
      name: t.name,
      role: t.role,
      avatarColor: t.avatarColor,
      rating: t.rating,
      quote: t.quote,
      companyName: t.company.name,
      companyLogo: await publicImage(t.company.logo),
      screenshot: await publicImage(t.screenshot, `${t.company.name} website preview`),
      ...(t.platform && { platform: t.platform }),
      ...(highlight && { highlightBadge: highlight.label }),
      badges: t.badges.filter((badge) => typeof badge === "string"),
    };
  });

  const appItems = await mapSequential("app partners", appPartners, async (app) => ({
    _key: key(app.name),
    _type: "appPartner",
    name: app.name,
    category: app.category,
    logo: await publicImage(app.logo),
    description: app.description,
  }));

  return [
    { _id: "home-brands", _type: "homeBrands", top, bottom },
    { _id: "home-testimonials", _type: "homeTestimonials", items: testimonialItems },
    { _id: "home-app-partners", _type: "homeAppPartners", items: appItems },
  ];
}

type Write = (doc: IdentifiedSanityDocumentStub) => unknown;

/** Projects + showcases. */
async function importProjects(write: Write) {
  // 1. Images (sequential keeps the API happy and logs readable)
  const assets = new Map<string, string | undefined>();
  for (const [i, record] of projectRecords.entries()) {
    assets.set(
      record.slug,
      record.image ? await uploadImage(path.join(SEED_IMAGES, record.image)) : undefined,
    );
    process.stdout.write(`\r  images ${i + 1}/${projectRecords.length}`);
  }
  console.log();

  // 2. Projects + 3. showcases (committed with the rest in main)
  for (const record of projectRecords) write(projectDocument(record, assets.get(record.slug)));

  for (const listing of LISTINGS) {
    const slugs =
      listing.seed ?? orderedSlugs(listing.kind === "portfolio" ? "pages" : "services", listing.key);
    write({
      _id: showcaseId(listing.kind, listing.key),
      _type: "showcase",
      title: listing.title,
      kind: listing.kind,
      key: listing.key,
      location: listing.path,
      projects: slugs.map((slug) => ({
        _key: key(slug),
        _type: "reference",
        _ref: projectId(slug),
      })),
    });
    console.log(`  showcase ${listing.kind}/${listing.key}: ${slugs.length} projects`);
  }

  const missing = projectRecords.filter((r) => !assets.get(r.slug)).map((r) => r.slug);
  if (missing.length) console.log(`No screenshot (placeholder shown on site): ${missing.join(", ")}`);
}

async function main() {
  console.log(
    `Importing ${[...scopes].join(" + ")} into ${NEXT_PUBLIC_SANITY_PROJECT_ID}/${NEXT_PUBLIC_SANITY_DATASET}${FORCE ? " (force)" : ""}`,
  );

  // Everything is written in one transaction.
  const tx = client.transaction();
  const write: Write = (doc) => (FORCE ? tx.createOrReplace(doc) : tx.createIfNotExists(doc));

  if (scopes.has("projects")) await importProjects(write);
  if (scopes.has("home")) for (const doc of await homeDocuments()) write(doc);

  const result = await tx.commit({ visibility: "async" });
  console.log(
    `Done: ${result.results.length} documents ${FORCE ? "written" : "checked (existing ones were left unchanged)"}.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
