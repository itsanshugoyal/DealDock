import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock pricing: Solo, Studio and Roster plans, billed monthly";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "Pricing", eyebrow: "DealDock" });
}
