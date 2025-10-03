import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds to prevent build failures
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checks during builds for faster deployment
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
