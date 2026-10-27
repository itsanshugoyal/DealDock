import type { MetadataRoute } from "next";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard/"] }, sitemap: MARKETING_ORIGIN + "/sitemap.xml" };
}
