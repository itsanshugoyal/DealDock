import { shareImage } from "@/components/marketing/og-image";
import { getVisibleBlogPosts } from "@/lib/blog-posts";

// Share card for each blog post, generated at build time (1200x630 PNG).
export function generateStaticParams() {
  return getVisibleBlogPosts().map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getVisibleBlogPosts().find(post => post.slug === slug);
  if (!post) return new Response("Not found", { status: 404 });
  return shareImage({ title: post.title, eyebrow: `Guides / ${post.topic}` });
}
