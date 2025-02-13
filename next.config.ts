import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: 'utfs.io',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
