import type { Metadata } from "next";
import Link from "next/link";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog-article.module.css";
import { blogMetadata } from "@/lib/blog-posts";

const faqs = [
  {
    question: "How long should I wait before chasing a brand for payment?",
    answer: "Not long. Send a short, friendly reminder the day after the due date, with the invoice attached. If you never agreed a due date, New York, Illinois and California set a default of 30 days after you finish the work for the freelancers their laws cover. UK law treats an invoice as late 30 days after it arrives or the work is delivered, whichever is later.",
  },
  {
    question: "What does net 30 mean in a brand deal?",
    answer: "It means the brand has 30 days to pay, usually counted from the invoice date. Net 45 and net 60 give them 45 or 60 days. Check your contract for what starts the clock, because some count from when the content goes live or is approved.",
  },
  {
    question: "Can I charge a brand a late fee?",
    answer: "Yes, if your contract includes one, so add the clause before you start. Without one, a UK business can usually claim statutory interest at 8% above the Bank of England base rate plus fixed compensation, and a Udyam-registered micro or small enterprise in India is owed compound interest at three times the RBI bank rate. In the US it depends on your contract and state law.",
  },
  {
    question: "The agency says the brand hasn’t paid them yet. What can I do?",
    answer: "Check who your agreement is with. If the agency booked you, the agency usually owes you, so keep chasing the agency rather than the brand. Some agency contracts say you’re paid only after the brand pays them, so read that clause before you escalate.",
  },
  {
    question: "Can I take down the sponsored post if the brand doesn’t pay?",
    answer: "Only if your contract allows it, so read it first. Removing content when the agreement doesn’t let you could put you in breach and weaken your claim for the money. On future deals, write that the brand’s right to use the content starts when the invoice is paid in full.",
  },
  {
    question: "Should I call out a brand publicly for not paying?",
    answer: "Try every private step first, including a formal demand. A public post can’t be taken back, and anything you say about a named company has to be accurate and provable. If you’re considering it, take legal advice before you post.",
  },
  {
    question: "Do I need a lawyer to get paid?",
    answer: "Not for reminders, a final notice or a small claim, which is designed for people without lawyers. A lawyer’s letter can help with a large amount or a brand that has stopped replying. In India, a registered micro or small enterprise can file a delayed-payment claim online without one.",
  },
];

export const metadata: Metadata = blogMetadata("brand-hasnt-paid");

export default function Page() {
  return <BlogArticle slug="brand-hasnt-paid" faqs={faqs}>
    <p>The Reel went live a month ago. The brand loved it, and your invoice said payment within 30 days. Day 30 has been and gone, and the money hasn’t arrived.</p>
    <p>You don’t want to sound desperate, or get quietly dropped from their creator list for being difficult. So you wait another week, then another.</p>
    <p>You don’t need to. The delay is often admin rather than bad faith, like an invoice in the wrong inbox or an agency waiting on its own client, so rule that out first. Then chase in calm steps: a reminder the day after the due date, a firmer note at day 7, the finance team at day 14, and a final notice at day 30 that names the late fee or interest you’re owed. If it’s still unpaid, send a formal demand, try mediation or file a small claim (in India, a claim with the MSME council).</p>

    <h2>What to check before you chase a brand for payment</h2>
    <ul>
      <li>Make sure it’s actually late. “Net 30” usually means 30 days from the invoice date, but some agreements count from when the content went live or was approved. Net 45 and net 60 work the same way.</li>
      <li>Check the invoice reached the person who pays. That’s often an accounts payable inbox or a supplier portal, not your campaign contact.</li>
      <li>Look for a missing reference. Larger brands and agencies may not be able to pay without a purchase order (PO) number, or before you’ve sent their vendor forms: a W-9 for a US payer (a W-8BEN if you’re not a US citizen or resident), or your PAN (and GSTIN if you’re registered) for an Indian one.</li>
      <li>Work out who owes you. If an agency booked you, the agency probably owes you even while it waits on the brand, unless your contract ties your payment to theirs.</li>
      <li>Have proof they accepted the work. If payment follows approval, keep the approval in writing, with links to the live posts.</li>
    </ul>
    <p>Put the fee, invoice number, due date, PO number and the approver’s name in one note. You’ll paste them into every message.</p>

    <h2>Payment reminder emails to send a brand, day by day</h2>
    <p>Keep each message short, attach the invoice every time, and send it where the deal was agreed, whether that’s email or a DM thread.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Optional, 3–5 days before the due date</span>Hi [name], just checking that invoice [number] for [campaign] reached the right person. It’s due on [date]. Does your finance team need anything else from me, such as a PO number or a tax form?</p>
    <p className={styles.template}><span className={styles.templateLabel}>Day 1: the day after it was due</span>Hi [name], invoice [number] for [amount] was due yesterday, [date], and I haven’t received payment yet. I’ve attached it again in case it went astray. Could you check when it’s scheduled to be paid?</p>
    <p className={styles.template}><span className={styles.templateLabel}>Day 7: ask for a date</span>Hi [name], I’m following up on invoice [number] for [campaign], which is now a week overdue. Could you let me know the date it will be paid, or whether anything is holding it up? If someone in finance looks after this, I’m happy to contact them directly.</p>
    <p>If they give you a date, stop chasing until it passes.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Day 14: write to finance, with your contact copied</span>Hello, I’m writing about invoice [number] for [amount], for the [campaign] content that [contact name] approved on [date]. It was due on [date] and is now 14 days overdue. I’ve attached the invoice, our agreement and links to the live posts. Please confirm the payment date, or tell me what you need from me to process it.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Day 30: final notice</span>Hello [name], invoice [number] for [amount] is now 30 days overdue. Under [clause X of our agreement / the late-payment law that applies], late payments carry [a late fee of X / interest at X], which I’ll add from [date]. Please pay the full amount by [date, 7 to 14 days from now]. If I haven’t received payment or a confirmed date by then, I’ll [send a formal demand / file a claim]. I’d much rather settle this directly, so please reply if there’s a problem.</p>
    <p>Only name a fee or interest you can point to, in your agreement or one of the laws below, and only mention a next step you’ll actually take.</p>

    <h2>What if the brand still hasn’t paid after 30 days?</h2>
    <p>Start with the cheapest step that fits the amount, and keep everything as evidence.</p>
    <p>A formal demand (in the UK, a “letter before action”) sets out the amount, the original due date, any interest or fees, a final deadline (say, 14 days) and what you’ll do next. In India, it’s usually a lawyer’s legal notice.</p>
    <p>In mediation, a neutral person helps you agree a payment date or plan. In England and Wales, court claims up to £10,000 normally go to a free phone mediation of up to an hour before any hearing.</p>
    <p>For small claims, each US state sets its own limit; California’s is $12,500 for individuals and $6,250 for businesses. In England and Wales you can <a href="https://www.gov.uk/make-court-claim-for-money">make a money claim through GOV.UK</a>, with court fees from £35 (Scotland and Northern Ireland have their own processes). In India, a registered micro or small enterprise can go to the MSME council described below; otherwise, ask a lawyer about a civil claim.</p>

    <h2>Late-payment laws for creators in the US, UK and India</h2>
    <p>You don’t need a law to chase an invoice, but citing the right one in your day-30 notice changes the tone.</p>
    <div className={styles.tableWrap}><table>
      <thead><tr><th>Law</th><th>Who it covers</th><th>If no due date was agreed</th><th>If they pay late</th></tr></thead>
      <tbody>
        <tr><td>New York State Freelance Isn’t Free Act</td><td>One-person freelancers on contracts worth $800 or more with one client, alone or added up over 120 days</td><td>30 days after you finish the work</td><td>Double damages plus legal fees</td></tr>
        <tr><td>Illinois Freelance Worker Protection Act</td><td>Independent contractors on work worth $500 or more in a 120-day period</td><td>30 days after you finish the work</td><td>Double the unpaid amount plus legal fees</td></tr>
        <tr><td>California Freelance Worker Protection Act (SB 988)</td><td>One-person businesses providing listed “professional services” worth $250 or more, alone or added up over 120 days</td><td>30 days after you finish the work</td><td>Up to twice the unpaid amount plus legal fees</td></tr>
        <tr><td>UK Late Payment of Commercial Debts (Interest) Act 1998</td><td>Business-to-business deals</td><td>Late 30 days after the invoice arrives or the work is delivered, whichever is later</td><td>Interest at 8% above the Bank of England base rate, plus £40 to £100 compensation</td></tr>
        <tr><td>India MSMED Act 2006, sections 15–16</td><td>Udyam-registered micro and small enterprises</td><td>15 days after you deliver the work (agreed terms can’t exceed 45 days)</td><td>Compound interest, with monthly rests, at three times the RBI bank rate</td></tr>
      </tbody>
    </table></div>

    <h3>United States: New York, Illinois and California</h3>
    <p>All three laws give freelancers the right to a written contract setting out the work, fee and payment date, and bar the client from making on-time payment conditional on you accepting less. Whether you count as a covered “freelance worker” under any of them depends on the facts of your deal.</p>
    <p>New York State’s <a href="https://dol.ny.gov/freelance-isnt-free-act">Freelance Isn’t Free Act</a> has applied statewide since August 2024. Complaints go to the state Attorney General, and the Department of Labor publishes a model contract. New York City has its own version, with complaints handled by the city’s <a href="https://www.nyc.gov/site/dca/workers/workersrights/freelancer-workers.page">Department of Consumer and Worker Protection</a>.</p>
    <p>Illinois’ <a href="https://labor.illinois.gov/faqs/freelance-worker-protection-act.html">Freelance Worker Protection Act</a> covers contracts from July 2024 where you do the work in Illinois or the client is based there. The state’s Department of Labor lists social media management and content creation among common freelance industries, and complaints to it must be filed within two years of the date payment was due.</p>
    <p>California’s <a href={"https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=BPC&division=7.&title=&part=5.&chapter=&article="}>SB 988</a> covers contracts from January 2025 with a person or business in California, but only for “professional services” on a list in the state’s Labor Code. That list includes original, creative marketing work and graphic design, plus photography and video under certain conditions. The law also bars the client from demanding extra work or wider usage rights than you agreed as a condition of paying on time.</p>

    <h3>United Kingdom</h3>
    <p>Under the <a href="https://www.gov.uk/late-commercial-payments-interest-debt-recovery">Late Payment of Commercial Debts (Interest) Act 1998</a>, a business that pays another business late owes statutory interest at 8% a year above the Bank of England base rate, unless your contract sets its own rate. That includes you as a sole trader or limited company. You can add fixed compensation on each late payment: £40 under £1,000, £70 up to £9,999.99 and £100 from £10,000.</p>
    <p>A Commercial Payments Bill, still going through Parliament in November 2026, would make that interest compulsory and cap most business payment terms at 60 days, with limited exemptions. It isn’t law yet, so cite the 1998 Act for now.</p>

    <h3>India</h3>
    <p>The <a href="https://www.dcmsme.gov.in/MSMED2006.pdf">MSMED Act 2006</a> protects micro and small enterprises registered on the free Udyam portal, but not medium ones. The 45-day limit in section 15 runs from the day you deliver the work (later if the brand objects in writing within 15 days), and the section 16 interest applies whatever the contract says. With the RBI’s bank rate at 5.75% in November 2026, that’s 17.25% a year, compounded monthly.</p>
    <p>On our reading, a solo creator who registers will almost always count as a micro enterprise (since April 2025, turnover up to ₹10 crore and investment up to ₹2.5 crore). Register before you sign. In Silpi Industries (2021), the Supreme Court said the Act doesn’t help with contracts made before the seller registered. Another bench questioned that in January 2025 and asked for a larger bench to decide it, so registering first is the safe course.</p>
    <p>Claims are filed online. The <a href="https://samadhaan.msme.gov.in/">MSME Samadhaan</a> portal now directs new delayed-payment applications to the MSME ODR portal, and the Facilitation Council where you’re based tries to settle the case before it can arbitrate, even if the brand is in another state. Parliament passed amendments in August 2026 that add time limits to this process, from a date the government notifies.</p>
    <p>Brands also have a tax reason to pay on time. Under section 43B(h) of the Income-tax Act 1961, now section 37(2)(g) of the Income-tax Act 2025, a late payment to a micro or small enterprise is only deductible in the year it’s actually paid.</p>

    <h2>How to avoid late payment on your next brand deal</h2>
    <p>Most fixes happen before you post. Our guide to <Link href="/blog/influencer-brand-dms">turning brand DMs into paid deals</Link> covers what to agree up front, and our Hinglish <Link href="/blog/barter-vs-paid-collab">barter vs paid collab guide</Link> covers payment terms for Indian creators.</p>
    <ul>
      <li>Ask a new brand for part of the fee, such as 50%, before you shoot.</li>
      <li>Get the fee, deliverables, usage and payment terms (“net 30 from the invoice date”) in writing. Without a contract, summarise them in an email and ask the brand to reply to confirm.</li>
      <li>Add a late-payment clause saying what fee or interest applies and from when. UK creators can cite statutory interest, and Udyam-registered Indian creators section 16 of the MSMED Act. You can also make usage rights start once the invoice is paid in full.</li>
      <li>Ask for the accounts payable email, PO number and vendor forms when you agree the deal, not after the post goes live.</li>
      <li>List on every invoice: number and date, both legal names, the PO or campaign reference, deliverables with live dates and links, amount and currency, due date, bank details and tax IDs (in India, include your Udyam number).</li>
    </ul>

    <h2>Where a tool helps (and where it doesn’t)</h2>
    <p>For a few deals a year, a spreadsheet is enough. Our free <Link href="/blog/dm-enquiry-tracker-template">DM enquiry tracker</Link> keeps Invoiced and Paid as separate stages, with a follow-up date that flags an overdue invoice on the day to chase it.</p>
    <p>If your brand deals start in Instagram DMs, DealDock’s pilot is built for the part before the invoice. It sorts brand enquiries from your other messages and drafts replies in your style that send only when you approve them. It reminds you when a conversation goes quiet, and records each deal from agreed to paid in a ledger you update. It doesn’t send invoices or collect payments, and a deal marked paid there is your own note, not proof of payment.</p>
    <p>This is general information, not legal advice. For a large amount, or before you file a claim, ask a lawyer about your own case and an accountant about the tax points.</p>
  </BlogArticle>;
}
