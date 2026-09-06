/** Two conversations meeting at a dock. A local, decorative brand mark. */
export function DockMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M6 5h10c7 0 11 4 11 11S23 27 16 27H6V5Z" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 16h12M13 11l5 5-5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}
