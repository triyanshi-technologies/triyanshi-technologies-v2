export const PLATFORMS = [
  "Shopify",
  "BigCommerce",
  "Volusion",
  "Webflow",
  "Wix",
  "WordPress",
  "WooCommerce",
] as const;
export type Platform = (typeof PLATFORMS)[number];

/** Membership of a project in a listing (portfolio page or service examples), with optional order. */
export type Placement = { key: string; position?: number };

/** Raw project as stored (legacy data file; Sanity document from stage 3). */
export type ProjectRecord = {
  slug: string;
  name: string;
  category: string;
  domain: string;
  platform: Platform;
  position: number;
  tags: string[];
  features: string[];
  /** Screenshot path. Missing -> placeholder image. */
  image?: string;
  pages: Placement[];
  services?: Placement[];
};

/** Project shaped for rendering. */
export type Project = {
  slug: string;
  name: string;
  category: string;
  domain: string;
  /** Absolute URL of the live site. */
  url: string;
  platform: Platform;
  tags: string[];
  features: string[];
  description: string;
  image: { src: string; alt: string };
};

export type ShowcaseGroup = {
  id: string;
  label: string;
  /** "View all" destination. */
  href: string;
  /** First projects to show (homepage shows 3). */
  projects: Project[];
  total: number;
};

export type HomeShowcaseCategory = {
  id: "ecommerce" | "custom";
  label: string;
  groups: ShowcaseGroup[];
};
