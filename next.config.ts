import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed "output: export" — dashboard needs API routes (server-side).
  // Marketing pages still work fine with `next dev` and `next start`.
  // For static-only deployment of the landing page, re-add output: "export"
  // and remove the /dashboard and /api routes.
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
