import type { Metadata } from "next";
import Link from "next/link";
import { ChartLineUp } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { HandPointing } from "@phosphor-icons/react/dist/ssr/HandPointing";
import { Prohibit } from "@phosphor-icons/react/dist/ssr/Prohibit";
import { UsersThree } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { MarketingWebsiteStructuredData } from "@/components/marketing/structured-data";
import { MarketingDocument, type DocSection } from "@/components/site/marketing-document";
import styles from "@/components/site/site.module.css";
import { marketingPageMetadata } from "@/lib/marketing-metadata";

export const metadata: Metadata = marketingPageMetadata("/about", "About DealDock", "DealDock sorts creators’ Instagram DMs and brand emails by what they’re worth, drafts replies in their voice, and tracks deals until they’re paid.");

// The product rules, said once; each one is backed by the security page, the pilot terms or the FAQ.
const RULES = [
  { icon: HandPointing, kicker: "Rule one", title: "You approve every send.", text: "DealDock never sends a message on its own. Every reply stays editable and waits for you, or someone you authorise." },
  { icon: Prohibit, kicker: "Rule two", title: "Never a bulk tool.", text: "No mass outreach, no content scheduling, no replacing your judgment. It answers the people who wrote to you." },
  { icon: ChartLineUp, kicker: "Rule three", title: "Estimates, not promises.", text: "Values help decide what to answer first. Only deals you record count as money you made." },
  { icon: UsersThree, kicker: "Rule four", title: "Built with creators.", text: "A few creators at a time, set up with each of them, shaped around what they tell us." },
];

const SECTIONS: DocSection[] = [
  { id: "building", title: "What we are building", body: <p>DealDock reads your Instagram DMs and Gmail, puts brand deals and paying clients first with an estimate of what each is worth, drafts each reply in your voice, and tracks every deal until you’re paid. Estimates help decide what to answer first. They are not promised sales.</p> },
  { id: "pilot", title: "Why a pilot", body: <p>We onboard a few creators at a time, set up every account with them, and shape the product around what they tell us. Pilot members get their first 30 days free.</p> },
  { id: "team", title: "Who is building it", body: <>
    <p>Anshu and Nahush are building DealDock. If brand deals or paying clients reach you through DMs or email, <Link href="/#apply">apply for the pilot</Link> or <Link href="/contact">ask us a question first</Link>.</p>
    <div className={styles.people}>
      <div className={styles.person}><span aria-hidden="true">A</span><div><b>Anshu</b><small>Co-founder</small></div></div>
      <div className={styles.person}><span aria-hidden="true">N</span><div><b>Nahush</b><small>Co-founder</small></div></div>
    </div>
  </> },
  { id: "name", title: "About the name", body: <p>DealDock at dealdock.io is an Instagram DM inbox for creators. It isn’t connected to other businesses that use the DealDock name, such as software for real-estate agents or venture-capital firms.</p> },
];

export default function AboutPage() {
  return (
    <MarketingDocument
      title="An inbox that keeps the creator in control."
      lede="DealDock is for creators whose DMs and inbox hold real money: brand deals, coaching clients, and course and cohort buyers. It is in a private pilot."
      aside={
        <aside className={styles.factCard} aria-labelledby="status-heading">
          <h2 id="status-heading">Pilot status</h2>
          <dl>
            <div><dt>Status</dt><dd>Open for applications</dd></div>
            <div><dt>Onboarding</dt><dd>A few creators at a time</dd></div>
            <div><dt>Connects</dt><dd>Instagram DMs and Gmail</dd></div>
            <div><dt>Writes in</dt><dd>English, Hindi, Hinglish</dd></div>
            <div><dt>To start</dt><dd>First 30 days free</dd></div>
          </dl>
        </aside>
      }
      band={
        <div className={styles.tiles}>
          {RULES.map(({ icon: Icon, kicker, title, text }) => (
            <article key={kicker} className={styles.tile}>
              <Icon size={28} weight="duotone" aria-hidden="true" />
              <p>{kicker}</p>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      }
      sections={SECTIONS}
    >
      <MarketingWebsiteStructuredData />
    </MarketingDocument>
  );
}
