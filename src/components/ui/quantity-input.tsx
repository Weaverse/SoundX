"use client";

import Image from "next/image";
import { type ComponentProps, useState } from "react";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";

export type QuantityInputProps = Omit<
  ComponentProps<"input">,
  "type" | "children" | "value" | "defaultValue" | "min" | "max" | "step"
> & {
  variant?: "default" | "square" | "compact";
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  incrementLabel: string;
  decrementLabel: string;
};

export function QuantityInput({
  variant = "default",
  incrementLabel,
  decrementLabel,
  min = 1,
  max,
  step = 1,
  defaultValue = 1,
  disabled,
  readOnly,
  onChange,
  onBlur,
  className,
  ...props
}: QuantityInputProps) {
  let isCompact = variant === "compact";
  let [quantity, setQuantity] = useState(String(defaultValue));
  let currentQuantity = quantity === "" ? min : Number(quantity);
  let decrementDisabled = disabled || readOnly || currentQuantity <= min;
  let incrementDisabled =
    disabled || readOnly || (max !== undefined && currentQuantity >= max);

  function changeQuantity(direction: -1 | 1) {
    setQuantity((previous) => {
      let current = previous === "" ? min : Number(previous);
      let next = Number((current + direction * step).toFixed(12));
      return String(
        Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min, next)),
      );
    });
  }

  return (
    <div
      className={cn(
        "flex",
        isCompact
          ? "w-[72px] items-center gap-1 rounded-md px-2 py-1.5 inset-ring-1 inset-ring-border-subtle"
          : cn(
              "items-start gap-2 px-4 py-3.5 inset-ring-1 inset-ring-text-main",
              variant === "square"
                ? "w-[171px] rounded-xs"
                : "w-[140px] rounded-md",
            ),
        "font-sans text-ui-base-medium tracking-normal text-text-main",
        className,
      )}
    >
      {!isCompact && (
        <button
          type="button"
          aria-label={decrementLabel}
          disabled={decrementDisabled}
          onClick={() => changeQuantity(-1)}
          className="flex w-4 shrink-0 items-center justify-center self-stretch border-0 bg-transparent p-0 enabled:cursor-pointer disabled:cursor-not-allowed"
        >
          <Icon name="minus" size={16} />
        </button>
      )}

      <input
        {...props}
        type="number"
        min={min}
        max={max}
        step={step}
        value={quantity}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(event) => {
          setQuantity(event.currentTarget.value);
          onChange?.(event);
        }}
        onBlur={(event) => {
          if (!readOnly) {
            let next = event.currentTarget.valueAsNumber;
            setQuantity(Number.isFinite(next) ? String(next) : "1");
          }
          onBlur?.(event);
        }}
        className={cn(
          "block w-full min-w-0 flex-1 appearance-none rounded-none border-0 bg-transparent p-0 text-center outline-none font-inherit [font:inherit] [appearance:textfield] disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          isCompact ? "h-[17px]" : "h-[19px]",
        )}
      />

      {isCompact ? (
        <div className="flex shrink-0 flex-col gap-0.5">
          <button
            type="button"
            aria-label={incrementLabel}
            disabled={incrementDisabled}
            onClick={() => changeQuantity(1)}
            className="flex h-[10px] w-3 items-center justify-center border-0 bg-transparent p-0 enabled:cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary"
          >
            <Image
              src="/icons/quantity-chevron-up.svg"
              alt=""
              width={12}
              height={12}
              className="shrink-0"
            />
          </button>
          <button
            type="button"
            aria-label={decrementLabel}
            disabled={decrementDisabled}
            onClick={() => changeQuantity(-1)}
            className="flex h-[10px] w-3 items-center justify-center border-0 bg-transparent p-0 enabled:cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary"
          >
            <Image
              src="/icons/quantity-chevron-down.svg"
              alt=""
              width={12}
              height={12}
              className="shrink-0"
            />
          </button>
        </div>
      ) : (
        <button
          type="button"
          aria-label={incrementLabel}
          disabled={incrementDisabled}
          onClick={() => changeQuantity(1)}
          className="flex w-4 shrink-0 items-center justify-center self-stretch border-0 bg-transparent p-0 enabled:cursor-pointer disabled:cursor-not-allowed"
        >
          <Icon name="plus" size={16} />
        </button>
      )}
    </div>
  );
}
