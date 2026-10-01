import type { NextConfig } from "next";
import { deviceSizes, imageSizes } from "./image-sizes.mjs";

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
  // No image server on a static host: local images use pre-generated variants
  // (scripts/optimize-images.mjs) and Sanity images use Sanity's CDN — both
  // resolved by the custom loader.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes,
    imageSizes,
  },
  reactStrictMode: true,
};

export default nextConfig;
