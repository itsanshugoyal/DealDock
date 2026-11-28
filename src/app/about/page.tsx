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
import { planPriceLabel } from "@/lib/marketing-pricing.mjs";

export const metadata: Metadata = marketingPageMetadata("/about", "About DealDock: the Instagram DM inbox for creators", "DealDock sorts creators’ Instagram DMs and brand emails by what they’re worth, drafts replies in their voice, and tracks deals until they’re paid.");

// The product rules, said once; each one is backed by the security page, the terms or the FAQ.
const RULES = [
  { icon: HandPointing, kicker: "Rule one", title: "You approve every send.", text: "DealDock never sends a message on its own. Every reply stays editable and waits for you, or someone you authorise." },
  { icon: Prohibit, kicker: "Rule two", title: "Never a bulk tool.", text: "No mass outreach, no content scheduling, no replacing your judgment. It answers the people who wrote to you." },
  { icon: ChartLineUp, kicker: "Rule three", title: "Estimates, not promises.", text: "Values help decide what to answer first. Only deals you record count as money you made." },
  { icon: UsersThree, kicker: "Rule four", title: "Built with creators.", text: "A small pilot, set up with each creator and shaped around what they tell us." },
];

// Draft for founder review: every fact here is already stated elsewhere on the site.
const SECTIONS: DocSection[] = [
  { id: "why", title: "Why DealDock exists", body: <>
    <p>A brand asking for your rates looks like any other message until you open it. On Instagram, a first message from an account you don’t follow usually lands in Requests, some are filtered again into a Spam folder, and on a professional account the General tab has notifications off by default. Brand emails arrive in the same inbox as receipts and newsletters.</p>
    <p>So the messages most likely to pay you are often the ones that wait longest. And a yes is only the start: deliverables, posting dates, an invoice and, too often, a payment that needs chasing.</p>
  </> },
  { id: "what", title: "What DealDock does", body: (
    <ol>
      <li><strong>Sorts.</strong> Every DM and brand email gets a label (brand deal, coaching lead, course question, other sale, possible scam or fan) and an estimate from the message, the sender and your own prices.</li>
      <li><strong>Drafts.</strong> Each reply is written the way you write, in English, Hindi or Hinglish. Edit anything.</li>
      <li><strong>Waits for you.</strong> Nothing leaves until you approve it, and every send has a few seconds to undo.</li>
      <li><strong>Follows through.</strong> Terms, deliverables, follow-ups and payment reminders, until the money lands.</li>
    </ol>
  ) },
  { id: "who", title: "Who it is for", body: (
    <ul>
      <li>Creators whose brand deals start in DMs and email.</li>
      <li>Coaches, course creators and cohort hosts whose buyers ask their questions in DMs.</li>
      <li>Managers and agencies running up to five creators from one inbox, each with their own voice and revenue.</li>
      <li>Creators in India, with <Link href="/in">rupee prices and Hinglish drafts</Link>.</li>
    </ul>
  ) },
  { id: "pilot", title: "How the pilot works", body: <p>The first cohort is deliberately small. We set up every account with you, a few creators at a time, and shape the product around candid feedback about where follow-through breaks down. Instagram DMs and Gmail work today; TikTok is not supported yet. See <Link href="/pricing">pricing</Link> and the <Link href="/pilot-terms">pilot terms</Link>.</p> },
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
            <div><dt>Plans from</dt><dd>{planPriceLabel("solo", "INR")} or {planPriceLabel("solo", "USD")} a month</dd></div>
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
