/*
 * Responsive image widths — shared by next.config.ts (srcset generation)
 * and scripts/optimize-images.mjs (pre-generated WebP variants).
 * Keep the list short: every width is one more pre-generated file per image.
 */

/** Widths for images with a `sizes` prop (full/partial-width layouts). */
export const deviceSizes = [640, 1080, 1920];

/** Widths for small fixed-size images (logos, avatars, icons). */
export const imageSizes = [64, 128, 256, 384];

export const allImageWidths = [...imageSizes, ...deviceSizes];

/** Public folder the variants are written to (git-ignored, rebuilt on demand). */
export const VARIANTS_DIR = "_img";
