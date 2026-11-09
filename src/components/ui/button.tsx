import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "outlined";
type ButtonSize = "default" | "sm";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-background text-text-inverse enabled:hover:bg-primary-background-hover enabled:active:bg-primary-background-hover",
  secondary:
    "bg-secondary-background text-secondary-text enabled:hover:bg-secondary-background-hover enabled:hover:text-secondary-text-hover enabled:active:bg-secondary-background-hover enabled:active:text-secondary-text-hover",
  outlined:
    "bg-transparent text-outlined-text inset-ring-2 inset-ring-outlined-border enabled:hover:inset-ring-outlined-border-hover enabled:hover:bg-outlined-background-hover enabled:hover:text-outlined-text-hover enabled:active:inset-ring-outlined-border-hover enabled:active:bg-outlined-background-hover enabled:active:text-outlined-text-hover",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-5 py-4",
  sm: "px-4 py-2.5",
};

export function Button({
  variant = "primary",
  size = "default",
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={[
        "inline-flex w-fit flex-none items-center justify-center gap-2 whitespace-nowrap rounded-md border-0",
        "font-sans text-ui-base-medium tracking-normal",
        "cursor-pointer transition-colors duration-400 ease-out motion-reduce:transition-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        // Only the small Secondary variant has a stroke in Figma.
        // Inset rings preserve its Hug dimensions without adding border width.
        variant === "secondary" && size === "sm"
          ? "inset-ring-2 inset-ring-secondary-border enabled:hover:inset-ring-secondary-border-hover enabled:active:inset-ring-secondary-border-hover"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
