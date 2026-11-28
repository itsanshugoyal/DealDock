import type { Metadata } from "next";
import Link from "next/link";
import { MarketingDocument } from "@/components/site/marketing-document";
import styles from "@/components/tools/tools.module.css";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";

const url = `${MARKETING_ORIGIN}/tools/dm-enquiry-tracker`;
export const metadata: Metadata = {
  title: "Free Instagram DM enquiry tracker template | DealDock",
  description: "Download a free CSV tracker for coaching leads, brand deals, follow-up dates and payments. Works with Google Sheets, Excel and Notion.",
  alternates: { canonical: url }, robots: { index: true, follow: true },
};
const jsonLd = { "@context": "https://schema.org", "@type": "DigitalDocument", name: "Instagram DM enquiry tracker template", description: metadata.description, url, encodingFormat: "text/csv", contentUrl: `${MARKETING_ORIGIN}/templates/dealdock-dm-enquiry-tracker.csv`, isAccessibleForFree: true, publisher: { "@type": "Organization", name: "DealDock", url: MARKETING_ORIGIN } };
export default function TrackerPage() {
  return <MarketingDocument title="Keep the next step out of your memory." crumbs={[{ label: "Free tools", href: "/tools" }]} lede="One row per buying conversation. Track the enquiry, estimated value, current stage, next step and follow-up date, from the first DM to confirmed payment." meta={["Free DM enquiry tracker", "CSV template"]}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <a className={styles.download} href="/templates/dealdock-dm-enquiry-tracker.csv" download>Download free tracker (.csv) <span aria-hidden="true"> ↓</span></a>
    <p>No sign-up. Open it in Google Sheets, Excel, Numbers or Notion.</p>
    <section><h2>Set it up in a few minutes</h2><ol><li>Download the CSV and import it into your spreadsheet app.</li><li>Review the three rows marked “(example)”, then remove them before adding real enquiries.</li><li>Give every open conversation a next step and follow-up date.</li><li>Mark a deal Paid only after you have confirmed the payment.</li></ol></section>
    <div className={styles.notice}><strong>A short note is enough.</strong><p>Keep complete conversations in Instagram. Avoid copying personal or sensitive details into the tracker, and share it only with people who need access.</p></div>
    <p><Link href="/blog/dm-enquiry-tracker-template">Read the complete setup guide</Link> for dropdowns, overdue highlighting and a daily review routine.</p>
  </MarketingDocument>;
}
