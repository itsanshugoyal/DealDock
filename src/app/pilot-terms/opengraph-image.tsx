import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock Pilot terms: Pilot terms, in plain words.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "Pilot terms, in plain words.", eyebrow: "Pilot terms" });
}
