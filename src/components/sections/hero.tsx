"use client";

import { ArrowDown, ArrowUpRight, Hand } from "@phosphor-icons/react";
import { RevenueInboxMockup } from "@/components/mockups/revenue-inbox-mockup";
import { useApplyModal } from "@/lib/apply-modal-context";

export function Hero() {
  const { openModal } = useApplyModal();
  return (
    <section className="m-container pt-12 pb-10 lg:pt-20 lg:pb-14">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <p className="m-kicker mb-7 flex items-center gap-3"><span className="h-1.5 w-1.5 bg-current" />Instagram conversations. Real opportunities.</p>
          <h1 className="m-hero-title">Good enquiries<br className="hidden sm:block" /> deserve<br className="hidden lg:block" /> <em>a reply.</em></h1>
          <p className="m-muted mt-7 max-w-[29rem] text-[17px] leading-[1.75]">
            Find the buying conversations buried in your DMs. Prioritize by estimated value, draft in your voice, and keep track of what closes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <button className="m-button" onClick={() => openModal()}>Apply for the pilot <ArrowUpRight size={18} aria-hidden="true" /></button>
            <a href="#how-it-works" className="m-text-link">See the workflow <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
          <p className="m-muted mt-6 flex max-w-sm items-start gap-2 text-[12px] leading-relaxed">
            <Hand size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            You approve every send. DealDock never auto-sends.
          </p>
        </div>
        <div className="m-hero-preview relative min-w-0">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.12em] m-muted">
            <span>A little order for your inbox</span><span>Illustrative example</span>
          </div>
          <RevenueInboxMockup />
          <p className="m-preview-caption mt-4 border-l pl-4 text-[12px] leading-relaxed">
            The valuable conversation gets your attention.<br />The final word is always yours.
          </p>
        </div>
      </div>
      <div className="m-rule mt-14 flex flex-col justify-between gap-4 pt-6 sm:flex-row sm:items-center lg:mt-20">
        <p className="m-kicker">Built around your business</p>
        <p className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] sm:gap-x-9"><span>Coaching</span><span>Courses & cohorts</span><span>Brand collaborations</span></p>
      </div>
    </section>
  );
}
