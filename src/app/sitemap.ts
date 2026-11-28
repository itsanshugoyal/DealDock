import type { MetadataRoute } from "next";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";
import { getPublishedBlogPosts, freeTools } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getPublishedBlogPosts();
  const coreRoutes = ["/", "/in", "/pricing", "/security", "/about", "/contact", "/privacy", "/terms", "/refunds", "/delivery", "/data-deletion", "/pilot-terms"];
  const newest = [...blogPosts.map((p) => p.updatedAt), ...freeTools.map((t) => t.updatedAt)].sort().at(-1);
  return [
    ...coreRoutes.map((route) => ({ url: MARKETING_ORIGIN + route, lastModified: "2026-11-28", priority: route === "/" || route === "/in" ? 1 : 0.3 })),
    { url: `${MARKETING_ORIGIN}/blog`, lastModified: newest, priority: 0.6 },
    { url: `${MARKETING_ORIGIN}/tools`, lastModified: newest, priority: 0.6 },
    ...blogPosts.map((post) => ({ url: `${MARKETING_ORIGIN}/blog/${post.slug}`, lastModified: post.updatedAt, priority: 0.7 })),
    ...freeTools.map((tool) => ({ url: MARKETING_ORIGIN + tool.href, lastModified: tool.updatedAt, priority: 0.7 })),
  ];
}
