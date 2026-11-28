import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { CreditCard } from "@phosphor-icons/react/dist/ssr/CreditCard";
import { Gift } from "@phosphor-icons/react/dist/ssr/Gift";
import { LockSimple } from "@phosphor-icons/react/dist/ssr/LockSimple";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import { XCircle } from "@phosphor-icons/react/dist/ssr/XCircle";
import { PILOT_OFFER, PLAN_PRICES, formatMoney } from "@/lib/marketing-pricing.mjs";
import { IndiaBar } from "@/components/site/page-bars";
import { PilotCurrencyProvider } from "@/components/site/pilot-currency";
import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";
import type { SiteContent } from "@/components/site/site-content";
import base from "@/components/site/site.module.css";
import type { LandingContent } from "./content";
import { ApplySheet } from "./apply-sheet";
import { Hero } from "./hero";
import { PlanCards } from "./plan-picker";
import { RosterSection } from "./roster";
import { RevealObserver } from "./motion";
import { StoryPhone } from "./story-phone";
import { ControlBento } from "./control-bento";
import { TypeCanvas } from "./type-canvas";
import s from "./landing.module.css";

function Arrow() {
  return <span className={s.btnArrow} aria-hidden="true"><ArrowRight size={16} weight="bold" /></span>;
}

// The pilot terms, said once under the plan cards.
const PRICE_PROMISES = [
  { icon: Gift, text: PILOT_OFFER.short },
  { icon: CreditCard, text: "No card to start" },
  { icon: XCircle, text: "Cancel anytime" },
  { icon: LockSimple, text: "Pilot price kept while you stay" },
];

// Solo carries the core features; each bigger plan lists only what it adds.
const PLAN_COPY: Record<string, { who: string; people: number; includes: string; features: string[] }> = {
  solo: { who: "For a creator who runs their own inbox.", people: 1, includes: "Includes", features: ["Instagram DMs and Gmail in one inbox", "A label and value estimate on every message", "Replies in your voice, sent when you slide", "Scam warnings, follow-ups and deal tracking"] },
  studio: { who: "For a creator with an assistant.", people: 2, includes: "Everything in Solo, plus", features: ["A second seat for your assistant", "See who sent each reply"] },
  roster: { who: "For managers running up to five creators.", people: 5, includes: "Everything in Studio, plus", features: ["Up to 5 Instagram accounts", "Manager seats", "Each creator keeps their own voice and revenue"] },
};

export function LandingPage({ site, c }: { site: SiteContent; c: LandingContent }) {
  const online = Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
  const plans = site.plans.map(plan => {
    const amount = PLAN_PRICES[plan.id][site.currency] / 100, copy = PLAN_COPY[plan.id];
    const unit = plan.id === "roster" ? `Billed monthly · about ${formatMoney(amount / 5, site.currency, true)} per creator` : "Billed monthly";
    return { ...plan, ...copy, unit, price: formatMoney(amount, site.currency, true) };
  });
  return (
    <PilotCurrencyProvider currency={site.currency}>
      <div className={`${base.page} ${s.landing}`} lang={site.lang} data-landing="">
        <a className={base.skipLink} href="#main">Skip to content</a>
        {site.locale === "global" && <IndiaBar />}
        <SiteHeader home={site.path} onPage />
        <RevealObserver />

        <main id="main" tabIndex={-1}>
          <Hero hero={c.hero} />

          {/* WHAT IT CATCHES */}
          <section id="what-it-catches" className={s.section} aria-labelledby="catch-heading">
            <div className={s.wrap}>
              <div className={s.head} data-reveal="">
                <h2 id="catch-heading" className={s.h2}>It knows a brand deal from a fan message.</h2>
                <p className={s.lede}>Every DM and brand email gets one of six labels, and each kind is handled its own way. Pick a kind to see what DealDock does with it.</p>
              </div>
              <div data-reveal="" style={{ "--d": 1 } as CSSProperties}><TypeCanvas items={c.catches} /></div>
            </div>
          </section>

          {/* HOW IT WORKS (dark) */}
          <section id="how-it-works" className={s.storySection} aria-labelledby="how-heading">
            <div className={s.wrap}>
              <div className={s.head} data-reveal="">
                <h2 id="how-heading" className={s.h2}>What happens to one brand DM</h2>
                <p className={s.lede}>Follow a single message from a Requests folder at midnight to the payment landing in February.</p>
              </div>
            </div>
            <StoryPhone story={c.story} />
            <div className={s.wrap}>
              <div className={s.ctaBand} data-reveal="">
                <div>
                  <h3>See what your own DMs were worth.</h3>
                  <p>Your onboarding call opens your Leak Scan: every brand deal, lead and sale from the last 30 days that never got a reply, added up.</p>
                </div>
                <div className={s.ctaSide}>
                  <a href="#apply" className={s.btnLight} data-marketing-cta="story">Apply for the pilot<Arrow /></a>
                  <span>Free for 30 days · no card</span>
                </div>
              </div>
            </div>
          </section>

          {/* MANAGERS */}
          <section id="agencies" className={`${s.section} ${s.alt}`} aria-labelledby="agency-heading">
            <RosterSection creators={c.creators} />
          </section>

          {/* TRUST */}
          <section id="safety" className={s.section} aria-labelledby="control-heading">
            <div className={s.wrap}><ControlBento story={c.story} /></div>
          </section>

          {/* PRICING */}
          <section id="pricing" className={s.section} aria-labelledby="pricing-heading">
            <div className={s.wrap}>
              <div className={s.centerHead} data-reveal="">
                <p className={s.pricePill}><LockSimple size={14} weight="bold" aria-hidden="true" />Pilot pricing</p>
                <h2 id="pricing-heading" className={s.h2}>Free for your first 30 days.</h2>
                <p className={s.lede}>Then one flat monthly price, with no cut of your deals.</p>
              </div>
              <div data-reveal=""><PlanCards plans={plans} perMonth={site.currency === "USD" ? "USD per month" : "per month"} /></div>
              <ul className={s.priceStrip} data-reveal="" style={{ "--d": 1 } as CSSProperties}>
                {PRICE_PROMISES.map(({ icon: Icon, text }) => <li key={text}><Icon size={18} weight="bold" aria-hidden="true" />{text}</li>)}
              </ul>
            </div>
          </section>

          {/* APPLY */}
          {/* the closing line over a quiet dot field; the dots near the pointer light up orange (--mx/--my, motion.tsx) */}
          <section id="apply" className={`${s.section} ${s.alt} ${s.closeSection}`} aria-labelledby="apply-heading" data-spot="">
            <div className={s.wrap}>
              <div className={s.closer} data-reveal="">
                <h2 id="apply-heading" className={s.closeTitle}>Be ready for the next brand DM.</h2>
                <p className={s.lede}>Thirty days free. Tell us what you sell and we’ll open your Leak Scan on the first call.</p>
                <a href="#apply" className={s.btnPrimary} data-marketing-cta="closer">Apply for the pilot<Arrow /></a>
                <p className={s.closeNote}>No card · nothing sends without your slide · cancel anytime</p>
              </div>
            </div>
          </section>
          {/* FAQ */}
          <section id="faq" className={s.section} aria-labelledby="faq-heading">
            <div className={`${s.wrap} ${s.faqGrid}`}>
              <div>
                <h2 id="faq-heading" className={s.h2}>Questions before you apply</h2>
                <p className={s.lede}>Something else on your mind? <Link href="/contact">Ask the founders</Link>.</p>
              </div>
              <div className={s.faqList} data-reveal="" style={{ "--d": 1 } as CSSProperties}>
                {site.faq.map(item => (
                  <details key={item.q}>
                    <summary>{item.q}<span aria-hidden="true"><Plus size={16} weight="bold" /></span></summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

        </main>
        <ApplySheet online={online} />
        <SiteFooter home={site.path} />
      </div>
    </PilotCurrencyProvider>
  );
}
