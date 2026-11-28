import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock free tools: a little less admin, a little more momentum";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "A little less admin. A little more momentum.", eyebrow: "Free tools for creators" });
}
