import type { Metadata } from "next";
import { site } from "./site";

type PageSeo = {
  /** Page title without the brand suffix, e.g. "Shopify Development". Omit for the homepage. */
  title?: string;
  description: string;
  /** Route path, e.g. "/services/shopify". Used for the canonical URL. */
  path: string;
  /** Page-specific share image (1200×630 PNG/JPEG); defaults to the logo card. */
  image?: string;
  /** Set false for pages that should stay out of search results. */
  index?: boolean;
};

/**
 * Builds consistent per-page metadata: title, description, canonical,
 * Open Graph and Twitter card. The root layout supplies `metadataBase`,
 * so relative paths resolve to absolute URLs.
 */
export function buildMetadata({ title, description, path, image, index = true }: PageSeo): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
  // Width/height/alt let WhatsApp, LinkedIn, etc. render the preview on the first share.
  const ogImage = image ? { url: image, width: 1200, height: 630, alt: fullTitle } : site.ogImage;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
