import type { WeaverseNextThemeSchemaGroup } from "@weaverse/hydrogen/next";

export const buttonSettings = {
  group: "Buttons",
  inputs: [
    {
      type: "range",
      name: "buttonRadius",
      label: "Corner radius",
      defaultValue: 16,
      configs: {
        min: 0,
        max: 40,
        step: 1,
        unit: "px",
      },
      helpText:
        "Corner radius for shared buttons. Buttons with an explicit radius override keep their own shape.",
    },
  ],
} as const satisfies WeaverseNextThemeSchemaGroup;
