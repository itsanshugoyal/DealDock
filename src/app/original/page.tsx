import type { Metadata } from "next";
import { LandingPageBody } from "@/components/landing-page-body";
import { inLocale } from "@/data/locales/in";

export const metadata: Metadata = { title: "Original design archive | DealDock", description: "The original DealDock marketing design, retained for comparison. Claims and figures are unverified examples.", robots: { index: false, follow: false } };
export default function OriginalPage() { return <LandingPageBody content={inLocale} />; }
