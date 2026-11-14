"use client";

import { useState } from "react";

import { Icon } from "@/components/icon";
import { Input } from "@/components/ui/input";

export function InputActionDemo() {
  let [isActive, setIsActive] = useState(true);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input
        variant="search"
        placeholder="What are you looking for"
        aria-label="Search products"
        endAction={{
          icon: <Icon name="search" />,
          label: "Toggle test state",
          onClick: () => setIsActive((previous) => !previous),
        }}
      />

      <p aria-live="polite">Trạng thái: {isActive ? "true" : "false"}</p>
    </div>
  );
}
