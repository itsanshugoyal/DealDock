import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllBlogPosts, readBlogContent } from '../src/lib/blog/content.ts';

const posts = getAllBlogPosts();
assert(posts.length > 0, 'No blog posts discovered');
const slugs = new Set(posts.map(post => post.slug));
for (const post of posts) {
  const { content } = readBlogContent(post.slug);
  const images = [...content.matchAll(/!\[[^\]]*\]\(([^\s)]+)\)/g)].map(match => match[1]);
  if (post.status === 'published') assert(new Set(images).size >= 2, `${post.slug}: published articles require at least two distinct body images`);
  await compileMDX({ source: content, options: { blockJS: true, mdxOptions: { remarkPlugins: [remarkGfm] } } });
  for (const match of content.matchAll(/\]\((\/[^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const url = decodeURI(match[1]).split('#')[0];
    if (url.startsWith('/blog/') && !path.extname(url)) assert(slugs.has(url.slice(6)), `${post.slug}: missing article ${url}`);
    if (path.extname(url)) assert(fs.existsSync(path.join('public', url)), `${post.slug}: missing asset ${url}`);
  }
  console.log(`OK ${post.slug} (${post.status})`);
}
console.log(`${posts.length} articles validated and compiled.`);

// Optional production smoke test: npm run blog:check -- --url=http://127.0.0.1:3000
const base = process.argv.find(arg => arg.startsWith('--url='))?.slice(6);
if (base) {
  const { load } = await import('cheerio');
  const indexResponse = await fetch(`${base}/blog`);
  assert.equal(indexResponse.status, 200);
  const $index = load(await indexResponse.text());
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const post of posts.filter(post => post.status === 'published')) {
    assert($index(`a[href="/blog/${post.slug}"]`).length > 0, `Index missing ${post.slug}`);
    assert(sitemap.includes(`/blog/${post.slug}</loc>`), `Sitemap missing ${post.slug}`);
    const response = await fetch(`${base}/blog/${post.slug}`);
    assert.equal(response.status, 200, post.slug);
    const $ = load(await response.text());
    assert.equal($('h1').length, 1);
    assert.equal($('h1').text(), post.title);
    const bodyImages = $('main img').toArray();
    assert(new Set(bodyImages.map(el => $(el).attr('src'))).size >= 2, `${post.slug}: fewer than two distinct rendered body images`);
    for (const el of bodyImages) {
      assert($(el).attr('alt')?.trim(), `${post.slug}: missing image alt text`);
      const imageResponse = await fetch(new URL($(el).attr('src'), base));
      assert.equal(imageResponse.status, 200, `${post.slug}: broken body image`);
      assert(imageResponse.headers.get('content-type')?.startsWith('image/'));
    }
    assert($('link[rel="canonical"]').attr('href').endsWith(`/blog/${post.slug}`));
    assert.equal($('details').length, post.faqs.length);
    const graph = JSON.parse($('main script[type="application/ld+json"]').text())['@graph'];
    assert.equal(graph.find(item => item['@type'] === 'BlogPosting').headline, post.title);
    if (post.faqs.length) assert.equal(graph.find(item => item['@type'] === 'FAQPage').mainEntity.length, post.faqs.length);
    const share = await fetch(`${base}/og/${post.slug}`);
    assert.equal(share.status, 200);
    assert(share.headers.get('content-type').includes('image/png'));
    console.log(`HTTP, canonical, FAQ, schema, sitemap and share image OK: ${post.slug}`);
  }
  assert.equal((await fetch(`${base}/blog/nonexistent-blog-post`)).status, 404);
  assert.equal((await fetch(`${base}/og/nonexistent-blog-post`)).status, 404);
  assert.equal((await fetch(`${base}/templates/dealdock-dm-enquiry-tracker.csv`)).status, 200);
}
