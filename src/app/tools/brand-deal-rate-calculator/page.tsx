import type { Metadata } from "next";
import Link from "next/link";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import { RateCalculator } from "@/components/marketing/rate-calculator";
import styles from "@/components/marketing/blog-article.module.css";
import { MARKETING_ORIGIN } from "@/lib/marketing-config";

const url = `${MARKETING_ORIGIN}/tools/brand-deal-rate-calculator`;
const title = "Brand Deal Rate Calculator (Free)";
const description = "Free brand deal rate calculator for creators. Add usage rights, whitelisting, exclusivity, rush and revision fees to your rate, in rupees or dollars.";

const sources = {
  aspire: "https://www.aspire.io/blog/how-brands-and-creators-are-navigating-content-usage-rights-in-2026",
  storyboard18: "https://www.storyboard18.com/influencer-marketing/end-of-the-free-ride-influencers-now-charge-separate-steeper-fees-for-commercial-usage-rights-109399.htm",
  seleneList: "https://selenethelawyer.com/blog/instagram-post-price-list",
  seleneCard: "https://selenethelawyer.com/blog/influencer-rate-card",
  modashUsage: "https://www.modash.io/blog/usage-rights",
  modashExclusivity: "https://www.modash.io/blog/influencer-exclusivity",
  stan: "https://stan.store/blog/influencer-rates/",
  instagram: "https://creators.instagram.com/blog/introducing-partnership-ads",
};

const faqs = [
  {
    question: "How much should I charge for a brand deal?",
    answer: "Start with your usual fee for each piece of content, then add a separate charge for each extra the brand wants, such as reposting, ads, exclusivity or a tight deadline. Most published guides price extras as a percentage of your base fee, often per 30 days. The calculator on this page adds them up and gives you a range and a suggested quote.",
  },
  {
    question: "How much should I charge for usage rights?",
    answer: "For paid usage, where the brand runs your content as an ad, most figures we found sit between 15% and 40% of your base fee for each 30 days. Organic reposting on the brand’s own channels is often included free for a set period, though one lawyer who advises creators suggests 20–40% per 30 days. Perpetual rights cost far more, often 100–200% of the fee, so offer a fixed term instead.",
  },
  {
    question: "What is whitelisting, and how is it different from paid usage?",
    answer: "Paid usage lets a brand run your content as an ad. Whitelisting means the ad runs from your handle or shows your name, which is how Meta’s partnership ads work on Instagram. Guides disagree on which should cost more, so the calculator prices them as one extra at 15–40% of your base fee per 30 days.",
  },
  {
    question: "How do I price exclusivity as an influencer?",
    answer: "Price it by the deals you’ll have to turn down. One creator coach charges 10–15% of the base fee per 30 days where staying exclusive is easy and about 50% in crowded categories like fashion or beauty. Keep the category narrow and named, and never agree to exclusivity without an end date.",
  },
  {
    question: "Should I charge a rush fee?",
    answer: "Yes, if the deadline means moving other work or filming sooner than you planned. Selene the Lawyer calls 20–50% of the base fee common for urgent turnarounds, and Stan’s guide uses 10–25% for anything under two weeks. Agree in writing what counts as rush before you start.",
  },
  {
    question: "Is the calculator’s number the market rate?",
    answer: "No. It’s a starting point built from published guides and industry interviews, which disagree and change over time. Your niche and your track record matter more, so use the range to choose your number and adjust from there.",
  },
  {
    question: "Does the calculator work in rupees?",
    answer: "Yes. Choose INR and amounts use Indian grouping, like ₹1,50,000. It doesn’t convert between currencies, so enter your fees in the currency you quote in.",
  },
];

export const metadata: Metadata = {
  title: `${title} | DealDock`,
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", url, title, description, siteName: "DealDock" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function BrandDealRateCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#calculator`,
        name: "Brand deal rate calculator",
        url,
        description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        publisher: { "@type": "Organization", name: "DealDock", url: MARKETING_ORIGIN, logo: { "@type": "ImageObject", url: `${MARKETING_ORIGIN}/apple-icon.png` } },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      },
    ],
  };

  return (
    <MarketingDocument title="Brand deal rate calculator" updatedAt="DealDock free tool · Updated 7 November 2026">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <p className={styles.intro}>To price a brand deal, start with your usual fee for making the content, then add a separate charge for each extra the brand wants: reposting it on its own channels, running it as an ad, keeping you away from competitors, a deadline under a week or extra rounds of edits. Published guides price each extra as a share of your fee, often per 30 days, and give ranges rather than one rate. The calculator below adds them up and shows every line.</p>

      <RateCalculator />

      <h2>How much to charge for usage rights</h2>
      <p>Charge for usage on top of your base fee, because it pays for what the brand does with your content after you post it. In the guides we found, organic reposting runs from free to 40% of your base fee per 30 days, and perpetual use costs 100–200% or more. Ads are covered in the next section.</p>
      <p>Organic use means the brand reposts your content on its own channels without paying to promote it. Advice splits on this one: creator coaches quoted by <a href={sources.modashUsage}>Modash</a> include it free for a set period, one of them for three to six months, while <a href={sources.seleneList}>Selene the Lawyer</a>, who works with creators, suggests 20–40% of your base fee per 30 days. The calculator runs from free up to 20% per 30 days, where her range starts, and prices 90 days at two and a half times the 30-day rate, as she suggests for a prepaid quarter.</p>
      <p>Perpetual means the brand can use your content forever. Industry executives quoted by <a href={sources.storyboard18}>Storyboard18</a> put perpetual usage at 100–200% of the base fee or more, and one at two to three times the fee. Selene’s advice is to agree fixed months only, never “in perpetuity”. If a brand asks for perpetual use, offer 90 or 180 days with a renewal price instead.</p>

      <h2>Whitelisting and paid usage rates</h2>
      <p>Most figures we found put paid usage and whitelisting at 15–40% of your base fee for each 30 days the brand can run your content as an ad. Paid usage means the brand pays to show your content as an ad; with whitelisting, the ad runs from your handle or shows your name.</p>
      <p>Meta’s partnership ads on Instagram work this way: the ad features your handle, and the brand pays to show it to more people. <a href={sources.instagram}>Instagram’s own creator blog</a> says partnership ads “give you the option to charge more when brands put ad spend behind your content.” For a one-off deal, it suggests giving the brand an ad code, which lets you choose the posts it can turn into ads; account-level permission is meant for long-term partnerships. Agree the fee and the end date before you hand over either.</p>
      <p><a href={sources.aspire}>Aspire’s 2026 write-up on usage rights</a>, based on a survey of nearly 900 marketers and creators, says creators who price usage as a percentage commonly charge 15–35% of their base rate per 30 days. Industry executives in India gave Storyboard18 figures of 20–30% and 20–40% for 30 days, and 40–75% for 90 days. Selene the Lawyer goes higher, at 40–80% per 30 days for paid ads. If a brand mentions a big ad budget, quote at the top of the range.</p>
      <p>Guides don’t agree on whether whitelisting or plain paid usage should cost more, so the calculator treats them as one extra. For 60 days it doubles the 30-day range, as per-30-day pricing would. For 90 days it uses 40–100%: the executives’ 40% at the low end and, at the high end, two and a half times the 30-day top, Selene’s rate for a prepaid quarter. Both longer ranges are our own arithmetic on the sources’ figures.</p>

      <h2>How to price exclusivity</h2>
      <p>Charge for exclusivity per 30 days, from about 10% of your base fee where it’s easy to stay exclusive to about 50% in a crowded category, and check that against the deals you’d have to turn down. Exclusivity means you agree not to work with the brand’s competitors for a set time.</p>
      <p>Those numbers come from creator coach Kristen Bousquet, quoted by <a href={sources.modashExclusivity}>Modash</a>: 10–15% per 30 days for easy categories, such as coffee makers, and around 50% for hard ones, such as fashion or beauty. Selene the Lawyer’s starter range of 20–30% per 30 days sits inside that spread, while <a href={sources.stan}>Stan’s guide to influencer rates</a> is lower, at 5–10% for 30 days.</p>
      <p>If you usually land two skincare deals a month, 30 days of skincare exclusivity could cost you both. Keep the category narrow and named (“plant-based milk” rather than “food and drink”) and put the start and end dates in writing. A few days around your posting date is normal: Modash’s guide calls 2–7 days “quite normal in most categories”.</p>

      <h2>Rush fees and extra revisions</h2>
      <p>Add 20–50% of your base fee when the brand needs the content in under 7 days, and 10–25% for each round of revisions beyond what your fee includes.</p>
      <p>Selene the Lawyer’s <a href={sources.seleneCard}>rate card guide</a> calls 20–50% common for urgent turnarounds, and Stan’s guide uses 10–25% for anything under two weeks. A short deadline means moving other work or filming sooner than you planned, and that’s what the fee pays for.</p>
      <p>Agree how many rounds of changes your fee includes before you start; Stan’s guide says most creators include one. Selene prices each extra round at a flat fee or 10–25% of the base fee. If an extra round only touches one Reel in a bigger bundle, price it on that Reel’s fee. A reshoot isn’t a revision: Stan’s guide prices full reshoots as new deliverables.</p>

      <h2>How to say your rate in a DM</h2>
      <p>Send one number and say what it covers. If the brand pushes back, offer a shorter usage period or a narrower exclusivity before you cut the fee for the content itself. The reply in the calculator is written that way; change the wording so it sounds like you.</p>
      <p>If a brand asks for your rates before sending a brief, ask what they need first:</p>
      <p className={styles.template}><span className={styles.templateLabel}>When a brand asks for your rates</span>Thanks for reaching out! Could you send the brief? It’d help to know the deliverables and dates, whether you’d like to run the content as ads and for how long, and if you need any exclusivity. Then I can give you an exact quote.</p>
      <p>For the rest of the deal, up to getting paid, see <Link href="/blog/influencer-brand-dms">From Instagram DMs to paid brand deals</Link>. If the offer is product only, our Hinglish guide to <Link href="/blog/barter-vs-paid-collab">barter vs paid collabs</Link> covers when barter is worth it and how to ask for a fee instead.</p>

      <h2>How we calculate</h2>
      <p>Your base fee is your fee for each piece of content multiplied by how many the brand wants. Each extra is a percentage of that base fee. The low estimate adds the bottom of every extra’s range and the high estimate adds the top. The suggested quote is the middle of the two, rounded to a clean number no more than 2.5% away. Every amount is rounded to the nearest whole rupee or dollar.</p>
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr><th>Extra</th><th>Share of base fee</th><th>Where the numbers come from</th></tr>
          </thead>
          <tbody>
            <tr><td>Organic use for 30, 90 or 180 days</td><td>0–20%, 0–50%, 0–100%</td><td>Free for a set period (coaches quoted by Modash) up to 20% per 30 days, where Selene the Lawyer’s 20–40% starts. A 90-day block costs 2.5 times the 30-day rate, following Selene, and 180 days is two 90-day blocks.</td></tr>
            <tr><td>Perpetual organic use</td><td>100–200%</td><td>Industry executives quoted by Storyboard18</td></tr>
            <tr><td>Paid usage or whitelisting for 30, 60 or 90 days</td><td>15–40%, 30–80%, 40–100%</td><td>Aspire (15–35% per 30 days) and Storyboard18 (20–40% for 30 days, from 40% for 90). The 60-day range doubles the 30-day one; the 90-day top is 2.5 times the 30-day top.</td></tr>
            <tr><td>Category exclusivity for 30, 60 or 90 days</td><td>10–50%, 20–100%, 30–150%</td><td>A creator coach quoted by Modash: 10–15% per 30 days for easy categories, about 50% for crowded ones. Longer terms multiply the 30-day range.</td></tr>
            <tr><td>Rush delivery, under 7 days</td><td>20–50%</td><td>Selene the Lawyer</td></tr>
            <tr><td>Each extra revision round</td><td>10–25%</td><td>Selene the Lawyer</td></tr>
          </tbody>
        </table>
      </div>
      <p>Where sources disagree, the ranges don’t cover every figure. Higher ones include Selene the Lawyer’s 20–40% per 30 days for organic use and 40–80% for paid ads, two to three times the fee for perpetual use (one executive in Storyboard18) and a food creator in Modash’s guide who charges her full fee for each month of exclusivity. Stan’s guide is lower: 5–10% for 30 days of exclusivity, and rush fees and whitelisting from 10%.</p>
      <p>The views helper multiplies your average views by a CPM, the fee per 1,000 views, that you enter yourself. We don’t fill one in. Published CPMs vary widely by niche and country, and the ones we found often don’t say where they come from: Stan’s guide, for example, gives $10–30 for lifestyle niches and $30–80 for finance or tech without a source. Your own past deals are a better guide.</p>
      <p>Treat the result as a starting point, not a market rate. The figures come from published guides and industry interviews, mostly about the US and India, and they’ll change. Your niche and your track record matter more than any table.</p>
      <p>Sources, each checked on 7 November 2026:</p>
      <ul>
        <li><a href={sources.aspire}>Aspire, content usage rights in 2026</a>, with survey data (February 2026)</li>
        <li><a href={sources.storyboard18}>Storyboard18, “End of the free ride? Influencers now charge separate, steeper fees for commercial usage rights”</a> (1 September 2026)</li>
        <li>Selene the Lawyer, <a href={sources.seleneList}>Instagram post price list</a> and <a href={sources.seleneCard}>influencer rate card guide</a></li>
        <li>Modash, guides to <a href={sources.modashUsage}>usage rights</a> and <a href={sources.modashExclusivity}>exclusivity</a></li>
        <li><a href={sources.stan}>Stan, influencer rates in 2026</a> (updated August 2026)</li>
        <li><a href={sources.instagram}>Instagram, “Partnership ads: Easy ways to earn more on brand deals”</a> (February 2025)</li>
      </ul>
      <p>DealDock’s pilot is built to estimate the value of incoming brand and buyer messages in your Instagram DMs. This calculator is separate, free and doesn’t need an account.</p>

      <section aria-labelledby="tool-faq-heading" className={styles.faq}>
        <h2 id="tool-faq-heading">Questions about pricing brand deals</h2>
        <div className={styles.faqList}>
          {faqs.map(({ question, answer }) => <details key={question} className={styles.faqItem}>
            <summary>
              <span>{question}</span>
              <span className={styles.arrow} aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg></span>
            </summary>
            <p>{answer}</p>
          </details>)}
        </div>
      </section>
    </MarketingDocument>
  );
}
