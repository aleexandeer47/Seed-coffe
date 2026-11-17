import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
  },
  poweredByHeader: false,
  // A parent folder also has a lockfile; pin tracing to this project.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
