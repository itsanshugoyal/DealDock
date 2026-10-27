import Link from "next/link";
import styles from "./preview.module.css";

export function MarketingDocument({ title, updatedAt = "DealDock pilot · Updated 14 October 2026", children }: { title: string; updatedAt?: string; children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#document-main">Skip to content</a>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="DealDock home"><span className={styles.brandMark} aria-hidden="true">d<span /></span>DealDock</Link>
        <Link className={styles.secondaryLink} href="/#apply">Apply ↗</Link>
      </header>
      <main id="document-main" tabIndex={-1} className={styles.document}>
        <p className={styles.documentDate}>{updatedAt}</p>
        <h1>{title}</h1>
        {children}
      </main>
      <footer className={styles.footer}>
        <span><strong>DealDock</strong> · Human-approved replies. Always.</span>
        <nav className={styles.footerLinks} aria-label="Footer navigation"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/pilot-terms">Pilot terms</Link><Link href="/contact">Contact</Link></nav>
      </footer>
    </div>
  );
}
