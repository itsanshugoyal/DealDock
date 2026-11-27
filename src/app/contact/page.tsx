import type { Metadata } from "next";
import Link from "next/link";
import { MarketingDocument } from "@/components/design-preview/marketing-document";

export const metadata: Metadata = { title: "Contact | DealDock", description: "Contact DealDock’s founders about pilot fit, an application or your data.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <MarketingDocument title="Talk to the people building it.">
      <p>We’re Anshu and Nahush, building DealDock. If brand deals or paying clients reach you through Instagram DMs or email, we’d like to hear where they get lost.</p>
      <h2>Get in touch</h2>
      <p><a href="mailto:hello@dealdock.io?subject=DealDock%20pilot%20question">hello@dealdock.io ↗</a></p>
      <p>If a mail app does not open, copy the address into the email service you normally use.</p>
      <h2>A useful starting point</h2>
      <p>Tell us what you sell or who you work with, and what tends to get missed. Ask about pilot timing, how it works, pricing, Instagram or Gmail setup, or your data. Please leave out passwords and private DM screenshots.</p>
      <h2>Already applied?</h2>
      <p>Include your reference, if you have one. Applying does not start a subscription; we discuss fit and terms before onboarding.</p>
      <p><Link href="/#apply">Send a pilot application ↗</Link></p>
    </MarketingDocument>
  );
}
