import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock refund and cancellation policy";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "Refund and cancellation policy", eyebrow: "DealDock" });
}
