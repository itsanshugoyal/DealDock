import type { Metadata } from "next";
import { marketingPageMetadata } from "@/lib/marketing-metadata";
import Link from "next/link";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = marketingPageMetadata("/contact", "Contact | DealDock", "Contact DealDock about the pilot, your account, billing, your data or a grievance.");

export default function ContactPage() {
  return (
    <MarketingDocument title="Talk to the people building it.">
      <p>I’m Anshu, building DealDock. If brand deals or paying clients reach you through Instagram DMs or email, I’d like to understand where they get lost.</p>
      <h2>Get in touch</h2>
      <ul>
        <li>Email: <a href={`mailto:${LEGAL.email}?subject=DealDock%20question`}>{LEGAL.email}</a></li>
        <li>Phone: {LEGAL.phone}</li>
        <li>Support hours: {LEGAL.supportHours}. We reply to email within 2 business days.</li>
      </ul>
      <p>Ask about pilot timing, how it works, pricing, Instagram or Gmail setup, billing or your data. Please leave out passwords and private DM screenshots. If you already applied, include your reference.</p>
      <h2>Company details</h2>
      <p>{LEGAL.entity}<br />{LEGAL.address}<br />{LEGAL.registration}<br />GSTIN: {LEGAL.gstin}</p>
      <h2>Grievance officer</h2>
      <p>For a complaint about the service or how we handle your personal data, contact our grievance officer, {LEGAL.grievanceOfficer}, at <a href={`mailto:${LEGAL.grievanceEmail}?subject=Grievance`}>{LEGAL.grievanceEmail}</a>. We acknowledge grievances within 72 hours and aim to resolve them within 30 days.</p>
      <h2>Your data</h2>
      <p>To delete your data, see <Link href="/data-deletion">data deletion</Link>. The <Link href="/privacy">privacy policy</Link> explains what we collect and why.</p>
      <p><Link href="/#apply">Send a pilot application ↗</Link></p>
    </MarketingDocument>
  );
}
