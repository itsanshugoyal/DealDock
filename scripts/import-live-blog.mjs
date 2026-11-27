// One-time recovery of our published content. Never runs during builds.
// Refuses to overwrite content; subsequent posts should be authored as MDX.
import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import matter from 'gray-matter';

const origin = 'https://dealdock.io';
const index = load(await (await fetch(`${origin}/blog`)).text());
const cards = new Map();
index('a[href^="/blog/"]').each((_, el) => {
  const href = index(el).attr('href');
  if (/^\/blog\/[a-z0-9-]+$/.test(href)) cards.set(href, index(el));
});
const converter = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
converter.use(gfm);
converter.addRule('template-label', {
  filter: node => node.nodeName === 'SPAN' && /templateLabel/.test(node.className),
  replacement: content => `**${content}**\n\n`,
});
const assetPaths = new Set();
await fs.mkdir('content/blog', { recursive: true });
for (const [href, card] of cards) {
  const slug = href.split('/').at(-1);
  const target = `content/blog/${slug}.mdx`;
  try { await fs.access(target); throw new Error(`Refusing to overwrite ${target}`); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const response = await fetch(origin + href);
  if (!response.ok) throw new Error(`${href}: ${response.status}`);
  const $ = load(await response.text());
  const main = $('main#document-main');
  const graph = main.find('script[type="application/ld+json"]').toArray()
    .flatMap(el => { const data = JSON.parse($(el).text()); return data['@graph'] ?? [data]; });
  const article = graph.find(item => item['@type'] === 'BlogPosting');
  if (!article || !main.find('h1').length) throw new Error(`Missing article in ${href}`);
  const faqs = graph.find(item => item['@type'] === 'FAQPage')?.mainEntity.map(q => ({ question: q.name, answer: q.acceptedAnswer.text })) ?? [];
  const cardImage = card.find('img').attr('src');
  const thumbnail = cardImage === '/blog/creator-brand-dms.webp' && slug !== 'influencer-brand-dms' ? undefined : cardImage;
  const topic = /coaching|coach|tracker/.test(slug) ? 'Coaching and courses' : /brand|influencer/.test(slug) ? 'Brand deals' : 'Instagram DMs';
  const imageUrl = typeof article.image === 'string' ? article.image : article.image?.url;
  const localImage = imageUrl?.startsWith(origin + '/') && !imageUrl.includes('/og/') ? imageUrl.slice(origin.length) : undefined;
  // Remove shared chrome, dates, FAQs and related links; the shared renderer supplies them.
  main.children('p').first().filter((_, el) => /documentDate/.test($(el).attr('class') ?? '')).remove();
  main.find('h1, script, aside, nav').remove();
  main.find('section').filter((_, el) => $(el).find('details').length > 0).remove();
  main.find('img').each((_, el) => {
    const src = $(el).attr('src');
    if (src?.startsWith('/')) assetPaths.add(src);
  });
  main.find('a[href^="/"]').each((_, el) => {
    const href = $(el).attr('href');
    if (/\.(csv|xlsx|pdf)$/.test(href)) assetPaths.add(href);
  });
  if (thumbnail?.startsWith('/')) assetPaths.add(thumbnail);
  if (localImage) assetPaths.add(localImage);
  let body = converter.turndown(main.html()).replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
  // Plain autolinks are parsed as JSX by MDX. Markdown links are unambiguous.
  body = body.replace(/<(https?:\/\/[^>]+)>/g, '[$1]($1)');
  body = body.replace(/</g, '&lt;');
  const metadata = {
    title: article.headline, description: article.description, topic,
    publishedAt: article.datePublished.slice(0, 10), updatedAt: article.dateModified.slice(0, 10),
    status: 'published', ...(thumbnail ? { thumbnail } : {}),
    ...(localImage ? { image: { url: localImage, alt: main.find('img').first().attr('alt') || article.headline } } : {}),
    faqs, sourceUrl: origin + href,
  };
  await fs.writeFile(target, matter.stringify(body + '\n', metadata));
  console.log(`Recovered ${slug}`);
}
for (const asset of assetPaths) {
  const target = path.resolve('public', '.' + asset);
  if (!target.startsWith(path.resolve('public') + path.sep)) throw new Error(`Invalid asset: ${asset}`);
  const response = await fetch(origin + asset);
  if (!response.ok) throw new Error(`Asset ${asset}: ${response.status}`);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, Buffer.from(await response.arrayBuffer()));
}
console.log(`Recovered ${cards.size} articles and ${assetPaths.size} assets.`);
