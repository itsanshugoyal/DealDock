// Small pieces of the app's UI, shared by the server visuals and the client hero demo.
import styles from "./preview.module.css";

// The app's avatar gradients, minus the green one: on this site green only ever means money.
const GRADIENTS = [["#FF9A62", "#FF4E7A"], ["#7F8CFF", "#5B4FD6"], ["#2CC8E0", "#4F63E8"], ["#FFC145", "#FF6A3D"], ["#B58BFF", "#E2489B"], ["#68B5FF", "#2B4FD8"], ["#FF7FB0", "#FF9248"], ["#F7A35C", "#C2416B"]];
export const LABELS = {
  brand: { text: "Brand deal", color: "#2F5BEA" },
  coaching: { text: "Coaching lead", color: "#0B8A7E" },
  course: { text: "Course question", color: "#C25E00" },
  other: { text: "Other sale", color: "#C2316D" },
  check: { text: "Check", color: "#5B4FD6" },
  fan: { text: "Fan", color: "#9A9A93" },
  spam: { text: "Spam", color: "#9A9A93" },
} as const;
export type Label = keyof typeof LABELS;

export function Avatar({ name, tone, size = 40 }: { name: string; tone: number; size?: number }) {
  const [from, to] = GRADIENTS[tone % GRADIENTS.length];
  const initials = name.split(/\s+/).map(word => word[0]).join("").slice(0, 2).toUpperCase();
  return <span className={styles.avatar} style={{ width: size, height: size, fontSize: Math.round(size * 0.38), background: `linear-gradient(140deg, ${from}, ${to})` }}>{initials}</span>;
}

export function Verified() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className={styles.verified} aria-hidden="true">
      <path fill="#2E8BFF" d="M12 1.8l2.4 1.7 2.9-.2 1 2.7 2.4 1.6-.6 2.9 1.2 2.6-1.9 2.2-.1 2.9-2.8.8-1.7 2.4-2.8-.8-2.8.8-1.7-2.4-2.8-.8-.1-2.9L2.7 12.2l1.2-2.6-.6-2.9 2.4-1.6 1-2.7 2.9.2z" />
      <path d="M8 12.3l2.6 2.6L16.2 9.3" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

