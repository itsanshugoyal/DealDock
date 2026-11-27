// Section visuals built from the page's six objects: DM bubble, value chip, draft bubble, receipt card, sticky note and slide.
// Every visual follows the same example deal from the content file. Each figure is named for screen readers;
// its mock interface is hidden from them.
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Check } from "@phosphor-icons/react/dist/ssr/Check";
import { Checks } from "@phosphor-icons/react/dist/ssr/Checks";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { CountUp } from "./count-up";
import { Avatar, LABELS, Verified } from "./primitives";
import type { SiteContent } from "./site-content";
import styles from "./preview.module.css";

export function WorksWith() {
  return (
    <ul className={styles.works} aria-label="Works with">
      <li><i data-live="" />Instagram DMs</li>
      <li><i data-live="" />Gmail</li>
      <li><i />TikTok<span>Coming soon</span></li>
    </ul>
  );
}

export function LeakTotal({ c }: { c: SiteContent }) {
  return (
    <figure className={styles.leak} aria-label={`Example Leak Scan of the last 30 days: ${c.leak.parts.map(part => `${part.text}, ${part.count} messages, ${part.shown}`).join("; ")}.`}>
      <div aria-hidden="true">
        <p className={styles.leakNumber}><CountUp value={c.leak.total} currency={c.currency} /></p>
        <p className={styles.leakSub}>estimated value of brand deals, clients and sales that never got a reply</p>
        <ul className={styles.leakChips}>
          {c.leak.parts.map(part => <li key={part.label}><i style={{ background: LABELS[part.label].color }} />{part.text}<span>{part.count}</span><b>{part.shown}</b></li>)}
        </ul>
      </div>
      <figcaption className={styles.caption}>Example scan with made-up numbers. Yours uses your own messages and prices.</figcaption>
    </figure>
  );
}

/* "How it works": one focused object per move, all from the same deal. */
export function SortStage({ c }: { c: SiteContent }) {
  return (
    <div className={styles.stage}>
      {c.hero.rows.filter(row => row.value).slice(0, 2).map((row, index) => (
        <div key={row.name} className={styles.stageRow} data-top={index === 0 || undefined}>
          <Avatar name={row.name} tone={row.tone} size={32} />
          <span className={styles.stageText}><b>{row.name}{row.verified && <Verified />}</b><span className={styles.hchip}><i style={{ background: LABELS[row.label].color }} />{row.value}</span></span>
        </div>
      ))}
      <p className={styles.sfold}>{c.hero.fold}</p>
    </div>
  );
}

export function DraftStage({ c }: { c: SiteContent }) {
  return (
    <div className={styles.stage}>
      <p className={styles.bubbleDraft}>{c.hero.draft}</p>
      <p className={styles.metaRow}><span>In your voice</span><span>Not sent</span></p>
    </div>
  );
}

export function SlideStage({ c }: { c: SiteContent }) {
  return (
    <div className={styles.stage}>
      <p className={styles.miniSlide}><span><ArrowRight size={18} weight="bold" /></span>Slide to send</p>
      <p className={styles.sentNote}><Checks size={16} weight="bold" />Sent to {c.deal.brand}, with a few seconds to undo</p>
    </div>
  );
}

export function PaidStage({ c }: { c: SiteContent }) {
  return (
    <div className={styles.stage}>
      <p className={styles.miniReceipt} data-late=""><b>{c.deal.late}</b>Reminder drafted in your voice</p>
      <p className={styles.miniReceipt} data-paid=""><b><Check size={14} weight="bold" /> Paid</b>{c.deal.paid}</p>
    </div>
  );
}

export function DealReceipts({ c }: { c: SiteContent }) {
  return (
    <figure className={styles.receipts} aria-label={`Example deal from yes to paid with ${c.deal.brand}: terms captured (${c.deal.terms}); posted (${c.deal.posted}); ${c.deal.late}, with a reminder drafted in your voice; then ${c.deal.paid}.`}>
      <div aria-hidden="true">
        <p className={styles.dIn}>Locked! Send us the terms 🙌<span>{c.deal.brand}</span></p>
        <div className={styles.receipt}><span className={styles.rStep}>1</span><p><b>Terms captured from the chat</b>{c.deal.terms}</p></div>
        <div className={styles.receipt}><span className={styles.rStep}>2</span><p><b>Posted</b>{c.deal.posted}</p></div>
        <div className={styles.receipt} data-late=""><span className={styles.rStep}>3</span><p><b>{c.deal.late}</b><span className={styles.rDraft}>{c.deal.reminder}</span><em>Draft in your voice · waits for your slide</em></p></div>
        <div className={styles.receipt} data-paid=""><span className={styles.rStep}><Check size={14} weight="bold" /></span><p><b>Paid</b>{c.deal.paid}</p></div>
      </div>
      <figcaption className={styles.caption}>Example deal. Invoices are coming soon.</figcaption>
    </figure>
  );
}

export function RosterDesk({ c }: { c: SiteContent }) {
  const first = c.creators[0].name.split(" ")[0];
  return (
    <figure className={styles.desk} aria-label={`Example agency desk: ${c.creators.map(creator => `${creator.name}, ${creator.waiting} waiting, ${creator.earned} paid this month`).join("; ")}.`}>
      <div aria-hidden="true">
        <p className={styles.screenBar}><b>Roster</b><span>{c.creators.length} creators · most waiting first</span></p>
        <p className={styles.deskHead}><span>Creator</span><span>Waiting, est.</span><span>Paid this month</span></p>
        {c.creators.map(creator => (
          <div key={creator.name} className={styles.deskRow}>
            <span className={styles.creatorWho}><Avatar name={creator.name} tone={creator.tone} size={36} /><span><b>{creator.name}</b>{creator.niche}</span></span>
            <b>{creator.waiting}</b>
            <b className={styles.money}>{creator.earned}</b>
          </div>
        ))}
        <p className={styles.sentNote}><Checks size={16} weight="bold" />Reply sent for {first} by a manager · {first} can see it</p>
      </div>
      <figcaption className={styles.caption}>Example roster with made-up creators and amounts.</figcaption>
    </figure>
  );
}

function Can({ items }: { items: [boolean, string][] }) {
  return <ul className={styles.can}>{items.map(([ok, text]) => <li key={text} data-no={ok ? undefined : ""}>{ok ? <Check size={15} weight="bold" aria-hidden="true" /> : <X size={15} weight="bold" aria-hidden="true" />}{text}</li>)}</ul>;
}

export function TrustCards({ c }: { c: SiteContent }) {
  const fee = c.currency === "INR" ? "₹1,499" : "$49";
  return (
    <div className={styles.trust}>
      <div className={styles.trustCard}>
        <p><b>Official sign-in, never your password</b>Instagram connects through Meta’s official API, Gmail through Google’s sign-in.</p>
        <Can items={[[true, "Reads your DMs and inbox"], [true, "Sends only what you approve"], [false, "Never sees your password"]]} />
      </div>
      <figure className={`${styles.trustCard} ${styles.scam}`} aria-label="Example scam warning: a fake ambassador offer asks for a registration fee and a login on an outside portal. DealDock stamps it as a possible scam and writes no draft.">
        <div aria-hidden="true">
          <p className={styles.scamMsg}>“Congrats, you’re our new ambassador! Pay the {fee} registration fee and log in to our creator portal to unlock your contract.”</p>
          <span className={styles.stamp}>Possible scam</span>
          <p className={styles.scamWhy}>Asks for a fee and an outside login. No draft written.</p>
        </div>
      </figure>
      <div className={styles.trustCard}>
        <p><b>Your data stays yours</b>Stored encrypted and kept separate for each creator.</p>
        <Can items={[[true, "Never sold"], [true, "Never used to train public AI models"], [true, "Export or delete it anytime"]]} />
      </div>
    </div>
  );
}
