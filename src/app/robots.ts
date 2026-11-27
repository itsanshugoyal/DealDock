import type { MetadataRoute } from "next";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";

// Founders' decision, 7 Nov 2026: allow every search and AI crawler, including training crawlers
// (GPTBot, ClaudeBot, Google-Extended, CCBot). "*" already covers them, so keep it that way:
// a bot-specific group would also skip the disallow rules below. Cloudflare's AI crawler
// setting for dealdock.io must stay on "allow" too.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard/"] }, sitemap: MARKETING_ORIGIN + "/sitemap.xml" };
}
