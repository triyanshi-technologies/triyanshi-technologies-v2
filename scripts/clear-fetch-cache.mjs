/*
 * Next.js persists build-time fetch responses (our Sanity query) in
 * .next/cache/fetch-cache with a one-year lifetime. A static export can't opt
 * out per request without becoming dynamic, so clear it before each build/dev
 * run — every build must reflect the content currently published in Sanity.
 */
import { rmSync } from "node:fs";

rmSync(".next/cache/fetch-cache", { recursive: true, force: true });
