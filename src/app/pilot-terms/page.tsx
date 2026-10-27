import type { Metadata } from "next";
import Link from "next/link";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import { CurrencySelector, PilotCurrencyProvider, SoloPrice } from "@/components/design-preview/pilot-currency";

export const metadata: Metadata = { title: "Pilot terms | DealDock", description: "The DealDock Solo pilot offer, application process, pricing and human-approval promise.", alternates: { canonical: "/pilot-terms" } };

export default function PilotTermsPage() {
  return (
    <PilotCurrencyProvider><MarketingDocument title="A pilot with clear expectations.">
      <p>The first cohort is for creators selling their own coaching, courses and cohorts through Instagram. We’re looking for the first 10 design partners to help test and shape the workflow.</p>
      <h2>Applying comes first</h2>
      <p>Applying expresses interest. It does not guarantee a place, create a paid subscription, take a payment, or connect your Instagram account. We confirm fit, account compatibility, timing and the agreed service terms before onboarding.</p>
      <h2>The Solo pilot offer</h2>
      <CurrencySelector />
      <ul><li><SoloPrice /> for one creator and one Instagram account: ₹4,000 in INR or USD $49 internationally.</li><li>Monthly billing, with no setup fee or annual commitment.</li><li>The first invoice comes after one full week of active use.</li><li>You can cancel anytime. Pilot pricing is retained while you remain subscribed.</li></ul>
      <p>Before onboarding, we confirm the billing currency, what period the first invoice covers (including how the first week is treated), any applicable taxes and the written cancellation process. A later invoice date alone is not a promise of a free trial. We do not collect payment details on this website.</p>
      <h2>What we test together</h2>
      <p>The pilot focuses on prioritizing buyer enquiries by estimated deal value, drafting replies in your voice, and recording closed sales against their conversations. It includes hands-on onboarding and feedback with the founder.</p>
      <p>This is an early product. Estimates and drafts need your judgment, and access depends on confirmed Instagram account and platform requirements. We do not promise a specific revenue result.</p>
      <h2>You approve every send</h2>
      <p>DealDock never auto-sends messages. Every send requires human approval. You can edit a draft or leave it unsent, including follow-up drafts.</p>
      <h2>Account access and data</h2>
      <p>Before you grant Instagram access, we explain the connection, required permissions and service data handling. Do not submit credentials or private DMs in an application. The <Link href="/privacy">website privacy notice</Link> explains application data.</p>
      <h2>Brand-deal creators and other regions</h2>
      <p>Brand-deal-only creators can register separate future-pilot interest. The first cohort remains India-first and accepts applications for selected international validation pilots at USD $49 per month. We confirm account compatibility, language, timing and billing availability before accepting a participant. Applying does not guarantee a place, immediate access or availability in every country.</p>
      <p>The website suggests a display currency from your approximate location, and you can override it. These are fixed pilot offers, not live exchange-rate conversions. Your display choice does not set your product ledger currency, establish billing eligibility or start a subscription.</p>
      <h2>Discuss your fit</h2>
      <p><Link href="/#apply">Apply for the pilot</Link> or <Link href="/contact">contact Anshu</Link> with a question first.</p>
    </MarketingDocument></PilotCurrencyProvider>
  );
}
