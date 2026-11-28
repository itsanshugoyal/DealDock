import type { Metadata } from "next";
import Link from "next/link";
import { marketingPageMetadata } from "@/lib/marketing-metadata";
import { MarketingDocument, type DocSection } from "@/components/site/marketing-document";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = marketingPageMetadata("/delivery", "Shipping and delivery policy | DealDock", "DealDock is a digital service delivered online. Nothing physical is shipped.");

const SECTIONS: DocSection[] = [
  { id: "how-you-receive-the-service", title: "How you receive the service", body: <>
    <ul>
      <li>Once you sign up, your workspace is available straight away in your browser, on desktop or mobile.</li>
      <li>Connecting Instagram or Gmail takes a few minutes through Meta’s and Google’s own sign-in screens.</li>
      <li>Payment receipts are emailed to your account email by Razorpay or Paddle.</li>
    </ul>
  </> },
  { id: "if-you-cannot-get-access", title: "If you cannot get access", body: <>
    <p>If you have paid but cannot sign in or use your workspace, email <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. We reply within 2 business days. If we cannot fix it, our <Link href="/refunds">refund policy</Link> applies.</p>
  </> },
];

export default function DeliveryPage() {
  return (
    <MarketingDocument
      title="Shipping and delivery policy"
      meta={[`Updated ${LEGAL.updated}`]}
      lede={<>DealDock is a digital service delivered online. Access starts immediately after sign-up at <a href={LEGAL.appUrl}>app.dealdock.io</a>. Nothing physical is shipped, so there are no shipping charges or delivery addresses.</>}
      sections={SECTIONS}
    ></MarketingDocument>
  );
}
