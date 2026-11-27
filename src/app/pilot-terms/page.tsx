import type { Metadata } from "next";
import Link from "next/link";
import { MarketingDocument } from "@/components/design-preview/marketing-document";

export const metadata: Metadata = { title: "Pilot terms | DealDock", description: "DealDock pilot plans, prices, the first 30 days, cancellation and the human-approval promise.", alternates: { canonical: "/pilot-terms" } };

export default function PilotTermsPage() {
  return (
    <MarketingDocument title="Pilot terms, in plain words.">
      <p>DealDock is in a private pilot. We set up every account with you, a few creators at a time, and confirm fit before anything is connected.</p>
      <h2>Applying comes first</h2>
      <p>Applying does not create a subscription, take a payment or connect an account. We reply by email, check fit on a short call, and confirm these terms before onboarding.</p>
      <h2>Plans and prices</h2>
      <ul>
        <li>Solo, one creator and one Instagram account: USD $49 or ₹4,000 per month.</li>
        <li>Studio, a creator plus an assistant: USD $99 or ₹8,000 per month.</li>
        <li>Roster, up to five creators plus manager seats: USD $179 or ₹15,000 per month.</li>
      </ul>
      <p>Rupee prices apply to creators billed in India; dollar prices apply everywhere else. We confirm the billing currency and any applicable taxes before onboarding. We do not collect payment details on this website.</p>
      <h2>The first 30 days</h2>
      <p>Your first 30 days are free, counted from the day you connect Instagram. After that your plan is billed monthly. There is no setup fee and no annual commitment, and you can cancel anytime. Pilot members keep their price for as long as they stay subscribed.</p>
      <h2>You approve every send</h2>
      <p>DealDock never sends a message on its own. Every reply, follow-up and payment reminder is a draft until you or someone on your team approves it.</p>
      <h2>Estimates are estimates</h2>
      <p>Money estimates help decide what to answer first. They are not valuations or promised results, and only deals you record count as money you made.</p>
      <h2>Account access and data</h2>
      <p>You connect Instagram through Meta’s official login and, if you choose, Gmail through Google’s sign-in. DealDock never asks for your passwords. The <Link href="/security">security page</Link> explains what is read, kept and deleted, and the <Link href="/privacy">website privacy notice</Link> covers application details.</p>
      <h2>Questions</h2>
      <p><Link href="/#apply">Apply for the pilot</Link> or <Link href="/contact">ask the founders</Link> first.</p>
    </MarketingDocument>
  );
}
