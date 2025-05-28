import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sites.owu.edu',
        pathname: '/usec/**',
      },
    ],
  },
};

export default nextConfig;
