import type { Metadata } from "next";
import Link from "next/link";
import { marketingPageMetadata } from "@/lib/marketing-metadata";
import { DocSummary, MarketingDocument, type DocSection } from "@/components/site/marketing-document";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = marketingPageMetadata("/refunds", "Refund and cancellation policy | DealDock", "How to cancel a DealDock subscription and when you can get a refund.");

const SECTIONS: DocSection[] = [
  { id: "cancel-anytime", title: "Cancel anytime", body: <>
    <ul>
      <li>Cancel from Settings → Cancel plan in the app, or email <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> from your account email.</li>
      <li>Cancelling stops all future charges. Your plan stays active until the end of the period you have already paid for.</li>
      <li>There is no cancellation fee, no setup fee and no annual lock-in.</li>
      <li>After your plan ends, your Revenue ledger stays readable for 30 days so you can export it.</li>
    </ul>
  </> },
  { id: "your-first-week-costs-nothing", title: "Your first week costs nothing", body: <>
    <p>Your first invoice is only raised after one full week of active use. If DealDock isn’t right for you, cancel within that first week and you will not be charged.</p>
  </> },
  { id: "when-we-refund", title: "When we refund", body: <>
    <ul>
      <li><strong>Billing errors:</strong> if you were charged twice, charged the wrong amount, or charged after cancelling, we refund the difference in full.</li>
      <li><strong>Where the law requires it:</strong> any refund or withdrawal right your local consumer law gives you always applies, including the 14-day right of withdrawal for consumers in the EU and UK.</li>
    </ul>
    <p>Otherwise, monthly fees already paid are not refunded for part of a month: cancelling stops the next charge, and you keep access until the end of the paid period.</p>
  </> },
  { id: "how-to-ask-for-a-refund", title: "How to ask for a refund", body: <>
    <p>Email <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> with your account email, the invoice date and the reason. We reply within 2 business days. Approved refunds are issued to your original payment method within 5–7 business days; your bank may take a few more days to show it.</p>
  </> },
  { id: "payments-made-through-paddle-outside-india", title: "Payments made through Paddle (outside India)", body: <>
    <p>If you paid in USD, our order process is conducted by our online reseller Paddle.com, which is the merchant of record for your order and handles refunds. You can ask us, or request a refund directly through <a href="https://paddle.net" rel="noopener noreferrer">paddle.net</a>; Paddle may also refund a payment requested within 14 days of the transaction. Paddle’s <a href="https://www.paddle.com/legal/buyer-terms" rel="noopener noreferrer">buyer terms</a> and <a href="https://www.paddle.com/legal/refund-policy" rel="noopener noreferrer">refund policy</a> also apply to those purchases.</p>
  </> },
  { id: "payments-made-through-razorpay-india", title: "Payments made through Razorpay (India)", body: <>
    <p>INR payments are processed by Razorpay. We issue refunds through Razorpay to the card, UPI account or bank account you paid with.</p>
  </> },
  { id: "questions", title: "Questions", body: <>
    <p>Email <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> or see the <Link href="/contact">contact page</Link>.</p>
  </> },
];

export default function RefundsPage() {
  return (
    <MarketingDocument
      title="Refund and cancellation policy"
      meta={[`Updated ${LEGAL.updated}`]}
      lede={<>This policy applies to DealDock subscriptions sold by {LEGAL.entity}. It sits alongside our <Link href="/terms">Terms of Service</Link>.</>}
      aside={<DocSummary items={["Cancel anytime from Settings. No fees, no lock-in.","You keep access until the end of the period you paid for.","Billing errors are refunded in full.","Your local consumer rights always apply."]} />}
      sections={SECTIONS}
    ></MarketingDocument>
  );
}
