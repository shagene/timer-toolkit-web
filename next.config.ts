import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})({
  /* other config options here */
  experimental: {
    turbo: {
      rules: {
        // Configure any specific rules for Turbopack here
      }
    }
  }
});

export default nextConfig;
