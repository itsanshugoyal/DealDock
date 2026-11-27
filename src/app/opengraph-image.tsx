import { GLOBAL } from "@/components/design-preview/site-content";
import { OG_ALT, marketingOgImage } from "@/components/marketing/og-image";

export const alt = OG_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return marketingOgImage(GLOBAL);
}
