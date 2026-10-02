import type { NextConfig } from "next";
import { deviceSizes, imageSizes } from "./image-sizes.mjs";

/**
 * Static export: `next build` writes plain HTML/CSS/JS to `out/`, which Vercel
 * serves as static files. Keep this site free of server-only features (API
 * routes, ISR, proxy) — redirects and headers live in vercel.json, form and
 * tool endpoints on the separate API server.
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
