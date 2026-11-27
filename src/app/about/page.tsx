import type { Metadata } from "next";
import { marketingPageMetadata } from "@/lib/marketing-metadata";
import Link from "next/link";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import { MarketingWebsiteStructuredData } from "@/components/marketing/structured-data";

export const metadata: Metadata = marketingPageMetadata("/about", "About DealDock", "DealDock sorts creators’ Instagram DMs and brand emails by what they’re worth, drafts replies in their voice, and tracks deals until they’re paid.");

export default function AboutPage() {
  return (
    <MarketingDocument title="An inbox that keeps the creator in control.">
      <p>DealDock is for creators whose DMs and inbox hold real money: brand deals, coaching clients, and course and cohort buyers. It is in a private pilot.</p>
      <h2>What we are building</h2>
      <p>DealDock reads your Instagram DMs and Gmail, puts brand deals and paying clients first with an estimate of what each is worth, drafts each reply in your voice, and tracks every deal until you’re paid. Estimates help decide what to answer first. They are not promised sales.</p>
      <h2>Human approval is the product rule</h2>
      <p>DealDock never sends a message on its own. Every reply stays editable and waits for the creator or someone they authorise to approve it. It is not a bulk-outreach tool, a content scheduler or a replacement for a creator’s judgment.</p>
      <h2>Why a pilot</h2>
      <p>We onboard a few creators at a time, set up every account with them, and shape the product around what they tell us. Pilot members get their first 30 days free.</p>
      <h2>Who is building it</h2>
      <p>Anshu and Nahush are building DealDock. If brand deals or paying clients reach you through DMs or email, <Link href="/#apply">apply for the pilot</Link> or <Link href="/contact">ask us a question first</Link>.</p>
      <h2>About the name</h2>
      <p>DealDock at dealdock.io is an Instagram DM inbox for creators. It isn’t connected to other businesses that use the DealDock name, such as software for real-estate agents or venture-capital firms.</p>
      <MarketingWebsiteStructuredData />
    </MarketingDocument>
  );
}
