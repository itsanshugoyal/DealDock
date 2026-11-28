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
  // Inlining the ~25KB of CSS removes the render-blocking stylesheet requests. HTML grows (37KB to 99KB gzipped,
  // the CSS is also in the RSC payload), but measured on throttled mobile LCP went from ~6s to ~3.5s.
  experimental: { inlineCss: true },
  async redirects() {
    return [{ source: "/global", destination: "/", permanent: true }];
  },
};

export default nextConfig;
