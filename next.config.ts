import type { NextConfig } from "next";

// AUDIT FIX: Must match your repo name exactly for GitHub Pages
const basePath = "/scrollytelling_spec_driven";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
};

export default nextConfig;