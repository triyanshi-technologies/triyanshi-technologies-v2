import "server-only";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-10-01";

if (!projectId || !dataset) {
  // Fail the build loudly rather than exporting a site without projects.
  throw new Error(
    "Sanity is not configured: set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
  );
}

export const sanityConfig = { projectId, dataset, apiVersion };

/**
 * Read-only client for build-time fetching. The dataset is public, so no token
 * is used. `useCdn: false` guarantees a webhook-triggered build sees the
 * content that was just published (builds are rare, so API usage stays tiny).
 */
export const sanityClient = createClient({
  ...sanityConfig,
  useCdn: false,
  perspective: "published",
});
