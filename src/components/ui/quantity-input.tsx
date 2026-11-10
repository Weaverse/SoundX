import type { ComponentProps } from "react";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";

export type QuantityInputProps = Omit<
  ComponentProps<"input">,
  "type" | "children"
> & {
  incrementLabel: string;
  decrementLabel: string;
};

export function QuantityInput({
  incrementLabel,
  decrementLabel,
  min = 1,
  step = 1,
  disabled,
  className,
  ...props
}: QuantityInputProps) {
  return (
    <div
      className={cn(
        "flex w-[140px] items-start gap-2 rounded-md px-4 py-3.5",
        "font-sans text-ui-base-medium tracking-normal text-text-main",
        "inset-ring-1 inset-ring-text-main",
        className,
      )}
    >
      <button
        type="button"
        aria-label={decrementLabel}
        disabled={disabled}
        className="flex w-4 shrink-0 items-center justify-center self-stretch border-0 bg-transparent p-0 enabled:cursor-pointer disabled:cursor-not-allowed"
      >
        <Icon name="minus" size={16} />
      </button>

      <input
        {...props}
        type="number"
        min={min}
        step={step}
        disabled={disabled}
        className="block h-[19px] w-full min-w-0 flex-1 appearance-none rounded-none border-0 bg-transparent p-0 text-center outline-none font-inherit [font:inherit] [appearance:textfield] disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

      <button
        type="button"
        aria-label={incrementLabel}
        disabled={disabled}
        className="flex w-4 shrink-0 items-center justify-center self-stretch border-0 bg-transparent p-0 enabled:cursor-pointer disabled:cursor-not-allowed"
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
