import type { Metadata } from "next";
import Link from "next/link";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog-article.module.css";
import { blogMetadata } from "@/lib/blog-posts";

const faqs = [
  {
    question: "Barter collaboration kya hota hai?",
    answer: "Barter collab mein brand aapko paise ki jagah product, service ya experience deta hai, aur badle mein content chahta hai. Hindi mein barter ko vastu vinimay kehte hain. Paid collab mein aapko tay fee milti hai, aur affiliate deal mein har sale par commission.",
  },
  {
    question: "Instagram par paid partnership ka matlab kya hai?",
    answer: "“Paid partnership” label batata hai ki post kisi brand ke saath value ke badle bani hai, jaise fee, free ya loan par mila product, ya affiliate commission. Instagram ke Help Center ke mutabiq gifted product bhi isme aata hai. India mein Department of Consumer Affairs is label ke alawa alag disclosure maangta hai, aur ASCI bhi label ke saath apna disclosure dene ki baat karta hai, jaise caption ki shuruaat mein “Ad”.",
  },
  {
    question: "Kya barter mein mile product par tax lagta hai?",
    answer: "Kaam ke badle mila product aapki income mein gina ja sakta hai, chahe TDS kate ya na kate. Agar kisi company, firm ya bade business se ek saal mein ₹20,000 se zyada ke benefits milein, toh use 10% TDS ka intezaam karna hota hai: pehle section 194R ke tahat, aur 1 April 2026 se Income-tax Act 2025 ke section 393(1) ke tahat. Apne case ke liye CA se baat karo.",
  },
  {
    question: "Product wapas kar diya toh bhi TDS lagega?",
    answer: "CBDT Circular 12 of 2022 ke mutabiq, influencer product use karke company ko wapas kar de toh wo 194R ke liye benefit nahi maana jata. Product rakh liya toh wo benefit hai aur TDS ka rule lagta hai. Return ka proof, jaise courier receipt aur brand ka email, sambhaal ke rakho.",
  },
  {
    question: "Kya barter post par #ad lagana zaroori hai?",
    answer: "Haan. ASCI ke guidelines mein free products, bina maange aaye products aur media barters bhi material connection hain, isliye disclosure chahiye. Label caption ki pehli line mein ya photo aur video ke upar likho, hashtags ke beech chhupa ke nahi.",
  },
  {
    question: "Brand ne bina poochhe PR package bhej diya. Kya post karna padega?",
    answer: "Agar aapne pehle se kuch promise nahi kiya tha, toh post karna zaroori nahi. Lekin us product ke baare mein post karoge toh disclosure chahiye, kyunki ASCI bina maange aaye free product ko bhi material connection maanta hai. Brand ko politely bata do ki gifting se post ki guarantee nahi hoti.",
  },
  {
    question: "Paid collab ke liye kitne followers chahiye?",
    answer: "Koi official number nahi hai. Agar brand aapse dedicated content, deadline ya usage rights maang raha hai, toh wo aapke kaam ki value maan raha hai, aur fee poochhna bilkul theek hai.",
  },
  {
    question: "Kya barter par GST lagta hai?",
    answer: "Agar aap GST-registered ho, toh barter bhi GST ke hisaab se supply ho sakta hai, kyunki CGST Act ke section 7 mein barter supply ki definition mein shamil hai. Value kaise lagani hai aur invoice kaise banana hai, ye CA se confirm karo. Registered nahi ho toh invoice par GST mat jodo.",
  },
];

export const metadata: Metadata = blogMetadata("barter-vs-paid-collab");

export default function BarterVsPaidCollab() {
  return <BlogArticle slug="barter-vs-paid-collab" faqs={faqs}>
    <p>DM aata hai: “Hi! We love your content. Hum aapko apna naya serum bhejna chahte hain. Bas ek Reel bana dena, launch 5 tareekh ko hai.”</p>
    <p>Serum shayad ₹1,000 ke aas-paas ka hai (example). Reel ka matlab hai script, shoot, edit aur retakes. Poora din jayega, aur date bhi unki hai.</p>
    <p>Pehli baar aisa DM aaye toh achha lagta hai. Dasvi baar aaye toh asli sawaal saamne aata hai: haan bolein, ya paise maangein?</p>
    <p>Barter collab mein brand paise ki jagah product ya service deta hai, paid collab mein tay fee, aur affiliate collab mein har sale par commission. Barter tab theek hai jab product aap waise bhi khareedte, ask chhota ho (jaise ek Story, bina script ya deadline ke) aur aap abhi portfolio bana rahe ho. Brand dedicated Reel, fixed script, deadline, usage rights ya exclusivity maange, toh wo paid kaam hai, fee maango. Barter poori tarah “free” bhi nahi hota: post par “Ad” jaisa label chahiye, aur ek brand se saal bhar mein ₹20,000 se zyada ka saamaan mile toh TDS ka rule lag sakta hai.</p>

    <h2>Barter collab kya hota hai? Paid aur affiliate se farak</h2>
    <p>Barter ko Hindi mein vastu vinimay kehte hain, yaani saamaan ke badle saamaan ya kaam. Creator ke case mein brand product ya experience (jaise salon session) deta hai, aur badle mein content chahta hai.</p>
    <p>Paid collab mein brand aapke kaam ki fee deta hai. Affiliate deal mein aapko ek link ya code milta hai, aur us code se hui har sale ka ek percent aapka hota hai. Kai deals beech mein hoti hain, jaise product ke saath chhoti fee. Aisi deal mein fee ko kaam ke hisaab se parkho.</p>
    <div className={styles.tableWrap}><table>
      <thead><tr><th></th><th>Barter</th><th>Paid collab</th><th>Affiliate / commission</th></tr></thead>
      <tbody>
        <tr><td>Badle mein kya milta hai</td><td>Product, service ya experience</td><td>Tay fee</td><td>Har sale par commission</td></tr>
        <tr><td>Sale na ho toh</td><td>Product aapke paas rehta hai</td><td>Fee phir bhi milti hai</td><td>Kuch nahi milta</td></tr>
        <tr><td>Kab theek hai</td><td>Chhota ask, product jo aap use karte ho</td><td>Dedicated content, deadline, usage rights</td><td>Product jo aapki audience sach mein khareedti hai</td></tr>
        <tr><td>Disclosure label</td><td>Zaroori</td><td>Zaroori</td><td>Zaroori</td></tr>
      </tbody>
    </table></div>

    <h2>Barter collab kab lena theek hai?</h2>
    <p>Jab kaam halka ho aur marzi aapki chale. Jaise:</p>
    <ul>
      <li>Product aap waise bhi khareedte. Tab barter aapka paisa bachata hai.</li>
      <li>Ask chhota hai: ek Story, ya “pasand aaye toh mention karna”.</li>
      <li>Na script hai, na deadline. Product pasand na aaye toh post na karne ki chhoot hai.</li>
      <li>Aap shuruaat mein ho, aur pehle kuch collabs se portfolio banana hai. Bas har barter ko “portfolio ke liye” keh ke haan mat bolo.</li>
    </ul>

    <h2>Barter kab nahi? In cases mein fee maango</h2>
    <p>Brand in mein se kuch bhi maange, toh wo aapka time aur reach khareed raha hai. Ye paid kaam hai:</p>
    <ul>
      <li>Dedicated Reel ya video, jo sirf unke product par ho.</li>
      <li>Usage rights, yaani brand aapka content apne ads ya website par use karna chahta hai.</li>
      <li>Unka script, unki deadline, upar se revisions.</li>
      <li>Exclusivity: “agle teen mahine kisi aur skincare brand ke saath kaam mat karna”. Ye aapki doosri kamai rokta hai.</li>
    </ul>
    <p>₹1,000 ka serum ek din ke kaam ki fee nahi hai, chahe packaging kitni bhi achhi ho.</p>

    <h2>Brand ko reply kaise karein: 4 Hinglish templates</h2>
    <p>Brand DMs ko organise karne ke liye <Link href="/blog/influencer-brand-dms">ye guide</Link> padho. Yahan barter ke chaar common jawab hain; brackets mein apni details daalo.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Barter accept karna, saaf terms ke saath</span>Hi [Brand] team, product ke liye thanks! Barter par meri taraf se ye ho sakta hai: 2 hafte use karne ke baad, agar product sach mein pasand aaya, toh ek Story honest review ke saath. Isme dedicated Reel, script ya fixed date nahi hogi. Aap Story repost kar sakte ho; ads ya website par use karna ho toh uski baat alag se karenge. Theek lage toh address bhej doon?</p>
    <p className={styles.template}><span className={styles.templateLabel}>Barter ki jagah fee maangna</span>Hi [Naam], reach out karne ke liye thanks, brand mujhe sach mein pasand hai. Aap jo maang rahe ho (dedicated Reel, aapka script, [date] tak live), wo meri paid collab hoti hai, barter par ye possible nahi hai. Kya is campaign ke liye creator budget hai? Budget bata do toh usi hisaab se options bhej doon.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Rate quote karna</span>Hi [Naam], brief ke liye thanks! Is campaign ke liye mera quote:{"\n"}1 Reel (60 sec tak) + 2 Stories: ₹[amount] [+ GST, agar registered ho]{"\n"}Isme 1 revision aur aapke handle par 30 din ka repost shamil hai.{"\n"}Ads mein use ya exclusivity chahiye toh uska quote alag hoga.{"\n"}Payment: 50% advance, baaki posting ke 15 din ke andar, invoice ke against.{"\n"}Live date: [date], agar product aur final brief [date] tak mil jaye.</p>
    <p className={styles.template}><span className={styles.templateLabel}>Politely mana karna</span>Hi [Naam], mujhe consider karne ke liye thanks! Abhi mere calendar mein barter collabs ki jagah nahi hai. Aage koi paid campaign plan ho toh zaroor batana, aapke brand ke saath kaam karna achha lagega.</p>

    <h2>Paid collab ka rate kitna rakhein?</h2>
    <p>Iska ek sahi number nahi hai. Same follower count wale do creators ke rate mein bahut farak ho sakta hai, kyunki niche, engagement aur kaam ki quantity alag hoti hai.</p>
    <p>Quote banane ke liye <Link href="/tools/brand-deal-rate-calculator">free brand deal rate calculator</Link> try karo. Apni base fee daalo (Reel, Story, post), aur ye usage rights, paid ads (whitelisting), exclusivity aur rush ka add-on jod ke quote banata hai, rupees mein bhi.</p>
    <p>Ye cheezein rate badhati hain, toh quote mein inhe alag line mein likho:</p>
    <ul>
      <li><strong>Usage rights:</strong> content kahan aur kitne time tak use hoga. Brand ke handle par repost ek baat hai, packaging par lagana doosri.</li>
      <li><strong>Paid ads:</strong> brand aapka content ad bana ke chalaye (paid usage), ya ad aapke handle ya naam se chale (whitelisting, jise Instagram partnership ads kehta hai).</li>
      <li><strong>Exclusivity:</strong> jitne din aap competitors ko mana karoge, utne din ki kamai ka hisaab isme aana chahiye.</li>
      <li><strong>Deadline:</strong> “kal tak Reel chahiye” ka matlab hai baaki kaam side karna. Rush ka charge banta hai.</li>
    </ul>

    <h2>Payment terms: advance, net days aur invoice</h2>
    <p>Shoot se pehle ye cheezein DM ya email mein likhwa lo:</p>
    <ul>
      <li><strong>Advance:</strong> naye brand ke saath kaam shuru karne se pehle kuch hissa, jaise 50% (example). Ye aapki shart hai, kanoon nahi, toh brand negotiate kar sakta hai.</li>
      <li><strong>Net days:</strong> “Net 30” ka matlab invoice ki date se 30 din ke andar payment.</li>
      <li><strong>Invoice:</strong> GST-registered ho toh GSTIN wala tax invoice bhejo. Registered nahi ho toh simple invoice bina GST ke, kyunki <a href="https://cbic-gst.gov.in/hindi/CGST-bill-e.html">CGST Act</a> ka section 32 unregistered person ko GST collect karne se rokta hai.</li>
      <li><strong>TDS:</strong> kai brands fee se TDS kaat ke baaki amount bhejte hain, toh pehle poochh lo.</li>
    </ul>
    <p>Barter par GST: CGST Act ke section 7 mein “supply” ki definition mein barter naam se likha hai. Isliye GST-registered creator ke liye product ke badle kiya kaam bhi supply ho sakta hai, jis par GST ban sakta hai. Value kaise lagani hai, ye apne CA se confirm karo.</p>
    <p>Payment late ho jaye toh day 1, 7, 14 aur 30 par kya bhejna hai, ye <Link href="/blog/brand-hasnt-paid">is guide</Link> mein hai.</p>

    <h2>Barter par tax: 194R aur naye Act ka section 393</h2>
    <p>Koi business aapko aapke kaam ke silsile mein free product ya sponsored trip jaisa benefit de, aur ek financial year mein aise benefits ₹20,000 se zyada ho jayein, toh us business ko 10% TDS ka intezaam karna hota hai. Ye <a href="https://wm.incometaxindia.gov.in/w/tds-on-benefit-or-perquisite-arising-from-business-or-profession">section 194R</a> hai, jo 1 July 2022 se laagu hua. TDS poori value par lagta hai, sirf ₹20,000 ke upar wale hisse par nahi.</p>
    <p>Ye rule benefit dene wale par lagta hai, chahe wo company ho, firm, LLP ya koi aur entity. Individual ya HUF par ye sirf tab lagta hai jab unka pichhle saal ka turnover business mein ₹1 crore ya profession mein ₹50 lakh se zyada tha.</p>
    <p>Barter mein kaatne ke liye cash hota hi nahi, isliye brand ko product dene se pehle ensure karna hota hai ki tax jama ho chuka hai. Ya toh wo khud jama kare, ya aapse advance tax bharwa ke challan ki copy aur declaration le.</p>
    <p>CBDT ne Circular 12 of 2022 (16 June 2022) mein influencers ka case seedha cover kiya: car, mobile, outfit ya cosmetics jaisa product use karke company ko wapas kar diya, toh wo 194R ke liye benefit nahi hai. Rakh liya, toh benefit hai. Isi circular ne reimbursement bhi saaf kiya: shoot ke liye hotel ya ticket ka bill brand ke naam par ho toh benefit nahi, aapke naam ka bill brand reimburse kare toh benefit. Circular 18 of 2022 (13 September 2022) ne yahi rule rakha, bas ek chhoot jodi: agar ye kharcha aapke fee wale bill mein hi hai aur brand poore bill par kisi aur section (jaise 194J) mein TDS kaat raha hai, toh alag se 194R TDS nahi lagta.</p>
    <p>1 April 2026 se Income-tax Act 2025 laagu hai, aur ye rule ab <a href="https://wm.incometaxindia.gov.in/w/section-393-5">section 393(1) ki Table ke Sl. No. 8(iv)</a> mein hai, wahi 10% aur ₹20,000 ke saath. Naye Act mein “previous year” aur “assessment year” ki jagah ek hi term hai, “tax year” (1 April se 31 March), aur ₹20,000 ki limit ab isi ke hisaab se gini jaati hai. Income Tax Department ke <a href="https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/objective-and-scope-new-act">FAQ</a> ke mutabiq purane circulars section 536(2)(j) ke tahat chalte rahenge, jab tak naye Act se takraate nahi.</p>
    <p>TDS kate ya na kate, kaam ke badle mila product aapki income ho sakta hai. Apne case ke liye, khaaskar agar barter regular hai, ek CA se baat karo.</p>

    <h2>Barter post par bhi #ad lagana zaroori hai?</h2>
    <p>Haan. <a href="https://www.ascionline.in/social/wp-content/uploads/2025/04/ASCI-Influencer-Guidelines.pdf">ASCI ke influencer guidelines</a> mein “material connection” ki definition mein free products aate hain, shart ke saath ya bina, aur bina maange aaye products bhi. Media barters bhi isi list mein hain. Brand ne product bheja aur aapne us brand ka product mention kiya, toh disclosure chahiye, chahe brand ne post karne ko kaha ho ya nahi, aur review kitna bhi honest ho.</p>
    <p>Department of Consumer Affairs ka “<a href="https://consumeraffairs.gov.in/public/upload/admin/cmsfiles/whatsnews/Know-hows_Endorsements_For_CelebritiesInfluencers__Virtual_Influencers_on_Social_Media_Platforms_whatsnews.pdf">Endorsements Know-hows!</a>” guide (January 2023) bhi yahi kehta hai. Dono ko milake ye checklist banti hai:</p>
    <ul>
      <li><strong>Label:</strong> “Ad” sabse safe hai, kyunki ye ASCI aur DoCA dono ki list mein hai. ASCI “Collaboration” aur “Free gift” bhi maanta hai.</li>
      <li><strong>Jagah:</strong> caption ki shuruaat mein. “More” ke peeche ya hashtags ke jhund mein label chhup jaata hai.</li>
      <li><strong>Story, Reel aur Live:</strong> label photo ya video ke upar likho. ASCI ke time rules: 15 second tak ki video mein kam se kam 3 second, 2 minute se chhoti video mein length ka 1/3, aur 2 minute ya usse lambi video mein jab tak brand ki baat chal rahi hai. DoCA video mein disclosure audio aur video dono mein chahta hai, aur live mein poore stream bhar.</li>
      <li><strong>Language:</strong> DoCA ke mutabiq disclosure usi language mein ho jismein endorsement hai. Hindi mein bol rahe ho toh “ye ad hai” bolo.</li>
      <li><strong>Claims:</strong> product khud use karke hi endorse karo, aur brand ke claims bina check kiye aage mat bolo.</li>
    </ul>
    <h3>Instagram par “Paid partnership” ka matlab kya hai?</h3>
    <p>“Paid partnership” label ka matlab hai ki creator ne wo content kisi brand ke saath value ke badle banaya hai. <a href="https://help.instagram.com/616901995832907">Instagram ke Help Center</a> ke mutabiq free ya loan par mila product bhi “exchange of value” hai, isliye barter post par bhi ye label lagana hota hai, aur affiliate link wali post par bhi. Ye label lagane ke liye app mein branded content tools on hone chahiye.</p>
    <p>Akela label kaafi nahi hai. ASCI platform tool ko aapke apne disclosure ke saath use karne ki baat karta hai, aur DoCA platform tools ke alawa alag disclosure maangta hai. Toh caption ya video mein “Ad” bhi likho.</p>

    <h2>Tool kab kaam aata hai (aur kab nahi)</h2>
    <p>Hafte mein do-chaar collab DMs aate hain toh notes app ya Google Sheet kaafi hai: har brand ke aage offer type (barter, paid ya affiliate) aur agla step likh do. <Link href="/blog/dm-enquiry-tracker-template">Free DM enquiry tracker</Link> se bhi shuru kar sakte ho.</p>
    <p>Jab paid offers fan messages ke neeche dabne lagein, tab dedicated inbox kaam aa sakta hai. DealDock abhi Instagram DMs ke liye ek chhota, application-only pilot hai. Pilot is tarah design kiya gaya hai ki ye conversations ko type ke hisaab se sort kare (brand deal, coaching lead, fan, spam aur baaki), zyada value wale DMs ko estimated value ke saath upar rakhe, aur aapke texting style mein reply draft kare, jise aap edit kar sakte ho. Aapki approval ke bina ye kuch send nahi karta, follow-up bhi nahi. Chup ho gayi conversations ka reminder deta hai, aur Meta ke official Instagram API se connect hota hai, password nahi maangta.</p>
    <p>Pilot mein deals ka ledger (agreed se paid tak) aap khud update karte ho. Invoice, payment collection aur tax iske kaam nahi hain; wo aapke (aur aapke CA ke) paas rahenge.</p>
  </BlogArticle>;
}
