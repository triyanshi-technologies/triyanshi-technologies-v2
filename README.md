# Triyanshi Technologies — website

Marketing site for [triyanshitechnologies.com](https://triyanshitechnologies.com).

- **Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4.
- **Build output:** a fully static export (`out/`) served by Apache over FTP.
- **CMS:** portfolio projects only, in Sanity (`studio/`, live at <https://triyanshi.sanity.studio>).
- **Everything else** lives in the repo under `src/content/`.

## Quick start

```bash
npm install
cp .env.example .env.local   # Sanity IDs are prefilled
npm run dev                  # http://localhost:3000
```

Node 24 is used in CI; any current LTS works locally.

| Script                  | What it does                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `npm run dev`           | Dev server. `predev` clears Next's fetch cache and generates responsive images.                         |
| `npm run build`         | Static export to `out/`, then fixes RSC segment files (Windows) and checks every asset reference.       |
| `npm start`             | Serves `out/` locally.                                                                                  |
| `npm run lint`          | ESLint (Next core-web-vitals + TypeScript).                                                             |
| `npm run typecheck`     | `tsc --noEmit`.                                                                                         |
| `npm run images`        | Regenerates `public/_img/` (WebP variants of everything in `public/assets/`).                           |
| `npm run sanity:import` | One-off seed of the legacy projects into Sanity (needs `SANITY_API_WRITE_TOKEN`; `--force` overwrites). |

## Project structure

```
src/
  app/            routes (one folder per URL; legacy URL shapes kept, e.g. /contact-us/contact-us)
    sitemap.ts, robots.ts     generated at build time
  components/
    ui/           primitives: Button/ButtonLink, Container, Section, form fields, icons, PageHeader…
    sections/     page sections shared across pages (heroes, CTAs, feature grids)
    home/ services/ portfolio/ company/ technologies/ tools/ projects/   feature components
    motion/       animate-on-scroll (Reveal, RevealGroup, RevealItem, RevealScript)
    seo/          JSON-LD, analytics
  content/        page copy and data (services, portfolio pages, jobs, technologies, tools, navigation…)
  lib/            helpers: cn/cx, hover styles, SEO metadata, API client, Sanity client, projects
  styles/globals.css   design tokens (@theme) — the only global CSS
studio/           Sanity Studio (separate package)
scripts/          build helpers + Sanity seed
public/           static files; .htaccess and llms.txt are copied to out/
```

## Conventions

### Design tokens

`src/styles/globals.css` resets Tailwind's default colours, font sizes and weights. Only the site's own tokens exist:

- **Colours:** `primary`, `primary-text`, `ink`, `body`, `surface`, `line`, and so on.
- **Type scale:** `text-xs` to `text-3xl`, plus `text-heading-sm/md/lg/xl`.
- **Radii, shadows and animations.**

If a value isn't a token, it probably shouldn't be on the site. Use rem-based utilities; arbitrary values only for one-off legacy measurements.

**Orange text on light backgrounds:** use `text-primary-text` (#b35900) for small text such as badges and links, because brand orange fails contrast there.

### Class names: `cn` and `cx`

- **`cn` (tailwind-merge):** resolves conflicts so callers can override defaults. Use it in **server components only**; it adds about 17 KB to the browser bundle.
- **`cx` (clsx):** joins classes without resolving conflicts. Use it in client components and shared primitives. With `cx`, `className` props are for layout only, so add a variant instead of overriding colours or sizes.

### Hover effects

Every interactive element uses one of the constants in `src/lib/hover.ts`, never ad-hoc hover classes:

- **`cardHover`:** lift 4px, orange border, shadow.
- **`cardHoverDark`**
- **`mediaCardHover`**
- **`arrowNudge`:** needs a `group/link` ancestor; buttons already have one.
- **`iconButtonHover`**

### Animate on scroll

Wrap content in `<Reveal>`, or use `<RevealGroup>` with `<RevealItem>` children for staggered items. It is driven by a tiny inline script (`RevealScript`) and CSS keyframes:

- **No hydration wait:** it works before React hydrates.
- **Delays are animation delays:** they never slow down hover transitions.
- **No JS:** a `<noscript>` style shows everything.

**Don't wrap above-the-fold hero text in `Reveal`.** It is usually the LCP element and must be visible on first paint.

### SEO

- **Metadata:** every page exports `metadata = buildMetadata({ title, description, path })`. This sets the title template, canonical, Open Graph and Twitter card. Pass `index: false` for pages that must stay out of search.
- **JSON-LD:** organization schema on all pages, `WebSite` on home, breadcrumbs on inner pages, `CollectionPage` on portfolio pages and `WebApplication` on tools.
- **`sitemap.ts`:** lists the pages reachable from the navigation, built from `src/content`.

## Content

| What                                                          | Where                                  |
| ------------------------------------------------------------- | -------------------------------------- |
| Portfolio projects, their order per page                      | Sanity Studio (see `studio/README.md`) |
| Service pages, portfolio page copy, jobs, technologies, tools | `src/content/*.ts`                     |
| Navigation and footer (hidden items are kept as comments)     | `src/content/navigation.ts`            |
| Contact details, socials, analytics IDs                       | `src/lib/site.ts`                      |

Sanity is read at build time only; the dataset is public and the site uses no token.

- **Production:** a webhook triggers a new build when content is published (see below).
- **`npm run dev`:** Studio edits show up on page reload.

**Adding a page:** create `src/app/<path>/page.tsx` and export `metadata` via `buildMetadata`. Compose it from `components/ui` and `components/sections`, then add it to `sitemap.ts` if it's linked from the nav.

**Forms and tools** post to the external API server (`NEXT_PUBLIC_API_BASE`, default `https://triyanshi-technologies-server.vercel.app`) through `src/lib/api.ts`:

- **Contact form:** `/api/contact`.
- **Tool lead forms:** `/api/leads`, with a `source` field.
- **Site speed grader:** `/api/pagespeed`.

## Deployment

`.github/workflows/deploy.yml` builds the site and uploads `out/` by FTP. It runs on pushes to `main`, manually, and on Sanity publishes.

> `.github` is currently listed in `.gitignore`. Remove that line so the workflow is committed and runs.

**1. GitHub secrets** (Settings → Secrets and variables → Actions):

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`
- `FTP_SERVER_DIR`: the document root, e.g. `/public_html/`

**2. Rebuild on publish (Sanity webhook):**

1. Create a GitHub fine-grained token for this repository with **Contents: Read and write** (needed for `repository_dispatch`).
2. In [sanity.io/manage](https://www.sanity.io/manage) → project `eb7crcip` → API → Webhooks, add a webhook:
   - **URL:** `https://api.github.com/repos/<owner>/<repo>/dispatches`
   - **Dataset:** `production`. **Trigger on:** create, update, delete.
   - **Filter:** `_type in ["project", "showcase"]`
   - **Projection:** `{"event_type": "sanity-publish"}`
   - **HTTP method:** `POST`
   - **Headers:** `Authorization: Bearer <token>`, `Accept: application/vnd.github+json`
3. Publish a change in the Studio; a "Build & deploy to FTP" run should start within seconds.

**3. Apache (`public/.htaccess`):**

- **Canonical URL:** HTTPS, no `www`.
- **Redirects:** 301s from legacy URLs (`/about/about`, `/services/index` and so on) and from `.html` or trailing-slash URLs.
- **Routing:** serves `<route>.html` for clean URLs, with `DirectorySlash Off` because `/services` is both a folder and `services.html`.
- **Errors:** the 404 page.
- **Caching:** `_next/static` immutable, pages `no-cache`, assets 30 days.

After the first deploy, check:

- `/services` and `/portfolio` (not `/services/`) load.
- `/about/about` redirects to `/company/about-us`.
- Clicking between pages doesn't trigger full reloads; the Network tab shows `.txt` payloads returning 200.
- `/sitemap.xml` and `/robots.txt` load.

**Studio:** `cd studio && npm run deploy` publishes it to triyanshi.sanity.studio.

## Analytics

GA4 and Microsoft Clarity load after the page has finished loading. They run **only on the live domain**, so local builds and previews send no data. IDs are in `src/lib/site.ts`.

## Troubleshooting

- **Old Sanity data after a build:** builds clear `.next/cache/fetch-cache` first, so this shouldn't happen. If it does, delete `.next` and rebuild.
- **`[assets] … missing` after a build:** a page references a file that isn't in `public/`. Fix the path, or run `npm run images` after adding images.
- **Windows-only:** Next writes nested `__next.*` folders on Windows; `scripts/fix-export-segments.mjs` flattens them to the layout Linux produces. CI (Linux) doesn't need it.
