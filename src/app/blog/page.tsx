import type { Metadata } from "next";
import Link from "next/link";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import styles from "@/components/marketing/blog-article.module.css";
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
    <MarketingDocument title={title} updatedAt="DealDock guides">
      <p className={styles.intro}>Most sales on Instagram start as a message: a brand asking for rates, someone asking whether your program is right for them. These guides cover what to do with those messages, from the first reply to the payment landing.</p>
      <ul className={styles.postList}>
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <span className={styles.postMeta}>{post.topic} · {formatDate(post.updatedAt)}</span>
              <strong>{post.title}</strong>
              <span className={styles.postDescription}>{post.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      {freeTools.length > 0 && (
        <section aria-labelledby="free-tools-heading">
          <h2 id="free-tools-heading">Free tools</h2>
          <ul className={styles.postList}>
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
