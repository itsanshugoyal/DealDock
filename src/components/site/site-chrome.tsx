import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import { ThreadsLogo } from "@phosphor-icons/react/dist/ssr/ThreadsLogo";
import { XLogo } from "@phosphor-icons/react/dist/ssr/XLogo";
import { APPLICATION_EMAIL } from "./application.mjs";
import styles from "./site.module.css";

// shortcut: no registered entity yet, so the footer shows the product name; add the legal name and address before launch.
const LEGAL_ENTITY = "";

// DealDock's social profiles, shown as icons in the footer. Paste each profile's full URL when it exists; until then the
// icon shows but is not a link. Other companies use the DealDock name, so never guess a handle.
// When a profile goes live, also add its URL to sameAs in src/components/marketing/structured-data.tsx.
const SOCIAL = [
  { name: "Instagram", href: "https://www.instagram.com/dealdock.io", Icon: InstagramLogo },
  { name: "X", href: "https://x.com/dealdock_io", Icon: XLogo },
  { name: "Threads", href: "https://www.threads.com/@dealdock.io", Icon: ThreadsLogo },
  { name: "LinkedIn", href: "", Icon: LinkedinLogo },
];

/** The DealDock D mark. The artwork lives in public/brand (scripts/build-brand-icons.mjs makes this copy and the site icons). */
export function BrandMark({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- a 26KB static mark; next/image would add a request for nothing
  return <img className={className} src="/brand/d-mark-64.webp" width={64} height={48} alt="" aria-hidden="true" />;
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
          <Link href="/blog" className={styles.navLink}>Guides</Link>
          <a href={base + "#apply"} className={styles.navCta} data-marketing-cta="navigation">Apply<ArrowRight size={15} weight="bold" aria-hidden="true" /></a>
        </nav>
      </div>
    </header>
  );
}

const FOOTER_LINKS = (home: string) => [
  { title: "Product", links: [["How it works", home + "#how-it-works"], ["Pricing details", "/pricing"], ["FAQ", home + "#faq"], ["Security", "/security"]] },
  { title: "Resources", links: [["Guides", "/blog"], ["Free tools", "/tools"], ["Rate calculator", "/tools/brand-deal-rate-calculator"], ["DM tracker", "/tools/dm-enquiry-tracker"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["Pilot terms", "/pilot-terms"]] },
  // the policy pages Meta, Google, Razorpay and Paddle review (docs/policy-pages-review.md)
  { title: "Legal", links: [["Terms", "/terms"], ["Privacy", "/privacy"], ["Refunds", "/refunds"], ["Delivery", "/delivery"], ["Data deletion", "/data-deletion"]] },
];

export function SiteFooter({ home = "/" }: { home?: "/" | "/in" }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <Link href={home} className={styles.brand} aria-label="DealDock home"><BrandMark className={styles.brandMark} /><span translate="no">DealDock</span></Link>
            <p className={styles.footerLine}>Your DMs, sorted by money.</p>
            <p className={styles.footerNote}>A private pilot for creators whose Instagram DMs and inbox hold real money. Nothing sends without your approval.</p>
            <a href={home + "#apply"} className={styles.footerCta} data-marketing-cta="footer">Apply for the pilot<span aria-hidden="true"><ArrowRight size={16} weight="bold" /></span></a>
            <ul className={styles.footerSocial} aria-label="DealDock on social media">
              {SOCIAL.map(({ name, href, Icon }) => (
                <li key={name}>
                  {href
                    ? <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`DealDock on ${name}`}><Icon size={18} weight="regular" aria-hidden="true" /></a>
                    : <span title={`${name} coming soon`}><Icon size={18} weight="regular" aria-hidden="true" /></span>}
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer" className={styles.footerCols}>
            {FOOTER_LINKS(home).map(col => (
              <div key={col.title}>
                <h2>{col.title}</h2>
                <ul>{col.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.footerBase}>
          <p>© 2026 {LEGAL_ENTITY || "DealDock"}. Instagram is a trademark of Meta Platforms, Inc. DealDock is an independent product, not affiliated with or endorsed by Meta.</p>
          <a href={"mailto:" + APPLICATION_EMAIL}>{APPLICATION_EMAIL}</a>
        </div>
        <p className={styles.footerLogo} aria-hidden="true" translate="no">DealDock<span>.</span></p>
      </div>
    </footer>
  );
}
