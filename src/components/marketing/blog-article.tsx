import Link from "next/link";
import Image from "next/image";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import { blogPost, getVisibleBlogPosts, blogUrl, formatDate, shareImage } from "@/lib/blog-posts";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";
import styles from "./blog-article.module.css";
import { toolsForTopic } from "@/lib/tools/catalog";
import { ToolCards } from "@/components/tools/tool-cards";
import toolStyles from "@/components/tools/tools.module.css";

type BlogFaq = { question: string; answer: string };

/** Article shell: metadata and FAQs originate in content/blog/*.mdx. */
export function BlogArticle({ slug, faqs = [], children }: {
  slug: string;
  faqs?: readonly BlogFaq[];
  children: React.ReactNode;
}) {
  const post = blogPost(slug);
  const url = blogUrl(slug);
  const related = getVisibleBlogPosts().filter((p) => p.slug !== slug).slice(0, 3);
  const relevantTools = toolsForTopic(post.topic);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        ...(post.status === "published" ? { datePublished: post.publishedAt } : {}),
        dateModified: post.updatedAt,
        inLanguage: "en",
        url,
        mainEntityOfPage: url,
        image: shareImage(post).url,
        author: { "@type": "Organization", name: "DealDock", url: MARKETING_ORIGIN },
        publisher: { "@type": "Organization", name: "DealDock", url: MARKETING_ORIGIN, logo: { "@type": "ImageObject", url: `${MARKETING_ORIGIN}/apple-icon.png` } },
      },
      ...(faqs.length ? [{
        "@type": "FAQPage",
        mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      }] : []),
    ],
  };

  return (
    <MarketingDocument title={post.title} updatedAt={`DealDock guide · Updated ${formatDate(post.updatedAt)}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      {children}
      {relevantTools.length > 0 && <aside className={toolStyles.relatedTools} aria-labelledby="article-tools-heading"><h2 id="article-tools-heading">Put this guide to work</h2><ToolCards tools={relevantTools} /></aside>}
      {faqs.length > 0 && (
        <section aria-labelledby="article-faq-heading" className={styles.faq}>
          <h2 id="article-faq-heading">A few questions you might still have</h2>
          <div className={styles.faqList}>
            {faqs.map(({ question, answer }) => <details key={question} className={styles.faqItem}>
              <summary>
                <span>{question}</span>
                <span className={styles.arrow} aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg></span>
              </summary>
              <p>{answer}</p>
            </details>)}
          </div>
        </section>
      )}
      <aside className={styles.pilot} aria-labelledby="article-pilot-heading">
        <h2 id="article-pilot-heading">Try it on your own inbox</h2>
        <p>DealDock is a small, application-only pilot for creators who sell through Instagram DMs. It puts the conversations most likely to pay first, drafts each reply in your voice, and sends nothing until you approve it.</p>
        <Link className={styles.pilotLink} href="/#apply">Apply for the pilot <span aria-hidden="true">→</span></Link>
      </aside>
      {related.length > 0 && (
        <nav className={styles.related} aria-labelledby="article-related-heading">
          <h2 id="article-related-heading">Keep reading</h2>
          <ul>
            {related.map((p) => <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className={styles.relatedCard}>
                <Image src={p.thumbnail ?? p.image?.url ?? `/og/${p.slug}`} alt="" width={320} height={180} sizes="(max-width: 480px) calc(100vw - 90px), 160px" />
                <span className={styles.relatedCopy}>
                  <span className={styles.relatedTopic}>{p.topic}</span>
                  <strong>{p.title}</strong>
                  <span className={styles.relatedDescription}>{p.description}</span>
                </span>
                <span className={styles.relatedArrow} aria-hidden="true">↗</span>
              </Link>
            </li>)}
          </ul>
          <Link className={styles.allGuides} href="/blog">All guides <span aria-hidden="true">→</span></Link>
        </nav>
      )}
    </MarketingDocument>
  );
}
