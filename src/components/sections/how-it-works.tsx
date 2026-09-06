import { ArrowUpRight } from "@phosphor-icons/react";

const steps = [
  { number: "01", title: "Find the conversations that matter.", body: "Connect during onboarding. DealDock surfaces commerce enquiries and prioritizes them by estimated deal value.", note: "From inbox noise to a place to start" },
  { number: "02", title: "Make the reply your own.", body: "Start with a draft in your voice. Review it, change what you need, then approve the send yourself.", note: "A first draft. Your final word." },
  { number: "03", title: "Keep a record of what closes.", body: "When a conversation becomes a sale, record the amount and keep it connected to the original thread.", note: "Estimated opportunity → recorded outcome" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="m-section m-container">
      <div className="m-rule grid gap-8 pt-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <div>
          <p className="m-kicker mb-5">02 / The everyday workflow</p>
          <h2 className="m-title">Less digging.<br /><em>More following through.</em></h2>
          <a href="#features" className="m-text-link mt-7">You stay in control <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <ol className="space-y-8">
          {steps.map((step) => (
            <li key={step.number} className="m-rule grid grid-cols-[2rem_1fr] gap-4 pt-6 first:border-t-0 first:pt-0">
              <span className="m-brass font-mono text-xs pt-1">{step.number}</span>
              <div><h3 className="text-lg font-medium tracking-tight">{step.title}</h3>
                <p className="m-muted mt-3 max-w-lg text-[14px] leading-[1.8]">{step.body}</p>
                <p className="m-muted mt-4 font-mono text-[10px] uppercase tracking-wider">{step.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
