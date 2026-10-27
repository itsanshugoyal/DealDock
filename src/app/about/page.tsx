import type { Metadata } from "next";
import Link from "next/link";
import { MarketingDocument } from "@/components/design-preview/marketing-document";

export const metadata: Metadata = {
  title: "About DealDock",
  description: "DealDock is a design-partner pilot for coaches, course creators and cohort hosts who sell through Instagram conversations.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <MarketingDocument title="An inbox that keeps the creator in control." updatedAt="DealDock · Updated 27 October 2026">
      <p className="documentIntro">DealDock is a design-partner pilot for coaches, course creators and cohort hosts who sell their own offers through Instagram conversations.</p>
      <h2>What we are building</h2>
      <p>DealDock helps a creator find buyer enquiries, sort them by estimated deal value, review a draft reply in their voice, and record what actually closes. Estimated value is a prioritisation aid, not a promised sale.</p>
      <h2>Human approval is the product rule</h2>
      <p>DealDock never auto-sends messages. Every reply stays editable and waits for the creator or an authorised person to approve it. It is not a bulk-outreach tool, a content scheduler or a replacement for a creator&apos;s judgment.</p>
      <h2>Why a design-partner pilot</h2>
      <p>The first cohort is deliberately small. The team works with creators who already receive buyer conversations through Instagram and can share candid feedback about where their current follow-through breaks down.</p>
      <h2>Who is building it</h2>
      <p>Anshu is building DealDock with design partners. If you sell coaching, courses or cohorts and want to discuss fit, you can <Link href="/#apply">apply for the pilot</Link> or <Link href="/contact">ask a question first</Link>.</p>
    </MarketingDocument>
  );
}
