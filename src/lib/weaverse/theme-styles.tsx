"use client";

import { useThemeSettings } from "@weaverse/hydrogen/next";

type AppearanceSettings = {
  pageWidth?: number;
  buttonRadius?: number;

  colorBackground?: string;
  colorSurfaceLight?: string;
  colorSurfaceSubtle?: string;

  colorTextMain?: string;
  colorTextSubtle?: string;
  colorTextInverse?: string;

  colorBorderPrimary?: string;
  colorBorderSubtle?: string;
  colorPrimaryBackground?: string;
  colorPrimaryBackgroundHover?: string;
  colorPrimaryText?: string;
  colorSecondaryBackground?: string;
  colorSecondaryBackgroundHover?: string;
  colorSecondaryText?: string;
  colorSecondaryTextHover?: string;
  colorSecondaryBorder?: string;
  colorSecondaryBorderHover?: string;
  colorOutlinedText?: string;
  colorOutlinedTextHover?: string;
  colorOutlinedBorder?: string;
  colorOutlinedBorderHover?: string;
  colorOutlinedBackgroundHover?: string;
  colorTextareaNoteBorder?: string;
  colorTextareaNoteText?: string;
  colorLabelAccent?: string;
  colorLabelSale?: string;
  colorAnnouncementText?: string;
  colorAnnouncementBackground?: string;
  colorHeaderText?: string;
  colorHeaderBackground?: string;
  colorFooterText?: string;
  colorFooterBackground?: string;

  headingFont?: "inter" | "open-sans";
  bodyFont?: "inter" | "open-sans";
  uiFont?: "inter" | "open-sans";
};
const FONT_FAMILIES = {
  inter: "var(--font-inter), system-ui, sans-serif",
  "open-sans": "var(--font-open-sans), system-ui, sans-serif",
} as const;

export default function ThemeStyles() {
  let settings = useThemeSettings<AppearanceSettings>();
  let declarations: string[] = [];

  if (
    typeof settings.pageWidth === "number" &&
    Number.isFinite(settings.pageWidth)
  ) {
    let safePageWidth = Math.min(2000, Math.max(1000, settings.pageWidth));

    declarations.push(`--soundx-page-width: ${safePageWidth}px`);
  }

  if (
    typeof settings.buttonRadius === "number" &&
    Number.isFinite(settings.buttonRadius)
  ) {
    let safeButtonRadius = Math.min(40, Math.max(0, settings.buttonRadius));
    declarations.push(`--soundx-button-radius: ${safeButtonRadius}px`);
  }

  let colors = [
    ["--soundx-background", settings.colorBackground],
    ["--soundx-surface-light", settings.colorSurfaceLight],
    ["--soundx-surface-subtle", settings.colorSurfaceSubtle],
    ["--soundx-text-main", settings.colorTextMain],
    ["--soundx-text-subtle", settings.colorTextSubtle],
    ["--soundx-text-inverse", settings.colorTextInverse],
    ["--soundx-border-primary", settings.colorBorderPrimary],
    ["--soundx-border-subtle", settings.colorBorderSubtle],
    ["--soundx-primary-background", settings.colorPrimaryBackground],
    ["--soundx-primary-background-hover", settings.colorPrimaryBackgroundHover],
    ["--soundx-primary-text", settings.colorPrimaryText],
    ["--soundx-secondary-background", settings.colorSecondaryBackground],
    [
      "--soundx-secondary-background-hover",
      settings.colorSecondaryBackgroundHover,
    ],
    ["--soundx-secondary-text", settings.colorSecondaryText],
    ["--soundx-secondary-text-hover", settings.colorSecondaryTextHover],
    ["--soundx-secondary-border", settings.colorSecondaryBorder],
    ["--soundx-secondary-border-hover", settings.colorSecondaryBorderHover],
    ["--soundx-outlined-text", settings.colorOutlinedText],
    ["--soundx-outlined-text-hover", settings.colorOutlinedTextHover],
    ["--soundx-outlined-border", settings.colorOutlinedBorder],
    ["--soundx-outlined-border-hover", settings.colorOutlinedBorderHover],
    [
      "--soundx-outlined-background-hover",
      settings.colorOutlinedBackgroundHover,
    ],
    ["--soundx-textarea-note-border", settings.colorTextareaNoteBorder],
    ["--soundx-textarea-note-text", settings.colorTextareaNoteText],
    ["--soundx-label-accent", settings.colorLabelAccent],
    ["--soundx-label-sale", settings.colorLabelSale],
    ["--soundx-announcement-text", settings.colorAnnouncementText],
    ["--soundx-announcement-background", settings.colorAnnouncementBackground],
    ["--soundx-header-text", settings.colorHeaderText],
    ["--soundx-header-background", settings.colorHeaderBackground],
    ["--soundx-footer-text", settings.colorFooterText],
    ["--soundx-footer-background", settings.colorFooterBackground],
  ] as const;

  for (let [variable, value] of colors) {
    if (typeof value !== "string") {
      continue;
    }

    let color = value.trim();

    // Accept hexadecimal colors; ignore missing or invalid values.
    if (!/^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(color)) {
      continue;
    }

    declarations.push(`${variable}: ${color}`);
  }
  let fonts = [
    ["--soundx-font-heading", settings.headingFont],
    ["--soundx-font-body", settings.bodyFont],
    ["--soundx-font-ui", settings.uiFont],
  ] as const;

  for (let [variable, value] of fonts) {
    if (value !== "inter" && value !== "open-sans") {
      continue;
    }

    declarations.push(`${variable}: ${FONT_FAMILIES[value]}`);
  }

  if (declarations.length === 0) {
    return null;
  }

  return <style>{`:root { ${declarations.join("; ")}; }`}</style>;
}
