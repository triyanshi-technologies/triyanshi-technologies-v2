/*
 * Works around a Next.js 16 static-export bug on Windows.
 *
 * The router prefetches per-segment files named like
 *   /services/shopify/__next.services.$d$slug.__PAGE__.txt
 * but on Windows the exporter splits the segment path on "\" instead of "/",
 * so it writes nested folders instead:
 *   /services/shopify/__next.services/$d$slug/__PAGE__.txt
 * This flattens those folders back into dotted filenames. On Linux/macOS
 * (including CI) the files are already flat and this is a no-op.
 */
import { readdir, rename, rm, stat } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("out");
let fixed = 0;

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* files(full);
    else yield full;
  }
}

async function flatten(segmentDir) {
  const parent = path.dirname(segmentDir);
  for await (const file of files(segmentDir)) {
    const relative = path.relative(parent, file).split(path.sep).join(".");
    await rename(file, path.join(parent, relative));
    fixed++;
  }
  await rm(segmentDir, { recursive: true, force: true });
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) await flatten(full);
    else if (entry.name !== "_next") await walk(full);
  }
}

if ((await stat(OUT).catch(() => null))?.isDirectory()) {
  await walk(OUT);
  if (fixed) console.log(`[segments] flattened ${fixed} prefetch file(s) (Windows export workaround)`);
}
