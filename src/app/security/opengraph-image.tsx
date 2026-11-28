import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock Security: Security and your data.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "Security and your data.", eyebrow: "Security" });
}
