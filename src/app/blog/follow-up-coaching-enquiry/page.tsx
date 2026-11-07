import type { Metadata } from "next";
import Link from "next/link";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog-article.module.css";
import { blogMetadata } from "@/lib/blog-posts";

const faqs = [
  {
    question: "How many times should you follow up on an Instagram DM?",
    answer: "Three follow-ups after your answer is usually enough: a short nudge after a day or two, a second message about a week later and a final message after two to three weeks. If they reply, you’re back in a normal conversation. If they say no or ask you to stop, stop straight away.",
  },
  {
    question: "How long should you wait to follow up after no response?",
    answer: "If they asked a direct question, like the price, and went quiet after your answer, wait one or two days. If they said they wanted to think about it, wait about a week, or until the date they gave you. Bigger decisions, like a year-long mentorship, deserve a little more room.",
  },
  {
    question: "What do you say in a follow-up message after no response?",
    answer: "Refer back to what they asked, add one useful detail and end with an easy question. For example: “Hi [name], did my message about the fee come through? Happy to answer anything before you decide.” Avoid sending “just checking in” on its own, because it gives them nothing to reply to.",
  },
  {
    question: "Is it pushy to follow up when someone leaves you on seen?",
    answer: "No. Being left on seen can mean bad timing as easily as a no, and you can’t tell which. One friendly follow-up is normal. Several messages in a row with no reply is where it starts to feel like pressure.",
  },
  {
    question: "Can you message someone on Instagram after 24 hours?",
    answer: "Yes. When you type a reply yourself in the Instagram app, there’s no 24-hour or 7-day limit. Those windows are Meta’s rules for apps that send messages through its API, which is what DM tools and automations use. If a tool can’t send a late follow-up, send it from the app instead.",
  },
  {
    question: "What should you say if a lead says your coaching is too expensive?",
    answer: "Thank them for being straight with you. If you offer a payment plan or a smaller option, mention it once, without pressure. If you don’t, wish them well and leave the door open rather than arguing with their budget.",
  },
  {
    question: "Should you offer a discount to someone who has gone quiet?",
    answer: "Only if it’s a real offer you’d give anyone in the same position. Discounts that appear whenever someone hesitates teach people to wait, and inventing an expiry date for one is false urgency. A payment plan can answer a price worry without cutting your fee.",
  },
];

export const metadata: Metadata = blogMetadata("follow-up-coaching-enquiry");

export default function FollowUpCoachingEnquiry() {
  return <BlogArticle slug="follow-up-coaching-enquiry" faqs={faqs}>
    <p>Someone watches your reel and sends a DM: “Hi! How much is the 12-week coaching?” You reply with the fee and the payment link. They see it. Then nothing.</p>
    <p>Two days later the chat is still sitting there. Message again and you worry you’ll look desperate. Leave it and you might lose someone who was clearly interested.</p>
    <p>Follow up, and keep it light. Reply to the enquiry the same day if you can. If they asked a direct question and went quiet after your answer, send a short nudge after one or two days, a second message about a week later and a final message after two to three weeks that closes the loop. Then stop, and stop straight away if they say no. Each message should add something useful and make it easy to reply, even if the reply is “not for me”.</p>

    <h2>Why people go quiet after asking about your coaching</h2>
    <p>You can’t see why someone stopped replying. Often it’s something ordinary:</p>
    <ul>
      <li>They messaged at 11pm, your reply arrived at 10am while they were at work, and by evening it was buried under twenty other chats.</li>
      <li>The fee was more than they expected. They’re waiting for payday or want to talk to a partner or parent first, and going quiet feels easier than typing “that’s too much for me”.</li>
      <li>They’re not sure it suits them: whether it’s too advanced for a beginner, or whether they can keep up alongside a full-time job. Asking feels silly, so they don’t.</li>
      <li>Life got busy: exams, a sick child, a family wedding, a deadline at work.</li>
    </ul>
    <p>A helpful message can deal with most of these. Pressure doesn’t fix any of them.</p>

    <h2>How long to wait before following up, and how many times</h2>
    <p>Three follow-ups after your answer is enough, with more space between each one. Here’s a default rhythm:</p>
    <ol>
      <li>Answer the enquiry the same day, within a few hours if you can, while they’re still thinking about it.</li>
      <li>If they asked something specific, like the fee or the start date, and went quiet after your answer, send a short nudge after one or two days.</li>
      <li>About a week later, send a second message that adds something new, such as an answer to a question they haven’t asked yet or a payment option you offer.</li>
      <li>After two to three weeks of silence, send a final message that closes the loop and leaves the door open.</li>
      <li>Then stop. If they reply at any point, drop the schedule and just talk.</li>
    </ol>
    <p>This is a suggested rhythm, not a rule from research, so fit it to the person. If they gave you a date (“I’ll know after payday”), use their date. If they said “let me think about it”, skip the quick nudge and start at about a week. Give bigger decisions more room: a year-long mentorship needs more thinking time than a one-off workshop.</p>

    <h2>What to say in a follow-up so it doesn’t feel pushy</h2>
    <p>Keep it short and tie it to what they asked:</p>
    <ul>
      <li>Reply under their original question: press and hold their message and tap Reply, so the context sits above your nudge.</li>
      <li>Add one useful thing each time. “Just checking in!” on its own gives them nothing to answer.</li>
      <li>End with one easy question they can answer in a few words.</li>
      <li>Give them a way out. “No worries if the timing’s off” makes an honest reply easier, even if it’s a no.</li>
      <li>Use one channel. If the chat moved to WhatsApp or email, follow up there only.</li>
    </ul>

    <h2>Follow-up message templates for coaching and course enquiries</h2>
    <p>Rewrite these until they sound like you, and cut any line that isn’t true for your offer. Anything in [brackets] is yours to fill in.</p>
    <p className={styles.template}><span className={styles.templateLabel}>They asked the price, then went quiet (after a day or two)</span>Hi [name], did my message about the fee come through? It’s [price] for [length], and you can pay in [number] instalments if that’s easier. Happy to answer anything else first, even small questions.</p>
    <p className={styles.template}><span className={styles.templateLabel}>They said “let me think about it” (about a week later, or on the day they named)</span>Hi [name], hope your week’s going well. In case it helps while you think it over: it takes about [hours] hours a week, and every call is recorded if you can’t make it live. Is there anything you’d like to ask before you decide?</p>
    <p className={styles.template}><span className={styles.templateLabel}>They booked a call and didn’t show (same day)</span>Hi [name], I was on our call at [time] and missed you. No worries, things come up. If you’d still like to talk, you can pick another time here: [link]</p>
    <p>Leave out how long you waited. However you mean it, it reads as a guilt trip.</p>
    <p className={styles.template}><span className={styles.templateLabel}>They got the checkout link but didn’t buy (next day)</span>Hi [name], just checking the checkout link worked for you. If anything went wrong with the payment, or you have a question before joining, reply here and I’ll sort it out.</p>
    <p className={styles.template}><span className={styles.templateLabel}>A real enrolment deadline is coming (once, two or three days before)</span>Hi [name], a quick heads-up since you asked about [programme]: enrolment for the [month] cohort closes on [date]. If that’s too soon, the next one starts in [month], so no pressure. Want the link for either?</p>
    <p>Send this only if the date is real and enrolment actually closes then. Mentioning the next cohort keeps it a reminder rather than pressure.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Reconnecting after a few months</span>Hi [name], you asked me about [programme] back in [month]. I’m opening a new cohort on [date], and it now includes [what’s changed], which made me think of what you said about [their goal]. Want the details? Totally fine if things have moved on.</p>
    <p>Check your notes first, and skip anyone who said no.</p>
    <p className={styles.template}><span className={styles.templateLabel}>The final message (after two to three weeks of silence)</span>Hi [name], I don’t want to keep popping up in your messages, so this is my last nudge about [programme]. If the timing isn’t right, that’s completely fine. If you ever want to pick it up again, just message me here.</p>

    <h2>What not to do: fake urgency, guilt and daily pings</h2>
    <p>“Price goes up tonight!” when it doesn’t is fake urgency. So is “Only 2 spots left” when there’s no cap, or a “last chance” that comes round every month. “I guess you’re not serious about changing your life” is a guilt trip, and “??” followed by “Hello?” the next day is nagging. Any of these might get a reply. They also teach that person to doubt your next deadline.</p>
    <p>India’s Central Consumer Protection Authority lists 13 dark patterns in its <a href="https://ccpa.doca.gov.in/files/The%20Guidelines%20for%20Prevention%20and%20Regulation%20of%20Dark%20Patterns,%202023_1732707717.pdf">Guidelines for Prevention and Regulation of Dark Patterns, 2023</a>, starting with false urgency: “falsely stating or implying the sense of urgency or scarcity so as to mislead a user into making an immediate purchase”. The list also includes confirm shaming (using fear, shame, ridicule or guilt to push someone to buy) and nagging (repeated, persistent requests aimed at a sale, unless the person has agreed to them). The guidelines apply to platforms that systematically offer goods or services in India, and to advertisers and sellers.</p>
    <p>The CCPA enforces them: in June 2026 it <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2268302">fined the edtech company PhysicsWallah ₹5 lakh</a> (₹500,000), partly for confirm shaming at checkout. If you sell courses or coaching in India, the CCPA’s <a href="https://ccpa.doca.gov.in/files/Guidelines%20for%20Prevention%20of%20Misleading%20Advertisement%20in%20Coaching%20Sector,%202024.pdf">2024 guidelines on coaching advertisements</a> also treat “a false sense of urgency” as misleading. Their definition of coaching covers education, guidance and tuition, but not counselling, sports, dance, theatre or other creative activities.</p>
    <p>In the US, the Federal Trade Commission’s 2022 staff report <a href="https://www.ftc.gov/reports/bringing-dark-patterns-light">Bringing Dark Patterns to Light</a> describes the same tactics: “limited time” offers and countdown timers with no real deadline, false low-stock claims, confirm shaming, and nagging (asking repeatedly and disruptively, or not letting someone decline for good). It’s a staff report rather than a law, but it shows how FTC staff see these tactics.</p>
    <p>These rules mostly target apps and websites, so ask a lawyer how they apply to your own messages. The habit that keeps you clear is simpler: say only what’s true, and accept a no the first time.</p>

    <h2>When to stop following up</h2>
    <p>Stop after your final message. Stop sooner if they say no or ask you to stop, and don’t try to change their mind.</p>
    <p>A no isn’t always the word “no”. “I’ll pass for now” and “not for me” both count. If it fits, reply once and leave it there:</p>
    <p className={styles.template}><span className={styles.templateLabel}>They said no</span>Thanks for letting me know, [name]. I’ll leave it there. All the best with [their goal].</p>
    <p>Then note the date and what they said. Months later, when you’re announcing a new cohort, that note stops you messaging someone who already said no. If they asked you to stop, don’t reconnect at all unless they message you first. If they said “try me in March”, write that down too. It’s the one reconnect they’ve invited.</p>

    <h2>Do Instagram’s 24-hour and 7-day windows apply to you?</h2>
    <p>Not when you reply by hand. Those windows are rules for apps that send messages through Meta’s API.</p>
    <p>Meta’s <a href="https://developers.facebook.com/documentation/instagram-platform/overview">Instagram Platform documentation</a> says an app can reply through the API during a “standard messaging window”, which for most conversations lasts 24 hours from the person’s last message. An app approved for Meta’s Human Agent feature gets a separate 7-day window for replies a person writes by hand when an issue can’t be resolved within 24 hours. When you open the Instagram app and type a follow-up yourself, neither limit applies, so a day-14 message sent from your phone is fine.</p>
    <p>With a DM tool, a nudge two days after their last message is already outside the 24-hour window, and one sent after a week is outside both, so the tool may not be able to send it. Send that one from the app.</p>

    <h2>How to keep track of who needs a follow-up</h2>
    <p>Decide the next follow-up date when you send each message, and write it somewhere you check every day. Instagram has a few built-in helpers:</p>
    <ul>
      <li>Business accounts, and creator accounts in some categories, can <a href="https://help.instagram.com/450006664164235">add labels to chats</a>, such as Lead or Booked. Swipe left on a chat, tap More, then Add label. Instagram says it may not be available to everyone yet.</li>
      <li>In the app, creator accounts can press and hold a chat and tap <a href="https://help.instagram.com/1082319066258843">Mark as unread</a>. A blue dot stays until you reopen it, and nothing changes on their side.</li>
      <li>In the app, you can <a href="https://help.instagram.com/3738724653058102">schedule a text message</a> by pressing and holding the send button. Keep that for reminders you’ve promised. A scheduled nudge goes out at the time you picked, so if they reply or say no first, you’d have to cancel it.</li>
    </ul>
    <p>None of these shows who’s due today, so keep a simple list too: name, what they asked, last message, next follow-up date. The <Link href="/blog/dm-enquiry-tracker-template">free DM enquiry tracker template</Link> is a ready-made version, and the guide to <Link href="/blog/manage-instagram-dms-coach">managing Instagram DMs as a coach</Link> covers the daily routine around it.</p>

    <h2>Where a tool helps (and where it doesn’t)</h2>
    <p>If you get a handful of enquiries a week, you don’t need software for this. A spreadsheet or Instagram’s labels will do, as long as you check them daily.</p>
    <p>It gets harder when enquiries arrive faster than you can remember who’s waiting on whom. DealDock’s pilot is designed for that part: it’s built to remind you when a conversation has gone quiet and draft a nudge in your own texting style, which you can edit. Nothing is sent without your approval, follow-ups included. It connects through Meta’s official Instagram API, so the messaging windows above apply to anything sent through it, and a late nudge may still need to go from your phone.</p>
    <p>If you’re comparing options, this guide to <Link href="/blog/ai-instagram-dm-tools">AI tools for Instagram DMs</Link> explains the difference between auto-replies and drafts you approve.</p>
  </BlogArticle>;
}
