import type { ComponentProps } from "react";

type TextareaVariant = "order-note" | "message";

export type TextareaProps = ComponentProps<"textarea"> & {
  variant?: TextareaVariant;
};

const variantStyles: Record<TextareaVariant, string> = {
  "order-note":
    "min-h-[108px] rounded-textarea-note p-3 text-ui-base text-textarea-note-text placeholder:text-textarea-note-text inset-ring-1 inset-ring-textarea-note-border",
  message:
    "min-h-24 rounded-md px-4 py-3.5 text-ui-base-medium text-text-subtle placeholder:text-text-subtle inset-ring-2 inset-ring-border-subtle enabled:hover:rounded-xs enabled:hover:inset-ring-border-primary",
};

/** Figma 4034:59559 / 1728:4069. Associate a label or supply aria-label. */
export function Textarea({
  variant = "message",
  rows = 4,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      rows={rows}
      className={[
        "block w-full min-w-0 resize-none appearance-none border-0 bg-background font-sans tracking-normal",
        "placeholder:opacity-100",
        // Inset strokes preserve Figma's inside-border padding and dimensions.
        "transition-[box-shadow,border-radius] duration-400 ease-out motion-reduce:transition-none",
        "outline-none focus-visible:inset-ring-2 focus-visible:inset-ring-border-primary",
        "disabled:cursor-not-allowed",
        variantStyles[variant],
        className,
      ].join(" ")}
    />
  );
}
