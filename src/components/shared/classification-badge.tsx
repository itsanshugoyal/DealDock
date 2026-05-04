import { cn } from "@/lib/utils";

type BadgeType = "brand" | "coaching" | "course" | "other";

const badgeConfig: Record<
  BadgeType,
  { label: string; className: string }
> = {
  brand: { label: "Brand Deal", className: "badge-brand" },
  coaching: { label: "Coaching", className: "badge-coaching" },
  course: { label: "Course", className: "badge-course" },
  other: { label: "Commerce", className: "badge-other" },
};

type ClassificationBadgeProps = {
  type: BadgeType;
  className?: string;
};

export function ClassificationBadge({
  type,
  className,
}: ClassificationBadgeProps) {
  const config = badgeConfig[type];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
