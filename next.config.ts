import type { NextConfig } from "next";

/**
 * Static export: `next build` writes plain HTML/CSS/JS to `out/`, which the
 * GitHub Action uploads to the Apache host over FTP. Keep this site free of
 * server-only features (API routes, ISR, redirects, headers, proxy) — those
 * live in public/.htaccess or on the separate API server instead.
 */
const nextConfig: NextConfig = {
  output: "export",
  // `/company/about-us` -> out/company/about-us.html (matches the existing URLs).
  trailingSlash: false,
  // No image optimizer on a static host. Local assets are pre-optimised WebP;
  // Sanity images are resized by Sanity's CDN (see components/ui/sanity-image).
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
