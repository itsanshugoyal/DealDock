import { ArrowDownRight } from "@phosphor-icons/react";

export function ProblemSection() {
  return (
    <section className="m-section m-container">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <div>
          <p className="m-kicker mb-5">01 / The missed conversation</p>
          <h2 className="m-title">A busy inbox.<br /><em>A quiet opportunity.</em></h2>
          <p className="m-muted mt-6 max-w-sm text-[15px] leading-relaxed">Story reactions. Quick questions. Someone asking about your next programme. They all arrive in the same place.</p>
        </div>
        <div className="m-message-study">
          <p className="m-kicker mb-5">Sound familiar?</p>
          <div className="m-noise-message"><span>Story reply</span><span>Loved this one.</span></div>
          <div className="m-enquiry-message">
            <div className="flex items-center justify-between gap-3"><span className="m-kicker">A potential customer</span><ArrowDownRight size={22} aria-hidden="true" /></div>
            <p className="mt-4 text-xl font-medium leading-snug sm:text-2xl">“Is your next cohort still open?<br className="hidden sm:block" /> I’d love to join.”</p>
          </div>
          <div className="m-noise-message"><span>New message</span><span>Where was this filmed?</span></div>
          <p className="m-muted mt-5 text-xs leading-relaxed">Illustrative messages. The aim is simple: give buying enquiries the attention they deserve.</p>
        </div>
      </div>
    </section>
  );
}
