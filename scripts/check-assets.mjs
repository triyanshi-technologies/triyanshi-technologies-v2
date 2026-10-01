/*
 * Post-build check: every local file referenced by the exported HTML
 * (src, href, srcset) must exist in out/. Fails the build otherwise, so a
 * missing image or renamed asset can never be deployed.
 */
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("out");
const ASSET = /\.(webp|png|jpe?g|gif|svg|ico|css|js|txt|xml|pdf|woff2?)$/i;

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith(".html")) yield full;
  }
}

const missing = new Map();
let checked = 0;

for await (const file of htmlFiles(OUT)) {
  const html = await readFile(file, "utf8");
  const urls = new Set([...html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)].map((m) => m[1]));
  for (const [, set] of html.matchAll(/srcSet="([^"]+)"/gi)) {
    for (const candidate of set.split(",")) urls.add(candidate.trim().split(" ")[0]);
  }
  for (const url of urls) {
    if (!url.startsWith("/") || url.startsWith("//") || !ASSET.test(url)) continue;
    checked++;
    if (!existsSync(path.join(OUT, decodeURIComponent(url)))) {
      missing.set(url, path.relative(OUT, file));
    }
  }
}

if (missing.size) {
  console.error(`[assets] ${missing.size} missing file(s):`);
  for (const [url, page] of missing) console.error(`  ${url}  (referenced by ${page})`);
  process.exit(1);
}
console.log(`[assets] ${checked} references OK`);
