import "server-only";
import { projectRecords } from "@/content/projects";
import type { HomeShowcaseCategory, Platform, Project, ProjectRecord } from "./types";

/*
 * Project data access. Pages only call these functions, so the source can
 * change (local data file now, Sanity from stage 3) without touching UI code.
 * Everything runs at build time — nothing here ships to the browser.
 */

const PLACEHOLDER_IMAGE = "/assets/sample-image.webp";

function toProject(record: ProjectRecord): Project {
  return {
    slug: record.slug,
    name: record.name,
    category: record.category,
    domain: record.domain,
    url: /^https?:\/\//i.test(record.domain) ? record.domain : `https://${record.domain}`,
    platform: record.platform,
    tags: record.tags,
    features: record.features,
    description: `${record.features.join(", ")} for a ${record.category.toLowerCase()} project.`,
    image: { src: record.image ?? PLACEHOLDER_IMAGE, alt: `${record.name} website` },
  };
}

const byPosition = (a: ProjectRecord, b: ProjectRecord) => a.position - b.position;

function projectsOnPlatform(platform: Platform) {
  return projectRecords.filter((p) => p.platform === platform).sort(byPosition);
}

/** Homepage "Featured Projects" tabs → groups → first 3 projects. */
const HOME_TABS: {
  id: HomeShowcaseCategory["id"];
  label: string;
  groups: { platform: Platform; id: string }[];
}[] = [
  {
    id: "ecommerce",
    label: "eCommerce",
    groups: [
      { platform: "Shopify", id: "shopify" },
      { platform: "BigCommerce", id: "bigcommerce" },
      { platform: "Volusion", id: "volusion" },
    ],
  },
  { id: "custom", label: "Enterprise Solutions", groups: [{ platform: "Webflow", id: "webflow" }] },
];

export const HOME_PROJECTS_PER_GROUP = 3;

export async function getHomeShowcase(): Promise<HomeShowcaseCategory[]> {
  return HOME_TABS.map((tab) => ({
    id: tab.id,
    label: tab.label,
    groups: tab.groups.map(({ platform, id }) => {
      const all = projectsOnPlatform(platform);
      return {
        id,
        label: platform,
        href: `/portfolio/${id}`,
        projects: all.slice(0, HOME_PROJECTS_PER_GROUP).map(toProject),
        total: all.length,
      };
    }),
  }));
}

/** Projects for a portfolio page (`pages` key) or service examples (`services` key), in display order. */
export async function getProjectsFor(list: "pages" | "services", key: string): Promise<Project[]> {
  return projectRecords
    .flatMap((record) => {
      const placement = record[list]?.find((p) => p.key === key);
      return placement ? [{ record, order: placement.position ?? record.position }] : [];
    })
    .sort((a, b) => a.order - b.order)
    .map(({ record }) => toProject(record));
}
