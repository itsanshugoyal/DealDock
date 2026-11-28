import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ChatCircleText } from "@phosphor-icons/react/dist/ssr/ChatCircleText";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr/PaperPlaneTilt";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { CopyEmail } from "@/components/site/copy-email";
import { MarketingDocument, type DocSection } from "@/components/site/marketing-document";
import styles from "@/components/site/site.module.css";
import { LEGAL } from "@/lib/legal";
import { marketingPageMetadata } from "@/lib/marketing-metadata";

export const metadata: Metadata = marketingPageMetadata("/contact", "Contact | DealDock", "Contact DealDock about the pilot, your account, billing, your data or a grievance.");

const MAILTO = `mailto:${LEGAL.email}?subject=DealDock%20question`;

const SECTIONS: DocSection[] = [
  { id: "address", title: "Business address", body: <p>DealDock<br />{LEGAL.address}</p> },
  { id: "grievance", title: "Grievance officer", body: <p>For a complaint about the service or how we handle your personal data, contact our grievance officer, {LEGAL.grievanceOfficer}, at <a href={`mailto:${LEGAL.grievanceEmail}?subject=Grievance`}>{LEGAL.grievanceEmail}</a>. We acknowledge grievances within 72 hours and aim to resolve them within 30 days.</p> },
];

export default function ContactPage() {
  return (
    <MarketingDocument
      title="Talk to the people building it."
      lede="I’m Anshu, building DealDock. If brand deals or paying clients reach you through Instagram DMs or email, I’d like to understand where they get lost."
      aside={
        <aside className={styles.emailCard} aria-labelledby="email-heading">
          <h2 id="email-heading">Email Anshu</h2>
          <a href={MAILTO}>{LEGAL.email}</a>
          <div className={styles.actions}>
            <a href={MAILTO}><EnvelopeSimple size={16} weight="bold" aria-hidden="true" />Write to us</a>
            <CopyEmail email={LEGAL.email} />
          </div>
          <p>Support hours: {LEGAL.supportHours}. We reply to email within 2 business days.</p>
        </aside>
      }
      band={
        <div className={styles.cards}>
          <article className={styles.card}>
            <ChatCircleText size={26} weight="duotone" aria-hidden="true" />
            <h2>Pilot and billing</h2>
            <p>Ask about pilot timing, how it works, pricing, Instagram or Gmail setup, or billing. Please leave out passwords and private DM screenshots.</p>
            <Link href="/pricing" className={styles.textLink}>See pricing<ArrowRight size={15} weight="bold" aria-hidden="true" /></Link>
          </article>
          <article className={styles.card}>
            <ShieldCheck size={26} weight="duotone" aria-hidden="true" />
            <h2>Your data</h2>
            <p>The privacy policy explains what we collect and why. You can delete your data at any time, in the app or by email.</p>
            <Link href="/data-deletion" className={styles.textLink}>Delete your data<ArrowRight size={15} weight="bold" aria-hidden="true" /></Link>
          </article>
          <article className={styles.card}>
            <PaperPlaneTilt size={26} weight="duotone" aria-hidden="true" />
            <h2>Already applied?</h2>
            <p>Include your reference, if you have one. Applying does not start a subscription; we discuss fit and terms before onboarding.</p>
            <Link href="/#apply" className={styles.textLink}>Send a pilot application<ArrowRight size={15} weight="bold" aria-hidden="true" /></Link>
          </article>
        </div>
      }
      sections={SECTIONS}
    />
  );
}
