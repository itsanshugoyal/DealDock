import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock Privacy Policy";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "Privacy Policy", eyebrow: "DealDock" });
}
