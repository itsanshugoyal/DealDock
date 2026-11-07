import type { Metadata } from "next";
import Link from "next/link";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog-article.module.css";
import { blogMetadata } from "@/lib/blog-posts";

const faqs = [
  {
    question: "What should an Instagram DM tracker include?",
    answer: "Start with who it is, what they want, what it could be worth, the current stage and the date you’ll follow up next. Where the conversation started and a link back to it are worth adding too. Keep it short enough that you’ll still fill it in on a busy day.",
  },
  {
    question: "Can I use Google Sheets as a CRM for my coaching business?",
    answer: "Yes. For a modest number of conversations, a spreadsheet covers the core of what a CRM does: one row per lead, a stage and a follow-up date. It won’t fill itself in or send you reminders, so it only works if you update it most days. When copying conversations across starts to take longer than replying to them, a dedicated tool makes more sense.",
  },
  {
    question: "How do I highlight overdue follow-ups in Google Sheets?",
    answer: "Select columns A to M, go to Format, then Conditional formatting, and choose Custom formula is. With Stage in column H and Follow up on in column J, use =AND(ISNUMBER($J1),$J1<=TODAY(),$H1<>\"Paid\",$H1<>\"Lost\") and pick a fill colour. Any row with a follow-up date of today or earlier stays highlighted until you change the date or mark it Paid or Lost.",
  },
  {
    question: "How do I keep track of brand deal payments?",
    answer: "Keep Agreed, Invoiced and Paid as separate stages. When you send the invoice, put its due date in the follow-up column and the invoice number in your notes. Mark the deal Paid only after you’ve seen the money in your account, and change the estimate to the amount that actually arrived.",
  },
  {
    question: "Should I add every Instagram DM to the tracker?",
    answer: "No. Add conversations that could turn into money, such as coaching enquiries, course questions, brand offers and other sales, plus anything where you’ve promised to send something. Fan messages and spam can stay in Instagram. If you’re unsure, add the row, because deleting it later takes seconds.",
  },
  {
    question: "Can I export my Instagram DMs to a spreadsheet?",
    answer: "Instagram lets you export a copy of your information, including messages, from Accounts Center, but it arrives as a download of data files rather than a ready-made tracker. It’s also a full copy of your conversations, which is much more personal data than a tracker needs. Adding a one-line row when a buying conversation starts is quicker and keeps the sheet light.",
  },
  {
    question: "Can I update the tracker from my phone?",
    answer: "Yes. Set it up once on a computer, then update it in the Google Sheets, Excel or Notion app. Dropdowns help on a small screen, because changing a stage becomes a tap instead of typing.",
  },
];

export const metadata: Metadata = blogMetadata("dm-enquiry-tracker-template");

export default function DmEnquiryTrackerTemplate() {
  return <BlogArticle slug="dm-enquiry-tracker-template" faqs={faqs}>
    <p>On Tuesday, someone asks whether your 1:1 coaching has space in December. On Thursday, a skincare brand asks for your rates. By Sunday, both chats are buried under story replies, and you can’t remember whether you answered the brand.</p>
    <p>Your inbox keeps the messages, but it won’t tell you who’s waiting on a reply or who still owes you money.</p>
    <p>The simplest way to keep track of buying conversations from Instagram DMs is a spreadsheet with one row per conversation, covering coaching leads, course questions, brand deals and other sales. Each row records who it is, what they want, what it could be worth, which stage it’s at and the date you’ll follow up. Ten minutes a day keeps it current, and a 20-minute review each week shows what got paid and what’s stuck.</p>
    <p><strong><a href="/templates/dealdock-dm-enquiry-tracker.csv" download>Download the tracker (CSV)</a></strong>. It’s free with no sign-up, and it opens in Google Sheets, Excel, Numbers or Notion. Three example rows marked “(example)” show how it’s filled in; delete them once your own enquiries are in.</p>

    <h2>What goes in each column</h2>
    <p>Two columns do most of the work: Stage says where a conversation stands, and Follow up on says when you next need to act.</p>
    <div className={styles.tableWrap}><table>
      <thead><tr><th>Column</th><th>What goes in it</th></tr></thead>
      <tbody>
        <tr><td>Date received</td><td>The day the first message arrived.</td></tr>
        <tr><td>Name or handle</td><td>Their username without the @ (a leading @ trips up some spreadsheet apps), or the brand’s name.</td></tr>
        <tr><td>Where</td><td>DM, Message request, Email or Comment.</td></tr>
        <tr><td>Type</td><td>Coaching lead, Course question, Brand deal or Other sale.</td></tr>
        <tr><td>What they asked</td><td>One line in your words: “Wants 1:1 coaching before her January job switch.”</td></tr>
        <tr><td>Estimated value</td><td>A plain number: your package price, course price or quoted rate. Swap in the real amount once it’s paid.</td></tr>
        <tr><td>Currency</td><td>INR, USD or whatever you’ll be paid in, so your totals never mix currencies.</td></tr>
        <tr><td>Stage</td><td>One of the eight stages below.</td></tr>
        <tr><td>Next step</td><td>Your next action, starting with a verb: “Send rate card.”</td></tr>
        <tr><td>Follow up on</td><td>The date you’ll check in if you haven’t heard back. Every open row needs one.</td></tr>
        <tr><td>Last contact</td><td>The date of the latest message either way. For Paid rows, the day the money arrived.</td></tr>
        <tr><td>Link to conversation</td><td>Their profile link (instagram.com/ plus their username), the email thread or the post they commented on.</td></tr>
        <tr><td>Notes</td><td>Anything you’d otherwise forget, like the Reel they came from or an invoice number.</td></tr>
      </tbody>
    </table></div>
    <p>First-time buyers and brands don’t always land in your main inbox, so <Link href="/blog/instagram-message-requests">check your message requests</Link> too. After a few months, the Where column shows which folder brings in paying customers.</p>

    <h2>What the eight stages mean (and why Agreed isn’t Paid)</h2>
    <ul>
      <li><strong>New:</strong> they’ve messaged and you haven’t replied.</li>
      <li><strong>Replied:</strong> you’ve answered and the conversation is moving.</li>
      <li><strong>Waiting on them:</strong> you’ve sent what they need to decide, like a price or a call link, and the next move is theirs.</li>
      <li><strong>Call booked:</strong> there’s a date in the calendar.</li>
      <li><strong>Agreed:</strong> they’ve said yes to a price and to what’s included.</li>
      <li><strong>Invoiced:</strong> you’ve sent the invoice or payment link, with a due date.</li>
      <li><strong>Paid:</strong> the money is in your account, and you’ve checked.</li>
      <li><strong>Lost:</strong> they said no, went quiet after your last follow-up, or you turned it down.</li>
    </ul>
    <p>The stages show whose turn it is and how close the money is. Waiting on them is the other person’s move, so it always gets a follow-up date.</p>
    <p>Agreed and Paid are different moments, sometimes weeks apart. A brand can approve your rate in October, see the Reel go live in November and pay in December if its terms are 30 days from invoice. If you count Agreed as money, your month looks better than your bank balance. Invoiced sits between them because that’s when the clock starts: the due date goes in Follow up on, so a late payment surfaces by itself.</p>
    <p>Rows skip stages all the time. A course buyer can go from New to Paid in an hour, so use whichever stage describes the conversation right now.</p>

    <h2>How to set up the tracker in Google Sheets</h2>
    <p>Do this once on a computer. After that, the Sheets app on your phone is fine for daily updates.</p>
    <ol>
      <li>Open a blank spreadsheet and go to <strong>File &gt; Import</strong>. Upload the CSV, choose “Replace spreadsheet” and click Import (<a href="https://support.google.com/docs/answer/40608?hl=en">Google’s import steps</a>).</li>
      <li>For the Stage dropdown, click cell H2 and go to <strong>Data &gt; Data validation &gt; Add rule</strong>. Change “Apply to range” to H2:H so new rows get the dropdown too. Under “Criteria”, choose “Dropdown”, enter the eight stages (“Add another item” gives you a new box) and click Done. Each option gets a colour you can change, so Paid can be green and Lost grey (<a href="https://support.google.com/docs/answer/186103?hl=en">Google’s dropdown guide</a>).</li>
      <li>To highlight follow-ups that are due, select columns A to M by clicking the A at the top of the sheet, then Shift-clicking the M. Go to <strong>Format &gt; Conditional formatting</strong>, set “Format cells if” to “Custom formula is”, paste the formula below, pick a fill colour and click Done.</li>
    </ol>
    <p className={styles.template}><span className={styles.templateLabel}>Custom formula for due and overdue follow-ups</span>{"=AND(ISNUMBER($J1),$J1<=TODAY(),$H1<>\"Paid\",$H1<>\"Lost\")"}</p>
    <p>The rule highlights a row when it has a follow-up date, that date is today or earlier, and the stage isn’t Paid or Lost. The dollar signs make the whole row change colour, as in the row example in <a href="https://support.google.com/docs/answer/78413?hl=en">Google’s conditional formatting help</a>.</p>
    <p>To test it, look at the examples. The ananya.example row’s follow-up date has already passed, so it should light up straight away. The Paid row never will.</p>

    <h2>Opening it in Excel</h2>
    <p>Double-click the file or use <strong>File &gt; Open</strong>; Excel opens a .csv straight into a new workbook. If the columns don’t split properly, use <strong>Data &gt; From Text/CSV</strong> instead, pick the file, check that the delimiter in the preview says Comma and click Load (<a href="https://support.microsoft.com/en-us/excel/get-started/import-or-export-text-txt-or-csv-files">Microsoft’s guide</a>). Then save it as an Excel Workbook (.xlsx), because a CSV can’t keep dropdowns or highlighting.</p>
    <p>The rest of the setup matches Google Sheets. For the dropdown, select H2 down to H500, go to <strong>Data &gt; Data Validation</strong>, set Allow to List and type the eight stages into Source, separated by commas. For the highlight, select columns A to M, go to <strong>Home &gt; Conditional Formatting &gt; New Rule</strong>, choose “Use a formula to determine which cells to format”, paste the same formula and set a fill colour under Format (<a href="https://support.microsoft.com/en-us/excel/use-conditional-formatting-to-highlight-information-in-excel">Microsoft’s steps</a>).</p>

    <h2>Using it in Notion or Numbers</h2>
    <p>In Notion, go to <strong>Settings &gt; Import</strong> and choose CSV (or type /csv on a page), then upload the file as a new database. When Notion asks you to map columns to properties, set Stage to Select, the three date columns to Date and Estimated value to Number. Sort by Follow up on so the most urgent rows sit at the top. <a href="https://www.notion.com/help/import-data-into-notion">Notion’s import guide</a> notes that importing adds rows rather than updating existing ones, so import once and keep the tracker in Notion after that.</p>
    <p>On a Mac, drag the file onto the Numbers icon in the Dock to open it there.</p>

    <h2>The 10-minute daily routine</h2>
    <p>Pick a time you can keep. If the inbox itself is the mess, start with <Link href="/blog/manage-instagram-dms-coach">how coaches and course creators can manage Instagram DMs</Link>.</p>
    <ol>
      <li>Spend three minutes adding rows. Check your main inbox, your requests and any comments asking about price. Every new conversation that could become a sale or a paid collaboration gets a row; fan mail and spam don’t.</li>
      <li>Spend five on what’s due. Send a follow-up for each highlighted row, then set its next date. If they gave you a date, use it. Otherwise, two or three days suits a warm coaching lead and a week suits a brand that’s checking with its team. For wording, see <Link href="/blog/follow-up-coaching-enquiry">how to follow up on a coaching enquiry</Link>.</li>
      <li>Use the last two to update the stage and Last contact on anything that moved, and to give every open row a next step and a follow-up date.</li>
    </ol>

    <h2>The 20-minute weekly review</h2>
    <p>Paste the formulas into any empty cell to the right of column M.</p>
    <ol>
      <li>Start with what got paid (about five minutes). Check your bank or payment app against every Invoiced row. Move anything that’s arrived to Paid, put the date it landed in Last contact and replace the estimate with the actual amount. The first formula below totals rupees paid in the last seven days; change INR to USD for dollars.</li>
      <li>Then look at what’s stuck (about ten). Filter Stage to Waiting on them, Agreed and Invoiced, and check Last contact. Anything quiet for over a week gets one last follow-up with a clear question, such as “Hi Ananya, shall I hold Saturday’s 11am slot for you, or would you rather pick this up in January?”, or a move to Lost. An Agreed row with no invoice means the next move is yours. For invoices past their due date, here’s <Link href="/blog/brand-hasnt-paid">what to send when a brand hasn’t paid</Link>.</li>
      <li>Finish with where buyers come from (about five). The second formula counts Paid rows that started in message requests; swap in DM, Email or Comment to compare, and skim Notes for the posts people mention. If requests keep producing buyers, check them daily. If one Reel keeps coming up, make more like it.</li>
    </ol>
    <p className={styles.template}><span className={styles.templateLabel}>Rupees paid in the last 7 days</span>{"=SUMIFS(F:F,H:H,\"Paid\",G:G,\"INR\",K:K,\">\"&(TODAY()-7))"}</p>
    <p className={styles.template}><span className={styles.templateLabel}>Sales that started in message requests</span>{"=COUNTIFS(C:C,\"Message request\",H:H,\"Paid\")"}</p>
    <p>In Notion, filter the table by Stage and Where instead.</p>

    <h2>What to leave out of your tracker</h2>
    <p>Keep only what you need to follow up and get paid. The full conversation can stay in Instagram.</p>
    <ul>
      <li>Write “What they asked” in one line, in your own words, and don’t paste DM threads. The link takes you back when you need the detail.</li>
      <li>Leave out sensitive things people share while asking for help, such as health conditions or money worries. “Asked about the 12-week programme, see DM” is enough.</li>
      <li>Don’t store ID numbers or bank details. Billing details belong in your invoicing tool.</li>
      <li>Share the sheet only with named people who help with your inbox, never as a link anyone can open.</li>
      <li>Every few months, delete Lost rows you no longer need, or clear the name and link and keep the rest for your numbers.</li>
    </ul>
    <p>If you’re based in India or sell to people there, the law points the same way. The <a href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf">Digital Personal Data Protection Act, 2023</a> covers personal data handled digitally in India, as well as businesses abroad offering goods or services to people in India. Section 8(7) says personal data must be erased once it’s reasonable to assume its purpose is no longer being served (or the person withdraws consent), unless another law requires keeping it. The Act’s rules were <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014">notified in November 2025 with an 18-month phased compliance timeline</a>, and Section 8 is one of the parts that <a href="https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf">come into force at the end of it</a>, in May 2027. Rules differ elsewhere, so if you’re unsure what applies to your business, ask a lawyer.</p>

    <h2>Where a tool helps (and where it doesn’t)</h2>
    <p>For plenty of creators, a spreadsheet is enough. If a handful of buying conversations arrive each week and the ten minutes happen most days, you don’t need anything else.</p>
    <p>Every row is copied from your inbox by hand, though, so in a busy launch week the sheet falls behind and stops telling you what’s due. DealDock is being built for creators at that point. It’s an inbox for creators’ Instagram DMs, in a small, application-only pilot. The pilot is built to sort conversations by type (brand deal, coaching lead, course question, other sale, fan or spam), put the ones likely to be worth the most first with an estimated value, and remind you when a chat goes quiet. It’s also designed to draft replies in your texting style for you to edit, and to record deals from agreed to paid in a ledger you update. The pilot sends nothing without your approval, and it connects through Meta’s official Instagram API, so it never asks for your password and doesn’t scrape. It doesn’t send invoices or collect payments, so Paid is still something you confirm against your bank.</p>
    <p>If your sheet is working, keep using it.</p>
  </BlogArticle>;
}
