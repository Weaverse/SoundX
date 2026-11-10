import type { ComponentProps, ReactNode } from "react";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";

export type InputVariant = "text" | "with-arrow" | "search";

export type InputEndAction = Omit<
  ComponentProps<"button">,
  "children" | "aria-label" | "className"
> & {
  icon: ReactNode;
  label: string;
};

export type InputProps = Omit<ComponentProps<"input">, "children"> & {
  variant?: InputVariant;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  endAction?: InputEndAction;
  inputClassName?: string;
};

function InputAction({
  icon,
  label,
  type = "button",
  ...props
}: InputEndAction) {
  return (
    <button
      {...props}
      type={type}
      aria-label={label}
      className="flex size-5 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-text-main outline-none enabled:cursor-pointer disabled:cursor-not-allowed focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary"
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}

/** Shared Figma Input. className styles the frame; native props/ref reach the input. */
export function Input({
  variant = "text",
  startIcon,
  endIcon,
  endAction,
  type,
  disabled,
  className = "",
  inputClassName = "",
  ...props
}: InputProps) {
  let defaultIcon =
    variant === "search" ? (
      <Icon name="search" />
    ) : variant === "with-arrow" ? (
      <Icon name="arrow-right" />
    ) : null;
  // Pass endIcon={null} to hide the variant's default icon.
  let trailingIcon = endIcon === undefined ? defaultIcon : endIcon;
  let hasStartIcon =
    startIcon !== undefined && startIcon !== null && startIcon !== false;
  let hasEndIcon = trailingIcon !== null && trailingIcon !== false;
  let hasIcon = hasStartIcon || hasEndIcon || Boolean(endAction);

  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-start gap-2 rounded-md bg-background px-4 py-3.5",
        "inset-ring-2 inset-ring-border-subtle focus-within:inset-ring-border-primary",
        "transition-[box-shadow,border-radius] duration-400 ease-out motion-reduce:transition-none",
        hasIcon ? "min-h-12" : "min-h-[45px]",
        disabled ? "cursor-not-allowed" : "hover:inset-ring-border-primary",
        className,
      )}
    >
      {hasStartIcon && (
        <span
          aria-hidden="true"
          className="pointer-events-none flex size-5 shrink-0 items-center justify-center text-text-main"
        >
          {startIcon}
        </span>
      )}
      <input
        {...props}
        type={type ?? (variant === "search" ? "search" : "text")}
        disabled={disabled}
        className={cn(
          "block w-full min-w-0 flex-1 appearance-none rounded-none border-0 bg-transparent p-0",
          "font-sans text-ui-base-medium tracking-normal text-text-subtle outline-none",
          "placeholder:text-text-subtle placeholder:opacity-100 disabled:cursor-not-allowed",
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
          inputClassName,
        )}
      />
      {endAction ? (
        <InputAction {...endAction} disabled={disabled || endAction.disabled} />
      ) : hasEndIcon ? (
        <span
          aria-hidden="true"
          className="pointer-events-none flex size-5 shrink-0 items-center justify-center text-text-main"
        >
          {trailingIcon}
        </span>
      ) : null}
    </div>
  );
}
