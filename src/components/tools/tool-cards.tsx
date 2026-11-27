import Link from "next/link";
import { freeTools, type FreeTool } from "@/lib/tools/catalog";
import styles from "./tools.module.css";

export function ToolIcon({ kind }: { kind: FreeTool["kind"] }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "calculator" ? <><rect x="5" y="2" width="14" height="20" rx="3" /><path d="M8 6h8M8 11h1m3 0h1m3 0h0M8 15h1m3 0h1m3 0h0M8 19h1m3 0h1m3 0h0" /></> : <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 9v12M15 9v12M3 15h18" /></>}
  </svg>;
}

export function ToolCards({ tools = freeTools }: { tools?: readonly FreeTool[] }) {
  return <div className={styles.grid}>{tools.map(tool => <Link href={tool.href} className={styles.card} key={tool.slug}>
    <span className={styles.icon}><ToolIcon kind={tool.kind} /></span>
    <span className={styles.cardCopy}><span className={styles.kind}>{tool.kind === "calculator" ? "Free calculator" : "Free template"}</span><strong>{tool.title}</strong><span>{tool.description}</span><span className={styles.action}>{tool.action} <span aria-hidden="true">↗</span></span></span>
  </Link>)}</div>;
}

export function FeaturedTools() {
  return <section id="free-tools" aria-labelledby="free-tools-heading" className={styles.quickTools}>
    <div className={styles.quickHeading}><h2 id="free-tools-heading">Free tools</h2><Link href="/tools">View all <span aria-hidden="true">↗</span></Link></div>
    <div className={styles.quickLinks}>{freeTools.map(tool => <Link key={tool.slug} href={tool.href} className={styles.quickLink}><span className={styles.quickIcon}><ToolIcon kind={tool.kind} /></span><span><strong>{tool.title}</strong><small>{tool.action}</small></span><span aria-hidden="true">↗</span></Link>)}</div>
  </section>;
}
