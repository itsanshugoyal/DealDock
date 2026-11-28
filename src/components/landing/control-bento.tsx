/* eslint-disable @next/next/no-img-element -- static images; images are unoptimized site-wide */
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { LinkBreak } from "@phosphor-icons/react/dist/ssr/LinkBreak";
import { LockSimple } from "@phosphor-icons/react/dist/ssr/LockSimple";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";
import { GmailLogo, IgLogo } from "./app-logos";
import type { Story } from "./content";
import s from "./landing.module.css";
import c from "./control.module.css";

// Texting at night (Becca Tapert, free under the Unsplash License), the follow-up tile's photo.
const TEXTING = "https://images.unsplash.com/photo-1506377711776-dbdc2f3c20d9?w=900&h=900&fit=crop&crop=faces&q=72";

// The sign-in tile's rows: one lit at a time, the way your accounts connect and what never leaves you.
const SIGN_IN = [
  { icon: <IgLogo className={c.rowLogo} />, name: "Instagram", state: "Official login" },
  { icon: <GmailLogo className={c.rowLogo} />, name: "Gmail", state: "Google sign-in" },
  { icon: <LockSimple className={c.rowLogo} size={22} weight="bold" />, name: "Password", state: "Never shared" },
];

/**
 * The control section as a bento, after Replit's: every tile has its own ground (grainy orange, a photo, light stone,
 * a coral gradient), a mono eyebrow, and a picture made of type and interface rather than icons. Every promise here is
 * backed by the security page and the FAQ; the example names are made up.
 */
/** `embedded`: on the security page, which supplies its own heading and is where the details link points. */
export function ControlBento({ story: st, embedded = false }: { story: Story; embedded?: boolean }) {
  return (
    <>
      {!embedded && <div className={c.head} data-reveal="">
        <p className={s.pricePill}><ShieldCheck size={14} weight="bold" aria-hidden="true" />Privacy and control</p>
        <h2 id="control-heading" className={s.h2}>You stay in control of every word.</h2>
        <p className={s.lede}>DealDock sorts and drafts. You decide what goes out, and you can leave with everything.</p>
      </div>}
      <div className={c.bento} data-reveal="" style={{ "--d": 1 } as CSSProperties}>
        <article className={c.hero}>
          <div className={c.heroText}>
            <p className={c.eyebrow}>Your rule, always</p>
            <h3>Nothing sends until you slide.</h3>
            <p>Docky drafts every reply in your voice, then waits. You read it, slide to send, and still have 5 seconds to undo.</p>
          </div>
          <div className={c.heroArt} aria-hidden="true">
            <span className={c.heroChip}><CheckCircle size={15} weight="fill" />Draft ready · waiting for you</span>
            <img src="/docky/docky.webp" alt="" width={240} height={281} />
          </div>
        </article>

        <article className={`${c.tile} ${c.photo}`}>
          <img className={c.photoBg} src={TEXTING} alt="" width={900} height={900} />
          <div className={c.chat} aria-hidden="true">
            <span className={c.them}>Invoice received, thanks {st.creator}!</span>
            <span className={c.me}><small>Drafted by Docky · not sent</small>Hi {st.contact}! Just checking in on invoice {st.invoice} 🙂</span>
            <span className={c.wait}><i />Waiting for your slide</span>
          </div>
          <div className={c.copy}>
            <p className={c.eyebrow}>Drafts</p>
            <h3>Follow-ups wait for you too.</h3>
            <p>Reminders and invoice nudges are drafts you approve, never automatic.</p>
          </div>
        </article>

        <article className={`${c.tile} ${c.stone}`}>
          <div className={c.copy}>
            <p className={c.eyebrow}>Encrypted</p>
            <h3>Stored encrypted. Never sold.</h3>
            <p>Never used to train public AI, either.</p>
          </div>
          <div className={c.stack} aria-hidden="true">
            <span className={c.card}><b>{st.brand} <small>11:48 PM</small></b>{st.rateAsk}</span>
            <span className={c.dashed}><LockSimple size={15} weight="bold" />Stored encrypted</span>
            <span className={`${c.card} ${c.cipher}`}><code>8f3a c91e b04d 7e2f d61b</code><code>09ac 55f0 3be1 a7c2 e418</code></span>
          </div>
        </article>

        <article className={`${c.tile} ${c.list}`}>
          <div className={c.copy}>
            <p className={c.eyebrow}>Official sign-in</p>
            <h3>Your password never reaches us.</h3>
            <p>Instagram and Gmail connect through their own login.</p>
          </div>
          <ul className={c.rows} aria-hidden="true">
            {SIGN_IN.map(({ icon, name, state }, i) => <li key={name} style={{ "--i": i } as CSSProperties}>{icon}{name}<em>{state}</em></li>)}
          </ul>
        </article>

        <article className={`${c.tile} ${c.coral}`}>
          <div className={c.copy}>
            <p className={c.eyebrow}>Your data, your call</p>
            <h3>Leave with everything.</h3>
            <p>Disconnect, export or delete it all, anytime.</p>
          </div>
          <div className={c.export} aria-hidden="true">
            <p><DownloadSimple size={15} weight="bold" />Your export is ready<small>3 files</small></p>
            <span>messages.zip<em>12.4 MB</em><CheckCircle size={15} weight="fill" /></span>
            <span>deals.csv<em>48 KB</em><CheckCircle size={15} weight="fill" /></span>
            <span>invoices.pdf<em>1.1 MB</em><CheckCircle size={15} weight="fill" /></span>
          </div>
          <div className={c.pills} aria-hidden="true">
            <span><LinkBreak size={15} weight="bold" />Disconnect</span>
            <span><DownloadSimple size={15} weight="bold" />Export</span>
            <span><Trash size={15} weight="bold" />Delete</span>
          </div>
        </article>
      </div>
      {!embedded && <p className={c.more}><Link href="/security" className={s.textLink}>Security and data details<ArrowRight size={15} weight="bold" aria-hidden="true" /></Link></p>}
    </>
  );
}
