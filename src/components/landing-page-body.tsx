"use client";

import { LocaleProvider } from "@/lib/locale-context";
import { ApplyModalProvider } from "@/lib/apply-modal-context";
import { ApplyModal } from "@/components/sections/apply-modal";
import { LocaleBanner } from "@/components/shared/locale-banner";
import { FloatingNav } from "@/components/sections/floating-nav";
import { Hero } from "@/components/sections/hero";
import { SocialProofBar } from "@/components/sections/social-proof-bar";
import { ProblemSection } from "@/components/sections/problem-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FeatureBento } from "@/components/sections/feature-bento";
import { RevenueLedgerShowcase } from "@/components/sections/revenue-ledger-showcase";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import type { LocaleContent } from "@/data/locales/types";

export function LandingPageBody({ content }: { content: LocaleContent }) {
  return (
    <LocaleProvider content={content}>
      <ApplyModalProvider>
        <ApplyModal />
        <LocaleBanner />
        <main>
          <FloatingNav />
          <Hero />
          <SocialProofBar />
          <ProblemSection />
          <HowItWorks />
          <FeatureBento />
          <RevenueLedgerShowcase />
          <Pricing />
          <Testimonials />
          <Faq />
          <FinalCta />
          <Footer />
        </main>
      </ApplyModalProvider>
    </LocaleProvider>
  );
}
