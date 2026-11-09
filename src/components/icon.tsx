import type { SVGProps } from "react";

/** Exact paths from the Tech Figma icons, preserving their original grids. */
export const ICON_PATHS = {
  "arrow-right": "M4.16667 10H15.8333M10.8333 5L15.8333 10L10.8333 15",
  check: "M2.5 6L5 8.5L10 3.5",
  "chevron-up": "M4 10L8 6L12 10",
  search:
    "M17.5 17.5L12.5 12.5M2.5 8.33333C2.5 9.09938 2.65088 9.85792 2.94404 10.5657C3.23719 11.2734 3.66687 11.9164 4.20854 12.4581C4.75022 12.9998 5.39328 13.4295 6.10101 13.7226C6.80875 14.0158 7.56729 14.1667 8.33333 14.1667C9.09938 14.1667 9.85792 14.0158 10.5657 13.7226C11.2734 13.4295 11.9164 12.9998 12.4581 12.4581C12.9998 11.9164 13.4295 11.2734 13.7226 10.5657C14.0158 9.85792 14.1667 9.09938 14.1667 8.33333C14.1667 7.56729 14.0158 6.80875 13.7226 6.10101C13.4295 5.39328 12.9998 4.75022 12.4581 4.20854C11.9164 3.66687 11.2734 3.23719 10.5657 2.94404C9.85792 2.65088 9.09938 2.5 8.33333 2.5C7.56729 2.5 6.80875 2.65088 6.10101 2.94404C5.39328 3.23719 4.75022 3.66687 4.20854 4.20854C3.66687 4.75022 3.23719 5.39328 2.94404 6.10101C2.65088 6.80875 2.5 7.56729 2.5 8.33333Z",
} as const;

export type IconName = keyof typeof ICON_PATHS;

const ICON_VIEW_BOXES: Partial<Record<IconName, string>> = {
  check: "0 0 12 12",
  "chevron-up": "0 0 16 16",
};

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, "name" | "children"> {
  name: IconName;
  size?: number;
  title?: string;
}

/** Shared inline SVG. Decorative by default; title/aria-label supplies a name. */
export function Icon({
  name,
  size = 20,
  title,
  className = "",
  ...props
}: IconProps) {
  const hasAccessibleName = Boolean(
    title || props["aria-label"] || props["aria-labelledby"],
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={ICON_VIEW_BOXES[name] ?? "0 0 20 20"}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden={hasAccessibleName ? undefined : true}
      role={hasAccessibleName ? "img" : undefined}
      aria-label={props["aria-label"] ?? title}
      aria-labelledby={props["aria-labelledby"]}
      {...props}
      className={["inline-block shrink-0 align-middle", className].join(" ")}
    >
      {title ? <title>{title}</title> : null}
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
