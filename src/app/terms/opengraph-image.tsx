import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock Terms of Service";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "Terms of Service", eyebrow: "DealDock" });
}
