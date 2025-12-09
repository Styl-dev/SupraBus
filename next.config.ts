import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: "standalone",

  // Optimize for production
  poweredByHeader: false,
  compress: true,

  // Image optimization
  images: {
    remotePatterns: [],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
