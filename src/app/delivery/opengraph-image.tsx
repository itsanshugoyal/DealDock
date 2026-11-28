import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock shipping and delivery policy";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "Shipping and delivery policy", eyebrow: "DealDock" });
}
