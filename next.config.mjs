import dotenv from "dotenv";
import process from "process";

dotenv.config({ path: ".env.local" });

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    if (!process.env.BACKEND_URL) {
      throw new Error(
        "BACKEND_URL is not defined in the environment variables."
      );
    }

    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
    ];
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL, // Expose BACKEND_URL to Next.js
  },
};

export default nextConfig;
