import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock About DealDock: An inbox that keeps the creator in control.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "An inbox that keeps the creator in control.", eyebrow: "About DealDock" });
}
