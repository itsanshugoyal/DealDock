import type { Metadata } from "next";
import Link from "next/link";
import { MarketingDocument } from "@/components/design-preview/marketing-document";

export const metadata: Metadata = { title: "Talk to Anshu | DealDock", description: "Contact the DealDock founder about pilot fit, an application or website privacy.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <MarketingDocument title="Talk to the person building it.">
      <p>I’m Anshu, building DealDock. If you sell coaching, courses or cohorts through Instagram, I’d like to understand where your buying conversations get stuck.</p>
      <h2>Get in touch</h2>
      <p><a href="mailto:itsanshugoyal2@gmail.com?subject=DealDock%20pilot%20question">itsanshugoyal2@gmail.com ↗</a></p>
      <p>If a mail app does not open, copy the address into the email service you normally use.</p>
      <h2>A useful starting point</h2>
      <p>Tell me what you sell and what tends to get missed. You can ask about pilot timing, the workflow, pricing, account compatibility or application data. Please leave out passwords and private DM screenshots.</p>
      <h2>Already applied?</h2>
      <p>Include your reference, if you have one. Applying does not start a subscription; we discuss fit and terms before onboarding.</p>
      <p><Link href="/#apply">Send a pilot application ↗</Link></p>
    </MarketingDocument>
  );
}
