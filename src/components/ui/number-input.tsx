"use client";

import Image from "next/image";
import { type ComponentProps, useRef, useState } from "react";

import { cn } from "@/lib/cn";

export type NumberInputProps = Omit<
  ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "onChange" | "ref" | "step"
> & {
  defaultValue?: number;
  step?: number;
  incrementLabel: string;
  decrementLabel: string;
  onValueChange?: (value: number | undefined) => void;
};

export function NumberInput({
  defaultValue,
  min,
  max,
  step = 1,
  disabled,
  readOnly,
  incrementLabel,
  decrementLabel,
  onValueChange,
  onBlur,
  className,
  ...props
}: NumberInputProps) {
  let inputRef = useRef<HTMLInputElement>(null);
  let [draft, setDraft] = useState(
    defaultValue === undefined ? "" : String(defaultValue),
  );

  function updateValue(value: string) {
    setDraft(value);
    onValueChange?.(value === "" ? undefined : Number(value));
  }

  function changeValue(direction: -1 | 1) {
    let input = inputRef.current;

    if (!input || disabled || readOnly) return;

    if (direction === 1) {
      input.stepUp();
    } else {
      input.stepDown();
    }

    updateValue(input.value);
  }

  return (
    <div
      className={cn(
        "flex h-[45px] w-full min-w-0 items-start gap-2 rounded-md bg-background px-4 py-3",
        "font-sans text-ui-base text-text-subtle",
        "inset-ring-2 inset-ring-border-subtle",
        "focus-within:inset-ring-border-primary",
        className,
      )}
    >
      <input
        {...props}
        ref={inputRef}
        type="number"
        min={min}
        max={max}
        step={step}
        value={draft}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(event) => updateValue(event.currentTarget.value)}
        onBlur={(event) => {
          let input = event.currentTarget;

          if (
            !readOnly &&
            input.value !== "" &&
            Number.isFinite(input.valueAsNumber)
          ) {
            let normalized = String(input.valueAsNumber);

            if (normalized !== input.value) {
              input.value = normalized;
              updateValue(normalized);
            }
          }

          onBlur?.(event);
        }}
        className={cn(
          "block h-[21px] w-full min-w-0 flex-1 appearance-none border-0 bg-transparent p-0",
          "font-inherit [font:inherit] outline-none",
          "placeholder:text-text-subtle placeholder:opacity-100",
          "[appearance:textfield]",
          "[&::-webkit-inner-spin-button]:appearance-none",
          "[&::-webkit-outer-spin-button]:appearance-none",
          "disabled:cursor-not-allowed",
        )}
      />

      <div className="flex h-[21px] w-4 shrink-0 flex-col">
        {([1, -1] as const).map((direction) => (
          <button
            key={direction}
            type="button"
            aria-label={direction === 1 ? incrementLabel : decrementLabel}
            disabled={disabled || readOnly}
            onClick={() => changeValue(direction)}
            className={cn(
              "flex min-h-0 flex-1 items-center justify-center border-0 bg-transparent p-0",
              "enabled:cursor-pointer disabled:cursor-not-allowed",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary",
            )}
          >
            <Image
              src={
                direction === 1
                  ? "/icons/number-chevron-up.svg"
                  : "/icons/number-chevron-up-secondary.svg"
              }
              alt=""
              width={16}
              height={16}
              className={cn("shrink-0", direction === -1 && "rotate-180")}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
