# Triyanshi Studio (Sanity)

Content editor for the website's **portfolio projects** and the **homepage** brand logos, testimonials and app partners. Live at <https://triyanshi.sanity.studio>.

## Editing projects

**Add a project**

1. **Projects → +** (top right). Fill in name, generate the slug, domain (without `https://`), platform, industry, key features and tags.
2. Upload the website screenshot (about 1900 × 945 px) and drag the hotspot onto the most important area.
3. **Publish**.
4. Add it where it should appear: open **Portfolio pages** or **Service page examples**, choose the page, then **Add item** and select the project.
5. Drag projects to set their order on that page, then **Publish**.

**Reorder projects**: open the showcase and drag the handles, then **Publish**.

**Hide a project**: remove it from the showcase. To hide it everywhere, unpublish the project.

The homepage "Featured Projects" tabs show the first 3 projects of the Shopify, BigCommerce, Volusion and Webflow portfolio pages.

> Changes reach the live site after the next website build (automatic on publish once the deploy webhook is set up, about 2–4 minutes).

## Editing the homepage

Open **Homepage** in the sidebar:

- **Brand logos**: the two “Brands That Believe In Us” strips (top scrolls left, bottom scrolls right). Upload a transparent, tightly trimmed logo and pick its shape: _Square / icon mark_ renders smaller, _Wide wordmark_ wider and shorter.
- **Testimonials**: the “Trust That Speaks For Itself” slides. Each needs a company logo and a homepage screenshot (about 1904 × 945 px) for the laptop mockup. _Platform_ adds the Shopify / BigCommerce / Volusion logo badge; _Highlighted badge_ is shown first in bold.
- **App partners**: the “Our eCommerce App Partners” cards. Use a square app icon and a one-sentence description.

Use **Add item** to add an entry, drag the handles to reorder, open an entry to edit it, then **Publish**. An empty list hides that section on the website.

Showcases and the homepage documents are created by the developers and can't be deleted, duplicated or unpublished in the Studio. The website relies on their fixed IDs.

## Development

```bash
cd studio
npm install
npm run dev      # http://localhost:3333
npm run deploy   # publish to triyanshi.sanity.studio (needs `npx sanity login` once)
```

The one-time data import lives in the website project: `npm run sanity:import` (see `scripts/sanity-import.ts`; `-- home` imports only the homepage documents).
