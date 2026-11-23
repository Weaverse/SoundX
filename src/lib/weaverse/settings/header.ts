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
    // NEW: bind the dropdown to a Shopify item without hardcoding its ID.
    {
      type: "text",
      name: "headerCategoryMenuItem",
      label: "Category dropdown menu item",
      defaultValue: "Shop by Category",
      helpText:
        "Exact Shopify menu item title or ID. Use the ID to keep the binding when renaming the item. Clear to disable the category dropdown.",
    },
    {
      type: "heading",
      label: "Category menu banner",
    },
    {
      type: "image",
      name: "headerCategoryBannerImage",
      label: "Banner image",
      helpText: "Leave empty to hide the category menu banner.",
    },
    {
      type: "text",
      name: "headerCategoryBannerImageAlt",
      label: "Banner image alternative text",
      helpText: "Describe the image. Leave empty if it is decorative.",
    },
    {
      type: "text",
      name: "headerCategoryBannerEyebrow",
      label: "Banner eyebrow",
      defaultValue: "NEW ARRIVALS",
    },
    {
      type: "text",
      name: "headerCategoryBannerTitle",
      label: "Banner title",
      defaultValue: "Speakers",
    },
    {
      type: "url",
      name: "headerCategoryBannerLink",
      label: "Banner link",
      helpText:
        "Optional. Choose a collection or page to make the banner clickable.",
    },
    // Brand
    {
      type: "text",
      name: "headerBrandMenuItem",
      label: "Brand dropdown menu item",
      defaultValue: "Shop by Brand",
      helpText:
        "Exact Shopify menu item title or ID. Use the ID to keep the binding when renaming the item. Clear to disable the brand dropdown.",
    },
    // Four image bindings for the approved brand panel; menu order stays in Shopify.
    ...([1, 2, 3, 4] as const).flatMap((slot) => [
      {
        type: "heading" as const,
        label: `Brand image ${slot}`,
      },
      {
        type: "text" as const,
        name: `headerBrand${slot}MenuItem`,
        label: "Shopify brand menu item ID or title",
        helpText:
          "Match a child of Shop by Brand. Prefer its full Shopify ID so renaming or reordering keeps the correct image.",
      },
      {
        type: "image" as const,
        name: `headerBrand${slot}Image`,
        label: "Brand image",
        helpText: "Leave empty to show only the brand name and link.",
      },
      {
        type: "text" as const,
        name: `headerBrand${slot}ImageAlt`,
        label: "Image alternative text",
        helpText:
          "Describe meaningful image content, or leave empty if the adjacent brand name is sufficient.",
      },
    ]),
    {
      type: "text",
      name: "headerHelpMenuItem",
      label: "Help Center dropdown menu item",
      defaultValue: "Help Center",
      helpText:
        "Exact Shopify menu item title or ID. Its children and nested links are managed in Shopify. Clear to disable the Help Center dropdown.",
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
      name: "headerMenuBackLabel",
      label: "Back button accessible label",
      defaultValue: "Back to menu",
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
