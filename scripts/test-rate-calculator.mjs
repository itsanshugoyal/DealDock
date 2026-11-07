import assert from "node:assert/strict";
import test from "node:test";
import { ADD_ONS, calculate, feeFromViews, formatMoney, replySentence, roundQuote, toAmount, toCount } from "../src/lib/rate-calculator.mjs";

const deal = (overrides = {}) => ({ currency: "USD", fees: { reel: 1000 }, quantities: { reel: 1 }, ...overrides });

test("add-ons are percentages of the base fee and stack into a low–high range", () => {
  const result = calculate(deal({ fees: { reel: 1000, story: 250, post: 400 }, quantities: { reel: 2, story: 4, post: 0 }, paid: "30", exclusivity: "30", rush: true, extraRevisions: 2 }));
  assert.equal(result.base, 3000);
  assert.deepEqual(result.parts.map((p) => [p.label, p.amount]), [["2 Reels", 2000], ["4 Story frames", 1000]]);
  assert.deepEqual(result.lines.map((l) => [l.key, l.low, l.high]), [["paid", 450, 1200], ["exclusivity", 300, 1500], ["rush", 600, 1500], ["revisions", 600, 1500]]);
  assert.equal(result.low, 4950);
  assert.equal(result.high, 8700);
  assert.equal(result.suggested, 6850);
  assert.equal(result.ready, true);
});

test("longer terms cost more and perpetual organic use is priced as 100–200%", () => {
  for (const group of ADD_ONS) {
    group.options.forEach((option, i) => {
      assert.ok(option.low <= option.high, `${group.key} ${option.value}`);
      if (i > 0) assert.ok(option.low >= group.options[i - 1].low && option.high >= group.options[i - 1].high, `${group.key} ${option.value}`);
    });
  }
  assert.deepEqual(calculate(deal({ organic: "perpetual" })).lines.map((l) => [l.low, l.high]), [[1000, 2000]]);
  assert.deepEqual(calculate(deal({ paid: "90" })).lines.map((l) => [l.low, l.high]), [[400, 1000]]);
  assert.deepEqual(calculate(deal({ exclusivity: "60" })).lines.map((l) => [l.low, l.high]), [[200, 1000]]);
});

test("unknown option values count as none", () => {
  const result = calculate(deal({ organic: "365", paid: "forever", exclusivity: "" }));
  assert.deepEqual(result.lines, []);
  assert.equal(result.suggested, 1000);
});

test("quotes round to a clean number and line amounts to whole units", () => {
  assert.equal(roundQuote(1547), 1550);
  assert.equal(roundQuote(124700), 125000);
  assert.equal(roundQuote(999.6), 1000);
  assert.equal(roundQuote(87), 87);
  for (const bad of [0, -10, Number.NaN, Number.POSITIVE_INFINITY]) assert.equal(roundQuote(bad), 0);

  const odd = calculate(deal({ fees: { reel: 999 }, paid: "30" }));
  assert.deepEqual([odd.lines[0].low, odd.lines[0].high], [150, 400]);
  assert.equal(odd.suggested, 1250);
  // With nothing to add, rounding never pushes the quote outside the range.
  assert.equal(calculate(deal({ fees: { reel: 1234 } })).suggested, 1234);
  // A fee with cents is rounded once, so "3 Reels × $1,501" shows next to $4,503, not $4,502.
  assert.deepEqual(calculate(deal({ fees: { reel: "1500.50" }, quantities: { reel: 3 } })).parts.map((p) => [p.fee, p.amount]), [[1501, 4503]]);
});

test("rupees use Indian grouping and dollars use US grouping, with no decimals", () => {
  assert.equal(formatMoney(150000, "INR"), "₹1,50,000");
  assert.equal(formatMoney(12345678, "INR"), "₹1,23,45,678");
  assert.equal(formatMoney(0, "INR"), "₹0");
  assert.equal(formatMoney(1500, "USD"), "$1,500");
  assert.equal(formatMoney(1234567, "USD"), "$1,234,567");
  assert.equal(formatMoney(1499.6, "USD"), "$1,500");
});

test("typed amounts are read leniently and bad input becomes zero", () => {
  assert.equal(toAmount("₹1,50,000"), 150000);
  assert.equal(toAmount("$1,500.50"), 1500.5);
  assert.equal(toAmount(" 2500 "), 2500);
  for (const bad of ["", "  ", "abc", "-200", undefined, null, Number.NaN, Number.POSITIVE_INFINITY, -5]) assert.equal(toAmount(bad), 0);
  assert.equal(toCount("2.7"), 2);
  assert.equal(toCount(""), 0);
});

test("zero and empty inputs give an empty, not-ready result with no reply", () => {
  for (const input of [
    { currency: "INR", fees: {}, quantities: {} },
    { currency: "USD", fees: { reel: "" }, quantities: { reel: "3" }, paid: "90", rush: true, extraRevisions: "2" },
    { currency: "USD", fees: { reel: "500" }, quantities: { reel: "0" }, organic: "perpetual" },
  ]) {
    const result = calculate(input);
    assert.deepEqual([result.base, result.low, result.high, result.suggested, result.ready], [0, 0, 0, 0, false]);
    for (const line of result.lines) assert.deepEqual([line.low, line.high], [0, 0]);
    assert.equal(replySentence(input, result), "");
  }
});

test("the low estimate never exceeds the suggested quote or the high estimate", () => {
  let seed = 7;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const pick = (values) => values[Math.floor(random() * values.length)];
  for (let i = 0; i < 3000; i++) {
    const fee = () => pick([0, "", Math.round(random() * 300000), (random() * 5000).toFixed(2), "1,50,000"]);
    const input = {
      currency: pick(["INR", "USD"]),
      fees: { reel: fee(), story: fee(), post: fee() },
      quantities: { reel: pick([0, 1, 2, 5]), story: pick([0, 1, 3]), post: pick([0, 1, "2"]) },
      organic: pick(["none", "30", "90", "180", "perpetual", "bogus"]),
      paid: pick(["none", "30", "60", "90"]),
      exclusivity: pick(["none", "30", "60", "90"]),
      rush: random() < 0.5,
      extraRevisions: pick([0, 1, 2, 4]),
    };
    const r = calculate(input);
    assert.ok(r.base <= r.low && r.low <= r.suggested && r.suggested <= r.high, JSON.stringify({ input, r }));
    for (const line of r.lines) assert.ok(line.low <= line.high);
    assert.ok([r.base, r.low, r.high, r.suggested].every(Number.isInteger));
  }
});

test("the reply sentence quotes one number and names what it covers", () => {
  const india = { currency: "INR", fees: { reel: "20000", story: "5000", post: "12000" }, quantities: { reel: "1", story: "2", post: "0" }, organic: "30", paid: "30", exclusivity: "none", rush: false, extraRevisions: "0" };
  const indiaResult = calculate(india);
  assert.deepEqual([indiaResult.low, indiaResult.high, indiaResult.suggested], [34500, 48000, 41500]);
  assert.equal(replySentence(india, indiaResult), "Thanks for sending this over! My rate for 1 Reel and 2 Story frames, with 30 days of organic use on your channels and 30 days of paid usage, is ₹41,500. If that’s over your budget, I’m happy to look at shorter usage terms.");

  const plain = deal();
  assert.equal(replySentence(plain, calculate(plain)), "Thanks for sending this over! My rate for 1 Reel is $1,000.");

  const busy = deal({ fees: { reel: 1000, story: 200, post: 500 }, quantities: { reel: 1, story: 1, post: 2 }, exclusivity: "30", rush: true, extraRevisions: 1 });
  assert.equal(replySentence(busy, calculate(busy)), "Thanks for sending this over! My rate for 1 Reel, 1 Story frame and 2 static or carousel posts, with 30 days of category exclusivity, delivery within 7 days and 1 extra revision round, is $4,000. If that’s over your budget, I’m happy to look at shorter exclusivity terms.");

  const both = deal({ organic: "perpetual", exclusivity: "90" });
  assert.match(replySentence(both, calculate(both)), /perpetual organic use on your channels and 90 days of category exclusivity, is \$3,400\. .*shorter usage or exclusivity terms\.$/);
});

test("the views helper multiplies views by the creator's own CPM range", () => {
  assert.deepEqual(feeFromViews(40000, 10, 25), { low: 400, high: 1000, suggested: 700 });
  assert.deepEqual(feeFromViews("40,000", "25", "10"), { low: 400, high: 1000, suggested: 700 });
  assert.deepEqual(feeFromViews("1,20,000", "", "₹150"), { low: 18000, high: 18000, suggested: 18000 });
  assert.equal(feeFromViews("", 10, 25), null);
  assert.equal(feeFromViews(40000, "", ""), null);
});
