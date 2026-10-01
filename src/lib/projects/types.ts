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

/** Legacy seed record (scripts/seed/legacy-projects.ts), imported into Sanity. */
export type ProjectRecord = {
  slug: string;
  name: string;
  category: string;
  domain: string;
  platform: Platform;
  position: number;
  tags: string[];
  features: string[];
  /** Screenshot file name in scripts/seed/images. Missing -> placeholder image. */
  image?: string;
  pages: Placement[];
  services?: Placement[];
};

/** Project shaped for rendering. */
export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Empty for sample (placeholder) projects. */
  domain: string;
  /** Absolute URL of the live site; empty for sample projects. */
  url: string;
  platform: Platform;
  tags: string[];
  features: string[];
  description: string;
  image: ProjectImage;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Tiny base64 preview shown while the image loads. */
  blurDataURL?: string;
  /** CSS object-position from the editor's hotspot, e.g. "50% 30%". */
  position?: string;
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
