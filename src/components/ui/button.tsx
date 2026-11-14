import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outlined";
type ButtonSize = "default" | "sm" | "icon";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Toggle the Secondary button's decorative border. */
  withBorder?: boolean;
};

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-background text-primary-text enabled:hover:bg-primary-background-hover enabled:active:bg-primary-background-hover",
  secondary:
    "bg-secondary-background text-secondary-text enabled:hover:bg-secondary-background-hover enabled:hover:text-secondary-text-hover enabled:active:bg-secondary-background-hover enabled:active:text-secondary-text-hover",
  outlined:
    "bg-transparent text-outlined-text inset-ring-2 inset-ring-outlined-border enabled:hover:inset-ring-outlined-border-hover enabled:hover:bg-outlined-background-hover enabled:hover:text-outlined-text-hover enabled:active:inset-ring-outlined-border-hover enabled:active:bg-outlined-background-hover enabled:active:text-outlined-text-hover",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  icon: "p-2.5",
  default: "px-5 py-4",
  sm: "px-4 py-2.5",
};

export function Button({
  variant = "primary",
  size = "default",
  fullWidth = false,
  withBorder = true,
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        "inline-flex flex-none items-center justify-center gap-2 whitespace-nowrap rounded-button border-0",
        fullWidth ? "w-full" : "w-fit",
        "font-sans text-ui-base-medium tracking-normal",
        "cursor-pointer transition-colors duration-150 ease-out motion-reduce:transition-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_STYLES[variant],
        variant === "secondary" &&
          withBorder &&
          "inset-ring-2 inset-ring-secondary-border enabled:hover:inset-ring-secondary-border-hover enabled:active:inset-ring-secondary-border-hover",
        SIZE_STYLES[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
