import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock brand deal rate calculator: price usage rights, paid ads, exclusivity and rush fees on top of your rate";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return shareImage({ title: "Brand deal rate calculator", eyebrow: "Free tools / USD and INR" });
}
