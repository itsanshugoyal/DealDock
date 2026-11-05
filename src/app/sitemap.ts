import type { MetadataRoute } from "next";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";
import { marketingGuides } from "@/lib/marketing-guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes = ["/", "/about", "/privacy", "/pilot-terms", "/contact"];
  return [
    { url: "https://dealdock.io/blog/influencer-brand-dms", lastModified: "2026-11-05", priority: 0.7 },
    ...coreRoutes.map((route) => ({ url: MARKETING_ORIGIN + route, lastModified: "2026-10-27", priority: route === "/" ? 1 : 0.3 })),
    ...marketingGuides.map((guide) => ({ url: `${MARKETING_ORIGIN}/guides/${guide.slug}`, lastModified: guide.updatedAt, priority: 0.7 })),
  ];
}
