/** Image fields + asset metadata, for toImage() in src/lib/sanity/image.ts. */
const IMAGE = /* groq */ `{
  alt,
  hotspot,
  crop,
  asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } }
}`;

/** Every showcase with its projects (in editor-defined order) and image metadata. */
export const SHOWCASES_QUERY = /* groq */ `
  *[_type == "showcase"]{
    kind,
    key,
    "projects": projects[]->{
      "slug": slug.current,
      name,
      category,
      domain,
      platform,
      features,
      tags,
      image${IMAGE}
    }
  }
`;

/** Homepage sections (fixed document IDs, see studio/schemaTypes/home.ts). */
export const HOME_QUERY = /* groq */ `{
  "brands": *[_id == "home-brands"][0]{
    "top": top[]{ _key, name, shape, logo${IMAGE} },
    "bottom": bottom[]{ _key, name, shape, logo${IMAGE} }
  },
  "testimonials": *[_id == "home-testimonials"][0].items[]{
    _key, name, role, avatarColor, rating, quote, companyName, platform, highlightBadge, badges,
    companyLogo${IMAGE}
  },
  "appPartners": *[_id == "home-app-partners"][0].items[]{
    _key, name, category, description, logo${IMAGE}
  }
}`;

export type SanityImage = {
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  asset?: {
    _id: string;
    url: string;
    metadata?: { lqip?: string; dimensions?: { width: number; height: number } };
  };
};

export type SanityProject = {
  slug: string;
  name: string;
  category: string;
  domain: string;
  platform: string;
  features: string[] | null;
  tags: string[] | null;
  image: SanityImage | null;
};

export type SanityShowcase = {
  kind: "portfolio" | "service";
  key: string;
  /** Unpublished/deleted references resolve to null. */
  projects: (SanityProject | null)[] | null;
};

export type SanityBrandLogo = {
  _key: string;
  name: string;
  shape?: "default" | "icon" | "wide" | null;
  logo: SanityImage | null;
};

export type SanityTestimonial = {
  _key: string;
  name: string;
  role: string;
  avatarColor: string;
  rating: number;
  quote: string;
  companyName: string;
  companyLogo: SanityImage | null;
  platform?: "shopify" | "bigcommerce" | "volusion" | null;
  highlightBadge?: string | null;
  badges?: string[] | null;
};

export type SanityAppPartner = {
  _key: string;
  name: string;
  category: string;
  description: string;
  logo: SanityImage | null;
};

/** Missing documents or empty lists come back as null. */
export type SanityHome = {
  brands: { top: SanityBrandLogo[] | null; bottom: SanityBrandLogo[] | null } | null;
  testimonials: SanityTestimonial[] | null;
  appPartners: SanityAppPartner[] | null;
};
