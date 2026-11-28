import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { MarketingDocument } from "@/components/site/marketing-document";
import { RateCalculator } from "@/components/tools/rate-calculator";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";
import styles from "@/components/tools/calculator.module.css";
import articleStyles from "@/components/marketing/blog-article.module.css";

export const metadata: Metadata = {
  title: "Brand Deal Rate Calculator (Free) | DealDock",
  description: "Build a brand-deal quote with usage rights, paid ads, exclusivity, rush fees and revisions. Free calculator in rupees or dollars.",
  alternates: { canonical: `${MARKETING_ORIGIN}/tools/brand-deal-rate-calculator` }, robots: { index: true, follow: true },
};
export default function CalculatorPage() {
  const { data, content } = matter(fs.readFileSync(path.join(process.cwd(), "content/tools/brand-deal-rate-calculator.mdx"), "utf8"));
  const faqs = data.faqs as { question: string; answer: string }[];
  const url = `${MARKETING_ORIGIN}/tools/brand-deal-rate-calculator`;
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebApplication", name: "Brand deal rate calculator", url, applicationCategory: "BusinessApplication", operatingSystem: "Web", isAccessibleForFree: true, offers: { "@type": "Offer", price: 0, priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "DealDock", url: MARKETING_ORIGIN } },
    { "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ] };
  return <MarketingDocument title="Brand deal rate calculator" crumbs={[{ label: "Free tools", href: "/tools" }]} lede={data.intro} meta={["Free", "Rupees or dollars", "Source notes reviewed 7 November 2026"]} width="wide">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <RateCalculator />
    <section id="methodology" className={styles.methodology} aria-label="Calculator assumptions and source notes"><MDXRemote source={content} options={{ blockJS: true, mdxOptions: { remarkPlugins: [remarkGfm] } }} components={{ table: ({ children }) => <div className={articleStyles.tableWrap} tabIndex={0} role="region" aria-label="Pricing assumptions"><table>{children}</table></div> }} /></section>
    <section className={articleStyles.faq} aria-labelledby="calculator-faq-heading"><h2 id="calculator-faq-heading">Questions about pricing brand deals</h2><div className={articleStyles.faqList}>{faqs.map(faq => <details className={articleStyles.faqItem} key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
  </MarketingDocument>;
}
