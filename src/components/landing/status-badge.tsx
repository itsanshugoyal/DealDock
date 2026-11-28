import type { ReactNode } from "react";
import b from "./status-badge.module.css";

export type StatusTone = "blue" | "teal";

/** A static status label: a soft pill with a round icon well. Not a button. */
export function StatusBadge({ tone, children }: { tone: StatusTone; children: ReactNode }) {
  return (
    <em className={b.badge} data-tone={tone}>
      <span className={b.icon} aria-hidden="true">{tone === "blue" ? <BriefcaseIcon /> : <ContactPlusIcon />}</span>
      <span className={b.text}>{children}</span>
    </em>
  );
}

/** A new collaboration: a solid briefcase with a light seam and clasp. */
function BriefcaseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" focusable="false">
      <path d="M5 3.4V2.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v.9" fill="none" stroke="#5272AD" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="1" y="3.4" width="12" height="9.1" rx="1.9" fill="#5272AD" />
      <rect x="1" y="7.1" width="12" height="1.1" fill="#AFC3EB" />
      <rect x="5.9" y="6.1" width="2.2" height="3.1" rx="0.6" fill="#F5F8FF" />
    </svg>
  );
}

/** A new lead: a contact with a plus badge. */
function ContactPlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" focusable="false">
      <circle cx="5.4" cy="4.3" r="2.6" fill="#08766D" />
      <path d="M0.8 12.6c0-2.7 2.1-4.5 4.6-4.5s4.6 1.8 4.6 4.5z" fill="#08766D" />
      <circle cx="10.5" cy="10.3" r="3" fill="#5DAF9C" stroke="#FCFFFE" strokeWidth="1.1" />
      <path d="M10.5 8.8v3M9 10.3h3" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
