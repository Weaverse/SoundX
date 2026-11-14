import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export type InputUnderlineProps = ComponentProps<"input">;

/** Underlined field from Figma 3923:13235. Supply a label or aria-label. */
export function InputUnderline({
  type = "text",
  className = "",
  ...props
}: InputUnderlineProps) {
  return (
    <input
      {...props}
      type={type}
      className={cn(
        "block w-full min-w-0 appearance-none rounded-none border-0 bg-transparent px-0 pt-0 pb-3",
        "font-sans text-ui-base leading-[normal] tracking-normal text-text-inverse",
        "placeholder:text-text-inverse placeholder:opacity-100",
        // Figma's bottom stroke sits inside the 29px Hug height.
        "[box-shadow:inset_0_-1px_0_0_var(--color-text-inverse)]",
        "outline-none enabled:hover:[box-shadow:inset_0_-2px_0_0_var(--color-text-inverse)] focus-visible:[box-shadow:inset_0_-2px_0_0_var(--color-text-inverse)]",
        "transition-shadow duration-200 ease-out motion-reduce:transition-none",
        "disabled:cursor-not-allowed",
        className,
      )}
    />
  );
}
