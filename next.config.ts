import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rent-nest-backend-fiy9.onrender.com",
      },
    ],
  },
};

export default nextConfig;