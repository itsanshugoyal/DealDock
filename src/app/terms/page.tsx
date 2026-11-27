import type { Metadata } from "next";
import Link from "next/link";
import { marketingPageMetadata } from "@/lib/marketing-metadata";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = marketingPageMetadata("/terms", "Terms of Service | DealDock", "The agreement for using DealDock: accounts, approvals, fees, cancellation, your content and our responsibilities.");

export default function TermsPage() {
  return (
    <MarketingDocument title="Terms of Service" updatedAt={`Last updated: ${LEGAL.updated}`}>
      <p>These terms are the agreement between you and {LEGAL.entity} (“DealDock”, “we”, “us”), {LEGAL.address}, for using DealDock at dealdock.io and {LEGAL.appUrl.replace("https://", "")}. By creating an account or using the service, you agree to them. If you use DealDock for a business or for creators you manage, you agree on their behalf and confirm you are allowed to.</p>

      <h2>1. What DealDock is</h2>
      <p>DealDock is a deal inbox and CRM for creators, with replies you approve. It connects your Instagram professional account through Meta’s official API and, if you choose, a Gmail inbox through Google’s sign-in. It sorts incoming messages, estimates their value, drafts replies in your style, tracks deals and revenue, and drafts invoices and payment reminders. DealDock never sends anything on its own: a person approves every message before it is sent.</p>

      <h2>2. Who can use it</h2>
      <p>You must be 18 or older and use DealDock for business or professional purposes, such as your work as a creator, coach, manager or agency. You must have the right to connect each account you connect.</p>

      <h2>3. Your account and seats</h2>
      <ul>
        <li>Each plan includes the creators and seats described on the <Link href="/pricing">pricing page</Link>. You can invite assistants or managers to the seats your plan includes.</li>
        <li>You are responsible for who you invite, for keeping your sign-in secure, and for everything done in your workspace. Tell us at once at <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> if you think someone has accessed it without permission.</li>
        <li>Give accurate account and billing details and keep them current.</li>
      </ul>

      <h2>4. You approve, you send, you are responsible</h2>
      <p>Drafts, labels, value estimates, deal details and reminders are suggestions produced partly by AI. They can be wrong. Read every draft before you approve it. You are responsible for every message you or your team approve and send, for the deals you agree to, and for the accuracy of invoices and tax details you issue. Value estimates help you decide what to answer first; they are not valuations, offers or promised results.</p>

      <h2>5. Acceptable use</h2>
      <p>You agree not to use DealDock to:</p>
      <ul>
        <li>send spam, bulk or unsolicited messages, or messages to people who have not contacted you where the platform does not allow it;</li>
        <li>impersonate anyone or mislead people about who is writing to them;</li>
        <li>break Instagram’s or Meta’s terms and policies, Google’s terms and the Google API Services User Data Policy, or any law, including laws on privacy, consumer protection and advertising disclosures;</li>
        <li>send harassment, hate, fraud, scams or illegal content;</li>
        <li>access accounts you do not own or manage, or try to break, probe, copy or overload the service.</li>
      </ul>
      <p>We may suspend access that puts other users, platforms or the service at risk, and we will tell you why unless the law or safety prevents it.</p>

      <h2>6. Instagram, Gmail and other platforms</h2>
      <p>DealDock depends on Instagram, Meta’s APIs and, if connected, Gmail. Those platforms set their own rules, such as Instagram’s 24-hour messaging window and rate limits, and can change or withdraw features. We are not responsible for their outages, changes or decisions, and some features may be limited by them. Your use of those platforms remains subject to their own terms. You can disconnect Instagram or Gmail at any time in Settings. DealDock is an independent product and is not affiliated with or endorsed by Meta or Google.</p>

      <h2>7. Fees, billing and cancellation</h2>
      <ul>
        <li>Plans are billed monthly at the prices on the <Link href="/pricing">pricing page</Link>, plus applicable taxes. There is no setup fee and no annual commitment.</li>
        <li>Your first invoice is raised after one full week of active use. After that you are billed each month in advance until you cancel.</li>
        <li>Customers in India pay in INR through Razorpay. Customers elsewhere pay in USD through Paddle, which acts as the merchant of record for those orders and handles their sales tax or VAT; Paddle’s buyer terms also apply to those purchases.</li>
        <li>You can cancel anytime from Settings. Your plan stays active until the end of the period you have paid for, then ends. Your Revenue ledger stays readable (read-only) for 30 days after that.</li>
        <li>Refunds are covered by our <Link href="/refunds">refund and cancellation policy</Link>.</li>
        <li>If a payment fails, we will let you know and may pause the account until it is paid. We will tell you at least 30 days before any price change applies to you.</li>
      </ul>

      <h2>8. Your content and our software</h2>
      <p>You own your content: your messages, contacts, drafts, deals, invoices and voice samples. You give us permission to process it only to run DealDock for you, as described in our <Link href="/privacy">privacy policy</Link>. We do not use it to advertise to you or sell it to anyone.</p>
      <p>We own DealDock’s software, design and brand. You get a personal, non-transferable right to use the service while your subscription is active. If you send us feedback, we may use it to improve DealDock without owing you anything.</p>

      <h2>9. Optional voice notes</h2>
      <p>If you choose to turn on voice notes, you must only upload your own voice and agree to it being used to create voice replies for your account. Each voice note says it is AI-generated. You can turn the feature off and delete your voice samples at any time.</p>

      <h2>10. Availability and changes to the service</h2>
      <p>We work to keep DealDock available and your data safe, but we provide the service “as is” and cannot promise it will be uninterrupted or error-free. We may change features; if a change materially reduces what you pay for, we will tell you in advance and you can cancel.</p>

      <h2>11. Limitation of liability</h2>
      <p>To the extent the law allows, DealDock is not liable for indirect or consequential losses, such as lost profits, lost deals or lost data, or for messages you approved and sent. Our total liability for any claim relating to the service is limited to the fees you paid us in the three months before the claim. Nothing in these terms limits liability that cannot be limited by law, or your statutory rights as a consumer.</p>
      <p>You agree to cover us against claims arising from content you send through DealDock or from your breach of these terms.</p>

      <h2>12. Suspension and termination</h2>
      <p>You can stop using DealDock and delete your workspace at any time. We may suspend or close an account that seriously or repeatedly breaks these terms, or where a platform or the law requires it. When an account closes, your data is handled as described in the <Link href="/privacy">privacy policy</Link> and on the <Link href="/data-deletion">data deletion page</Link>.</p>

      <h2>13. Governing law and disputes</h2>
      <p>These terms are governed by the laws of India. Courts in {LEGAL.governingCity}, India have jurisdiction, though you keep any right to bring a claim in the courts of the place you live where the law gives you that right. Please contact us first; most problems can be solved by email.</p>

      <h2>14. Changes to these terms</h2>
      <p>We will post updated terms on this page and change the date above. For material changes we will also email account owners at least 14 days before they take effect. If you keep using DealDock after that, the new terms apply.</p>

      <h2>15. Contact</h2>
      <p>{LEGAL.entity}, {LEGAL.address}. Email <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. See the <Link href="/contact">contact page</Link> for our grievance officer and other ways to reach us.</p>
    </MarketingDocument>
  );
}
