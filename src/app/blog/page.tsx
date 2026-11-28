import type { Metadata } from "next";
import { MarketingDocument } from "@/components/site/marketing-document";
import { BrandMark } from "@/components/site/site-chrome";
import { FeaturedTools } from "@/components/tools/tool-cards";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { getVisibleBlogPosts } from "@/lib/blog-posts";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";
import styles from "./page.module.css";

const title = "Guides for creators who sell in their DMs";
const description = "Practical guides for coaches, course creators and influencers: finding buyer messages, replying to brands, following up, pricing and getting paid.";
export const metadata: Metadata = {
  title: `${title} | DealDock`, description, alternates: { canonical: `${MARKETING_ORIGIN}/blog` },
  openGraph: { type: "website", url: `${MARKETING_ORIGIN}/blog`, title, description, siteName: "DealDock" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};
export default function BlogIndex() {
  const posts = getVisibleBlogPosts().map(({ slug, title, description, topic, updatedAt, thumbnail, image, status }) => ({ slug, title, description, topic, updatedAt, thumbnail, image, status }));
  return <MarketingDocument title={title} className={styles.page} intro={
    <section className={styles.hero} aria-labelledby="blog-heading">
      <div className={styles.heroCopy}><h1 id="blog-heading">{title}</h1><p>Most sales on Instagram start as a message: a brand asking for rates, someone asking whether your program is right for them. These guides cover what to do with those messages, from the first reply to the payment landing.</p></div>
      {/* an illustrative brand DM as DealDock shows it: the message, Docky's private read, and the reply waiting for you */}
      <figure className={styles.heroStage} aria-label="Illustrative example: a brand message, DealDock's estimate and a drafted reply">
        <div className={styles.stageMsg}>
          <span className={styles.stageAvatar} aria-hidden="true">GS</span>
          <div><b>Glowkind Skincare</b><small>Instagram · Message request</small><p>Hi! What’s your rate for 1 Reel + 3 Stories?</p></div>
        </div>
        <div className={styles.stageDocky}>
          <BrandMark className={styles.stageMark} />
          <div><small>Brand deal · could be worth</small><b>$2.5K–$5K</b></div>
          <span>16h left to reply</span>
        </div>
        <div className={styles.stageReply}>
          <p>Thanks for reaching out! For 1 Reel + 3 Stories it’s $3,800 with 30 days of usage.</p>
          <small>Drafted in your voice · waiting for you</small>
        </div>
        <figcaption>Illustrative example</figcaption>
      </figure>
    </section>
  }>
    <FeaturedTools />
    <BlogExplorer posts={posts} />
  </MarketingDocument>;
}
