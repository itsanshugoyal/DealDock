import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { MarketingDocument, type TocItem } from "@/components/site/marketing-document";
import { blogPost, getVisibleBlogPosts, blogUrl, formatDate, shareImage } from "@/lib/blog-posts";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";
import styles from "./blog-article.module.css";
import { toolsForTopic } from "@/lib/tools/catalog";
import { ToolCards } from "@/components/tools/tool-cards";
import toolStyles from "@/components/tools/tools.module.css";

type BlogFaq = { question: string; answer: string };

/** Article shell: metadata and FAQs originate in content/blog/*.mdx. */
export function BlogArticle({ slug, faqs = [], toc, minutes, children }: {
  slug: string;
  faqs?: readonly BlogFaq[];
  /** The article's "##" headings (lib/blog/toc.ts). */
  toc: TocItem[];
  minutes: number;
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
    <MarketingDocument
      title={post.title}
      crumbs={[{ label: "Guides", href: "/blog" }, { label: post.topic }]}
      meta={[`Written ${formatDate(post.publishedAt)}`, ...(post.updatedAt !== post.publishedAt ? [`Updated ${formatDate(post.updatedAt)}`] : []), `${minutes} min read`]}
      toc={faqs.length ? [...toc, { id: "article-faq-heading", label: "Questions" }] : toc}
      after={<>
        <aside className={styles.pilot} aria-labelledby="article-pilot-heading">
          <div>
            <p className={styles.pilotKicker}>DealDock private pilot</p>
            <h2 id="article-pilot-heading">Try it on your own inbox.</h2>
            <p>DealDock puts the conversations most likely to pay first, drafts each reply in your voice, and sends nothing until you approve it. The first 30 days are free.</p>
            <div className={styles.pilotActions}>
              <Link className={styles.pilotPrimary} href="/#apply">Apply for the pilot<span aria-hidden="true"><ArrowRight size={16} weight="bold" /></span></Link>
              <Link className={styles.pilotSecondary} href="/#how-it-works">See how it works</Link>
            </div>
          </div>
          <Image className={styles.pilotDocky} src="/docky/docky.webp" alt="" width={880} height={1020} sizes="220px" />
        </aside>
        {related.length > 0 && (
          <nav className={styles.related} aria-labelledby="article-related-heading">
            <div className={styles.relatedHead}>
              <h2 id="article-related-heading">Keep reading</h2>
              <Link className={styles.allGuides} href="/blog">All guides<span aria-hidden="true"><ArrowRight size={15} weight="bold" /></span></Link>
            </div>
            <ul>
              {related.map(p => <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className={styles.relatedCard}>
                  <Image src={p.thumbnail ?? p.image?.url ?? `/og/${p.slug}`} alt="" width={640} height={360} sizes="(max-width: 760px) 100vw, 400px" />
                  <span className={styles.relatedTopic}>{p.topic} · {formatDate(p.publishedAt)}</span>
                  <strong>{p.title}</strong>
                  <span className={styles.relatedDescription}>{p.description}</span>
                  <span className={styles.relatedMore}>Read the guide<ArrowRight size={15} weight="bold" aria-hidden="true" /></span>
                </Link>
              </li>)}
            </ul>
          </nav>
        )}
      </>}
    >
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
    </MarketingDocument>
  );
}
