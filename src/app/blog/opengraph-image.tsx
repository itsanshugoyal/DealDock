import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock Guides: Guides for creators who sell in their DMs";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "Guides for creators who sell in their DMs", eyebrow: "DealDock guides" });
}
