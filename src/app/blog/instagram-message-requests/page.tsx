import type { Metadata } from "next";
import Link from "next/link";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog-article.module.css";
import { blogMetadata } from "@/lib/blog-posts";

const faqs = [
  {
    question: "Why are my Instagram message requests not showing?",
    answer: "Tap Messages, then Requests in the top right, and check the Spam folder inside Requests, where filtered requests go without a notification. If you follow the sender, their message is in your main chats instead. If it’s still missing, check your Message requests setting under Messages and story replies, and whether Limits is on, because it sends new chats from the accounts you limit to the Hidden requests folder.",
  },
  {
    question: "Where are hidden requests on Instagram?",
    answer: "They’re inside Requests. Tap Messages, then Requests in the top right, then Spam, which some Instagram Help Centre pages call the Hidden requests folder. Instagram doesn’t send notifications for this folder, so you only see what’s there by opening it.",
  },
  {
    question: "Does someone know if I read their message request?",
    answer: "On a professional account, request messages aren’t marked as seen until you accept them. If a request was hidden by your filters, Instagram says the sender won’t know it was hidden. Once you accept, the chat works like any other.",
  },
  {
    question: "What’s the difference between Primary and General on Instagram?",
    answer: "Both are tabs in the professional account inbox. Primary is for messages you want to see first and notifies you by default. General is for messages to come back to later, and its notifications stay off unless you switch them on. You can swipe a chat into General and move it back when you need to.",
  },
  {
    question: "Why did a brand’s message end up in my General tab?",
    answer: "Either someone moved it there, which takes one swipe, or someone replied to it from a third-party app. Meta’s developer documentation says a reply sent from a third-party app moves the conversation to General, whatever your settings. Move the chat back to Primary, or turn on notifications for General.",
  },
  {
    question: "If I delete a message request, can they message me again?",
    answer: "Yes. Deleting removes the request from your inbox but doesn’t block the account. Blocked accounts can’t send you message requests, so block anyone you don’t want to hear from again.",
  },
  {
    question: "How can I tell if a brand collab DM is a scam?",
    answer: "Be wary of any request that asks for a fee, sends a login link, hurries you onto another app or gives you a same-day deadline. Instagram lists all of these as warning signs. Compare the handle with the one linked from the brand’s own website, and ask for the brief from a company email address.",
  },
  {
    question: "Why can’t a brand send me photos in a message request?",
    answer: "Message requests are text only until you accept them. Once you’ve checked the account looks genuine, accept the request and the brand can send photos, videos or voice notes.",
  },
];

export const metadata: Metadata = blogMetadata("instagram-message-requests");

export default function InstagramMessageRequests() {
  return <BlogArticle slug="instagram-message-requests" faqs={faqs}>
    <p>You’re clearing out your message requests on a slow Sunday and find a brand asking for your rates. Under it sits a second message from the same account, three weeks later: “We’re closing the creator list on Friday!” That Friday has been and gone.</p>
    <p>Further down, someone asked whether your April cohort still had seats. They didn’t hear back, so they joined someone else’s. Neither message was lost. Instagram filed both where its rules say they go.</p>
    <p>Instagram treats a message from an account you don’t follow as a request, so a first message from a brand or a new buyer usually lands in Requests, not your main chats. Requests that look like spam, or match your Hidden Words settings, are filtered again into a Spam folder (some Help Centre pages call it Hidden requests), and Instagram sends no notifications for it. On a professional account, the General tab has notifications off by default too. To check on your phone, tap Messages at the bottom, then Requests in the top right, then Spam, and look through General as well.</p>

    <h2>Where are message requests on Instagram?</h2>
    <p>On your phone, tap Messages at the bottom of the screen, then Requests in the top right. On a computer, click the Messages icon on the left, then requests next to Messages at the top left.</p>
    <p>On a professional (creator or business) account, the list opens on All requests. Tap that to switch to Top requests, which Instagram says organises requests <a href="https://help.instagram.com/1264898753662278">by important accounts</a>. Handy on a long list, but scroll All requests too.</p>
    <p>Inside Requests sits a second folder for filtered messages. Instagram’s Help Centre calls it <a href="https://help.instagram.com/194599462478093">Spam</a>; its page on Limits calls it the Hidden requests folder, the name Instagram used when it launched the filter in 2021. You only know what’s in it by opening it.</p>

    <h2>Why do brand messages go to requests?</h2>
    <p>Because you don’t follow the brand. Messages from people you follow go straight to your chats; everything else arrives as a <a href="https://help.instagram.com/585369912141614">message request</a>. That covers most brands, and nearly everyone about to buy from you for the first time.</p>
    <p>A request is text only. Instagram says the sender can’t add photos, videos or voice notes until you accept, so a brand may be holding back its product shots until then. And on a professional account, request messages aren’t marked as seen until you accept them. To the brand, a request you never opened and one you read and forgot look the same: no reply.</p>
    <p>Some brands skip Requests altogether. If you’ve joined Meta’s creator marketplace (Professional dashboard, then Branded content), brands can message you in a separate Partnership messages folder, which appears next to General and Requests once the first one arrives.</p>

    <h2>What are hidden requests, and why do messages go to Spam?</h2>
    <p>Instagram moves requests that may be offensive, unwanted or spam into Spam, plus anything caught by your Hidden Words. Three settings decide how much lands there:</p>
    <ul>
      <li><strong>Hide unwanted message requests.</strong> When it’s on, requests that may contain scams or offensive words, phrases or emojis go to Spam. Instagram says it’s <a href="https://help.instagram.com/700284123459336">off by default</a> except on Teen Accounts. Find it on your profile under Menu, then Messages and story replies, then Message requests.</li>
      <li><strong>Your custom Hidden Words.</strong> If you once added “collab” or “promo” to your list to cut down spam, requests using those words get filtered too, and real pitches use the same words as fake ones. You’ll find the list under Menu, then Hidden words.</li>
      <li><strong>Limits.</strong> If you turned on Limit interactions during a rough week, new chats from the groups you limited, such as accounts that don’t follow you, go to the <a href="https://help.instagram.com/4106887762741654">Hidden requests folder</a> in Message requests.</li>
    </ul>
    <p>Instagram says the sender won’t know their message was hidden, so nobody prompts you to look. It also won’t hide messages from accounts you’re already connected with, even if they include offensive words, so the filtering falls on first contact: new brands and buyers.</p>
    <p>To clear the folder, tap a message to read it, then Accept to move it into your main messages. Edit in the top right gives you Delete all, which is safe once you’ve read the list.</p>

    <h2>Instagram Primary vs General: what’s the difference?</h2>
    <p>Only professional accounts have these two tabs. Instagram describes Primary as the place for messages you’d like to see first, with notifications on. General is for messages you’d like to get back to later, and its notifications are off by default, though you can turn them on in settings.</p>
    <p>New messages arrive in Primary, and when you reply to or accept a request, that person’s future messages go to Primary too. A brand chat can end up in General because someone swiped it there to wait for a brief, and the brief then arrived without a sound.</p>
    <p>There’s a less obvious route. Meta’s developer documentation says that if you reply to a message using a third-party app, <a href="https://developers.facebook.com/documentation/instagram-platform/overview">the conversation moves to General</a>, whatever your settings. That means apps connected to your account through Meta’s API, such as automation and inbox tools. If you use one, check General often.</p>
    <p>To move a chat, swipe it in your chat list or open its options and pick the other folder. The Help Centre only documents swiping into General, and labels change between app versions.</p>

    <h2>Accept, delete or ignore: what happens to a request?</h2>
    <ul>
      <li><strong>Accept.</strong> The chat and their future messages move to your main messages (Primary, on a professional account, where replying does the same). They can now send photos, videos and voice notes, and their messages can show as seen.</li>
      <li><strong>Delete.</strong> The request leaves your inbox. It doesn’t block the account, so they can write again, and the Help Centre doesn’t mention any notice to the sender.</li>
      <li><strong>Ignore.</strong> It stays in Requests. On a professional account it isn’t marked as seen, so the sender sees only silence.</li>
      <li><strong>Block or report.</strong> Blocked accounts can’t send you message requests. Reporting a spam request sends it to Instagram for review, and the account won’t see who reported it.</li>
    </ul>

    <h2>Check your message controls</h2>
    <p>Message controls decide whether people you’re not connected with can reach you at all. In the app, tap your profile picture in the bottom right, then Menu in the top right. Under How others can interact with you, tap Messages and story replies, then Message requests. On a computer, it’s More, then Settings, then Messages and story replies, then Message controls.</p>
    <p>There you choose whether message requests from people on Instagram go to your Message requests folder, or whether you receive them at all. If you sell through DMs, keep them coming to the folder. Instagram says this setting doesn’t affect messages from your ads or monetised content, but with requests switched off, a brand you don’t follow may not be able to reach you.</p>

    <h2>Turn on notifications for message requests</h2>
    <p>Notifications can’t rescue filtered messages, but they stop ordinary requests going unseen. In the app, go to your profile, tap Menu, then Notifications.</p>
    <ol>
      <li>Check that notifications aren’t paused.</li>
      <li>Tap Direct messages and check each switch, including any for message requests. The Partnership messages switch lives here too.</li>
      <li>On a professional account, turn on notifications for General if you keep live chats there.</li>
      <li>If you use sleep mode (under Time management in the same menu), it pauses notifications for the hours you set and sends people who message you an auto-reply.</li>
      <li>Make sure your phone’s own settings allow Instagram notifications.</li>
    </ol>
    <p>Spam has no switch. Instagram says you won’t receive notifications for spam, so that folder only gets seen when you open it.</p>

    <h2>A weekly check, on your phone</h2>
    <p>Pick a fixed slot, say Monday morning, and go through these in order.</p>
    <ol>
      <li>Open Requests and read the first line of each. Accept anything from a brand or buyer you’d answer, and delete the obvious junk.</li>
      <li>Open Spam inside Requests. Accept anything real, then clear the rest.</li>
      <li>On a professional account, look for unread chats in General and move live deals and warm buyers back to Primary.</li>
      <li>Check the Partnership messages folder, if you have one.</li>
      <li>Flag each chat you accepted (the filter icon beside the search bar can then show only flagged chats) and add it to your <Link href="/blog/dm-enquiry-tracker-template">DM enquiry tracker</Link> with your next step.</li>
      <li>Reply to the late ones first. A short, honest line does it.</li>
    </ol>
    <p className={styles.template}><span className={styles.templateLabel}>Example: a brand request you found late</span>Hi Rhea, sorry, this went to my message requests and I’ve only just seen it. Is the campaign still open? I’d love to see the brief.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Example: a buyer request you found late</span>Hi! Your message landed in my requests, so I’ve only just seen it, sorry. The April cohort is full, but May opens on the 6th. Shall I send you the details?</p>
    <p>Then follow through. Our guides cover <Link href="/blog/influencer-brand-dms">what to ask a brand before you quote</Link> and <Link href="/blog/follow-up-coaching-enquiry">following up on a coaching enquiry</Link>.</p>
    <p>Once a month, also recheck Hidden Words, Limits, message controls and notifications. They’re easy to change in a bad week and forget.</p>

    <h2>Real brand or scam? How to check a collab request</h2>
    <p>Scammers are accounts you don’t follow too, so they land in the same list as real offers. Instagram has said it warns you about messages from accounts it suspects are deceptive. Take it seriously, but don’t treat its absence as proof.</p>
    <p>Instagram’s guide to <a href="https://help.instagram.com/514187739359208">avoiding scams</a> lists the signs. In a collab request, watch for:</p>
    <ul>
      <li>A fee before you’re paid. Instagram lists requests for advance fees as a warning sign; in a collab, that’s a joining fee or a “starter kit” you pay for.</li>
      <li>A request to log in with your social media, email or bank account. A brand doesn’t need your password to send a brief.</li>
      <li>A push to move off Instagram before you know who you’re talking to. Moving an agreed deal to email is normal.</li>
      <li>Urgency. “Only two spots left today” is there to stop you checking.</li>
      <li>A DM “from Instagram”. Instagram says it never messages you about your account in the app, so a DM about a copyright strike or verification isn’t from Instagram.</li>
    </ul>
    <p>Fake buyers show the same signs. A real buyer never needs you to pay or log in anywhere first.</p>
    <p>Then check the account. Find the brand’s own website, follow its link to Instagram and compare the handle letter by letter. If you’re unsure, ask for the brief by email and check the address matches the website. If an account is pretending to be a brand, or you, <a href="https://help.instagram.com/1291391774792379">report it for impersonation</a>: on the profile, tap Options in the top right, then Report, Something about this account and They’re pretending to be someone else. Reports are anonymous.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Example (invented brand): a request worth answering</span>Hi Meera, I’m Kabir from Tillery Oils. We’re booking three creators for paid Reels in December. Could you share your rate for one Reel and two stories? I can email the brief from our company address.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Example: a request to report and delete</span>Congratulations, you’ve been selected as an official brand ambassador! Pay ₹1,499 for your welcome kit to activate the collab. Only 2 spots left today. Log in here to confirm: [link]</p>
    <p>The second packs a fee, a gift, a deadline and a login link into four sentences.</p>

    <h2>Where a tool helps (and where it doesn’t)</h2>
    <p>If you get a handful of requests a week, this routine and a notes app or spreadsheet are enough. A tool starts to earn its place when a Reel takes off and the hard part becomes deciding what to answer first, and finding the words.</p>
    <p>DealDock’s pilot is built for that part. It’s designed to sort conversations by type, such as brand deals and coaching leads, put the ones likely to be worth most first with an estimated value, draft each reply in your own texting style for you to edit, and remind you about conversations that have gone quiet. Nothing sends without your approval. It connects through Meta’s official Instagram API, so it never asks for your password. It’s a small, application-only pilot, so treat it as something to try, not a sure thing.</p>
    <p>Whatever you use, keep the weekly look through Requests and Spam, and the monthly settings check.</p>
  </BlogArticle>;
}
