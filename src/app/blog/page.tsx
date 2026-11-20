import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import styles from "./page.module.css";
import { blogPosts, formatDate, freeTools } from "@/lib/blog-posts";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";

const title = "Guides for creators who sell in their DMs";
const description = "Practical guides for coaches, course creators and influencers: finding buyer messages, replying to brands, following up, pricing and getting paid.";

export const metadata: Metadata = {
  title: `${title} | DealDock`,
  description,
  alternates: { canonical: `${MARKETING_ORIGIN}/blog` },
  openGraph: { type: "website", url: `${MARKETING_ORIGIN}/blog`, title, description, siteName: "DealDock", images: [{ url: `${MARKETING_ORIGIN}/opengraph-image`, width: 1200, height: 630, alt: "DealDock" }] },
  twitter: { card: "summary_large_image", title, description, images: [`${MARKETING_ORIGIN}/opengraph-image`] },
  robots: { index: true, follow: true },
};

export default function BlogIndex() {
  return (
    <MarketingDocument title={title} className={styles.page} intro={
      <section className={styles.hero} aria-labelledby="blog-heading">
        <div className={styles.heroCopy}>
          <h1 id="blog-heading">{title}</h1>
          <p>Most sales on Instagram start as a message: a brand asking for rates, someone asking whether your program is right for them. These guides cover what to do with those messages, from the first reply to the payment landing.</p>
        </div>
        <div className={styles.heroImage}>
          <Image src="/blog/creator-dm-hero.webp" alt="Illustrative brand conversation on a phone, from a collaboration enquiry to a confirmed deal" width={1200} height={751} sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1100px) 45vw, 480px" preload />
        </div>
      </section>
    }>
      <ul className={styles.postList} aria-label="Latest guides">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className={styles.postCard} aria-labelledby={`post-${post.slug}`}>
              <div className={styles.thumbnail}>
                <Image src={post.slug === "influencer-brand-dms" ? "/blog/creator-brand-dms.webp" : (post.image?.url ?? "/blog/creator-brand-dms.webp")} alt="" width={768} height={384} sizes="(max-width: 720px) calc(100vw - 72px), 256px" />
              </div>
              <div className={styles.postCopy}>
                <span className={styles.postMeta}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M16 3v4M8 3v4M4 11h16M8 15h2" /></svg>
                  {post.topic}<span aria-hidden="true">·</span><time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
                <h2 id={`post-${post.slug}`}>{post.title}</h2>
                <span className={styles.postDescription}>{post.description}</span>
              </div>
              <span className={styles.cardArrow} aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5" /></svg></span>
            </Link>
          </li>
        ))}
      </ul>
      {freeTools.length > 0 && (
        <section aria-labelledby="free-tools-heading" className={styles.tools}>
          <h2 id="free-tools-heading">Free tools</h2>
          <ul className={styles.toolList}>
            {freeTools.map((tool) => (
              <li key={tool.href}>
                <Link href={tool.href}>
                  <strong>{tool.title}</strong>
                  <span className={styles.postDescription}>{tool.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </MarketingDocument>
  );
}
