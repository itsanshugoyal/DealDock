import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { SiteFooter, SiteHeader } from "./site-chrome";
import styles from "./site.module.css";

export type DocSection = { id: string; title: string; body: React.ReactNode };
export type Crumb = { label: string; href?: string };
export type TocItem = { id: string; label: string };

type Props = {
  title: string;
  /** Where the page sits, above the title: "Guides / Instagram DMs". The first crumb is the way back to the index. */
  crumbs?: Crumb[];
  lede?: React.ReactNode;
  /** Small facts under the lede, such as dates and reading time. */
  meta?: string[];
  /** Beside the title on wide screens: usually a <DocSummary>. */
  aside?: React.ReactNode;
  /** Full-width content between the header and the text, such as a product showcase. */
  band?: React.ReactNode;
  /** Numbered sections; three or more get a sticky contents list on wide screens. */
  sections?: DocSection[];
  /** Contents for pages whose headings come from children (blog articles); defaults to the sections. */
  toc?: TocItem[];
  /** Full-width content after the text, such as a closing call to action and related links. */
  after?: React.ReactNode;
  /** "wide" for tools that need more than a reading column. */
  width?: "reading" | "wide";
  /** Replaces the whole header (the blog index brings its own). */
  intro?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

/** Long-form pages (security, legal, about, blog articles, tools) inside the shared site header and footer. */
export function MarketingDocument({ title, crumbs, lede, meta, aside, band, sections = [], toc: tocItems, after, width = "reading", intro, className, children }: Props) {
  const contents = tocItems ?? sections.map(section => ({ id: section.id, label: section.title }));
  const toc = contents.length >= 3;
  // without contents or a side card, the header lines up with the text column below it
  const column = toc || aside ? undefined : width;
  return (
    <div className={`${styles.page}${className ? ` ${className}` : ""}`}>
      <a className={styles.skipLink} href="#document-main">Skip to content</a>
      <SiteHeader />
      {intro ? (
        <main id="document-main" tabIndex={-1} className={styles.document}>{intro}{children}</main>
      ) : (
        <main id="document-main" tabIndex={-1}>
          <header className={styles.docHero}>
            <div className={styles.docHeroInner} data-aside={aside ? "" : undefined} data-column={column}>
              <div>
                {crumbs && (
                  <nav aria-label="Breadcrumb" className={styles.crumbs}>
                    <ol>{crumbs.map(crumb => <li key={crumb.label}>{crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}</li>)}</ol>
                  </nav>
                )}
                <h1 className={styles.docTitle}>{title}</h1>
                {lede && <p className={styles.docLede}>{lede}</p>}
                {meta && <p className={styles.docMeta}>{meta.map(item => <span key={item}>{item}</span>)}</p>}
              </div>
              {aside}
            </div>
          </header>
          {band && <div className={styles.docBand}>{band}</div>}
          {(children || sections.length > 0) && <div className={styles.docBody} data-toc={toc ? "" : undefined} data-column={column}>
            {toc && (
              <nav className={styles.toc} aria-labelledby="toc-heading">
                <h2 id="toc-heading">On this page</h2>
                <ol>{contents.map(item => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}</ol>
              </nav>
            )}
            <div className={styles.prose}>
              {children}
              {sections.map(section => (
                <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                  <h2 id={`${section.id}-heading`}>{section.title}</h2>
                  {section.body}
                </section>
              ))}
            </div>
          </div>}
          {after && <div className={styles.docAfter}>{after}</div>}
        </main>
      )}
      <SiteFooter />
    </div>
  );
}

/** "The short version" card that sits beside a document's title. */
export function DocSummary({ title = "The short version", items }: { title?: string; items: React.ReactNode[] }) {
  return (
    <aside className={styles.summary} aria-labelledby="summary-heading">
      <h2 id="summary-heading">{title}</h2>
      <ul>{items.map((item, i) => <li key={i}><CheckCircle size={20} weight="fill" aria-hidden="true" />{item}</li>)}</ul>
    </aside>
  );
}
