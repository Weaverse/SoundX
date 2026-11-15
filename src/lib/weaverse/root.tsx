"use client";

import { WeaverseNextRootProvider } from "@weaverse/hydrogen/next";
import type { ReactNode } from "react";

import { themeSchema } from "./theme-schema";

import ThemeStyles from "./theme-styles";

type WeaverseRootProps = {
  children: ReactNode;
  theme?: Record<string, unknown>;
  merchantOverrides?: Record<string, unknown>;
};

export function WeaverseRoot({
  children,
  theme,
  merchantOverrides,
}: WeaverseRootProps) {
  return (
    <WeaverseNextRootProvider
      initialThemeSettings={theme}
      merchantOverrides={merchantOverrides}
      themeSchema={themeSchema}
    >
      <ThemeStyles />
      {children}
    </WeaverseNextRootProvider>
  );
}
