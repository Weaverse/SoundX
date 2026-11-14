import type { WeaverseNextThemeSchemaGroup } from "@weaverse/hydrogen/next";

const FONT_OPTIONS = [
  { label: "Inter", value: "inter" },
  { label: "Open Sans", value: "open-sans" },
];

export const typographySettings = {
  group: "Typography",
  inputs: [
    {
      type: "select",
      name: "headingFont",
      label: "Heading font",
      defaultValue: "inter",
      configs: {
        options: FONT_OPTIONS,
      },
    },
    {
      type: "select",
      name: "bodyFont",
      label: "Body font",
      defaultValue: "open-sans",
      configs: {
        options: FONT_OPTIONS,
      },
    },
    {
      type: "select",
      name: "uiFont",
      label: "UI font",
      defaultValue: "inter",
      configs: {
        options: FONT_OPTIONS,
      },
    },
  ],
} satisfies WeaverseNextThemeSchemaGroup;
