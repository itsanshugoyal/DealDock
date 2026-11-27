import type { Metadata } from "next";
import Link from "next/link";
import { marketingPageMetadata } from "@/lib/marketing-metadata";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import { PLANS } from "@/lib/legal";

export const metadata: Metadata = marketingPageMetadata("/pricing", "Pricing | DealDock", "DealDock plans for creators, assistants and agencies: Solo ₹4,000 / $49, Studio ₹8,000 / $99, Roster ₹15,000 / $179 a month.");

export default function PricingPage() {
  return (
    <MarketingDocument title="Pricing">
      <p>DealDock is a deal inbox and CRM for creators, with replies you approve. Every plan is billed monthly, with no setup fee and no annual commitment. Cancel anytime.</p>
      {PLANS.map((plan) => (
        <section key={plan.name}>
          <h2>{plan.name}: {plan.inr} or USD {plan.usd} a month</h2>
          <p>{plan.who}</p>
        </section>
      ))}
      <h2>Every plan includes</h2>
      <ul>
        <li>Your Instagram DMs in one inbox, connected through Meta’s official API, with no passwords.</li>
        <li>Each message sorted by type (brand deal, coaching lead, course question, other sale, fan, spam, personal) with a value estimate, biggest first.</li>
        <li>Reply drafts in your own style, in English, Hindi or Hinglish. Nothing sends until a person approves it.</li>
        <li>Follow-up nudges and a countdown on Instagram’s 24-hour reply window.</li>
        <li>Deal tracking from yes to paid: fee, deliverables, dates and payment terms filled in from the chat, plus drafted payment reminders.</li>
        <li>A Revenue ledger, including tax withheld (TDS).</li>
        <li>Warnings on fake brand deals that ask for a fee or a login.</li>
      </ul>
      <h2>Billing</h2>
      <p>Your first invoice is raised after one full week of active use. Customers in India pay in INR through Razorpay; customers elsewhere pay in USD through Paddle, our merchant of record. Taxes are added where applicable. See the <Link href="/refunds">refund and cancellation policy</Link> and the <Link href="/terms">terms</Link>.</p>
      <p><Link href="/#apply">Apply for the pilot ↗</Link></p>
    </MarketingDocument>
  );
}
