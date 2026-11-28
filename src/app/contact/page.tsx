import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ChatCircleText } from "@phosphor-icons/react/dist/ssr/ChatCircleText";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr/PaperPlaneTilt";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { APPLICATION_EMAIL } from "@/components/site/application.mjs";
import { CopyEmail } from "@/components/site/copy-email";
import { MarketingDocument } from "@/components/site/marketing-document";
import styles from "@/components/site/site.module.css";
import { marketingPageMetadata } from "@/lib/marketing-metadata";

export const metadata: Metadata = marketingPageMetadata("/contact", "Contact | DealDock", "Contact DealDock’s founders about pilot fit, an application or your data.");

const MAILTO = `mailto:${APPLICATION_EMAIL}?subject=DealDock%20pilot%20question`;

export default function ContactPage() {
  return (
    <MarketingDocument
      title="Talk to the people building it."
      lede="We’re Anshu and Nahush, building DealDock. If brand deals or paying clients reach you through Instagram DMs or email, we’d like to hear where they get lost."
      aside={
        <aside className={styles.emailCard} aria-labelledby="email-heading">
          <h2 id="email-heading">Email the founders</h2>
          <a href={MAILTO}>{APPLICATION_EMAIL}</a>
          <div className={styles.actions}>
            <a href={MAILTO}><EnvelopeSimple size={16} weight="bold" aria-hidden="true" />Write to us</a>
            <CopyEmail email={APPLICATION_EMAIL} />
          </div>
          <p>We reply within two working days. If a mail app does not open, copy the address into the email service you normally use.</p>
        </aside>
      }
      band={
        <div className={styles.cards}>
          <article className={styles.card}>
            <ChatCircleText size={26} weight="duotone" aria-hidden="true" />
            <h2>Pilot questions</h2>
            <p>Tell us what you sell or who you work with, and what tends to get missed. Ask about pilot timing, how it works, pricing, or Instagram and Gmail setup.</p>
            <Link href="/pilot-terms" className={styles.textLink}>Read the pilot terms<ArrowRight size={15} weight="bold" aria-hidden="true" /></Link>
          </article>
          <article className={styles.card}>
            <ShieldCheck size={26} weight="duotone" aria-hidden="true" />
            <h2>Your data</h2>
            <p>Ask what DealDock reads and keeps, or ask us to correct or delete an application. Please leave out passwords and private DM screenshots.</p>
            <Link href="/security" className={styles.textLink}>Security and your data<ArrowRight size={15} weight="bold" aria-hidden="true" /></Link>
          </article>
          <article className={styles.card}>
            <PaperPlaneTilt size={26} weight="duotone" aria-hidden="true" />
            <h2>Already applied?</h2>
            <p>Include your reference, if you have one. Applying does not start a subscription; we discuss fit and terms before onboarding.</p>
            <Link href="/#apply" className={styles.textLink}>Send a pilot application<ArrowRight size={15} weight="bold" aria-hidden="true" /></Link>
          </article>
        </div>
      }
    />
  );
}
