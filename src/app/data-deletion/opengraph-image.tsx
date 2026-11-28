import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "How to delete your DealDock data";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "Delete your data", eyebrow: "DealDock" });
}
