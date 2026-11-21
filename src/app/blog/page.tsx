import type { Metadata } from "next";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import { FeaturedTools } from "@/components/tools/tool-cards";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { getVisibleBlogPosts } from "@/lib/blog-posts";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";
import styles from "./page.module.css";

const title = "Guides for creators who sell in their DMs";
const description = "Practical guides for coaches, course creators and influencers: finding buyer messages, replying to brands, following up, pricing and getting paid.";
export const metadata: Metadata = {
  title: `${title} | DealDock`, description, alternates: { canonical: `${MARKETING_ORIGIN}/blog` },
  openGraph: { type: "website", url: `${MARKETING_ORIGIN}/blog`, title, description, siteName: "DealDock", images: [{ url: `${MARKETING_ORIGIN}/opengraph-image`, width: 1200, height: 630, alt: "DealDock" }] },
  twitter: { card: "summary_large_image", title, description, images: [`${MARKETING_ORIGIN}/opengraph-image`] },
  robots: { index: true, follow: true },
};
export default function BlogIndex() {
  const posts = getVisibleBlogPosts().map(({ slug, title, description, topic, updatedAt, thumbnail, image, status }) => ({ slug, title, description, topic, updatedAt, thumbnail, image, status }));
  return <MarketingDocument title={title} className={styles.page} intro={
    <section className={styles.hero} aria-labelledby="blog-heading">
      <div className={styles.heroCopy}><h1 id="blog-heading">{title}</h1><p>Most sales on Instagram start as a message: a brand asking for rates, someone asking whether your program is right for them. These guides cover what to do with those messages, from the first reply to the payment landing.</p></div>
      <figure className={styles.heroConversation} aria-label="Illustrative brand collaboration conversation">
        <figcaption><span className={styles.conversationAvatar} aria-hidden="true">↗</span><span>A message. A next step.<small>Illustrative conversation</small></span><span className={styles.conversationDots} aria-hidden="true">•••</span></figcaption>
        <div className={styles.chatThread}>
          <span className={styles.incomingMessage}>Interested in a collaboration?</span>
          <span className={styles.outgoingMessage}>Here are my rates &amp; media kit.</span>
          <span className={styles.confirmedMessage}><svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10" cy="10" r="8" /><path d="m6 10 3 3 5-6" /></svg>Deal confirmed</span>
        </div>
      </figure>
    </section>
  }>
    <FeaturedTools />
    <BlogExplorer posts={posts} />
  </MarketingDocument>;
}
