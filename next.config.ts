import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Removed output: 'export' for Vercel compatibility */
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
