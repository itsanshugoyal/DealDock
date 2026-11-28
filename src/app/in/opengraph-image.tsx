import { LANDING_IN } from "@/components/landing/content";
import { OG_SIZE, shareImage } from "@/components/marketing/og-image";

export const alt = "DealDock India: your DMs, sorted by money. Nothing sends until you approve.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function IndiaOpenGraphImage() {
  return shareImage({ title: "Your DMs,\nsorted by money.", story: LANDING_IN.story });
}
