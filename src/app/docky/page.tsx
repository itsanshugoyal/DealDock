import type { Metadata } from "next";
import { DockySheet } from "./sheet";

export const metadata: Metadata = { title: "Docky", robots: { index: false, follow: false } };

/** Review page for the mascot: every mood, large. Not linked from the site. */
export default function DockyPage() {
  return <DockySheet />;
}
