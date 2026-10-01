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
      image{
        alt,
        hotspot,
        crop,
        asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } }
      }
    }
  }
`;

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
