import type { WeaverseNextThemeSchemaGroup } from "@weaverse/hydrogen/next";

export const announcementBarSettings: WeaverseNextThemeSchemaGroup = {
  group: "Announcement Bar",
  inputs: [
    {
      type: "text",
      name: "announcementPauseLabel",
      label: "Pause button accessible label",
      defaultValue: "Pause announcements",
    },
    {
      type: "text",
      name: "announcementResumeLabel",
      label: "Resume button accessible label",
      defaultValue: "Resume announcements",
    },
    {
      type: "switch",
      name: "announcementBarEnabled",
      label: "Enable Announcement Bar",
      defaultValue: true,
    },
    {
      type: "heading",
      label: "Announcement Bar 1",
    },
    {
      type: "switch",
      name: "announcementBar1Enabled",
      label: "Enable Announcement Bar 1",
      defaultValue: true,
    },
    {
      type: "text",
      name: "announcementEmoji1",
      label: "Announcement Bar 1 Emoji",
      defaultValue: "🔥",
    },
    {
      type: "text",
      name: "announcement1TextBefore",
      label: "Announcement Bar 1 Text Before",
      defaultValue: "Summer Tech Sale - ",
    },
    {
      type: "text",
      name: "announcement1Highlight",
      label: "Announcement Bar 1 Highlighted Text",
      defaultValue: "Up to 40% Off",
    },
    {
      type: "text",
      name: "announcement1TextAfter",
      label: "Announcement Bar 1 Text After",
      defaultValue: "",
    },
    {
      type: "url",
      name: "announcement1Link",
      label: "Announcement Bar 1 Link",
      defaultValue: "",
    },
    {
      type: "heading",
      label: "Announcement Bar 2",
    },
    {
      type: "switch",
      name: "announcementBar2Enabled",
      label: "Enable Announcement Bar 2",
      defaultValue: true,
    },
    {
      type: "text",
      name: "announcementEmoji2",
      label: "Announcement Bar 2 Emoji",
      defaultValue: "⚡",
    },
    {
      type: "text",
      name: "announcement2TextBefore",
      label: "Announcement Bar 2 Text Before",
      defaultValue: "Free Express Shipping on orders ",
    },
    {
      type: "text",
      name: "announcement2Highlight",
      label: "Announcement Bar 2 Highlighted Text",
      defaultValue: "$49+",
    },
    {
      type: "text",
      name: "announcement2TextAfter",
      label: "Announcement Bar 2 Text After",
      defaultValue: "",
    },
    {
      type: "url",
      name: "announcement2Link",
      label: "Announcement Bar 2 Link",
      defaultValue: "",
    },
    {
      type: "heading",
      label: "Announcement Bar 3",
    },
    {
      type: "switch",
      name: "announcementBar3Enabled",
      label: "Enable Announcement Bar 3",
      defaultValue: true,
    },
    {
      type: "text",
      name: "announcementEmoji3",
      label: "Announcement Bar 3 Emoji",
      defaultValue: "🛡️",
    },
    {
      type: "text",
      name: "announcement3TextBefore",
      label: "Announcement Bar 3 Text Before",
      defaultValue: "",
    },
    {
      type: "text",
      name: "announcement3Highlight",
      label: "Announcement Bar 3 Highlighted Text",
      defaultValue: "1-Year",
    },
    {
      type: "text",
      name: "announcement3TextAfter",
      label: "Announcement Bar 3 Text After",
      defaultValue: " Warranty on All Products",
    },
    {
      type: "url",
      name: "announcement3Link",
      label: "Announcement Bar 3 Link",
      defaultValue: "",
    },
    {
      type: "heading",
      label: "Help Center",
    },
    {
      type: "switch",
      name: "announcementHelpEnabled",
      label: "Show Help Center on desktop",
      defaultValue: true,
    },
    {
      type: "text",
      name: "announcementHelpLabel",
      label: "Help Center label",
      defaultValue: "Help Center",
    },
    {
      type: "url",
      name: "announcementHelpLink",
      label: "Help Center URL",
      defaultValue: "",
    },
  ],
} satisfies WeaverseNextThemeSchemaGroup;
