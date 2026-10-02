import "server-only";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { ProjectImage } from "@/lib/projects/types";
import { sanityConfig } from "./client";
import type { SanityImage } from "./queries";

const imageUrl = createImageUrlBuilder(sanityConfig);

/** Sanity image -> next/image props, or undefined when no file is uploaded. */
export function toImage(
  image: SanityImage | null | undefined,
  fallbackAlt: string,
): ProjectImage | undefined {
  const asset = image?.asset;
  if (!image || !asset) return undefined;
  const dimensions = asset.metadata?.dimensions;

  return {
    // Applies the editor's crop; the image loader adds width + format.
    src: imageUrl.image(image).url(),
    alt: image.alt || fallbackAlt,
    width: dimensions?.width,
    height: dimensions?.height,
    blurDataURL: asset.metadata?.lqip,
    position: image.hotspot
      ? `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`
      : undefined,
  };
}
