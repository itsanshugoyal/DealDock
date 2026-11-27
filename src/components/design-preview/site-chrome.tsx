import { useId } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { APPLICATION_EMAIL } from "./application.mjs";
import styles from "./preview.module.css";

// shortcut: no registered entity yet, so the footer shows the product name; add the legal name and address before launch.
const LEGAL_ENTITY = "";


/** The DealDock D (from the Docky asset pack), the same artwork as the favicon (src/app/icon.svg). */
export function BrandMark({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, "");
  return (
    <svg className={className} viewBox="-8 -8 316 248" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}o`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFA04A" /><stop offset=".55" stopColor="#FF6A00" /><stop offset="1" stopColor="#EE5600" /></linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFF1E2" /><stop offset="1" stopColor="#F6C9A2" /></linearGradient>
        <clipPath id={`${id}k`}><path d="M0 172L320 160V260H0Z" /></clipPath>
      </defs>
      <g strokeLinejoin="round" strokeWidth="14">
        <path d="M8 216L58 104H116L66 216Z" fill={`url(#${id}o)`} stroke={`url(#${id}o)`} />
        <path d="M76 12H188A106 106 0 0 1 188 224H96L120 170H186A52 52 0 0 0 186 66H52Z" fill={`url(#${id}o)`} stroke={`url(#${id}o)`} />
        <path d="M76 12H188A106 106 0 0 1 188 224H96L120 170H186A52 52 0 0 0 186 66H52Z" fill={`url(#${id}c)`} stroke={`url(#${id}c)`} clipPath={`url(#${id}k)`} />
      </g>
    </svg>
  );
}

/** `home` is the page to anchor into: "/" or "/in" on the homepages; other pages link back to "/". */
export function SiteHeader({ home = "/", onPage = false }: { home?: "/" | "/in"; onPage?: boolean }) {
  const base = onPage ? "" : home;
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href={home} className={styles.brand} aria-label="DealDock home"><BrandMark className={styles.brandMark} /><span translate="no">DealDock</span></Link>
        <nav aria-label="Main" className={styles.nav}>
          <a href={base + "#how-it-works"} className={styles.navLink}>How it works</a>
          <a href={base + "#pricing"} className={styles.navLink} data-keep="">Pricing</a>
          <a href={base + "#faq"} className={styles.navLink}>FAQ</a>
          <a href={base + "#apply"} className={styles.navCta} data-marketing-cta="navigation">Apply<ArrowRight size={15} weight="bold" aria-hidden="true" /></a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <p className={styles.footerLine}>Your DMs, sorted by money.</p>
          <nav aria-label="Footer" className={styles.footerLinks}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/pilot-terms">Pilot terms</Link>
            <Link href="/security">Security</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <a href={"mailto:" + APPLICATION_EMAIL}>{APPLICATION_EMAIL}</a>
          </nav>
        </div>
        <p className={styles.wordmark} aria-hidden="true" translate="no">DealDock<span>.</span></p>
        <p className={styles.legal}>© 2026 {LEGAL_ENTITY || "DealDock"}. Instagram is a trademark of Meta Platforms, Inc. DealDock is an independent product, not affiliated with or endorsed by Meta.</p>
      </div>
    </footer>
  );
}
