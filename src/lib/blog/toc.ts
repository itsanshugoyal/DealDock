import { isValidElement, type ReactNode } from "react";

/** The anchor for a heading: "Where brand deals hide" → "where-brand-deals-hide". */
export const headingId = (text: string) =>
  text.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-");

/** Plain text of rendered MDX children, so a heading's id matches the one built from the source. */
export function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

/** The article's "##" headings (outside code fences), for the contents list. */
export function articleToc(mdx: string) {
  let fenced = false;
  const items: { id: string; label: string }[] = [];
  for (const line of mdx.split("\n")) {
    if (line.trimStart().startsWith("```")) fenced = !fenced;
    const match = !fenced && /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) {
      // plain text as rendered: links to their text, emphasis marks and markdown escapes ("1\.") removed
      const text = match[1].replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\\(.)/g, "$1").replace(/[*_`]/g, "");
      // the contents list numbers itself, so a heading's own "1." is dropped from its label (not from its id)
      items.push({ id: headingId(text), label: text.replace(/^\d+\.\s+/, "") });
    }
  }
  return items;
}

/** Minutes to read at about 230 words a minute. */
export const readingMinutes = (mdx: string) => Math.max(1, Math.round(mdx.split(/\s+/).filter(Boolean).length / 230));
