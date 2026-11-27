import type { Metadata } from "next";
import Link from "next/link";
import { marketingPageMetadata } from "@/lib/marketing-metadata";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = marketingPageMetadata("/data-deletion", "Data deletion | DealDock", "How to delete your DealDock data, including data received from Instagram and Gmail, and how long it takes.");

export default function DataDeletionPage() {
  return (
    <MarketingDocument title="Delete your data" updatedAt={`Last updated: ${LEGAL.updated}`}>
      <p>You can delete the data DealDock holds about you, including everything received from Instagram and Gmail, at any time. Choose one of the options below.</p>

      <h2>Option 1: delete your account in DealDock</h2>
      <ol>
        <li>Sign in at <a href={LEGAL.appUrl}>app.dealdock.io</a> as the workspace owner.</li>
        <li>Go to Settings → Your data.</li>
        <li>Optional: tap Download everything to keep a copy.</li>
        <li>Tap Delete account and confirm.</li>
      </ol>
      <p>Your workspace is permanently deleted 7 days later. Until then you can change your mind from the same screen.</p>

      <h2>Option 2: email us</h2>
      <p>Email <a href={`mailto:${LEGAL.email}?subject=Delete%20my%20DealDock%20data`}>{LEGAL.email}</a> from your account email, or tell us your Instagram username if you never created an account. We confirm the request within 72 hours and complete it within 30 days. This option also removes your sign-in profile.</p>

      <h2>Option 3: remove DealDock from Instagram or Google</h2>
      <p>In Instagram, go to Settings → Website permissions → Apps and websites, find DealDock and remove it. For Gmail, remove DealDock at <a href="https://myaccount.google.com/permissions" rel="noopener noreferrer">myaccount.google.com/permissions</a>. This stops DealDock receiving new data straight away. To delete data already stored, also use option 1 or 2.</p>
      <p>You can disconnect Instagram or Gmail without deleting your account in Settings; DealDock then deletes its access tokens and stops syncing.</p>

      <h2>What gets deleted</h2>
      <ul>
        <li>Your connected Instagram accounts and Gmail inboxes, including their access tokens.</li>
        <li>All synced messages, comments, sender details, labels, value estimates, drafts and sent replies.</li>
        <li>Your writing-style rules, voice recordings and the voice created from them (also deleted from our voice provider).</li>
        <li>Deals, revenue records, invoices, reminders, team seats and settings.</li>
      </ul>
      <p>Razorpay and Paddle keep their own payment records as tax and payment laws require. Backups that may contain your data expire within {"[backup period]"}.</p>

      <h2>Questions</h2>
      <p>See our <Link href="/privacy">privacy policy</Link> or email <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.</p>
    </MarketingDocument>
  );
}
