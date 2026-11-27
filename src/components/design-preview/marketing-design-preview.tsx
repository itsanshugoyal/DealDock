import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Check } from "@phosphor-icons/react/dist/ssr/Check";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import { PILOT_OFFER, PLAN_PRICES, formatMoney } from "@/lib/marketing-pricing.mjs";
import { HeroSort } from "./hero-sort";
import { IndiaBar, StickyApply } from "./page-bars";
import { PilotApplication } from "./pilot-application";
import { PilotCurrencyProvider } from "./pilot-currency";
import { Avatar } from "./primitives";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { GLOBAL, STEPS, type SiteContent } from "./site-content";
import { SlideDemo } from "./slide-demo";
import { Story } from "./story";
import { VoiceToggle } from "./voice-toggle";
import { DealReceipts, DraftStage, LeakTotal, PaidStage, RosterDesk, SlideStage, SortStage, TrustCards, WorksWith } from "./visuals";
import styles from "./preview.module.css";
import navStyles from "@/components/shared/resource-nav.module.css";

function Arrow() {
  return <span className={styles.btnArrow} aria-hidden="true"><ArrowRight size={18} weight="bold" /></span>;
}

export function MarketingDesignPreview({ content: c = GLOBAL }: { content?: SiteContent }) {
  const online = Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
  const offer = `${PILOT_OFFER.short} · No card needed · Cancel anytime`;
  return (
    <PilotCurrencyProvider currency={c.currency}><div className={styles.page} lang={c.lang}>
      <a className={styles.skipLink} href="#main">Skip to content</a>
      {c.locale === "global" && <IndiaBar />}
      <SiteHeader home={c.path} onPage />

      <main id="main" tabIndex={-1}>
        <section id="hero" className={styles.hero} aria-labelledby="hero-heading">
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div>
              <p className={styles.pill}><i aria-hidden="true" />{c.hero.pill}</p>
              <h1 id="hero-heading" className={styles.display}>Your DMs, sorted by&nbsp;<em>money.</em></h1>
              <p className={styles.lede}>{c.hero.sub}</p>
              <div className={styles.heroActions}>
                <a href="#apply" className={styles.btn} data-marketing-cta="hero">Apply for the pilot<Arrow /></a>
                <a href="#how-it-works" className={styles.textLink}>How it works<ArrowRight size={16} weight="bold" aria-hidden="true" /></a>
              </div>
              <p className={styles.offer}>{offer}</p>
              <p className={styles.trustLine}>{c.hero.trust}</p>
              <WorksWith />
            </div>
            <HeroSort hero={c.hero} />
          </div>
        </section>

        <section id="leak-scan" className={styles.chapter} aria-labelledby="leak-heading">
          <div className={`${styles.container} ${styles.split}`}>
            <div className={styles.chapterHead}>
              <p className={styles.label}>Leak Scan</p>
              <h2 id="leak-heading">What your last 30 days missed.</h2>
              <p className={styles.chapterLede}>Connect once and see every unanswered brand deal, client and sale, added up.</p>
              <a href="#apply" className={styles.textLink} data-marketing-cta="leak_scan">Get your free Leak Scan<ArrowRight size={16} weight="bold" aria-hidden="true" /></a>
            </div>
            <LeakTotal c={c} />
          </div>
        </section>

        <section id="how-it-works" className={`${styles.chapter} ${styles.chapterAlt}`} aria-labelledby="how-heading">
          <div className={styles.container}>
            <div className={styles.chapterHead}>
              <p className={styles.label}>How it works</p>
              <h2 id="how-heading">From DM to paid, in four moves.</h2>
              <p className={styles.chapterLede}>One brand deal, start to finish.</p>
            </div>
            <Story steps={STEPS} stages={[<SortStage key="sort" c={c} />, <DraftStage key="draft" c={c} />, <SlideStage key="slide" c={c} />, <PaidStage key="paid" c={c} />]} />
          </div>
        </section>

        <section id="your-voice" className={styles.chapter} aria-labelledby="voice-heading">
          <div className={`${styles.container} ${styles.split}`}>
            <div className={styles.chapterHead}>
              <p className={styles.label}>Your voice</p>
              <h2 id="voice-heading">Sounds like you.</h2>
              <p className={styles.chapterLede}>It learns from what you send and every edit you make, and shows you what it learned.</p>
            </div>
            <VoiceToggle voice={c.voice} />
          </div>
        </section>

        <section id="approve" className={`${styles.chapter} ${styles.dark}`} aria-labelledby="approve-heading">
          <div className={styles.container}>
            <div className={`${styles.chapterHead} ${styles.centered}`}>
              <p className={styles.label}>Your call, every time</p>
              <h2 id="approve-heading">Nothing sends without <em>your</em> slide.</h2>
              <p className={styles.chapterLede}>No bots replying for you. No bulk messages.</p>
              <ol className={styles.approveSteps}>
                <li><b>1</b>DealDock drafts</li>
                <li data-you=""><b>2</b>You slide</li>
                <li><b>3</b>Then it sends</li>
              </ol>
              <p className={styles.autosend}>Auto-send: off. Always.</p>
            </div>
            <SlideDemo approve={c.approve} />
          </div>
        </section>

        <section id="yes-to-paid" className={styles.chapter} aria-labelledby="paid-heading">
          <div className={`${styles.container} ${styles.split}`}>
            <div className={styles.chapterHead}>
              <p className={styles.label}>From yes to paid</p>
              <h2 id="paid-heading">The yes is half the deal.</h2>
              <p className={styles.chapterLede}>DealDock carries it until the money lands: terms, posting dates, reminders and payment.</p>
            </div>
            <DealReceipts c={c} />
          </div>
        </section>

        <section id="agencies" className={`${styles.chapter} ${styles.chapterAlt}`} aria-labelledby="agency-heading">
          <div className={`${styles.container} ${styles.split}`}>
            <div className={styles.chapterHead}>
              <p className={styles.label}>For managers and agencies</p>
              <h2 id="agency-heading">Five creators. One desk.</h2>
              <p className={styles.chapterLede}>Each keeps their own inbox, voice and revenue, and sees every reply sent for them.</p>
              <a href="#pricing" className={styles.textLink} data-marketing-cta="agencies">See the Roster plan<ArrowRight size={16} weight="bold" aria-hidden="true" /></a>
            </div>
            <RosterDesk c={c} />
          </div>
        </section>

        <section id="safety" className={styles.chapter} aria-labelledby="safety-heading">
          <div className={styles.container}>
            <div className={styles.chapterHead}>
              <p className={styles.label}>Safety</p>
              <h2 id="safety-heading">Safe for your account and your name.</h2>
              <p className={styles.chapterLede}>Official sign-in, fake deals flagged, your data kept yours.</p>
            </div>
            <TrustCards c={c} />
            <Link href="/security" className={styles.textLink}>Security and data details<ArrowRight size={16} weight="bold" aria-hidden="true" /></Link>
          </div>
        </section>

        <section id="pricing" className={`${styles.chapter} ${styles.chapterAlt}`} aria-labelledby="pricing-heading">
          <div className={styles.container}>
            <div className={styles.chapterHead}>
              <p className={styles.label}>Pricing</p>
              <h2 id="pricing-heading">Simple plans.</h2>
              <p className={styles.chapterLede}>{PILOT_OFFER.short}, then monthly. Cancel anytime.</p>
            </div>
            <div className={styles.plans}>
              {c.plans.map(plan => (
                <article key={plan.id} className={plan.featured ? styles.planFeatured : styles.plan} aria-labelledby={`plan-${plan.id}`}>
                  <div className={styles.planHead}>
                    <h3 id={`plan-${plan.id}`}>{plan.name}</h3>
                    {plan.featured && <span className={styles.planTag}>Start here</span>}
                  </div>
                  <p className={styles.planWho}>{plan.who}</p>
                  <p className={styles.price}><span className={styles.priceAmount}>{formatMoney(PLAN_PRICES[plan.id][c.currency] / 100, c.currency, true)}</span><span className={styles.pricePer}>{c.currency === "USD" ? "USD per month" : "per month"}</span></p>
                  <ul className={styles.planFeatures}>{plan.features.map(feature => <li key={feature}><Check size={16} weight="bold" aria-hidden="true" />{feature}</li>)}</ul>
                  <a href="#apply" className={styles.btn} data-marketing-cta={`pricing_${plan.id}`}>Apply for {plan.name}<Arrow /></a>
                </article>
              ))}
            </div>
            <div className={styles.pricingFoot}>
              <ul className={styles.terms}><li>{PILOT_OFFER.short}</li><li>No setup fee</li><li>Cancel anytime</li><li>Your pilot price stays while you’re subscribed</li></ul>
              <p>{c.roi}</p>
              <p className={styles.pilotNote}><b>Pilot</b> DealDock is in a private pilot. We set up every account with you, a few creators at a time. <Link href="/pilot-terms">Read the pilot terms</Link></p>
              <p className={styles.pilotNote}>{c.locale === "global" ? <>Based in India? <Link href="/in#pricing">See prices in rupees</Link></> : <>Outside India? <Link href="/#pricing">See prices in US dollars</Link></>}</p>
            </div>
          </div>
        </section>

        <section id="faq" className={styles.chapter} aria-labelledby="faq-heading">
          <div className={`${styles.container} ${styles.faqGrid}`}>
            <div className={styles.faqIntro}>
              <p className={styles.label}>FAQ</p>
              <h2 id="faq-heading">Questions, answered.</h2>
              <p>Something else on your mind? <Link href="/contact">Ask the founders</Link>.</p>
            </div>
            <div className={styles.faqList}>
              {c.faq.map(item => (
                <details key={item.q}>
                  <summary>{item.q}<Plus size={20} weight="bold" aria-hidden="true" /></summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="apply" className={`${styles.chapter} ${styles.dark}`} aria-labelledby="apply-heading">
          <div className={`${styles.container} ${styles.applyGrid}`}>
            <div className={styles.applyCopy}>
              <p className={styles.label}>Apply for the pilot</p>
              <h2 id="apply-heading">Your DMs, sorted by <em>money.</em></h2>
              <p>Tell us what you sell. A founder reads every application.</p>
              <ol className={styles.timeline}>
                <li><b>Within two working days</b><span>A personal reply by email from Anshu or Nahush.</span></li>
                <li><b>Day 1</b><span>A 20-minute call. You connect Instagram, and Gmail if you like, and see your Leak Scan.</span></li>
                <li><b>Week 1</b><span>Drafts learn your voice from your edits.</span></li>
                <li><b>Day 30</b><span>Keep going at your pilot price, or cancel and owe nothing.</span></li>
              </ol>
              <figure className={styles.founder}>
                <div className={styles.founderFaces} aria-hidden="true"><Avatar name="Anshu" tone={1} size={48} /><Avatar name="Nahush" tone={0} size={48} /></div>
                <blockquote><p>“Creators run a real business out of apps made for chatting. We’re building DealDock to do the sorting and the chasing, and to leave every decision with you.”</p></blockquote>
                <figcaption>Anshu and Nahush, founders</figcaption>
              </figure>
            </div>
            <PilotApplication online={online} />
          </div>
        </section>
      </main>
      <SiteFooter />
      <StickyApply offer={PILOT_OFFER.short} />
    </div></PilotCurrencyProvider>
  );
}
