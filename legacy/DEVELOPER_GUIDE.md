# Triyanshi Technologies Website - Developer Guide

This guide explains how to make common updates in the current static site. The site uses vanilla HTML, CSS, and JavaScript only. There is no framework runtime, and the site itself needs no build step to run — pages are served as-is.

---

## Quick Rules

- Edit source files directly and test in a browser or static server.
- Keep shared content in the existing data files instead of duplicating markup.
- Load scripts with `defer` and keep shared scripts before page-specific scripts.
- Use `css/variables.css` tokens and existing utility classes before adding new styles.
- Run `node --check path/to/file.js` after editing JavaScript.
- Local dev: `npm install` once, then `npm run dev` — serves the site at `http://localhost:8080` and transparently swaps every `*.min.css` / `*.min.js` request for its unminified source, so edits show up on refresh with no build step.
- Production: `npm run build` regenerates all `.min.css` / `.min.js` and stages a deploy-ready copy in `dist/` containing only the minified assets (no sources, no dev tooling). The FTP deploy workflow runs this automatically on push to `main`.

---

## 1. Adding A Portfolio Project

Portfolio content lives in `js/portfolio-data.js`. Add or edit projects there first.

A project can appear in three places from one object:

- Homepage featured portfolio via `home`.
- Portfolio category pages via `pages`.
- Service page examples via `services`.

Template:

```js
"your-project-slug": {
  name: "PROJECT NAME",
  desc: "Short description of the work and outcome.",
  features: ["Feature one", "Feature two", "Feature three"],
  tags: ["Shopify", "Liquid", "SEO"],
  category: "Industry or project type",
  domain: "example.com",
  href: "portfolio-detail/portfolio-detail.html",
  home: { category: "ecommerce", group: "shopify" },
  position: 1,
  pages: [{ key: "shopify" }],
  services: [{ key: "shopify", position: 1 }],
},
```

Valid homepage groups:

- `ecommerce`: `shopify`, `bigcommerce`, `volusion`
- `custom`: `webflow`, `wordpress`

Common portfolio page keys:

- `shopify`
- `bigcommerce`
- `volusion`
- `webflow`
- `headless`
- `enterprise-solution`
- `saas-mvp-development`
- `website-development`
- `ai-automation-solutions`
- `erp-crm-development`
- `ui-ux-product-design`

Common service keys:

- `shopify`
- `bigcommerce`
- `volusion`
- `webflow`
- `headless`
- `enterprise-solution`
- `saas-mvp-development`
- `website-development`
- `ai-automation-solutions`
- `erp-crm-development`
- `ui-ux-product-design`
- `regulatory-consulting`
- `audit-risk-management`
- `policy-documentation`

Image naming:

- Save compact card/service images in `project-images/new/example.com.webp`.
- Save full portfolio screenshots in `project-images/full website/example.com.webp`.
- File name should match the normalized domain: remove protocol and leading `www.`.
- If an image is missing, renderers fall back to `assets/sample-image.webp`.

---

## 2. Adding Or Updating A Service Page

Service pages are rendered by `services/service-pages.js`.

To add a new service:

1. Add a new service object to `SERVICES` in `services/service-pages.js`.
2. Create `services/new-service-key.html` as a thin shell.
3. Set the body attribute to match the key:

```html
<body data-service="new-service-key">
  <div id="site-nav"></div>
  <main id="service-page-root"></main>
  <div id="site-footer"></div>
  <script src="../js/components.js" defer></script>
  <script src="../js/navbar.js" defer></script>
  <script src="../js/main.js" defer></script>
  <script src="../js/portfolio-data.js" defer></script>
  <script src="service-pages.js" defer></script>
</body>
```

4. Add the page to the Services desktop nav and mobile nav in `js/components.js`.
5. Add the file name to the `serviceLeafIds` map in `setActiveState()`.
6. Add project examples by adding `services: [{ key: "new-service-key" }]` to projects in `js/portfolio-data.js`.

The services hub is `services/index.html` and uses `data-service-index`.

---

## 3. Adding Or Updating A Portfolio Category Page

Portfolio category pages are rendered by `portfolio/portfolio-pages.js`.

To add a new category:

1. Add a new object to `PORTFOLIOS` in `portfolio/portfolio-pages.js`.
2. Add the category key to the `GROUPS` list if it should appear on `portfolio/index.html`.
3. Create `portfolio/new-category.html` as a thin shell.
4. Set the body attribute:

```html
<body data-portfolio="new-category">
  <div id="site-nav"></div>
  <main id="portfolio-page-root"></main>
  <div id="site-footer"></div>
  <script src="../js/components.js" defer></script>
  <script src="../js/navbar.js" defer></script>
  <script src="../js/main.js" defer></script>
  <script src="../js/portfolio-data.js" defer></script>
  <script src="portfolio-pages.js" defer></script>
</body>
```

5. Add nav links in `js/components.js` for desktop and mobile.
6. Add the file name to `portfolioLeafIds` in `setActiveState()`.
7. Add projects with `pages: [{ key: "new-category" }]` in `js/portfolio-data.js`.

The portfolio hub is `portfolio/index.html` and uses `data-portfolio-index`.

---

## 4. Updating Brand Logos

Homepage logos are configured in `js/brand-logos-data.js` and images live in `assets/brands/`.

Add a logo:

```js
{ name: "Brand Name", file: "brand-name.webp", strip: 1, position: 9 }
```

- `strip: 1` renders in the first marquee row.
- `strip: 2` renders in the second marquee row.
- `strip: false` keeps the logo out of the marquee.
- If `strip` and `position` are missing/null, the script auto-assigns placement.

---

## 5. Updating Testimonials

Testimonials are still authored directly in `index.html` because the markup is rich.

For a new testimonial, update all matching `data-slide` items:

1. Add one `.tt-card` in `.tt-carousel`.
2. Add one `.tt-side-image` in `.tt-device-screen`.
3. Add one `.tt-stat-pair` in `.tt-stats-row`.
4. Add one `.tt-dot` in `.tt-dots`.

The slide index is zero-based. If the last slide is `data-slide="3"`, the next one is `data-slide="4"`.

---

## 6. Updating Tools

Tool pages live in `tools/` and are standalone page families.

### ROI Calculator

Files:

- `tools/roi-calculator.html`
- `tools/roi-calculator.css`
- `tools/roi-calculator.js`

What to edit:

- Currency defaults/ranges: `CURRENCY_CONFIG`.
- Scenario assumptions: `CVR_UPLIFT_FACTORS`, `SCENARIO_FACTORS`, `RAMP_UP_MONTHS`.
- Lead source: `window.TTApi.submitLead(form, "roi-calculator")`.

### Site Speed Grader

Files:

- `tools/site-speed-grader.html`
- `tools/site-speed-grader.css`
- `tools/site-speed-grader.js`

Important flow:

- `runPageSpeed(url, "desktop")` and `runPageSpeed(url, "mobile")` are launched together.
- Results are cached in `reportsByStrategy`.
- Errors are cached in `errorsByStrategy`.
- Pending states are tracked in `pendingByStrategy`.
- `activeStrategy` decides which report is visible.
- `showActiveStrategy()` is the central display switch.
- `renderScores()` must reset gauge/bar styles even when scores are `null`.

When changing this page, test switching Desktop/Mobile before and after both API calls finish.

### AI Readiness Assessment

Files:

- `tools/ai-readiness-assessment.html`
- `tools/ai-readiness-assessment.css`
- `tools/ai-readiness-assessment.js`

What to edit:

- Required questions: `REQUIRED_FIELDS`.
- Labels/options: `LABELS` and `QUESTION_TEXT`.
- Scoring: `VALUE_SCORES`, `DIMENSIONS`, `getOverallScore()`.
- Lead source: `ai-readiness-assessment`.

The script exposes `window.AIReadinessAssessment` and `module.exports` for simple checks.

### Platform Selector

Files:

- `tools/platform-selector.html`
- `tools/platform-selector.css`
- `tools/platform-selector.js`

What to edit:

- Platform definitions: `PLATFORMS`.
- Question list: `REQUIRED_FIELDS` and optional `currentPlatform`.
- Weights and scoring: `WEIGHTS`, `getDesiredProfile()`, `getRuleAdjustment()`, `applyScoreGuards()`.
- Lead source: `platform-selector`.

The script exposes `window.PlatformSelector` and `module.exports` for simple checks.

---

## 7. Forms And API Wiring

Shared API helpers live in `js/api.js`.

Use `window.TTApi.validateRequired(form)` before submitting forms with required fields.

Available calls:

```js
window.TTApi.submitContact(form);
window.TTApi.submitLead(form, "source-name");
window.TTApi.getPageSpeed(url, strategy, signal);
window.TTApi.setButtonLoading(button, true, "Submitting...");
```

To point local testing at another API server, set this before loading `js/api.js`:

```html
<script>window.TT_API_BASE = "http://localhost:3000";</script>
<script src="../js/api.js" defer></script>
```

Never hard-code API URLs inside page scripts; use `window.TTApi`.

---

## 8. Creating A New Static Page Folder

1. Create `folder-name/folder-name.html` and optional CSS/JS.
2. Link global CSS first, then page CSS:

```html
<link rel="stylesheet" href="../css/style.css" />
<link rel="stylesheet" href="folder-name.css" />
```

3. Add placeholders:

```html
<div id="site-nav"></div>
<main>...</main>
<div id="site-footer"></div>
```

4. Add the folder to `isSubfolder` in `js/components.js`.
5. Add navbar/footer links in both desktop and mobile nav if needed.
6. Add active-state logic in `setActiveState()` if the page should highlight a nav item.
7. Load scripts in this order:

```html
<script src="../js/components.js" defer></script>
<script src="../js/navbar.js" defer></script>
<script src="../js/main.js" defer></script>
<script src="folder-name.js" defer></script>
```

Add `../js/api.js` before `folder-name.js` only if the page uses `window.TTApi`.

---

## 9. Creating A Career Job Posting

Job pages live in `company/`.

1. Duplicate an existing job page such as `company/full-stack-developer.html`.
2. Rename it to the new role slug, for example `qa-engineer.html`.
3. Update the title, description, responsibilities, and requirements.
4. Add a card/link in `company/careers.html` if the careers hub should show it.
5. If the role should appear in nav, uncomment or update the Careers blocks in `js/components.js` for desktop and mobile.
6. Add its file name to `companyLeafIds` in `setActiveState()`.

Current careers nav/footer links are commented out.

---

## 10. Navigation Notes

When adding or changing a nav item in `js/components.js`, update all related places:

- Desktop `NAV_HTML`.
- Mobile `NAV_HTML`.
- Footer `FOOTER_HTML` if needed.
- `setActiveState()` leaf ID map.

Technologies pages exist but their nav blocks are commented out. To restore them, uncomment both desktop and mobile Technologies blocks and confirm `#nav-technologies-toggle` exists before relying on its active state.

---

## 11. Verification Checklist

For HTML/CSS changes:

- Open the changed page in a browser.
- Check desktop and mobile widths.
- Check navbar dropdowns/mobile accordions if nav changed.
- Confirm no text overlaps or buttons overflow.

For JavaScript changes:

```powershell
node --check path/to/file.js
```

For API-backed forms/tools:

- Confirm `js/api.js` loads before the page script.
- Check the success state.
- Check the error state if the API is unavailable.
- Confirm required fields still block blank submissions.

For data-driven pages:

- Confirm `js/portfolio-data.js` loads before `portfolio-pages.js` or `service-pages.js`.
- Confirm image fallback works when a screenshot is missing.
- Confirm `position` ordering is correct.