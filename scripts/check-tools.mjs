import assert from 'node:assert/strict';
import fs from 'node:fs';
import { calculateQuote, defaultRateInput, estimateFromViews, extras } from '../src/lib/tools/rate-calculator.ts';
import { freeTools } from '../src/lib/tools/catalog.ts';
import { filterBlogPosts } from '../src/lib/blog/search.ts';

const input = defaultRateInput();
const initial = calculateQuote(input);
assert.deepEqual([initial.base, initial.low, initial.high, initial.suggested], [30000, 34500, 48000, 41500]);
assert(initial.reply.includes('₹41,500'));
const baseOnly = calculateQuote({ ...input, organic: 'none', paid: 'none' });
assert.deepEqual([baseOnly.low, baseOnly.high, baseOnly.suggested], [30000, 30000, 30000]);
assert.equal(calculateQuote({ ...input, fees: { reel: '', story: '-10', post: 'Infinity' } }).ready, false);
assert.equal(calculateQuote({ ...input, quantities: { reel: '0', story: '0', post: '0' } }).reply, '');
assert.equal(calculateQuote({ ...input, currency: 'USD' }).suggested, initial.suggested, 'Currency changes do not convert entered fees');
assert.equal(estimateFromViews('', '', ''), null);
assert.equal(estimateFromViews('10000', '', ''), null);
assert.deepEqual(estimateFromViews('10000', '20', '10'), { low: 100, high: 200, suggested: 150 });
assert.deepEqual(estimateFromViews('10000', '', '20'), { low: 200, high: 200, suggested: 200 });
for (const organic of extras[0].options) for (const paid of extras[1].options) for (const exclusivity of extras[2].options) {
  const result = calculateQuote({ ...input, organic: organic.value, paid: paid.value, exclusivity: exclusivity.value, rush: true, extraRevisions: '2' });
  assert(result.low >= result.base && result.high >= result.low);
  assert(result.suggested >= result.low && result.suggested <= result.high);
  assert(result.lines.every(line => Number.isFinite(line.low) && Number.isFinite(line.high)));
}
const sample = [{ title: 'Brand deal rates', description: 'Usage rights for creators', topic: 'Brand deals' }, { title: 'Coaching follow-ups', description: 'Reply to enquiries', topic: 'Coaching and courses' }];
assert.equal(filterBlogPosts(sample, 'BRAND rates', 'All guides').length, 1);
assert.equal(filterBlogPosts(sample, '  ', 'Coaching and courses').length, 1);
assert.equal(filterBlogPosts(sample, 'brand', 'Coaching and courses').length, 0);
assert.equal(filterBlogPosts(sample, 'nonexistent', 'All guides').length, 0);
for (const tool of freeTools) assert(fs.existsSync(`src/app${tool.href}/page.tsx`), `Missing route: ${tool.href}`);
assert(fs.existsSync('public/templates/dealdock-dm-enquiry-tracker.csv'));
console.log('Calculator arithmetic, input bounds, currency handling, CPM helper, search and tool catalogue checks passed.');

const base = process.argv.find(arg => arg.startsWith('--url='))?.slice(6);
if (base) {
  const { load } = await import('cheerio');
  const blog = load(await (await fetch(`${base}/blog`)).text());
  assert(blog('#free-tools').length);
  assert(blog('#guide-search').length);
  assert(blog('nav[aria-label="Main navigation"] a[href="/tools"]').length);
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const href of ['/tools', ...freeTools.map(tool => tool.href)]) {
    const response = await fetch(base + href);
    assert.equal(response.status, 200, href);
    const $ = load(await response.text());
    assert.equal($('h1').length, 1);
    assert.equal($('link[rel="canonical"]').attr('href'), `${process.env.SITE_URL || 'https://dealdock.io'}${href}`);
    assert(sitemap.includes(`${href}</loc>`));
  }
  for (const slug of ['influencer-brand-dms', 'manage-instagram-dms-coach']) {
    const $ = load(await (await fetch(`${base}/blog/${slug}`)).text());
    assert($('aside[aria-labelledby="article-tools-heading"] a[href^="/tools/"]').length);
  }
  assert.equal((await fetch(`${base}/templates/dealdock-dm-enquiry-tracker.csv`)).status, 200);
  console.log('Tools hub, calculator, template, discovery links, canonicals and sitemap checks passed.');
}
