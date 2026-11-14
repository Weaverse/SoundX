import type { WeaverseNextThemeSchemaGroup } from "@weaverse/hydrogen/next";

export const layoutSettings = {
  group: "Layout",
  inputs: [
    {
      type: "range",
      name: "pageWidth",
      label: "Page width",
      defaultValue: 1400,
      configs: {
        min: 1000,
        max: 2000,
        step: 20,
        unit: "px",
      },
      helpText:
        "Maximum width of shared page containers. Full-width sections and the header/footer keep their own layout.",
    },
  ],
} as const satisfies WeaverseNextThemeSchemaGroup;
