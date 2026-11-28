import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock Website privacy: Your details. A clear purpose.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "Your details. A clear purpose.", eyebrow: "Website privacy" });
}
