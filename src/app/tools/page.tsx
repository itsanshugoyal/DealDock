import type { Metadata } from "next";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import { ToolCards } from "@/components/tools/tool-cards";
import styles from "@/components/tools/tools.module.css";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";

export const metadata: Metadata = {
  title: "Free creator tools & templates | DealDock",
  description: "Free tools for creators: calculate a brand-deal quote and track Instagram enquiries, follow-ups and payments.",
  alternates: { canonical: `${MARKETING_ORIGIN}/tools` }, robots: { index: true, follow: true },
};
export default function ToolsPage() {
  return <MarketingDocument title="A little less admin. A little more momentum." updatedAt="Free tools for creators">
    <p className={styles.intro}>Price your next brand collaboration or bring order to your DM enquiries. Practical tools you can use right now, with no account required.</p>
    <ToolCards />
    <section><h2>Built for the work between messages</h2><p>Use the calculator when a brand asks for a quote. Use the tracker to remember who needs a reply, what you agreed, and whether the money has arrived.</p><p>These resources work on their own. You don’t need to join the DealDock pilot to use them.</p></section>
  </MarketingDocument>;
}
