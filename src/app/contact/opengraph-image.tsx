import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock Contact: Talk to the people building it.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "Talk to the people building it.", eyebrow: "Contact" });
}
