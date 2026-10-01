import "server-only";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient, sanityConfig } from "@/lib/sanity/client";
import { SHOWCASES_QUERY, type SanityProject, type SanityShowcase } from "@/lib/sanity/queries";
import type { SampleProject } from "@/content/services";
import type { ListingKind } from "./listings";
import type { HomeShowcaseCategory, Platform, Project } from "./types";

/*
 * Project data access — everything runs at build time and nothing here ships
 * to the browser. Projects and their order come from Sanity "showcase"
 * documents (see src/lib/projects/listings.ts).
 */

const PLACEHOLDER_IMAGE = "/assets/sample-image.webp";
const imageUrl = createImageUrlBuilder(sanityConfig);

function toProject(doc: SanityProject): Project {
  const { image } = doc;
  const asset = image?.asset;
  const dimensions = asset?.metadata?.dimensions;

  return {
    slug: doc.slug,
    name: doc.name,
    category: doc.category,
    domain: doc.domain,
    url: /^https?:\/\//i.test(doc.domain) ? doc.domain : `https://${doc.domain}`,
    platform: doc.platform as Platform,
    tags: doc.tags ?? [],
    features: doc.features ?? [],
    description: `${(doc.features ?? []).join(", ")} for a ${doc.category.toLowerCase()} project.`,
    image: asset
      ? {
          // Applies the editor's crop; the image loader adds width + format.
          src: imageUrl.image(image).url(),
          alt: image.alt || `${doc.name} website`,
          width: dimensions?.width,
          height: dimensions?.height,
          blurDataURL: asset.metadata?.lqip,
          position: image.hotspot
            ? `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`
            : undefined,
        }
      : { src: PLACEHOLDER_IMAGE, alt: `${doc.name} website` },
  };
}

/*
 * All showcases are fetched in one request. In production builds the result
 * is shared by every page in the worker; in dev it is refetched each time so
 * Studio edits show up on reload.
 *
 * Next's Data Cache keeps static-route fetches indefinitely (keyed by URL),
 * so in dev an unused `_fresh` param gives every request a new key. Builds
 * clear that cache beforehand instead (scripts/clear-fetch-cache.mjs).
 */
let cached: Promise<Map<string, Project[]>> | undefined;

async function fetchShowcases(dev = false): Promise<Map<string, Project[]>> {
  const params = dev ? { _fresh: Date.now() } : {};
  const showcases = await sanityClient.fetch<SanityShowcase[]>(SHOWCASES_QUERY, params);
  return new Map(
    showcases.map((s) => [
      `${s.kind}:${s.key}`,
      // Drop references to projects that were unpublished or deleted.
      (s.projects ?? []).filter((p): p is SanityProject => p !== null).map(toProject),
    ]),
  );
}

function showcases() {
  if (process.env.NODE_ENV !== "production") return fetchShowcases(true);
  return (cached ??= fetchShowcases());
}

/** Projects of one listing (portfolio page or service examples), in the editor's order. */
export async function getProjectsFor(kind: ListingKind, key: string): Promise<Project[]> {
  return (await showcases()).get(`${kind}:${key}`) ?? [];
}

/** Legacy placeholder examples, shaped like projects (no site, placeholder image). */
function fromSamples(samples: SampleProject[]): Project[] {
  return samples.map((sample, i) => ({
    slug: `sample-${i}-${sample.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: sample.name,
    category: sample.metric,
    domain: "",
    url: "",
    platform: "Shopify",
    tags: sample.tags,
    features: [sample.description],
    description: sample.description,
    image: { src: PLACEHOLDER_IMAGE, alt: "" },
  }));
}

/**
 * Projects for a page: the Sanity showcase, or — while the showcase is
 * empty — the page's legacy sample projects. `isSample` lets the UI link
 * samples to the case-study page instead of a live site.
 */
export async function getPageProjects(
  kind: ListingKind,
  key: string,
  samples: SampleProject[] = [],
): Promise<{ projects: Project[]; isSample: boolean }> {
  const projects = await getProjectsFor(kind, key);
  return projects.length ? { projects, isSample: false } : { projects: fromSamples(samples), isSample: true };
}

/** Homepage "Featured Projects": tabs → platform groups → first 3 projects each. */
const HOME_TABS: {
  id: HomeShowcaseCategory["id"];
  label: string;
  groups: { key: string; label: Platform }[];
}[] = [
  {
    id: "ecommerce",
    label: "eCommerce",
    groups: [
      { key: "shopify", label: "Shopify" },
      { key: "bigcommerce", label: "BigCommerce" },
      { key: "volusion", label: "Volusion" },
    ],
  },
  { id: "custom", label: "Enterprise Solutions", groups: [{ key: "webflow", label: "Webflow" }] },
];

export const HOME_PROJECTS_PER_GROUP = 3;

export async function getHomeShowcase(): Promise<HomeShowcaseCategory[]> {
  const all = await showcases();
  return HOME_TABS.map((tab) => ({
    id: tab.id,
    label: tab.label,
    groups: tab.groups.map(({ key, label }) => {
      const projects = all.get(`portfolio:${key}`) ?? [];
      return {
        id: key,
        label,
        href: `/portfolio/${key}`,
        projects: projects.slice(0, HOME_PROJECTS_PER_GROUP),
        total: projects.length,
      };
    }),
  }));
}
