import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { BlogArticle } from "@/components/marketing/blog-article";
import { blogMetadata, getVisibleBlogPosts } from "@/lib/blog-posts";
import { readBlogContent } from "@/lib/blog/content";
import { articleToc, headingId, readingMinutes, textOf } from "@/lib/blog/toc";
import styles from "@/components/marketing/blog-article.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return getVisibleBlogPosts().map(({ slug }) => ({ slug })); }
async function resolvePost(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  if (!getVisibleBlogPosts().some(post => post.slug === slug)) notFound();
  return readBlogContent(slug);
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return blogMetadata((await resolvePost(params)).post.slug);
}
export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { post, content } = await resolvePost(params);
  return <BlogArticle slug={post.slug} faqs={post.faqs} toc={articleToc(content)} minutes={readingMinutes(content)}>
    {post.status === "draft" && <p role="note">Draft preview — not published.</p>}
    <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] }, blockJS: true }} components={{
      h2: ({ children }) => <h2 id={headingId(textOf(children))}>{children}</h2>,
      img: ({ src, alt }) => <Image src={src ?? ""} alt={alt ?? ""} width={1600} height={900} sizes="(max-width: 800px) 100vw, 800px" className={styles.articleImage} />,
      table: ({ children }) => <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Article table"><table>{children}</table></div>,
      pre: ({ children }) => <pre className={styles.codeBlock}>{children}</pre>,
    }} />
  </BlogArticle>;
}
