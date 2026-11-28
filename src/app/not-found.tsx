import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Docky } from "@/components/docky/docky";
import { MarketingDocument } from "@/components/site/marketing-document";
import styles from "@/components/site/site.module.css";

export const metadata: Metadata = { title: "Page not found | DealDock", robots: { index: false } };

export default function NotFound() {
  return (
    <MarketingDocument
      title="Docky looked everywhere."
      lede={<>This page isn’t here. It may have moved, or the link had a typo. The <Link href="/blog">guides</Link> and <Link href="/tools">free tools</Link> are a good place to start.</>}
      aside={<Docky mood="thinking" className={styles.lostDocky} />}
      band={
        <div className={styles.actions}>
          <Link href="/">Back to the home page<ArrowRight size={15} weight="bold" aria-hidden="true" /></Link>
          <Link href="/contact" data-variant="light">Contact us</Link>
        </div>
      }
    />
  );
}
