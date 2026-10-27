import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { EnquiryExample } from "./enquiry-example";
import { PilotApplication } from "./pilot-application";
import { CurrencySelector, ExampleMoney, PilotCurrencyProvider, PricingAnswer, SoloPrice } from "./pilot-currency";
import styles from "./preview.module.css";

const faqItems = [
  ["Will DealDock ever send a message without me?", "Never. Every send requires human approval. A draft can be edited or left unsent. This is a product rule, not a setting you have to remember to switch on."],
  ["Which Instagram accounts can join?", "The pilot is designed for Instagram Business and Creator accounts. We’ll confirm compatibility and connection permissions before onboarding. A personal account may need to switch to a professional account. The pilot is Instagram-only; other inbox integrations are not included."],
  ["What does the pilot cost?", <PricingAnswer key="price" />],
  ["Can I join from outside India?", "Yes, we’re accepting applications for selected international validation pilots at USD $49/month. We confirm account compatibility, language, timing and billing availability before accepting a participant. Applying does not guarantee a place or immediate access."],
  ["What happens after I apply?", "Anshu reviews your offer and replies by email to discuss fit, Instagram access and pilot timing. If we agree to proceed, we confirm the terms and arrange onboarding. Applying does not connect your Instagram account, start a subscription or take a payment."],
  ["Is this a finished, self-serve product?", "This is a design-partner pilot. We’re looking for a small group to help test and shape the workflow. Access, account compatibility and timing are confirmed together before onboarding."],
  ["Does it find new leads for me?", "No. DealDock is focused on enquiries already arriving in your Instagram conversations. It is not a lead-generation service, a content scheduler or a bulk outreach tool."],
  ["How will the drafts sound like me?", "The pilot onboarding is designed to learn how you write, using examples you agree to share. You review the result and can change anything before approving a reply. Voice matching is a starting point, not a promise of a perfect first draft."],
  ["What if an estimate or draft is wrong?", "Treat estimated values as a way to prioritize attention, not a valuation or confirmed sale. Review the conversation and correct the draft before sending. A sale is recorded separately when you know the outcome."],
  ["What about creators who mainly do brand deals?", "This first cohort focuses on creators selling their own courses, coaching and cohorts. If brand collaborations are your main business, choose the future-pilot interest option in the application so we can discuss that separate use case."],
  ["Do you guarantee recovered revenue?", "No. DealDock helps you notice and follow through on buying conversations. Whether they become sales depends on the offer, the buyer and the conversation. Example figures on this page are illustrative, not customer results."],
];

export function MarketingDesignPreview() {
  const onlineApplications = Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
  return (
    <PilotCurrencyProvider><div className={styles.page}>
      <a className={styles.skipLink} href="#preview-main">Skip to content</a>
      <header className={styles.header}>
        <a href="#preview-main" className={styles.brand} aria-label="DealDock home" translate="no">
          <span className={styles.brandMark} aria-hidden="true">d<span /></span>DealDock
        </a>
        <nav aria-label="Main navigation" className={styles.nav}>
          <a href="#your-approval" className={styles.navApproach}>How it works</a>
          <a href="#pilot" className={styles.navApproach}>The pilot</a><a href="#questions" className={styles.navApproach}>FAQ</a><a href="#apply" data-marketing-cta="navigation" className={styles.navCta}>Apply for the pilot <ArrowUpRight size={16} aria-hidden="true" /></a>
        </nav>
      </header>

      <main id="preview-main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="preview-heading">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" /> For coaches, course creators & cohort hosts</p>
            <h1 id="preview-heading">Some DMs<br /> mean <span className={styles.emphasis}>business.</span></h1>
            <p className={styles.subhead}>DealDock is a sales inbox for your Instagram enquiries. Spot the buyers, review a reply in your voice, and record what closes.</p>
            <p className={styles.productLine}>Course, coaching and cohort questions, prioritized by estimated deal value. Every reply waits for your approval.</p>
            <div className={styles.actions}>
              <a href="#apply" data-marketing-cta="hero" className={styles.primaryLink}>Apply for the pilot <ArrowUpRight size={21} aria-hidden="true" /></a>
              <a href="#your-approval" className={styles.secondaryLink}>See how it works <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <p className={styles.promise}><span className={styles.approvalMark} aria-hidden="true">✓</span>You approve every send. Always.</p>
            <p className={styles.pilotNote}>Early pilot · <a href="#pilot">Solo <SoloPrice /></a> · No payment to apply</p>
          </div>
          <EnquiryExample />
        </section>


        <section className={styles.problem} aria-labelledby="problem-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>The part nobody sees</p>
            <h2 id="problem-heading">You earned their attention.<br />Don’t lose the conversation.</h2>
            <p>A good post starts the conversation. A buried DM can end it before you even know it began.</p>
          </div>
          <ol className={styles.missedMoments}>
            <li><span className={styles.momentNumber}>01 / It arrives</span><h3>“Can I still join?”</h3><p>A real buying question lands between story reactions, quick hellos and everything else.</p></li>
            <li><span className={styles.momentNumber}>02 / It gets buried</span><h3>“I’ll reply later.”</h3><p>You’re teaching, coaching or making the next thing. The enquiry slips down the inbox.</p></li>
            <li><span className={styles.momentNumber}>03 / It goes quiet</span><h3>“Did that ever close?”</h3><p>Without a clear place to follow through, the opportunity disappears from view.</p></li>
          </ol>
        </section>

        <section id="your-approval" className={styles.approval} aria-labelledby="approval-heading">
          <div className={styles.approvalTop}>
            <div className={styles.approvalTitle}>
              <span className={styles.smallLabel}>A second pair of eyes. Not a second you.</span>
              <h2 id="approval-heading">We draft.<br /><span>You decide.</span></h2>
            </div>
            <div className={styles.approvalCopy}>
              <div className={styles.signature} aria-hidden="true">Your voice stays yours.<span>↙</span></div>
              <p>You built the relationship. A reply should still sound like you, and only leave when you say so.</p>
              <p className={styles.hardPromise}>DealDock never auto-sends messages.</p>
            </div>
          </div>
          <ol className={styles.workflow}>
            <li><span>01</span><div><h3>Spot the opportunity.</h3><p>Prioritize enquiries by estimated deal value.</p></div></li>
            <li><span>02</span><div><h3>Put your name to it.</h3><p>Review the draft. Edit it. Approve the send.</p></div></li>
            <li><span>03</span><div><h3>Know what came of it.</h3><p>Record the sale against the conversation.</p></div></li>
          </ol>
        </section>

        <section className={styles.outcomes} aria-labelledby="outcomes-heading">
          <div className={styles.outcomesCopy}>
            <p className={styles.sectionLabel}>Follow the conversation through</p>
            <h2 id="outcomes-heading">A promising DM.<br />A recorded outcome.</h2>
            <p>An estimated deal value helps you decide where to look first. When a conversation becomes a sale, record what actually closed.</p>
            <p>Keep those two numbers separate. Potential revenue is a starting point, not money in the bank.</p>
            <a href="#apply" data-marketing-cta="outcomes" className={styles.secondaryLink}>Bring your workflow to the pilot <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <figure className={styles.receipt}>
            <figcaption><span>THE REVENUE LEDGER</span><span>Illustrative entry</span></figcaption>
            <div className={styles.receiptHeading}><span>A seat in your next cohort</span><span className={styles.recordedStamp}>Recorded</span></div>
            <dl><div><dt>Enquiry surfaced</dt><dd>Course question</dd></div><div><dt>Estimated value</dt><dd><ExampleMoney kind="course" /></dd></div><div><dt>Reply</dt><dd>Reviewed &amp; approved by you</dd></div></dl>
            <div className={styles.receiptTotal}><span>Recorded sale</span><strong><ExampleMoney kind="recorded" /></strong></div>
            <p>Example only. Sales are recorded by the creator. This is not a customer result or a revenue guarantee.</p>
          </figure>
        </section>

        <section className={styles.fit} aria-labelledby="fit-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>A focused first pilot</p>
            <h2 id="fit-heading">You sell the expertise.<br />Instagram starts the conversation.</h2>
          </div>
          <div className={styles.audiences}>
            <div><span>01</span><h3>Coaches &amp; consultants</h3><p>People ask about your packages, availability and whether you’re the right fit.</p></div>
            <div><span>02</span><h3>Course creators</h3><p>Warm buyers want to know what’s inside, how it works and where to start.</p></div>
            <div><span>03</span><h3>Cohort hosts</h3><p>Enquiries build around launch dates, remaining places and the next intake.</p></div>
          </div>
          <div className={styles.fitCheck}>
            <div><h3>A good fit if…</h3><ul><li>You already have an offer people can buy.</li><li>Buyer enquiries regularly arrive through Instagram.</li><li>You can review replies and share feedback during the pilot.</li></ul></div>
            <div><h3>Probably early for you if…</h3><ul><li>You’re still looking for your first inbound enquiries.</li><li>Your main need is content scheduling or audience growth.</li><li>You want messages to go out without human approval.</li></ul></div>
          </div>
        </section>

        <section id="pilot" className={styles.pilot} aria-labelledby="pilot-heading">
          <div className={styles.pilotCopy}>
            <p className={styles.sectionLabel}>Looking for our first 10 design partners</p>
            <h2 id="pilot-heading">Help build the inbox<br />you actually need.</h2>
            <p>Bring your real buyer enquiries. We’ll work through your offer values, review drafts together and learn what helps you follow through. Hands-on onboarding and direct feedback with Anshu are part of the pilot.</p>
            <p className={styles.regionalNote}>India-first, with selected international validation pilots. Tell us where you’re based in your optional note; we’ll confirm availability together.</p>
            <ol className={styles.pilotSteps}><li><span>1</span>Tell us about your offer and the enquiries you miss.</li><li><span>2</span>Talk through fit, Instagram access and pilot timing.</li><li><span>3</span>Try the workflow, review every reply and share what needs work.</li></ol>
          </div>
          <div className={styles.priceCard}>
            <div className={styles.priceLabel}><span>SOLO PILOT</span><span>Monthly</span></div>
            <CurrencySelector />
            <SoloPrice card />
            <p>One creator. One Instagram account.</p>
            <ul><li>Value-prioritized buyer enquiries</li><li>Drafts in your voice, with your approval</li><li>A record of conversations that close</li><li>Hands-on pilot onboarding</li></ul>
            <a href="#apply" data-marketing-cta="pilot" className={styles.primaryLink}>Apply for the pilot <ArrowUpRight size={19} aria-hidden="true" /></a>
            <p className={styles.priceTerms}>No setup fee. Cancel anytime. First invoice after one full week of active use. No payment required to apply.</p>
            <Link href="/pilot-terms" className={styles.secondaryLink}>Read the pilot terms <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <p className={styles.teamNote}>Work with an assistant or manage several accounts? <Link href="/contact">Tell Anshu about your setup ↗</Link></p>
          </div>
        </section>

        <section id="questions" className={styles.faqSection} aria-labelledby="faq-heading">
          <div className={styles.faqHeading}><p className={styles.sectionLabel}>Before you jump in</p><h2 id="faq-heading">Fair questions.<br />Straight answers.</h2><p>Still unsure about your workflow?<br /><a href="mailto:itsanshugoyal2@gmail.com" className={styles.secondaryLink}>Ask Anshu <ArrowUpRight size={16} aria-hidden="true" /></a></p></div>
          <div className={styles.faqList}>
            {faqItems.map(([question,answer]) => <details key={String(question)}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
          </div>
        </section>

        <section id="apply" className={styles.applySection} aria-labelledby="apply-heading">
          <div className={styles.applyCopy}>
            <span className={styles.applyArrow} aria-hidden="true">↗</span>
            <p className={styles.sectionLabel}>Let’s talk about your inbox</p>
            <h2 id="apply-heading">Good conversations.<br />Better follow-through.</h2>
            <p>Tell us what you sell and where enquiries get stuck. We’ll discuss whether the pilot fits before you connect anything.</p>
            <div className={styles.nextSteps}><strong>A conversation before a commitment</strong><p>Anshu reviews your offer, then replies by email to discuss fit and arrange the next step. Account access and pilot terms are confirmed before onboarding.</p></div>
            <p className={styles.founderContact}>A question first? <Link href="/contact">Talk to Anshu ↗</Link></p>
          </div>
          <PilotApplication online={onlineApplications} />
        </section>

      </main>
      <footer className={styles.footer}>
        <span><strong>DealDock</strong> · Human-approved replies. Always.</span>
        <nav aria-label="Footer navigation" className={styles.footerLinks}><Link href="/privacy">Privacy</Link><Link href="/pilot-terms">Pilot terms</Link><Link href="/contact">Contact</Link></nav>
      </footer>
    </div></PilotCurrencyProvider>
  );
}
