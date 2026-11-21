import Link from "next/link";
import styles from "./preview.module.css";
import navStyles from "@/components/shared/resource-nav.module.css";

export function MarketingDocument({ title, updatedAt = "DealDock pilot · Updated 14 October 2026", children, intro, className }: { title: string; updatedAt?: string; children: React.ReactNode; intro?: React.ReactNode; className?: string }) {
  return (
    <div className={`${styles.page}${className ? ` ${className}` : ""}`}>
      <a className={styles.skipLink} href="#document-main">Skip to content</a>
      <header className={`${styles.header} ${navStyles.header}`}>
        <Link className={styles.brand} href="/" aria-label="DealDock home"><span className={styles.brandMark} aria-hidden="true">d<span /></span>DealDock</Link>
        <nav className={navStyles.nav} aria-label="Main navigation"><Link className={navStyles.guidesLink} href="/blog">Guides</Link><Link href="/tools">Free tools</Link><Link className={navStyles.apply} href="/#apply">Apply ↗</Link></nav>
      </header>
      <main id="document-main" tabIndex={-1} className={styles.document}>
        {intro ?? <><p className={styles.documentDate}>{updatedAt}</p><h1>{title}</h1></>}
        {children}
      </main>
      <footer className={styles.footer}>
        <span><strong>DealDock</strong> · Human-approved replies. Always.</span>
        <nav className={styles.footerLinks} aria-label="Footer navigation"><Link href="/">Home</Link><Link href="/blog">Guides</Link><Link href="/tools">Free tools</Link><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/pilot-terms">Pilot terms</Link><Link href="/contact">Contact</Link></nav>
      </footer>
    </div>
  );
}
