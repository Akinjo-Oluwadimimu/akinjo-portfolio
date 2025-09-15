import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    domains: [
      "ztnyuecbojebmzlwthft.supabase.co",
      "cdn.prod.website-files.com"
    ],
  },
};

export default nextConfig;
