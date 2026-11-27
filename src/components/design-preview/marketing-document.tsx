import { SiteFooter, SiteHeader } from "./site-chrome";
import styles from "./preview.module.css";

/** Long-form pages (about, security, legal, blog articles) inside the shared site header and footer. */
export function MarketingDocument({ title, updatedAt = "Updated 5 November 2026", children, intro, className }: { title: string; updatedAt?: string; children: React.ReactNode; intro?: React.ReactNode; className?: string }) {
  return (
    <div className={`${styles.page}${className ? ` ${className}` : ""}`}>
      <a className={styles.skipLink} href="#document-main">Skip to content</a>
      <SiteHeader />
      <main id="document-main" tabIndex={-1} className={styles.document}>
        {intro ?? <><p className={styles.label}>{updatedAt}</p><h1>{title}</h1></>}
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
