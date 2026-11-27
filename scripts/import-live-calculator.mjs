// One-time migration of DealDock's published calculator documentation.
import fs from 'node:fs/promises';
import { load } from 'cheerio';
import Turndown from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import matter from 'gray-matter';

const target = 'content/tools/brand-deal-rate-calculator.mdx';
try { await fs.access(target); throw new Error('Refusing to overwrite calculator documentation'); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const sourceUrl = 'https://dealdock.io/tools/brand-deal-rate-calculator';
const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const $ = load(await response.text());
const main = $('main#document-main');
const graph = JSON.parse(main.find('script[type="application/ld+json"]').text())['@graph'];
const faqData = graph.find(item => item['@type'] === 'FAQPage');
const intro = main.children('p').eq(1).text();
const body = main.children('h2').first().nextAll().addBack().clone();
body.filter('section').remove();
const wrapper = $('<div>').append(body.filter((_, el) => el.tagName !== 'section'));
const converter = new Turndown({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
converter.use(gfm);
converter.addRule('template-label', { filter: node => node.nodeName === 'SPAN' && /templateLabel/.test(node.className), replacement: content => `**${content}**\n\n` });
const content = converter.turndown(wrapper.html()).replace(/\{/g, '&#123;').replace(/\}/g, '&#125;').replace(/<(https?:\/\/[^>]+)>/g, '[$1]($1)').replace(/</g, '&lt;');
await fs.mkdir('content/tools', { recursive: true });
await fs.writeFile(target, matter.stringify(content + '\n', {
  title: 'Brand deal rate calculator', sourceUrl, reviewedAt: '2026-11-07', intro,
  faqs: faqData.mainEntity.map(q => ({ question: q.name, answer: q.acceptedAnswer.text })),
}));
console.log('Recovered calculator source notes and FAQs.');
