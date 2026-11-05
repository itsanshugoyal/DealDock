import { MarketingDocument } from "@/components/design-preview/marketing-document";
import styles from "./blog-article.module.css";

type BlogFaq = { question: string; answer: string };

export function BlogArticle({ title, updatedAt, faqs = [], children }: {
  title: string;
  updatedAt: string;
  faqs?: readonly BlogFaq[];
  children: React.ReactNode;
}) {
  return (
    <MarketingDocument title={title} updatedAt={updatedAt}>
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
    </MarketingDocument>
  );
}
