import { cn } from "@/lib/utils";

type GlowEffectProps = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "gold" | "subtle";
};

const sizeMap = {
  sm: "w-48 h-48",
  md: "w-72 h-72",
  lg: "w-96 h-96",
  xl: "w-[32rem] h-[32rem]",
};

export function GlowEffect({
  className,
  size = "lg",
  color = "gold",
}: GlowEffectProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute rounded-full pointer-events-none animate-pulse-glow",
        sizeMap[size],
        color === "gold"
          ? "bg-[radial-gradient(ellipse_at_center,rgba(255,193,7,0.2)_0%,transparent_70%)]"
          : "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]",
        "blur-[60px]",
        className
      )}
    />
  );
}
