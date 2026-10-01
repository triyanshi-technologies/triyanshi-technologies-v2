/*
 * Pre-generates resized WebP variants of every raster image in public/ so
 * next/image can serve responsive srcsets on a static host (no image server).
 *
 *   public/assets/logo.webp  ->  public/_img/assets/logo-64.webp, -128, … -1920
 *
 * Runs before `next dev` and `next build` (see package.json). Variants that
 * are newer than their source are skipped, so repeat runs are near-instant.
 * Widths larger than the source are written at the source size (never upscaled).
 * Variants whose source image was deleted or renamed are removed.
 */
import { existsSync } from "node:fs";
import { mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { allImageWidths, VARIANTS_DIR } from "../image-sizes.mjs";

const PUBLIC_DIR = path.resolve("public");
const OUT_DIR = path.join(PUBLIC_DIR, VARIANTS_DIR);
const RASTER = /\.(png|jpe?g|webp)$/i;
const QUALITY = 78;
const CONCURRENCY = 8;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full !== OUT_DIR) yield* walk(full);
    } else if (RASTER.test(entry.name)) {
      yield full;
    }
  }
}

async function isFresh(target, sourceMtime) {
  try {
    return (await stat(target)).mtimeMs >= sourceMtime;
  } catch {
    return false;
  }
}

async function processImage(source) {
  const relative = path.relative(PUBLIC_DIR, source).replace(RASTER, "");
  const { mtimeMs } = await stat(source);
  let written = 0;

  for (const width of allImageWidths) {
    const target = path.join(OUT_DIR, `${relative}-${width}.webp`);
    if (await isFresh(target, mtimeMs)) continue;
    await mkdir(path.dirname(target), { recursive: true });
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(target);
    written++;
  }
  return written;
}

/** Delete variants whose source image no longer exists. */
async function removeOrphans(dir = OUT_DIR) {
  if (!existsSync(dir)) return 0;
  let removed = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removed += await removeOrphans(full);
      if ((await readdir(full)).length === 0) await rm(full, { recursive: true });
      continue;
    }
    const base = path.join(PUBLIC_DIR, path.relative(OUT_DIR, full).replace(/-\d+\.webp$/, ""));
    if (![".webp", ".png", ".jpg", ".jpeg"].some((ext) => existsSync(base + ext))) {
      await rm(full);
      removed++;
    }
  }
  return removed;
}

const started = Date.now();
const sources = [];
for await (const file of walk(PUBLIC_DIR)) sources.push(file);

let written = 0;
for (let i = 0; i < sources.length; i += CONCURRENCY) {
  const batch = await Promise.all(sources.slice(i, i + CONCURRENCY).map(processImage));
  written += batch.reduce((sum, n) => sum + n, 0);
}

const removed = await removeOrphans();

console.log(
  `[images] ${sources.length} sources, ${written} variants written, ${removed} orphans removed (${((Date.now() - started) / 1000).toFixed(1)}s)`,
);
