import type { Metadata } from "next";
import Image from "next/image";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog-article.module.css";

const title = "From Instagram DMs to Paid Brand Deals: An Influencer’s Guide";
const description = "Manage brand collaborations from the first Instagram DM to payment. Learn how to review offers, reply, follow up and keep track of each deal.";
const socialImage = "/guides/influencer-brand-inbox-review.png";
const faqs = [
  {
    question: "How can influencers manage too many brand DMs?",
    answer: "Answer brands you’re already working with first, then read through new offers and requests. Beside each offer you’re interested in, jot down where you left it. “They’re sending the brief” or “I need to quote” is enough to jog your memory.",
  },
  {
    question: "The offer sounds good. What should I check?",
    answer: "Get the proposed content and payment terms clear before saying yes. Check the posting dates, revisions and how the brand plans to use your content. You should also know whether you’re agreeing to exclusivity and who is responsible for paying you.",
  },
  {
    question: "Should I use a template to reply to brands?",
    answer: "Yes, for questions you ask repeatedly. Save your budget question, for example, but remove it when the brand has already stated its budget. A reply that asks for information sitting in the previous message makes it look as though you haven’t read it.",
  },
  {
    question: "I’ve sent my rates. How do I remember to follow up?",
    answer: "Keep the conversation under “waiting on the brand” and note any decision date they gave you. The DealDock PRD includes a “Waiting on them” state with follow-up nudges and editable drafts. Those are planned features; a nudge still needs your approval before a message is sent.",
  },
  {
    question: "Can a tool tell me which brand enquiry is worth opening first?",
    answer: "A stated budget and a clear brief give you more to work with than a vague invitation to collaborate. DealDock’s planned Revenue Inbox uses message classification and estimated value ranges to help prioritise enquiries. An estimate is a starting point for your review, not a confirmed offer or money earned.",
  },
  {
    question: "Will DealDock send replies while I’m away?",
    answer: "The PRD requires approval from you or an authorised account user for every send, including follow-ups. Drafts can be edited before sending. It does not include an autonomous reply mode.",
  },
  {
    question: "What happens if a brand message gets sorted incorrectly?",
    answer: "The planned Review Queue holds messages the system is unsure about so you can confirm or change the classification. Keep checking the original thread when making a decision. A classification helps organise your inbox; it cannot establish whether a sender is trustworthy.",
  },
  {
    question: "When should I call a brand deal closed?",
    answer: "Record the agreement once the brand has confirmed the work and fee, then track delivery and payment separately. DealDock’s planned Revenue Ledger lets a creator log an amount against the conversation. That entry is your record of the deal, not a bank confirmation that the brand has paid.",
  },
  {
    question: "Can DealDock create the invoice or collect the brand’s payment?",
    answer: "The PRD excludes invoicing and contract builders, and it does not specify collecting campaign payments from brands. Use your invoicing and payment tools for that part. The proposed ledger records deal amounts and links them to conversations; it does not replace an invoice or payment receipt.",
  },
  {
    question: "How do I keep track once the content has gone live?",
    answer: "Keep the agreed fee, delivery confirmation and payment due date together. When you send the invoice, record its reference too. If the due date passes, you’ll have the details ready for a short payment query instead of searching through DMs. Keep the deal marked unpaid until you’ve checked that the money arrived.",
  },
  {
    question: "Can I take my deal records out of DealDock?",
    answer: "The PRD specifies a CSV export for the Revenue Ledger, with the amount and currency code. Each organisation uses one currency, chosen when it is created. Export availability still needs to be confirmed for the pilot you join.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://dealdock.io"),
  title: `${title} | DealDock`,
  description,
  alternates: { canonical: "https://dealdock.io/blog/influencer-brand-dms" },
  keywords: ["Instagram brand collaboration DMs", "influencer DM management", "manage brand enquiries", "reply to brand collaboration messages", "brand deal tracking", "influencer payment tracking"],
  openGraph: { type: "article", url: "https://dealdock.io/blog/influencer-brand-dms", title, description, siteName: "DealDock", images: [{ url: socialImage, width: 1672, height: 941, alt: "A highlighted brand enquiry on a phone beside a notebook" }] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  robots: { index: true, follow: true },
};

export default function InfluencerBrandDmsReview() {
  return <BlogArticle title={title} updatedAt="DealDock guide · Updated 5 November 2026" faqs={faqs}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BlogPosting", headline: title, description, author: { "@type": "Organization", name: "DealDock" }, publisher: { "@type": "Organization", name: "DealDock" } },
        { "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      ],
    }).replace(/</g, "\\u003c") }} />
    <p>“We’d love to work with you!”</p>
    <p>Nice message to get. Less nice when you find it ten days later, underneath a pile of story reactions.</p>
    <p>One brand needs your rates. Another said they’d send a brief, and you can’t remember whether it arrived. When you’re handling everything yourself, those loose ends sit in your head while you’re trying to film.</p>
    <p>There’s no perfect inbox routine. But a few small decisions can save you a lot of rereading, and help you spot the offers you actually want.</p>
    <p>And getting a reply is only the start. You still have to agree on the work, deliver it and check that the payment arrives. Keep those steps attached to the conversation from the beginning.</p>
    <h2>A collaboration DM is a starting point</h2>
    <p>“Interested in collaborating?” could mean a paid campaign, an affiliate link or a discount code for a product you’re expected to buy. Until you ask, you don’t know.</p>
    <p>Before sending your media kit, find out what they’re asking for. Is there a brief? When does the content need to go live? And are they paying a fee or offering products? You’ll have a much easier time answering once the offer is clear.</p>
    <figure className={styles.illustration}><Image src="/guides/influencer-brand-inbox-review.png" alt="A brand enquiry highlighted among messages on a phone beside a notebook" width={1672} height={941} sizes="(max-width: 768px) 100vw, 800px" /></figure>
    <h2>Give each enquiry somewhere to go</h2>
    <p>Try reviewing messages at a time you can usually stick to. Check your requests too. Start with anything that could hold up work you’ve already agreed to deliver, then move through new offers.</p>
    <p>For the offers you want to pursue, keep a short list outside your inbox. Four headings are enough: brand, campaign, waiting on, next action. “Waiting on” is especially useful. Are you waiting for their brief, or are they waiting for your rate card?</p>
    <p>For example: “Skincare brand / two Reels / waiting on usage details / send quote after clarification.” That note tells you more than an unread marker will.</p>
    <h2>How to identify the right brand collaboration</h2>
    <p>Would you use the product? Can you picture it appearing naturally in your content? If you’re already struggling to imagine a believable post, that’s worth paying attention to.</p>
    <p>What does “one Reel” involve on this campaign? You might be filming at home, or the brand might expect a location shoot. Find out how many edits they want and whether they’ll use the video in ads before you send your price.</p>
    <figure className={styles.illustration}><Image src="/guides/influencer-brand-brief-review.png" alt="Illustration of a creator checking a campaign brief beside a phone" width={1672} height={941} sizes="(max-width: 768px) 100vw, 800px" /></figure>
    <p>Read the brief with the shoot in mind. What product are you showing, and what does the brand want the content to achieve? Check the formats and deadline, then look for the revision allowance. If the brand wants exclusivity or permission to use your video in ads, include that in the discussion too.</p>
    <p>You also need to know who you’re making the agreement with and when payment is due. For gifting or commission offers, ask exactly what you receive and what the brand expects in return.</p>
    <p>Accepting a product and agreeing to make a scripted video are separate decisions. If you’re happy to receive a gift but haven’t promised a post, say that before the brand sends it.</p>
    <h2>Reply to a brand DM without sounding robotic</h2>
    <p>Read your reply back before sending it. Would you say it that way in a conversation? If “I would be delighted to explore this opportunity” sounds nothing like you, a simple “Thanks for thinking of me” will do.</p>
    <p>A first reply could be: “Thanks for thinking of me. Could you send over the brief? I’d like to know the dates and budget before sharing a quote.”</p>
    <p>If it’s a gifting offer: “Thanks for thinking of me. I charge for dedicated content. Is there a creator budget for this one?”</p>
    <p>To decline, you can keep it short: “Thanks for considering me. I’ll have to pass on this one.” Add a reason if you want to, especially if you’d like to work with the brand on a different campaign.</p>
    <h2>Before you open that campaign link</h2>
    <p>Who sent the message? If you don’t know them, find the brand’s contact details yourself and check that they’re handling the campaign. You can ask for the brief from a company email, too.</p>
    <p>A badge alone won’t answer that for you. Never send your password to someone arranging a campaign. Asked to pay a joining fee? Find the brand’s website yourself and contact them there to check the offer. Leave suspicious links unopened, and keep private details to yourself until you know who sent the message.</p>
    <h2>What if you’ve already left a brand waiting?</h2>
    <p>Reply to the message you have. There’s usually no need to write a paragraph explaining your schedule.</p>
    <p>“Sorry I missed this! Are you still looking for creators for the campaign? I’d be interested in seeing the brief.”</p>
    <p>Already sent your rates? A short “Are you still booking creators for this?” gives the brand something easy to answer. A decision date from the brand gives you a reminder to work with; there’s little to gain from checking in before then. Once they’ve said no or asked you to stop, take the conversation off your follow-up list.</p>
    <p>Before finishing your inbox check, make sure anything you’ve promised has a next step. “Send media kit tomorrow” is a much easier task to return to than “sort out DMs.”</p>
    <h2>The brand said yes. Keep the agreement handy.</h2>
    <p>Once you’ve agreed on the fee, keep a written record of the work and dates. Include the revisions and usage you discussed, along with who will approve the content. If the discussion moves to email, keep a reference beside the original DM so you can find both.</p>
    <p>“Deal confirmed” and “payment received” are different entries in your notes. A brand accepting your quote tells you the work is going ahead. It doesn’t tell you when the money will reach you.</p>
    <h2>After posting, follow the deal through to payment</h2>
    <p>Save the delivery or posting confirmation, then send the invoice through your usual invoicing tool according to the terms you agreed. Note the invoice reference and due date. Keep any deposit and remaining balance visible so you don’t accidentally treat a part-payment as the full fee.</p>
    <p>If a payment is late, refer to that record: “Hi, I’m checking on invoice [reference] for [campaign], due on [date]. Could you let me know the payment status?” Fill in your actual details and send it to the person handling payment. Mark it paid only after checking the receipt in your bank or payment account.</p>
    <h2>Do you need another tool for this?</h2>
    <p>For a few conversations, try the notes app you already open every day. Write “waiting for brief” beside the brand’s name, then change it to “send quote” when the brief arrives. A spreadsheet works too if you prefer seeing your campaigns together. Keep a way to find the original DM.</p>
    <p>As your workload grows, you might also look at a dedicated inbox. DealDock’s product plan, for example, includes brand-enquiry classification, estimated deal values and drafts based on the creator’s writing. It also describes follow-up nudges and a Revenue Ledger that links a closed deal to its conversation. These are pre-launch requirements, so check what is available before joining a pilot. The ledger doesn’t collect brand payments, and invoicing is outside the planned scope.</p>
    <p>Think about the last enquiry that got away from you. Did you forget to follow up after quoting, or did the reply sit unwritten because you couldn’t find the words? That’s the task to try with a new tool. Use a familiar conversation, check the result and decide whether you’d want to use it again. With reply drafts, make sure you can change the wording before sending.</p>
  </BlogArticle>;
}
