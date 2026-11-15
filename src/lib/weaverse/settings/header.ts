import type { WeaverseNextThemeSchemaGroup } from "@weaverse/hydrogen/next";

export const headerSettings = {
  group: "Header",
  inputs: [
    {
      type: "text",
      name: "headerMenuHandle",
      label: "Shopify menu handle",
      defaultValue: "main-menu",
      helpText:
        "The Shopify menu used by the header. Manage its links, order and nested items in Shopify.",
    },
    {
      type: "image",
      name: "headerLogo",
      label: "Logo",
      helpText: "Leave empty to use the default SoundX logo.",
    },
    {
      type: "switch",
      name: "headerShowCountrySelector",
      label: "Show country selector on desktop",
      defaultValue: true,
    },
    {
      type: "heading",
      label: "Mobile and tablet menu contact information",
    },
    {
      type: "switch",
      name: "headerShowContactInformation",
      label: "Show contact information",
      defaultValue: true,
    },
    {
      type: "text",
      name: "headerContactHeading",
      label: "Contact heading",
      defaultValue: "NEED HELP?",
    },
    {
      type: "text",
      name: "headerPhoneLabel",
      label: "Phone link prefix",
      defaultValue: "Call us",
    },
    {
      type: "text",
      name: "headerPhoneNumber",
      label: "Phone number",
      defaultValue: "000-000-0000",
      helpText:
        "Example from Figma. Replace with your phone number, or clear to hide the phone link.",
    },
    {
      type: "text",
      name: "headerEmailAddress",
      label: "Email address",
      defaultValue: "yourwebsite@mail.com",
      helpText:
        "Example from Figma. Replace with your email address, or clear to hide the email link.",
    },
    { type: "heading", label: "Mobile and tablet menu labels" },
    {
      type: "text",
      name: "headerMenuTitle",
      label: "Menu title",
      defaultValue: "Menu",
    },
    {
      type: "text",
      name: "headerMenuCloseLabel",
      label: "Close menu accessible label",
      defaultValue: "Close menu",
    },
    {
      type: "text",
      name: "headerHomeLabel",
      label: "Home link label",
      defaultValue: "Home",
    },
    {
      type: "text",
      name: "headerMenuExpandLabel",
      label: "Expand submenu accessible label prefix",
      defaultValue: "Expand",
    },
    {
      type: "text",
      name: "headerMenuCollapseLabel",
      label: "Collapse submenu accessible label prefix",
      defaultValue: "Collapse",
    },
  ],
} satisfies WeaverseNextThemeSchemaGroup;
