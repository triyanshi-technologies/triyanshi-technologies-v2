"use client";

import type { ImageLoaderProps } from "next/image";

/*
 * next/image loader for a static host.
 *  - Sanity CDN images: resized on the fly by Sanity (?w=…&auto=format).
 *  - Local raster images: pre-generated variants from scripts/optimize-images.mjs.
 *  - Anything else (SVG, external URLs): returned unchanged.
 */
const LOCAL_RASTER = /\.(png|jpe?g|webp)$/i;

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith("https://cdn.sanity.io/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("fit", "max");
    url.searchParams.set("auto", "format");
    if (quality) url.searchParams.set("q", String(quality));
    return url.toString();
  }

  if (src.startsWith("/") && LOCAL_RASTER.test(src)) {
    return `/_img${src.replace(LOCAL_RASTER, "")}-${width}.webp`;
  }

  return src;
}
