import type { Metadata } from "next";
import Link from "next/link";
import { DocSummary, MarketingDocument, type DocSection } from "@/components/site/marketing-document";
import { marketingPageMetadata } from "@/lib/marketing-metadata";
import { planPriceLabel } from "@/lib/marketing-pricing.mjs";

export const metadata: Metadata = marketingPageMetadata("/pilot-terms", "Pilot terms | DealDock", "DealDock pilot plans, prices, the first 30 days, cancellation and the human-approval promise.");

const price = (plan: "solo" | "studio" | "roster") => `${planPriceLabel(plan, "USD")} or ${planPriceLabel(plan, "INR")} per month`;

const SECTIONS: DocSection[] = [
  { id: "applying", title: "Applying comes first", body: <p>Applying does not create a subscription, take a payment or connect an account. We reply by email, check fit on a short call, and confirm these terms before onboarding.</p> },
  { id: "plans", title: "Plans and prices", body: <>
    <ul>
      <li>Solo, one creator and one Instagram account: {price("solo")}.</li>
      <li>Studio, a creator plus an assistant: {price("studio")}.</li>
      <li>Roster, up to five creators plus manager seats: {price("roster")}.</li>
    </ul>
    <p>Rupee prices apply to creators billed in India; dollar prices apply everywhere else. We confirm the billing currency and any applicable taxes before onboarding. We do not collect payment details on this website.</p>
  </> },
  { id: "first-30-days", title: "The first 30 days", body: <p>Your first 30 days are free, counted from the day you connect Instagram. After that your plan is billed monthly. There is no setup fee and no annual commitment, and you can cancel anytime. Pilot members keep their price for as long as they stay subscribed.</p> },
  { id: "approval", title: "You approve every send", body: <p>DealDock never sends a message on its own. Every reply, follow-up and payment reminder is a draft until you or someone on your team approves it.</p> },
  { id: "estimates", title: "Estimates are estimates", body: <p>Money estimates help decide what to answer first. They are not valuations or promised results, and only deals you record count as money you made.</p> },
  { id: "access", title: "Account access and data", body: <p>You connect Instagram through Meta’s official login and, if you choose, Gmail through Google’s sign-in. DealDock never asks for your passwords. The <Link href="/security">security page</Link> explains what is read, kept and deleted, and the <Link href="/privacy">website privacy notice</Link> covers application details.</p> },
  { id: "questions", title: "Questions", body: <p><Link href="/#apply">Apply for the pilot</Link> or <Link href="/contact">ask Anshu</Link> first.</p> },
];

export default function PilotTermsPage() {
  return (
    <MarketingDocument
      meta={["Updated 5 November 2026"]}
      title="Pilot terms, in plain words."
      lede="DealDock is in a private pilot. We set up every account with you, a few creators at a time, and confirm fit before anything is connected."
      aside={<DocSummary items={["Applying is free and commits you to nothing.", "First 30 days free, then billed monthly.", "No setup fee, no annual contract, cancel anytime.", "Your pilot price stays while you stay."]} />}
      sections={SECTIONS}
    />
  );
}
