# Triyanshi Technologies - Project Context

> Purpose: AI/developer handoff for the current static website.
> Last updated: 2026-08-05 from the live workspace.

---

## 1. Current Status

- Static marketing website: vanilla HTML, CSS, and JavaScript only.
- No package manager, framework, bundler, or CDN dependency is required to run the site. `npm run dev` (esbuild, dev-only) serves original `.css`/`.js` locally; `npm run build` produces a `dist/` with only the minified assets for production, used by the FTP deploy workflow.
- Current file count: 51 HTML files, 21 CSS files, 17 JavaScript files.
- Primary shared UI is injected by `js/components.js` into `#site-nav` and `#site-footer`.
- Shared API client lives in `js/api.js` and calls `https://triyanshi-technologies-server.vercel.app` by default.
- Portfolio, service, and tool pages are now first-class parts of the site.
- Technologies pages still exist, but the Technologies dropdown is commented out in `js/components.js` for desktop and mobile nav.
- Recent speed grader work: `tools/site-speed-grader.html/css/js` has desktop/mobile report toggle handling, pending-state display, and score graphic resets for missing report values.

---

## 2. Project Shape

```text
root/
  index.html
  context.md
  DEVELOPER_GUIDE.md
  data.txt

  css/
    style.css              master CSS import file
    variables.css          design tokens
    reset.css              reset and global [hidden]
    typography.css         heading/text utilities
    components.css         layout, buttons, cards, footer, breadcrumbs
    navbar.css             desktop/mobile navigation
    hero.css               homepage hero slider
    animations.css         reveal animations
    testimonials.css       legacy testimonial styles
    testimonial-v2.css     active testimonial carousel styles

  js/
    components.js          shared navbar/footer injection + active states
    navbar.js              desktop dropdowns + mobile nav accordions
    main.js                scroll reveals, homepage portfolio, rolling stats
    hero.js                homepage hero slider
    testimonial-v2.js      active testimonial carousel
    testimonials.js        legacy script
    portfolio-data.js      source of truth for project data
    brand-logos-data.js    source of truth for homepage logo marquee
    api.js                 contact/lead/pagespeed API wrapper

  about/
    about.html, about.css, about.js

  contact-us/
    contact-us.html, contact-us.css, contact-us.js

  company/
    about-us.html, what-we-serve.html, our-story.html, our-team.html
    careers.html, full-stack-developer.html, ui-ux-designer.html
    business-dev-executive.html, company.css

  services/
    index.html
    shopify.html, bigcommerce.html, volusion.html, webflow.html, headless.html
    enterprise-solution.html, saas-mvp-development.html, website-development.html
    ai-automation-solutions.html, erp-crm-development.html, ui-ux-product-design.html
    regulatory-consulting.html, audit-risk-management.html, policy-documentation.html
    services.css, service-pages.js

  portfolio/
    index.html
    shopify.html, bigcommerce.html, volusion.html, webflow.html, headless.html
    enterprise-solution.html, saas-mvp-development.html, website-development.html
    ai-automation-solutions.html, erp-crm-development.html, ui-ux-product-design.html
    portfolio.css, portfolio-pages.js

  portfolio-detail/
    portfolio-detail.html, portfolio-detail.css

  technologies/
    technologies.html, react-nextjs.html, nodejs.html, hydrogen-remix.html
    graphql.html, ai-ml.html, typescript.html, technologies.css

  tools/
    index.html
    roi-calculator.html, roi-calculator.css, roi-calculator.js
    site-speed-grader.html, site-speed-grader.css, site-speed-grader.js
    ai-readiness-assessment.html, ai-readiness-assessment.css, ai-readiness-assessment.js
    platform-selector.html, platform-selector.css, platform-selector.js

  assets/
    logos, compliance badges, service images, co-founder images, brand logos

  project-images/
    new/                   compact project screenshots for cards/service examples
    full website/          full-page project screenshots for portfolio pages
```

---

## 3. Architecture Rules

- Keep the site static. Add only `.html`, `.css`, `.js`, and optimized assets.
- Use ES5-style IIFEs for browser scripts. Existing files avoid modules and build tooling.
- Shared design tokens must come from `css/variables.css`.
- `css/style.css` imports global CSS in this order:

```css
@import url("./variables.css");
@import url("./reset.css");
@import url("./typography.css");
@import url("./components.css");
@import url("./navbar.css");
@import url("./hero.css");
@import url("./animations.css");
```

- Page CSS loads after `css/style.css`, so page-specific styles can override global styles with normal cascade.
- Global `[hidden] { display: none !important; }` is in `css/reset.css`; tool CSS also protects scoped hidden states.
- Script order matters:

```html
<script src="[prefix]js/components.js" defer></script>
<script src="[prefix]js/navbar.js" defer></script>
<script src="[prefix]js/main.js" defer></script>
<script src="[prefix]js/api.js" defer></script>
<script src="page-script.js" defer></script>
```

Use `api.js` before any page script that calls `window.TTApi`.

---

## 4. Shared Components

`js/components.js` injects the navbar and footer.

### Prefix Detection

`isSubfolder` currently recognizes:

- `/about/`
- `/contact-us/`
- `/portfolio/`
- `/portfolio-detail/`
- `/technologies/`
- `/services/`
- `/company/`
- `/tools/`

When adding a new top-level folder with HTML pages, add it to this list so injected links resolve with `../`.

### Current Navigation

Desktop nav:

```text
Logo | Home | Company | Services | Portfolio | Tools | Contact Us
```

- Company: About Us, What We Serve, Our Story, Our Team. Careers links are present but commented out.
- Services: eCommerce, Enterprise Solutions, Compliance.
- Portfolio: eCommerce and Case Studies.
- Tools: ROI Calculator, Site Speed Grader, AI Readiness Assessment, eCommerce Platform Selectors.
- Technologies: pages exist, nav block is commented out.

Mobile nav mirrors desktop with accordion panels. Keep desktop and mobile nav in sync when changing links.

### Footer

Current injected footer columns:

1. Brand
2. Services
3. Free Tools
4. Company
5. Contact Us

The old 6-column footer note is obsolete.

---

## 5. Data Sources

### Portfolio Data

`js/portfolio-data.js` is the source of truth for project content.

Used by:

- `js/main.js` for the homepage featured portfolio section.
- `portfolio/portfolio-pages.js` for portfolio category pages.
- `services/service-pages.js` for service page project examples.

Important fields:

- `domain`: determines screenshot lookup.
- `features`: bullet list on portfolio cards.
- `tags`: badges.
- `home`: homepage tab placement.
- `position`: default ordering.
- `pages`: portfolio page memberships.
- `services`: service page memberships.

Screenshot conventions:

- Portfolio pages use `project-images/full website/{normalized-domain}.webp`.
- Service pages and some cards use `project-images/new/{normalized-domain}.webp`.
- Missing images fall back to `assets/sample-image.webp`.

### Service Pages

`services/service-pages.js` owns service metadata and renders each service page into `#service-page-root`.

- Service page HTML files are thin shells with `data-service="service-key"`.
- `services/index.html` uses `data-service-index` and renders the hub.
- Relevant projects are populated from `portfolio-data.js` when `services` memberships exist.
- Compliance service pages contain some static placeholder project examples in `service-pages.js`.

### Portfolio Pages

`portfolio/portfolio-pages.js` owns portfolio category metadata and renders into `#portfolio-page-root`.

- Category page HTML files are thin shells with `data-portfolio="portfolio-key"`.
- `portfolio/index.html` uses `data-portfolio-index` and renders the hub.
- Project cards are populated from `portfolio-data.js` when `pages` memberships exist.
- The page size is `PROJECT_PAGE_SIZE = 6`; Show More appends another batch.

### Brand Logos

`js/brand-logos-data.js` powers the homepage brand marquee. Logo files live in `assets/brands/`.

---

## 6. Forms And API

`js/api.js` exposes `window.TTApi`:

- `submitContact(form)` -> `POST /api/contact`
- `submitLead(form, source)` -> `POST /api/leads`
- `getPageSpeed(url, strategy, signal)` -> `GET /api/pagespeed?url=...&strategy=...`
- `validateRequired(form)`
- `setButtonLoading(button, isLoading, loadingText)`

Default API base:

```js
window.TT_API_BASE || "https://triyanshi-technologies-server.vercel.app"
```

Pages that submit data must load `js/api.js` before their page-specific JS.

Current API-backed pages:

- `contact-us/contact-us.html` via `contact-us/contact-us.js`
- `tools/roi-calculator.html` via `tools/roi-calculator.js`
- `tools/ai-readiness-assessment.html` via `tools/ai-readiness-assessment.js`
- `tools/platform-selector.html` via `tools/platform-selector.js`
- `tools/site-speed-grader.html` via `tools/site-speed-grader.js`

---

## 7. Tools

### ROI Calculator

Files: `tools/roi-calculator.html/css/js`

- Calculates current/projected revenue, ROI, payback, conservative/expected/optimistic scenarios.
- Supports INR and USD with different input ranges/defaults.
- Lead form posts with source `roi-calculator`.

### Site Speed Grader

Files: `tools/site-speed-grader.html/css/js`

- Calls PageSpeed through `TTApi.getPageSpeed` for both `desktop` and `mobile`.
- Stores reports in `reportsByStrategy` and switches with `#speed-strategy-toggle`.
- Mobile/desktop tabs can be selected while one report is still pending.
- Pending selected tab shows a compact loading state and hides stale results.
- Result renderer resets gauge/bar graphics when score values are missing.
- Fix request form posts with source `site-speed-grader`.

### AI Readiness Assessment

Files: `tools/ai-readiness-assessment.html/css/js`

- Wizard-style assessment with weighted dimensions: Use Case, Data, Tools, Team, Workflow, Governance, Capacity.
- Exposes `window.AIReadinessAssessment` and CommonJS exports for simple checks.
- Review form posts with source `ai-readiness-assessment`.

### Platform Selector

Files: `tools/platform-selector.html/css/js`

- Wizard-style commerce platform recommender.
- Scores Shopify, Shopify Plus, BigCommerce, Webflow Ecommerce, Volusion modernization/migration, and Custom Enterprise Commerce.
- Exposes `window.PlatformSelector` and CommonJS exports for simple checks.
- Review form posts with source `platform-selector`.

---

## 8. Page Families

### Homepage

`index.html` uses global CSS plus `testimonial-v2.css`.

Major dynamic pieces:

- Hero slider: `js/hero.js`
- Brand marquee: `js/brand-logos-data.js` + `js/main.js`
- Featured portfolio: `js/portfolio-data.js` + `js/main.js`
- Testimonial carousel: HTML in `index.html` + `js/testimonial-v2.js`

### About And Company

- `about/` contains the older About page.
- `company/` contains current company pages and job pages.
- Shared company styles are in `company/company.css`.
- Company nav active state is set for any `/company/` page.

### Services

- 15 HTML pages including hub.
- Shared CSS: `services/services.css`.
- Shared renderer: `services/service-pages.js`.
- Body attributes drive page selection.

### Portfolio

- 12 HTML pages including hub.
- Shared CSS: `portfolio/portfolio.css`.
- Shared renderer: `portfolio/portfolio-pages.js`.
- `portfolio-detail/portfolio-detail.html` remains the shared/static case-study destination.

### Technologies

- 7 HTML pages remain in `technologies/`.
- Shared CSS: `technologies/technologies.css`.
- Nav is currently disabled/commented out in `components.js`.

---

## 9. Development Checklist

Before finishing a change:

- Keep edits scoped to the relevant page family.
- Use existing classes, tokens, and patterns first.
- If a page calls `TTApi`, verify `js/api.js` is loaded before the page script.
- If adding a new subfolder, update `isSubfolder` in `js/components.js`.
- If adding a nav page, update both desktop and mobile nav plus `setActiveState()`.
- If adding portfolio/service examples, update `js/portfolio-data.js` first.
- Optimize new images as `.webp` and follow domain-based naming where possible.
- Run `node --check path/to/script.js` for any edited JavaScript file.
- Open HTML directly or use a simple static server; no build command exists.

---

## 10. Known Watchpoints

- Technologies pages are present but hidden from the nav until the commented nav blocks are restored.
- Careers links/pages exist, but careers nav/footer links are commented out in `js/components.js`.
- `portfolio-detail/portfolio-detail.html` is still a shared/static detail page; category cards often link to live domains instead.
- `portfolio/portfolio-pages.js` has some static fallback example projects for categories that may be overwritten when `portfolio-data.js` provides real projects.
- The site depends on the external Triyanshi API server for contact, lead, and PageSpeed features. Static content still works if the API is unavailable.