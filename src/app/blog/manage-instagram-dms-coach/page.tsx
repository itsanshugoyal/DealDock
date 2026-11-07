import type { Metadata } from "next";
import Link from "next/link";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog-article.module.css";
import { blogMetadata } from "@/lib/blog-posts";

const faqs = [
  {
    question: "How do I organise my Instagram DMs?",
    answer: "Switch to a creator or business account so you get Primary, General and Requests folders, flags and saved replies. Keep chats you’ll answer today in Primary, swipe the rest into General and flag anything that needs a next step. Then check your inbox at two set times a day, starting with people who are ready to pay.",
  },
  {
    question: "Can I make my own folders in Instagram DMs?",
    answer: "Meta’s Help Centre describes Primary, General and Requests for professional accounts, plus a Partnership messages folder for some creators who work with brands. It doesn’t describe a way to add your own folders. Use flags, up to three pinned chats and Instagram’s chat labels if your account has them, or labels in Meta Business Suite if you need your own categories.",
  },
  {
    question: "How do I set up saved replies on Instagram?",
    answer: "You need a creator or business account. Hold a message you’ve already sent, tap More, then Save, and give it a shortcut. Next time, type the shortcut in a chat and tap the chat icon that appears to fill in the reply, then change the first line so it fits the person you’re answering.",
  },
  {
    question: "Why are my Instagram messages going to General?",
    answer: "Usually because someone swiped them there or replied through a connected app. Meta’s developer documentation says a chat answered through a third-party app moves to General. General doesn’t send unread notifications by default, so check it in every session or switch its notifications on in Settings.",
  },
  {
    question: "Can I set an away message for Instagram DMs?",
    answer: "Yes, through Inbox automations in Meta Business Suite. Go to Inbox, then Automations, then Create automation, and choose Away message, or Auto reply for a greeting on someone’s first message. Meta lists these automations for Instagram business accounts, so check that they appear if you use a creator account.",
  },
  {
    question: "If I open a message request, will the person see that I’ve read it?",
    answer: "No. On a professional account, Meta says request messages aren’t marked as seen until you accept them. Once you accept or reply, that person’s future messages go to your Primary folder.",
  },
  {
    question: "Is it safe to let a VA reply to my Instagram DMs?",
    answer: "It can be, as long as you never share your password. Use Instagram’s shared access if your account has it, where inbox access is a separate switch, or add your VA to your business portfolio in Meta Business Suite with only the access they need. Turn on two-factor authentication first, and agree which messages they must hand back to you.",
  },
  {
    question: "How many chats can I pin in Instagram DMs?",
    answer: "Up to three. Swipe left on a chat in your inbox, or tap and hold it, then tap Pin. Save your pins for chats you open every day, such as a client in an active programme.",
  },
];

export const metadata: Metadata = blogMetadata("manage-instagram-dms-coach");

export default function Page() {
  return <BlogArticle slug="manage-instagram-dms-coach" faqs={faqs}>
    <p>Your Reel about the next cohort went out this morning. By evening there’s a client asking to move Thursday’s call, two people who wrote “price?”, a brand wanting your rates, a pile of fire emojis and one long message from someone who clearly wants to join but isn’t sure about the timings.</p>
    <p>That last person matters most tonight, and nothing in the inbox tells you so.</p>
    <p>To manage Instagram DMs as a coach or course creator, use a professional account so you get Primary and General folders, flags and saved replies. Then open your inbox at two fixed times a day and work through it in the same order every time: people ready to pay, current clients, brand enquiries, then everyone else. Anything that still needs a next step gets a flag and a line in a simple tracker, so nothing depends on your memory.</p>
    <p>The routine below uses free tools from Instagram and Meta, with menu names checked against Meta’s Help Centre in November 2026.</p>

    <h2>What Instagram gives a professional account for DMs</h2>
    <p>The tools below need a professional account (creator or business). If you’re still on a personal account, go to your profile, tap the menu in the top right to open Settings and activity, and under For professionals tap Account type and tools.</p>
    <p>Meta’s guide to the <a href="https://help.instagram.com/1264898753662278">professional inbox</a> covers most of what you get in the Instagram app:</p>
    <div className={styles.tableWrap}>
      <table>
        <thead>
          <tr><th>Feature</th><th>Where to find it</th><th>Use it for</th></tr>
        </thead>
        <tbody>
          <tr><td>Primary and General</td><td>The two main folders in your inbox. Swipe a chat to move it to General</td><td>Primary for chats you’ll answer today, General for later. General stays silent unless you turn its notifications on</td></tr>
          <tr><td>Requests</td><td>The Requests folder, next to General. Tap All requests, then Top requests, to sort</td><td>People you haven’t accepted yet. They won’t see that you’ve read their message until you accept</td></tr>
          <tr><td>Flags and filter</td><td>Flag a chat or mark it unread. The filter icon sits to the right of the search bar</td><td>Show only Unread or Flagged chats</td></tr>
          <tr><td>Pin</td><td>Tap and hold a chat, then tap Pin</td><td>Keep up to three chats at the top</td></tr>
          <tr><td>Saved replies</td><td>Hold a message you’ve sent, tap More, then Save, and add a shortcut</td><td>Type the shortcut and tap the chat icon that appears to fill in the reply</td></tr>
          <tr><td>Frequently asked questions</td><td>Messages, then the more actions menu (three dots), then Tools</td><td>Up to four questions people can tap before they message you, each with an optional automatic answer</td></tr>
        </tbody>
      </table>
    </div>
    <p>One catch: when someone taps one of your <a href="https://help.instagram.com/561062241952036">frequently asked questions</a>, their message lands in Requests, and you have to accept it before you can reply. Other first messages can land there too, so a buyer may wait days without you knowing. Our guide to <Link href="/blog/instagram-message-requests">Instagram message requests</Link> shows where they hide and how to check.</p>

    <h3>On a computer: Meta Business Suite</h3>
    <p>Meta says those inbox tools are for the Instagram mobile app. If you’d rather clear DMs at a desk, use <a href="https://www.facebook.com/business/help/294426838452244">Inbox in Meta Business Suite</a>. It’s free on desktop and in its own app, and Meta describes it as a tool for businesses and creators. You can mark chats for follow-up, move finished ones to Done, add labels (“paid”, “asked about 1:1”) and private notes to a person, and search by label later.</p>
    <p>Business Suite also has <a href="https://www.facebook.com/business/help/318238182723007">Inbox automations</a>: go to Inbox, then Automations, then Create automation. Auto reply (some of Meta’s pages call it an instant reply) greets someone the first time they message you. Away message answers when you’re not available, and Identify unanswered messages finds chats nobody has replied to. Meta lists these automations for Instagram business accounts, so on a creator account, check that they appear.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Example auto reply that’s honest about timing</span>Thanks for your message! I read and answer DMs myself, usually within a day.</p>

    <h2>A twice-a-day routine for your DMs</h2>
    <p>Pick two fixed times, for example 11am and 7pm, and give each one 30 minutes. Outside those times, leave the inbox alone unless you’re in a launch week. In each session, work in this order:</p>
    <ol>
      <li>Start with anyone ready to pay: people asking for the payment link, whether a seat is left, when the next cohort starts or how to join. Turn on the Unread filter and look for them first. Answer them fully in this session, then flag the chat until they’ve paid.</li>
      <li>Next come current clients, with reschedules and questions about this week’s module. They’ve already paid you, so they shouldn’t wait behind strangers. Reply now, or tell them when you will.</li>
      <li>Then brand enquiries, if you take them. Reply to anything with a clear brief or budget, and ask for the brief when there isn’t one. If you’ve joined Meta’s creator marketplace, check the Partnership messages folder too (it only appears once a brand has used it).</li>
      <li>Everyone else comes last: story reactions, kind words, peers wanting to collaborate, “can I pick your brain?” A reaction or a one-line reply is plenty. Move what can wait to General (the list icon at the top right lets you act on several at once) and report spam.</li>
    </ol>
    <p>Open Requests once a day as part of your first session. Before you close the app, every chat that still needs something from you should carry a flag.</p>

    <h2>Saved replies that don’t sound canned</h2>
    <p>Saved replies (older guides call them quick replies) stop you typing your price for the hundredth time. The risk is a pasted paragraph that reads like a brochure.</p>
    <p>Save only the facts, such as price and dates. Type the first line fresh so it answers the words they actually used, and end with one question that moves the chat on. Update them the day your price or dates change.</p>
    <p>Here are four examples for an eight-week career coaching cohort (the details are invented). The part in brackets is what you’d type fresh each time.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Example: price (shortcut “price”)</span>[Hi Meera, good question.] It’s ₹18,000 for the full eight weeks, or two payments of ₹9,000. What’s the main thing you want sorted by the end? I’ll tell you honestly whether this is the right fit.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Example: start date (shortcut “dates”)</span>[Yes, there’s still room.] The next cohort starts on Tuesday 5 January. Calls are on Tuesdays at 8pm IST and every one is recorded, so a busy week won’t set you back. Would that time work for you?</p>
    <p className={styles.template}><span className={styles.templateLabel}>Example: what’s included (shortcut “included”)</span>[Good question, and yes, the calls are live.] You get eight group calls with recordings, a workbook for each week, a private group chat with your cohort and two 15-minute check-ins with me. Is there something specific you hoped it would cover?</p>
    <p className={styles.template}><span className={styles.templateLabel}>Example: refunds (shortcut “refund”)</span>[Fair thing to ask before you pay.] If it isn’t right for you, tell me before the second call and I’ll refund you in full. After that, I can move you to a later cohort instead. Happy to send you the full terms first.</p>
    <p>Only promise refund terms that match your checkout page. And when someone sends a long, personal message, skip the saved reply and answer it properly.</p>

    <h2>How to move a buying conversation forward</h2>
    <p>Most buying chats end in a call, a checkout link or an objection you still need to answer. Work out which one this person needs and offer one thing at a time.</p>
    <p>If they’ve decided, send the link in this session and tell them what happens after they pay, so they aren’t left wondering whether it worked.</p>
    <p>If they’re interested but unsure it fits, offer a short call. For 1:1 coaching or a higher-priced programme, a few minutes on a call is often quicker than a long DM thread.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Example: offering a call</span>That’s easier to answer properly on a quick call. I’ve got 15-minute slots on Thursday and Friday evening. Pick whichever suits you here: [booking link]</p>
    <p>If they’ve gone vague (“I’ll think about it”, “maybe next cohort”), there’s usually one real objection underneath. It might be money, timing, whether it’ll work for someone like them or needing to check with a partner. Ask once, kindly.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Example: finding the real objection</span>No pressure at all. Can I ask what’s making you unsure? If it’s the cost or the timing, or whether it suits your situation, I’ll give you a straight answer.</p>
    <p>Then answer that objection and nothing else. If they go quiet after that, a friendly nudge or two is fine; our guide to <Link href="/blog/follow-up-coaching-enquiry">following up on a coaching enquiry</Link> has the timings and wording.</p>

    <h2>How to keep track of enquiries without relying on memory</h2>
    <p>A flag tells you a chat needs something. It doesn’t tell you what, or by when. Keep one row per person with their handle, what they asked about, where the chat stands, the next step and the date you’ll take it.</p>
    <p>A notes app is fine for a handful of chats. Past that, a spreadsheet is easier to scan, and our free <Link href="/blog/dm-enquiry-tracker-template">DM enquiry tracker template</Link> has the columns and stages ready. Update it at the end of each session, then unflag anything that’s done so the Flagged filter only shows what’s still open.</p>

    <h2>When to bring in a VA or a tool</h2>
    <p>It’s time for help when people who asked how to pay are waiting until the next day. A VA can take the first pass: sort, flag and answer whatever your saved replies cover, then hand you anything about money or a client’s personal situation.</p>
    <p>Give them access properly, never your password. On eligible accounts, Instagram’s <a href="https://help.instagram.com/514043488379093">shared access</a> lets you invite someone from the menu on your profile. Inbox access is a separate switch, and you can see what each person did. With inbox access on, people messaging you will see that the account is shared. If you don’t have it, add your assistant to your business portfolio in <a href="https://www.facebook.com/business/help/2169003770027706">Meta Business Suite</a> with only the access they need. Turn on two-factor authentication before you do either.</p>
    <p>For tools, connect only ones that log you in through Meta’s official API. Instagram lists giving your username and password to a third-party app or website as one reason an account can be <a href="https://help.instagram.com/740480200552298">restricted for data scraping</a>.</p>
    <p>Know the API’s limits too. <a href="https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api">Meta’s developer documentation</a> says a connected tool can usually reply within 24 hours of someone’s last message, with a separate 7-day window for replies a person writes if Meta has approved the tool for its Human Agent feature. Chats you answer through a tool also move to General. A follow-up after a longer silence is one you’ll send yourself from the app. If you’re comparing tools, our guide to <Link href="/blog/ai-instagram-dm-tools">AI tools for Instagram DMs</Link> explains auto-replies versus drafts you approve.</p>

    <h2>Where a tool helps (and where it doesn’t)</h2>
    <p>If two sessions a day get you through buyers and clients, you don’t need new software. A few saved replies and a spreadsheet will do the job, and they cost nothing.</p>
    <p>A tool earns its place when sorting eats your sessions: you’re scrolling past fan messages to find the people who asked about price, or quiet chats slip because nothing reminds you. DealDock is built for that, and it’s currently a small, application-only pilot. The pilot is designed to sort chats by type (coaching lead, course question, brand deal, other sale, fan, spam) and put the ones likely to be worth the most first, with an estimated value. It’s also built to draft replies in your own texting style for you to edit, remind you about chats that have gone quiet and keep a ledger of deals from agreed to paid that you update. Nothing sends without your approval, follow-ups included. It connects through Meta’s official Instagram API, so it never asks for your password and doesn’t scrape.</p>
    <p>It won’t run comment-to-DM funnels or message anyone on its own, and an estimated value is a starting point to check, not money earned. Whatever you try, test it on the part of your inbox that slips most often.</p>
  </BlogArticle>;
}
