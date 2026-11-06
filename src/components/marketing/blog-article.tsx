import Link from "next/link";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import { blogPost, blogPosts, blogUrl, formatDate, shareImage } from "@/lib/blog-posts";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";
import styles from "./blog-article.module.css";

type BlogFaq = { question: string; answer: string };

/** Article shell: title and dates come from src/lib/blog-posts.ts; structured data always matches the visible page. */
export function BlogArticle({ slug, faqs = [], children }: {
  slug: string;
  faqs?: readonly BlogFaq[];
  children: React.ReactNode;
}) {
  const post = blogPost(slug);
  const url = blogUrl(slug);
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
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
            {related.map((p) => <li key={p.slug}><Link href={`/blog/${p.slug}`}>{p.title}</Link><span>{p.topic}</span></li>)}
          </ul>
          <Link className={styles.allGuides} href="/blog">All guides <span aria-hidden="true">→</span></Link>
        </nav>
      )}
    </MarketingDocument>
  );
}
