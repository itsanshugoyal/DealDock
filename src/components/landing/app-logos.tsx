// The two inboxes DealDock reads, as small app logos (hero bubbles, the inbox section's rows and chats).
export const IgLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <defs><radialGradient id="app-ig" cx="30%" cy="107%" r="150%"><stop offset="0" stopColor="#FD5" /><stop offset=".5" stopColor="#FF543E" /><stop offset="1" stopColor="#C837AB" /></radialGradient></defs>
    <rect width="24" height="24" rx="6.5" fill="url(#app-ig)" /><rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.8" /><circle cx="16.3" cy="7.7" r="1" fill="#fff" />
  </svg>
);

export const GmailLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 -3 24 24" aria-hidden="true">
    <path d="M1.6 18h3.8V8.8L0 4.7v11.7C0 17.3.7 18 1.6 18z" fill="#4285F4" /><path d="M18.6 18h3.8c.9 0 1.6-.7 1.6-1.6V4.7l-5.4 4.1z" fill="#34A853" />
    <path d="M18.6 1.7v7.1L24 4.7V2.5c0-2-2.3-3.1-3.9-1.9z" fill="#FBBC04" /><path d="M5.4 8.8V1.7L12 6.6l6.6-4.9v7.1L12 13.7z" fill="#EA4335" />
    <path d="M0 2.5v2.2l5.4 4.1V1.7L3.9.6C2.3-.6 0 .5 0 2.5z" fill="#C5221F" />
  </svg>
);

export const AppLogo = ({ app, className }: { app: "ig" | "gmail"; className?: string }) =>
  app === "ig" ? <IgLogo className={className} /> : <GmailLogo className={className} />;
