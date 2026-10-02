/*
 * Writes out/sitemap.xml after the build by crawling the exported site from
 * the homepage, following real <a href> links. Only pages a visitor (or a
 * crawler) can actually reach are listed, so commenting a link out of the
 * navigation or a page removes its target from the sitemap automatically.
 * Pages marked noindex are skipped.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = "out";
const SITE = "https://triyanshitechnologies.com";

/** Higher priority for the key pages; everything else gets the default. */
const PRIORITY = {
  "/": 1,
  "/services/ecommerce": 0.9,
  "/services/enterprise-solutions": 0.9,
  "/company/about-us": 0.8,
  "/portfolio": 0.8,
  "/tools": 0.8,
  "/contact-us/contact-us": 0.6,
};
const DEFAULT_PRIORITY = 0.7;

const fileFor = (route) => path.join(OUT, route === "/" ? "index.html" : `${route.slice(1)}.html`);

/** Internal page links in a page's HTML, as normalized routes. */
function linksIn(html) {
  const routes = [];
  for (const [, raw] of html.matchAll(/<a\b[^>]*?\shref="([^"]+)"/g)) {
    const href = raw.replace(/&amp;/g, "&");
    let url;
    try {
      url = new URL(href, SITE);
    } catch {
      continue;
    }
    if (url.origin !== SITE) continue;
    routes.push(
      decodeURIComponent(url.pathname)
        .replace(/\.html$/, "")
        .replace(/\/+$/, "") || "/",
    );
  }
  return routes;
}

const noindex = (html) => /<meta name="robots" content="[^"]*noindex/.test(html);

const found = new Set(["/"]);
const queue = ["/"];
const pages = [];
while (queue.length) {
  const route = queue.shift();
  const html = readFileSync(fileFor(route), "utf8");
  if (!noindex(html)) pages.push(route);
  for (const link of linksIn(html)) {
    if (!found.has(link) && existsSync(fileFor(link))) {
      found.add(link);
      queue.push(link);
    }
  }
}

const lastmod = new Date().toISOString();
const urls = pages
  .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)))
  .map(
    (route) =>
      `<url>\n<loc>${SITE}${route === "/" ? "" : route}</loc>\n<lastmod>${lastmod}</lastmod>\n<priority>${PRIORITY[route] ?? DEFAULT_PRIORITY}</priority>\n</url>`,
  );

writeFileSync(
  path.join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);
console.log(`[sitemap] ${pages.length} linked pages written to out/sitemap.xml`);
