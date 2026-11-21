import type { Metadata } from "next";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";
import { getVisibleBlogPosts, type BlogPost } from "./blog/content";
export { getAllBlogPosts, getPublishedBlogPosts, getVisibleBlogPosts } from "./blog/content";
export type { BlogPost } from "./blog/content";

export { freeTools } from "./tools/catalog";
export function blogPost(slug: string): BlogPost {
  const post = getVisibleBlogPosts().find(post => post.slug === slug);
  if (!post) throw new Error(`Unknown or unpublished blog post: ${slug}`);
  return post;
}
export const blogUrl = (slug: string) => `${MARKETING_ORIGIN}/blog/${slug}`;
export { formatDate } from "./blog/format";
export const shareImage = (post: BlogPost) => post.image ? { ...post.image, url: new URL(post.image.url, MARKETING_ORIGIN).href } : { url: `${MARKETING_ORIGIN}/og/${post.slug}`, width: 1200, height: 630, alt: post.title };
export function blogMetadata(slug: string): Metadata {
  const post = blogPost(slug);
  const url = blogUrl(slug);
  const images = [shareImage(post)];
  return {
    title: `${post.title} | DealDock`, description: post.description, alternates: { canonical: url },
    openGraph: { type: "article", url, title: post.title, description: post.description, siteName: "DealDock", ...(post.status === "published" ? { publishedTime: post.publishedAt } : {}), modifiedTime: post.updatedAt, images },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images },
    robots: { index: post.status === "published", follow: post.status === "published" },
  };
}
