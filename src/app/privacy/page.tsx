import type { Metadata } from "next";
import { marketingPageMetadata } from "@/lib/marketing-metadata";
import Link from "next/link";
import { DocSummary, MarketingDocument, type DocSection } from "@/components/site/marketing-document";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = marketingPageMetadata("/privacy", "Privacy Policy | DealDock", "What DealDock collects from your Instagram, Gmail and account, why, who processes it, where it is stored, and how to delete it.");

const PROVIDERS = [
  ["OpenAI", "Sorting messages, estimating value and drafting replies (our main AI provider)."],
  ["Groq", "The same AI tasks, only when OpenAI is unavailable."],
  ["Meta (Instagram)", "Receiving your Instagram messages and sending the replies you approve."],
  ["Google (Gmail)", "Reading and sending email for a Gmail inbox you connect."],
  ["Clerk", "Sign-in, account security and team invitations."],
  ["Railway", "Hosting our servers, database and job queue in Singapore."],
  ["Vercel", "Hosting the DealDock app and this website, in Singapore for the app."],
  ["Razorpay", "Processing payments in INR for customers in India."],
  ["Paddle", "Processing payments in USD as merchant of record for customers outside India."],
  ["ElevenLabs", "Only if you turn on voice notes: creating voice replies in your voice and transcribing voice notes."],
] as const;

const SECTIONS: DocSection[] = [
  { id: "what-we-collect", title: "What we collect", body: <>
    <ul>
      <li><strong>Account details:</strong> your name, email, sign-in details and the team members you invite.</li>
      <li><strong>Instagram data, once you connect a professional account:</strong> your account’s username and ID, the direct messages you send and receive, and the senders’ public profile details (name, username, profile picture, follower count, verified status). If you turn on comment leads, also comments on your own posts.</li>
      <li><strong>Gmail data, only if you connect an inbox:</strong> your email address, and the emails and threads in that inbox from the last 30 days onwards. Attachments are opened when you view them and are not stored.</li>
      <li><strong>What you create in DealDock:</strong> labels, value estimates, drafts and edits, the replies you approve, the writing-style rules DealDock learns, deals, deliverables, revenue records, invoices and payment reminders.</li>
      <li><strong>Voice, only if you opt in to voice notes:</strong> the short recordings you make (starting with your spoken consent), the voice created from them, and voice notes you send or receive.</li>
      <li><strong>Payment status:</strong> your plan, invoices and whether payments succeeded. Card, UPI and bank details go straight to Razorpay or Paddle; we never see or store them.</li>
      <li><strong>Usage and device data:</strong> basic logs such as IP address, browser, pages used and errors, and a push-notification subscription if you allow notifications.</li>
    </ul>
  </> },
  { id: "why-we-use-it", title: "Why we use it", body: <>
    <ul>
      <li>To provide DealDock: syncing your messages, sorting them, estimating their value, drafting replies in your style, tracking deals and revenue, drafting invoices and reminders, and sending notifications.</li>
      <li>To send a message only after you or your team approve it.</li>
      <li>To bill you, keep accounts secure, prevent abuse, give support and meet legal duties.</li>
      <li>To improve DealDock for you, for example by learning from the edits you make to drafts in your own workspace.</li>
    </ul>
    <p>We do not sell personal data, use it for advertising, or share it with data brokers. We process it on the basis of your consent when you connect an account, our contract with you, and our legal obligations. You can withdraw consent at any time by disconnecting an account or deleting your data, as described below.</p>
  </> },
  { id: "ai-processing", title: "AI processing", body: <>
    <p>To sort a message or draft a reply, DealDock sends the relevant message text and context to our AI provider, OpenAI (or Groq if OpenAI is unavailable). This is done only to produce labels, estimates and drafts for your own workspace. We do not use your messages to train AI models, and we use these providers’ business APIs, whose terms do not allow them to train their models on what we send. Drafts are suggestions: nothing is sent until a person reviews and approves it.</p>
  </> },
  { id: "google-user-data", title: "Google user data", body: <>
    <p>DealDock’s use and transfer of information received from Google APIs to any other app will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
    <ul>
      <li>We ask for permission to read your Gmail messages (to show, sort and draft replies to them in DealDock) and to send email (only replies you approve). We ask only for these.</li>
      <li>Gmail data is used only to provide these features to you. It is never used to train AI models, never sold, never used for advertising, and never transferred to others except the providers listed below to run the service, or where the law requires.</li>
      <li>No person at DealDock reads your Gmail data unless you ask us to (for example for support), it is needed for security or to investigate abuse, or the law requires it.</li>
    </ul>
  </> },
  { id: "instagram-data", title: "Instagram data", body: <>
    <p>We access Instagram only through Meta’s official API, with the permissions you approve on Meta’s own screen. We never ask for your Instagram password. We use Instagram data only to provide DealDock to you, in line with Meta’s Platform Terms, and you can ask us to delete it at any time (see <Link href="/data-deletion">data deletion</Link>).</p>
  </> },
  { id: "who-processes-your-data", title: "Who processes your data", body: <>
    <p>We share data only with the service providers we need to run DealDock, under contracts that limit their use of it:</p>
    <ul>
      {PROVIDERS.map(([name, purpose]) => <li key={name}><strong>{name}:</strong> {purpose}</li>)}
    </ul>
    <p>We may also disclose data if the law or a valid legal request requires it, or as part of a merger or sale of our business, in which case this policy continues to protect it.</p>
  </> },
  { id: "where-data-is-stored", title: "Where data is stored", body: <>
    <p>DealDock’s database and servers are in Singapore. Some providers above, such as OpenAI, may process data in other countries, including the United States. When data leaves India or your country, we rely on these providers’ contractual commitments and security measures, including standard contractual clauses where GDPR applies.</p>
  </> },
  { id: "how-long-we-keep-it", title: "How long we keep it", body: <>
    <ul>
      <li>While your account is active, we keep your messages and records so DealDock can work.</li>
      <li>When you delete your account, everything in your workspace is permanently deleted 7 days later (you can cancel during those 7 days).</li>
      <li>When you cancel a subscription, your workspace becomes read-only at the end of the paid period and is permanently deleted 30 days after that.</li>
      <li>Short-lived voice clips are deleted within 24 hours. Backups expire within {"[backup period]"}.</li>
      <li>Razorpay and Paddle keep their own payment records for as long as tax and payment laws require.</li>
    </ul>
  </> },
  { id: "your-rights-and-choices", title: "Your rights and choices", body: <>
    <p>Under India’s Digital Personal Data Protection Act, 2023, and, where they apply, the GDPR and UK GDPR, you can:</p>
    <ul>
      <li><strong>access and export</strong> your data: Settings → Your data → Download everything (or Download revenue as CSV);</li>
      <li><strong>correct</strong> your details in the app, or ask us to;</li>
      <li><strong>delete</strong> your data: Settings → Your data → Delete account, or email us (see <Link href="/data-deletion">data deletion</Link>);</li>
      <li><strong>withdraw consent</strong> by disconnecting Instagram or Gmail, turning off voice learning or voice notes, or deleting your account;</li>
      <li><strong>object or restrict</strong> processing, nominate someone to act for you, and complain to us or to your data protection authority (in India, the Data Protection Board of India).</li>
    </ul>
    <p>Email <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> for any request. We reply within 30 days.</p>
  </> },
  { id: "disconnecting-instagram-or-gmail", title: "Disconnecting Instagram or Gmail", body: <>
    <p>You can disconnect Instagram or Gmail at any time in Settings. DealDock immediately deletes its access tokens and stops syncing that account. Messages already synced stay in your workspace until you delete them or your account. You can also remove DealDock’s access from Instagram’s or Google’s own settings.</p>
  </> },
  { id: "cookies", title: "Cookies", body: <>
    <p>The DealDock app uses only the cookies sign-in and security need (set by Clerk) and stores a few preferences, such as theme, in your browser. It has no advertising or analytics cookies. This website uses Vercel Web Analytics and Google Tag Manager to count visits; we do not use advertising pixels or session replay. Paddle may set cookies needed for its checkout.</p>
  </> },
  { id: "security", title: "Security", body: <>
    <p>All connections use HTTPS. Instagram and Gmail access tokens are encrypted with AES-256 before they are stored. Each workspace’s data is kept separate, and only you and the team members you invite can see it. No method is perfectly secure; if a breach affects your data, we will tell you and the authorities as the law requires.</p>
  </> },
  { id: "website-visitors-and-pilot-applications", title: "Website visitors and pilot applications", body: <>
    <p>If you apply for the pilot on this website, we collect your email, Instagram username, what you sell, an optional note and the price you were shown, to reply about the pilot. Applications are stored privately in Vercel. Please don’t include passwords, payment details or private messages. Ask us to delete an application at any time.</p>
  </> },
  { id: "children", title: "Children", body: <>
    <p>DealDock is not for anyone under 18, and we do not knowingly collect their data as account holders. If you think a child has created an account, contact us and we will delete it.</p>
  </> },
  { id: "changes-to-this-policy", title: "Changes to this policy", body: <>
    <p>We will post changes here and update the date above. If a change materially affects how we use your data, we will email account owners before it takes effect.</p>
  </> },
  { id: "contact-and-grievance-officer", title: "Contact and grievance officer", body: <>
    <p>{LEGAL.entity}, {LEGAL.address}. Email <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.</p>
    <p>Grievance officer: {LEGAL.grievanceOfficer}, <a href={`mailto:${LEGAL.grievanceEmail}?subject=Grievance`}>{LEGAL.grievanceEmail}</a>. We acknowledge grievances within 72 hours and aim to resolve them within 30 days.</p>
  </> },
];

export default function PrivacyPage() {
  return (
    <MarketingDocument
      title="Privacy Policy"
      meta={[`Updated ${LEGAL.updated}`]}
      lede={<>DealDock is a deal inbox and CRM for creators, with replies you approve. To do that, it has to read the messages you connect. This policy explains what we collect, why, who helps us process it, where it is kept, and how you control it. It is provided by {LEGAL.entity}, {LEGAL.address} (“DealDock”, “we”), which decides how your data is used.</>}
      aside={<DocSummary items={["We read only the accounts you connect, to run DealDock for you.","Nothing is sent until a person approves it.","Never sold, never used for ads or to train AI models.","Export or delete everything, anytime."]} />}
      sections={SECTIONS}
    >
      <p>If you manage creators, you connect their accounts on their behalf; we act for the workspace owner in processing the messages of the people who write to them.</p>
    </MarketingDocument>
  );
}
