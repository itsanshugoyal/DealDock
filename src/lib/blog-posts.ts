import type { Metadata } from "next";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** Who the guide is for, shown on the blog index. */
  topic: "Brand deals" | "Coaching and courses" | "Instagram DMs";
  publishedAt: string;
  updatedAt: string;
  /** Optional share image; defaults to the generated /og/<slug> card. */
  image?: ShareImage;
};

type ShareImage = { url: string; width: number; height: number; alt: string };

// One list feeds the article pages, the blog index, related links, the sitemap and share images.
// Newest first. Add a post here before creating src/app/blog/<slug>/page.tsx.
export const blogPosts: readonly BlogPost[] = [
  {
    slug: "influencer-brand-dms",
    title: "From Instagram DMs to Paid Brand Deals: An Influencer’s Guide",
    description: "Manage brand collaborations from the first Instagram DM to payment. Learn how to review offers, reply, follow up and keep track of each deal.",
    topic: "Brand deals",
    publishedAt: "2026-11-05",
    updatedAt: "2026-11-05",
    image: { url: "/guides/influencer-brand-inbox-review.jpg", width: 1672, height: 941, alt: "A highlighted brand enquiry on a phone beside a notebook" },
  },
];

/** Free tools and templates listed on the blog index and in the sitemap. */
export const freeTools: readonly { href: string; title: string; description: string; updatedAt: string }[] = [];

export function blogPost(slug: string): BlogPost {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) throw new Error(`Unknown blog post "${slug}". Add it to src/lib/blog-posts.ts.`);
  return post;
}

export const blogUrl = (slug: string) => `${MARKETING_ORIGIN}/blog/${slug}`;

/** "2026-11-05" -> "5 November 2026" */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const shareImage = (post: BlogPost): ShareImage =>
  post.image ? { ...post.image, url: new URL(post.image.url, MARKETING_ORIGIN).href } : { url: `${MARKETING_ORIGIN}/og/${post.slug}`, width: 1200, height: 630, alt: post.title };

export function blogMetadata(slug: string): Metadata {
  const post = blogPost(slug);
  const url = blogUrl(slug);
  const images = [shareImage(post)];
  return {
    title: `${post.title} | DealDock`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: post.title, description: post.description, siteName: "DealDock", publishedTime: post.publishedAt, modifiedTime: post.updatedAt, images },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: images.map((i) => i.url) },
    robots: { index: true, follow: true },
  };
}
