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
  /** BCP 47 language of the article body, for structured data. Defaults to "en". */
  inLanguage?: string;
  /** Optional share image; defaults to the generated /og/<slug> card. */
  image?: ShareImage;
};

type ShareImage = { url: string; width: number; height: number; alt: string };

// One list feeds the article pages, the blog index, related links, the sitemap and share images.
// Newest first. Add a post here before creating src/app/blog/<slug>/page.tsx.
export const blogPosts: readonly BlogPost[] = [
  {
    slug: "instagram-message-requests",
    title: "Instagram message requests: where brand deals and buyers hide",
    description: "Why brand and buyer DMs land in Instagram’s Requests, Spam (Hidden requests) or General tab, and the settings to check so you stop missing them.",
    topic: "Instagram DMs",
    publishedAt: "2026-11-07",
    updatedAt: "2026-11-07",
  },
  {
    slug: "manage-instagram-dms-coach",
    title: "How to manage Instagram DMs as a coach or course creator",
    description: "A twice-a-day routine to manage Instagram DMs as a coach: Primary and General, flags, saved replies that don’t sound canned, and buyers answered first.",
    topic: "Coaching and courses",
    publishedAt: "2026-11-07",
    updatedAt: "2026-11-07",
  },
  {
    slug: "follow-up-coaching-enquiry",
    title: "How to follow up with a coaching lead on Instagram (templates)",
    description: "When a coaching or course enquiry goes quiet in your DMs: when to follow up, how many times, and 8 templates that stay helpful, not pushy.",
    topic: "Coaching and courses",
    publishedAt: "2026-11-07",
    updatedAt: "2026-11-07",
  },
  {
    slug: "brand-hasnt-paid",
    title: "Brand not paying you? What to send on day 1, 7, 14 and 30",
    description: "A brand hasn’t paid your invoice? What to check first, reminder templates for day 1 to 30, and the late-payment laws that help in the US, UK and India.",
    topic: "Brand deals",
    publishedAt: "2026-11-07",
    updatedAt: "2026-11-07",
  },
  {
    slug: "dm-enquiry-tracker-template",
    title: "Free Instagram DM tracker template for leads and brand deals",
    description: "A free spreadsheet for tracking Instagram DM enquiries, from coaching leads to brand deals, with setup steps for Google Sheets, Excel and Notion.",
    topic: "Instagram DMs",
    publishedAt: "2026-11-07",
    updatedAt: "2026-11-07",
  },
  {
    slug: "ai-instagram-dm-tools",
    title: "AI tools for Instagram DMs: auto-replies vs human-approved drafts",
    description: "How ManyChat-style automation, AI agents, approve-first drafts and ChatGPT compare for Instagram DMs, and how to pick one without risking your account.",
    topic: "Instagram DMs",
    publishedAt: "2026-11-07",
    updatedAt: "2026-11-07",
  },
  {
    slug: "barter-vs-paid-collab",
    title: "Barter vs paid collab: kab haan bolein, kitna charge karein",
    description: "Barter collab kya hota hai, kab lena theek hai, fee kaise maangein, 194R/393 TDS aur ASCI #ad rules. Indian creators ke liye Hinglish guide aur templates.",
    topic: "Brand deals",
    publishedAt: "2026-11-07",
    updatedAt: "2026-11-07",
    inLanguage: "hi-Latn",
  },
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
export const freeTools: readonly { href: string; title: string; description: string; updatedAt: string }[] = [
  { href: "/tools/brand-deal-rate-calculator", title: "Brand deal rate calculator", description: "Price a brand deal with usage rights, paid ads (whitelisting), exclusivity and rush fees included, in rupees or dollars.", updatedAt: "2026-11-07" },
];

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
