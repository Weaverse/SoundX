import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "custom";

export type BadgeProps = ComponentProps<"span"> & {
  variant?: BadgeVariant;
  /** Color overrides apply only to the custom variant. */
  backgroundColor?: string;
  textColor?: string;
};

const BADGE_COLORS: Record<
  BadgeVariant,
  { backgroundColor: string; color: string }
> = {
  default: { backgroundColor: "#e8f0fa", color: "#1d6ab8" },
  custom: { backgroundColor: "#e6f0e8", color: "#207232" },
};

export function Badge({
  variant = "default",
  backgroundColor,
  textColor,
  className,
  style,
  children,
  ...props
}: BadgeProps) {
  let colors = BADGE_COLORS[variant];

  return (
    <span
      {...props}
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-[99px] px-3 py-0",
        "font-sans text-ui-base tracking-normal text-center whitespace-nowrap",
        className,
      )}
      style={{
        backgroundColor:
          variant === "custom"
            ? (backgroundColor ?? colors.backgroundColor)
            : colors.backgroundColor,
        color:
          variant === "custom" ? (textColor ?? colors.color) : colors.color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
