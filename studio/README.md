# Triyanshi Studio (Sanity)

Content editor for the website's **portfolio projects**. Live at <https://triyanshi.sanity.studio>.

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

Showcases are created by the developers and can't be deleted or duplicated in the Studio. The website relies on their fixed IDs.

## Development

```bash
cd studio
npm install
npm run dev      # http://localhost:3333
npm run deploy   # publish to triyanshi.sanity.studio (needs `npx sanity login` once)
```

The one-time data import lives in the website project: `npm run sanity:import` (see `scripts/sanity-import.ts`).
