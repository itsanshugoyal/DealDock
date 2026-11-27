import type { Metadata } from "next";
import { marketingPageMetadata } from "@/lib/marketing-metadata";
import Link from "next/link";
import { MarketingDocument } from "@/components/design-preview/marketing-document";

export const metadata: Metadata = marketingPageMetadata("/privacy", "Website privacy | DealDock", "How DealDock uses pilot application details and website analytics.");

export default function PrivacyPage() {
  return (
    <MarketingDocument title="Your details. A clear purpose.">
      <p>This notice covers the DealDock marketing website and pilot applications. Before a pilot member connects Instagram or Gmail, we provide the separate service and data-handling terms for that connection. The <Link href="/security">security page</Link> explains what the product reads and keeps.</p>
      <h2>What you choose to share</h2>
      <p>An application asks for your email, Instagram username and the offer you sell. A short note about missed enquiries is optional. Shared links may also supply a campaign and source tag, which are included with the application to understand where interest came from.</p>
      <p>Please leave out Instagram passwords, payment information, private DM content and other people’s personal details.</p>
      <p>We also save which prices the page showed you, in dollars or rupees, and the price list version, so we can discuss the price you saw. This is context for a conversation, not agreement to a subscription.</p>
      <h2>Why we use it</h2>
      <p>Anshu and Nahush, DealDock’s founders, use these details to assess pilot fit, reply to your enquiry, and discuss onboarding if we agree to proceed. Applying does not add you to an unrelated marketing mailing list, connect an account, or start a paid subscription.</p>
      <h2>Where an application goes</h2>
      <p>Online applications are stored in a private Vercel Blob store for the website project. Application files are not served by a public page or download endpoint. The founders review them through the authenticated project tools.</p>
      <p>If you use the email option, your email app sends your application to <a href="mailto:hello@dealdock.io">hello@dealdock.io</a>. That message is handled by your email provider and by Zoho Mail, which hosts our inbox. Preparing a draft alone does not send it.</p>
      <h2>Website measurement</h2>
      <p>We use Vercel Web Analytics to understand website visits. Our application removes URL queries and fragments from analytics events. Form fields, notes, application references and DM content are not included in our marketing event payloads.</p>
      <p>We also load Google Tag Manager to manage website measurement tags. DealDock does not push pilot application fields, application references or DM content into its Google Tag Manager data layer. Any tag added to that container must be reviewed for data minimisation and applicable consent requirements before publication.</p>
      <p>We do not use session replay or advertising pixels on this website. Campaign tags supplied with applications are part of the private application record, not public analytics event properties.</p>
      <h2>Your choices</h2>
      <p>Vercel supplies an approximate country hint from your IP address so we can point visitors in India to the rupee version of the page. Our currency endpoint returns only a currency suggestion; it does not store your country or IP address or call a separate location service. We do not request precise location access.</p>
      <p>You can ask us to correct or delete an application, or stop contacting you about the pilot, by emailing the address above. We retain application details while evaluating pilot participation and discussing the next step; the founders review records that no longer serve that purpose.</p>
      <p>Include the application reference, if you have one, so we can find the right record. Avoid sending extra sensitive information in a deletion request.</p>
      <h2>A question about data?</h2>
      <p><Link href="/contact">Contact the founders</Link> before sharing details you are unsure about.</p>
    </MarketingDocument>
  );
}
