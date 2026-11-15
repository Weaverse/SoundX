import type { ComponentProps, ReactNode } from "react";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";

export type CheckboxProps = Omit<
  ComponentProps<"input">,
  "type" | "size" | "children"
> & {
  label?: ReactNode;
};

/** Filter checkbox from Figma. Without label, supply an aria-label. */
export function Checkbox({
  label,
  disabled,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-4 font-sans text-ui-base tracking-normal text-text-main",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <span className="relative flex size-5 shrink-0">
        <input
          {...props}
          type="checkbox"
          disabled={disabled}
          className="peer absolute inset-0 z-10 m-0 size-full cursor-inherit opacity-0"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none size-full rounded-xs bg-transparent inset-ring-1 inset-ring-border-subtle peer-focus-visible:inset-ring-border-primary"
        />
        <Icon
          name="check"
          size={12}
          className="pointer-events-none absolute left-1 top-1 opacity-0 peer-checked:opacity-100"
        />
      </span>
      {label != null ? <span>{label}</span> : null}
    </label>
  );
}
