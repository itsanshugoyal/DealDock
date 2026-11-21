"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog/content";
import { filterBlogPosts } from "@/lib/blog/search";
import { formatDate } from "@/lib/blog/format";
import styles from "@/app/blog/page.module.css";

export type BlogListingPost = Pick<BlogPost, "slug" | "title" | "description" | "topic" | "updatedAt" | "thumbnail" | "image" | "status">;

export function BlogExplorer({ posts }: { posts: readonly BlogListingPost[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All guides");
  const topics = ["All guides", ...new Set(posts.map(post => post.topic))];
  const filtered = filterBlogPosts(posts, query, topic);
  const reset = () => { setQuery(""); setTopic("All guides"); };
  return <section id="guides" aria-labelledby="guides-heading" className={styles.explorer}>
    <div className={styles.toolbar}>
      <div className={styles.searchRow}>
        <h2 id="guides-heading">Find your next step</h2>
        <div role="search" className={styles.searchBox}>
          <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
          <label htmlFor="guide-search" className={styles.srOnly}>Search guides</label>
          <input id="guide-search" type="search" placeholder="Search guides…" maxLength={200} value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === "Escape") setQuery(""); }} aria-controls="guide-results" autoComplete="off" />
          {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}>×</button>}
        </div>
      </div>
      <div className={styles.filters} role="group" aria-label="Filter guides by topic">{topics.map(item => <button key={item} type="button" aria-pressed={topic === item} onClick={() => setTopic(item)}>{item}</button>)}</div>
      <p className={styles.resultCount} role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "guide" : "guides"}{query.trim() ? ` matching “${query.trim()}”` : " to explore"}</p>
    </div>
    <ul id="guide-results" className={styles.postList} aria-label="Latest guides">
      {filtered.map(post => <li key={post.slug}>
        <Link href={`/blog/${post.slug}`} className={styles.postCard} aria-labelledby={`post-${post.slug}`}>
          <div className={styles.thumbnail}>{post.thumbnail || post.image ? <Image src={post.thumbnail ?? post.image!.url} alt="" width={768} height={384} sizes="(max-width: 720px) calc(100vw - 72px), 256px" /> : <span aria-hidden="true">DealDock guides</span>}</div>
          <div className={styles.postCopy}>
            <span className={styles.postMeta}>{post.topic}<span aria-hidden="true">·</span><time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>{post.status === "draft" ? " · Draft" : ""}</span>
            <h2 id={`post-${post.slug}`}>{post.title}</h2>
            <span className={styles.postDescription}>{post.description}</span>
          </div>
          <span className={styles.cardArrow} aria-hidden="true">↗</span>
        </Link>
      </li>)}
    </ul>
    {filtered.length === 0 && <div className={styles.emptyState}><h3>No guides found</h3><p>Try a broader search or a different topic.</p><button type="button" onClick={reset}>Clear search and filters</button></div>}
  </section>;
}
