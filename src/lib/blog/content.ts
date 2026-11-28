import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string; title: string; seoTitle?: string; description: string;
  topic: "Brand deals" | "Coaching and courses" | "Instagram DMs";
  publishedAt: string; updatedAt: string; status: "draft" | "published";
  thumbnail?: string; image?: { url: string; alt: string };
  faqs: { question: string; answer: string }[];
};
const directory = path.join(process.cwd(), "content/blog");
const validDate = (v: unknown): v is string => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v;

/** Fail builds on broken metadata rather than silently losing posts. */
export function readBlogContent(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid blog slug: ${slug}`);
  const file = path.join(directory, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const fail = (field: string): never => { throw new Error(`${file}: invalid or missing ${field}`); };
  for (const field of ["title", "description", "topic", "status"]) if (typeof data[field] !== "string" || !data[field].trim()) fail(field);
  if (!["Brand deals", "Coaching and courses", "Instagram DMs"].includes(data.topic)) fail("topic");
  if (!["draft", "published"].includes(data.status)) fail("status");
  if (!validDate(data.publishedAt) || !validDate(data.updatedAt) || data.updatedAt < data.publishedAt) fail("dates");
  if (data.seoTitle !== undefined && (typeof data.seoTitle !== "string" || !data.seoTitle.trim())) fail("seoTitle");
  if (!content.trim()) fail("article body");
  const checkAsset = (url: unknown) => {
    if (typeof url !== "string" || !url.startsWith("/") || url.startsWith("//") || url.includes("..")) fail("image path");
    if (!fs.existsSync(path.join(process.cwd(), "public", url as string))) fail(`image asset ${url}`);
  };
  if (data.thumbnail) checkAsset(data.thumbnail);
  if (data.image) { checkAsset(data.image.url); if (typeof data.image.alt !== "string" || !data.image.alt.trim()) fail("image alt"); }
  const faqs = data.faqs ?? [];
  if (!Array.isArray(faqs) || faqs.some(q => !q || typeof q.question !== "string" || typeof q.answer !== "string" || !q.question.trim() || !q.answer.trim())) fail("faqs");
  const post: BlogPost = { slug, title: data.title, description: data.description, topic: data.topic, publishedAt: data.publishedAt, updatedAt: data.updatedAt, status: data.status, ...(data.seoTitle ? { seoTitle: data.seoTitle } : {}), ...(data.thumbnail ? { thumbnail: data.thumbnail } : {}), ...(data.image ? { image: data.image } : {}), faqs };
  return { post, content };
}
export function getAllBlogPosts(): BlogPost[] {
  return fs.readdirSync(directory).filter(file => file.endsWith(".mdx")).map(file => readBlogContent(file.slice(0, -4)).post)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
}
export const getPublishedBlogPosts = () => getAllBlogPosts().filter(post => post.status === "published");
export const getVisibleBlogPosts = () => process.env.NODE_ENV === "development" ? getAllBlogPosts() : getPublishedBlogPosts();
