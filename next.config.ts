import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // allowedDevOrigins: ['192.168.254.102'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sperx.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
