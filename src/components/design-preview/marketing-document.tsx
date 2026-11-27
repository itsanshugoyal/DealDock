import { SiteFooter, SiteHeader } from "./site-chrome";
import styles from "./preview.module.css";

export function MarketingDocument({ title, updatedAt = "Updated 5 November 2026", children }: { title: string; updatedAt?: string; children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#document-main">Skip to content</a>
      <SiteHeader />
      <main id="document-main" tabIndex={-1} className={styles.document}>
        <p className={styles.label}>{updatedAt}</p>
        <h1>{title}</h1>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
