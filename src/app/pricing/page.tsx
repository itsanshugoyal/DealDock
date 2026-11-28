import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { MarketingDocument, type DocSection } from "@/components/site/marketing-document";
import styles from "@/components/site/site.module.css";
import { marketingPageMetadata } from "@/lib/marketing-metadata";
import { planPriceLabel } from "@/lib/marketing-pricing.mjs";

export const metadata: Metadata = marketingPageMetadata("/pricing", "Pricing | DealDock", "DealDock plans for creators, assistants and agencies: Solo ₹4,000 / $49, Studio ₹8,000 / $99, Roster ₹15,000 / $179 a month.");

// Prices come from the one price list (lib/marketing-pricing.mjs), in both currencies: India pays in rupees, everyone else in dollars.
const PLANS = [
  { id: "solo", name: "Solo", who: "One creator and one Instagram account." },
  { id: "studio", name: "Studio", who: "A creator plus an assistant seat." },
  { id: "roster", name: "Roster", who: "Up to five creators, each with their own inbox, plus manager seats." },
] as const;

const SECTIONS: DocSection[] = [
  { id: "included", title: "Every plan includes", body: (
    <ul>
      <li>Your Instagram DMs in one inbox, connected through Meta’s official API, with no passwords.</li>
      <li>Each message sorted by type (brand deal, coaching lead, course question, other sale, fan, spam, personal) with a value estimate, biggest first.</li>
      <li>Reply drafts in your own style, in English, Hindi or Hinglish. Nothing sends until a person approves it.</li>
      <li>Follow-up nudges and a countdown on Instagram’s 24-hour reply window.</li>
      <li>Deal tracking from yes to paid: fee, deliverables, dates and payment terms filled in from the chat, plus drafted payment reminders.</li>
      <li>A Revenue ledger, including tax withheld (TDS).</li>
      <li>Warnings on fake brand deals that ask for a fee or a login.</li>
    </ul>
  ) },
  { id: "billing", title: "Billing", body: (
    <p>Your first invoice is raised after one full week of active use. Customers in India pay in INR through Razorpay; customers elsewhere pay in USD through Paddle, our merchant of record. Taxes are added where applicable. See the <Link href="/refunds">refund and cancellation policy</Link> and the <Link href="/terms">terms</Link>.</p>
  ) },
];

export default function PricingPage() {
  return (
    <MarketingDocument
      title="Pricing"
      lede="DealDock is a deal inbox and CRM for creators, with replies you approve. Every plan is billed monthly, with no setup fee and no annual commitment. Cancel anytime."
      band={
        <div className={styles.cards}>
          {PLANS.map(plan => (
            <article key={plan.id} className={styles.card}>
              <h2>{plan.name}</h2>
              <p className={styles.price}><b>{planPriceLabel(plan.id, "INR")}</b> or <b>{planPriceLabel(plan.id, "USD")}</b> a month</p>
              <p>{plan.who}</p>
              <Link href="/#apply" className={styles.textLink}>Apply for {plan.name}<ArrowRight size={15} weight="bold" aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      }
      sections={SECTIONS}
    />
  );
}
