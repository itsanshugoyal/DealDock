import type { Metadata } from "next";
import Link from "next/link";
import { LANDING_GLOBAL } from "@/components/landing/content";
import { ControlBento } from "@/components/landing/control-bento";
import { DocSummary, MarketingDocument, type DocSection } from "@/components/site/marketing-document";
import { marketingPageMetadata } from "@/lib/marketing-metadata";

export const metadata: Metadata = marketingPageMetadata("/security", "Security and your data | DealDock", "What DealDock reads, what it keeps, what it never does, and how to delete your data.");

// Draft for review: confirm hosting region, model provider terms and the deletion runbook before launch.
const SECTIONS: DocSection[] = [
  { id: "connect", title: "How DealDock connects", body: <p>Instagram connects through Meta’s official Instagram API, using Meta’s own login screen. Gmail connects through Google’s sign-in. DealDock never sees your passwords, never scrapes, and never uses browser extensions. Access tokens are encrypted.</p> },
  { id: "reads", title: "What DealDock reads", body: (
    <ul>
      <li>The DMs you receive, including message requests where Instagram allows.</li>
      <li>Emails in the Gmail inbox you choose to connect.</li>
      <li>Basic public details about each sender, such as name, follower count and verified status.</li>
      <li>The replies you send, so drafts can learn how you write.</li>
    </ul>
  ) },
  { id: "keeps", title: "What DealDock keeps", body: <p>Messages with their labels and estimates, your drafts and what you sent, and the deals and payments you record. Everything is stored encrypted and kept separate for each creator.</p> },
  { id: "never", title: "What DealDock never does", body: (
    <ul>
      <li>Sends a message without your approval.</li>
      <li>Sells your data.</li>
      <li>Uses your messages to train public AI models.</li>
      <li>Sends bulk or automatic messages.</li>
    </ul>
  ) },
  { id: "delete", title: "Deleting your data", body: <p>Disconnect Instagram or Gmail anytime and syncing stops. Export your data whenever you like. Delete your account and everything is permanently erased after a 7-day grace period. After you cancel, your revenue history stays readable for 30 days and is then deleted.</p> },
  { id: "report", title: "Reporting a problem", body: <p>If you think something is wrong with your account or your data, <Link href="/contact">contact the founders</Link> and we will reply within two working days.</p> },
];

export default function SecurityPage() {
  return (
    <MarketingDocument
      meta={["Updated 5 November 2026"]}
      title="Security and your data."
      lede="DealDock reads your messages so it can sort them and draft replies. This page explains exactly what that means."
      aside={<DocSummary items={["Official Instagram and Google sign-in. Your password never reaches us.", "Nothing sends until you approve it.", "Your messages never train public AI models.", "Export or delete everything, anytime."]} />}
      band={<ControlBento story={LANDING_GLOBAL.story} embedded />}
      sections={SECTIONS}
    />
  );
}
