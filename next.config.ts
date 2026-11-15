import type { NextConfig } from "next";

// STATIC_PREVIEW=1 builds a plain static copy (./out) with relative asset paths,
// used to publish a shareable preview. The normal build is unaffected.
const preview = process.env.STATIC_PREVIEW === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: preview ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] },
  ...(preview ? { output: "export" as const, assetPrefix: "./", trailingSlash: false } : {}),
};

export default nextConfig;
