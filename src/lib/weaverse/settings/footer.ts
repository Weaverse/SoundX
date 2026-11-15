import type { WeaverseNextThemeSchemaGroup } from "@weaverse/hydrogen/next";

export const footerSettings = {
  group: "Footer",
  inputs: [
    {
      type: "heading",
      label: "Navigation",
    },
    {
      type: "text",
      name: "footerMenuHandle",
      label: "Shopify navigation menu handle",
      defaultValue: "footer-navigation",
      helpText: "Manage footer groups, links and their order in Shopify.",
    },
    {
      type: "text",
      name: "footerLegalMenuHandle",
      label: "Shopify legal menu handle",
      defaultValue: "footer-legal",
      helpText: "Manage privacy, terms and other legal links in Shopify.",
    },
    {
      type: "heading",
      label: "Brand",
    },
    {
      type: "image",
      name: "footerLogo",
      label: "Logo",
      helpText: "Leave empty to display the brand name as text.",
    },
    {
      type: "text",
      name: "footerBrandName",
      label: "Brand name",
      defaultValue: "SOUNDX",
    },
    {
      type: "text",
      name: "footerCopyrightName",
      label: "Copyright owner",
      defaultValue: "SOUNDX ELECTRONICS",
      helpText:
        "The copyright symbol and current year are added automatically.",
    },
    {
      type: "heading",
      label: "Newsletter",
    },
    {
      type: "switch",
      name: "footerNewsletterEnabled",
      label: "Show newsletter",
      defaultValue: true,
    },
    {
      type: "text",
      name: "footerNewsletterEyebrow",
      label: "Intro label",
      defaultValue: "THE WEEKLY FREQUENCY",
    },
    {
      type: "text",
      name: "footerNewsletterDescription",
      label: "Intro description",
      defaultValue: "Considered technology for how you actually live.",
    },
    {
      type: "text",
      name: "footerNewsletterFormLabel",
      label: "Form label",
      defaultValue: "MEMBER TRANSMISSION",
    },
    {
      type: "text",
      name: "footerNewsletterFrequency",
      label: "Frequency label",
      defaultValue: "WEEKLY",
    },
    {
      type: "text",
      name: "footerNewsletterHeading",
      label: "Form heading",
      defaultValue: "Be first in line for the next release.",
    },
    {
      type: "text",
      name: "footerNewsletterEmailLabel",
      label: "Email field accessible label",
      defaultValue: "Email address",
    },
    {
      type: "text",
      name: "footerNewsletterEmailPlaceholder",
      label: "Email placeholder",
      defaultValue: "Your email address",
    },
    {
      type: "text",
      name: "footerNewsletterSubmitLabel",
      label: "Subscribe button label",
      defaultValue: "Subscribe",
    },
    {
      type: "heading",
      label: "Newsletter feedback",
    },
    {
      type: "text",
      name: "footerNewsletterSubmittingLabel",
      label: "Submitting button label",
      defaultValue: "Subscribing…",
    },
    {
      type: "text",
      name: "footerNewsletterRequiredMessage",
      label: "Missing email message",
      defaultValue: "Please enter your email address.",
    },
    {
      type: "text",
      name: "footerNewsletterInvalidMessage",
      label: "Invalid email message",
      defaultValue: "Please enter a valid email address.",
    },
    {
      type: "text",
      name: "footerNewsletterSuccessMessage",
      label: "Success message",
      defaultValue: "Thank you for subscribing.",
    },
    {
      type: "text",
      name: "footerNewsletterErrorMessage",
      label: "Submission error message",
      defaultValue: "We couldn't complete your subscription. Please try again.",
    },
    {
      type: "heading",
      label: "Bottom bar",
    },
    {
      type: "switch",
      name: "footerShowCountrySelector",
      label: "Show country and currency selector",
      defaultValue: true,
    },
    {
      type: "text",
      name: "footerCountrySelectorLabel",
      label: "Country and currency selector accessible label",
      defaultValue: "Choose country and currency",
    },
    {
      type: "switch",
      name: "footerShowPaymentMethods",
      label: "Show supported payment methods",
      defaultValue: true,
    },
    {
      type: "text",
      name: "footerPaymentMethodsLabel",
      label: "Payment methods accessible label",
      defaultValue: "Accepted payment methods",
    },
    {
      type: "heading",
      label: "Navigation accessibility",
    },
    {
      type: "text",
      name: "footerNavigationLabel",
      label: "Main navigation accessible label",
      defaultValue: "Footer navigation",
    },
    {
      type: "text",
      name: "footerLegalNavigationLabel",
      label: "Legal navigation accessible label",
      defaultValue: "Legal information",
    },
    {
      type: "text",
      name: "footerMenuExpandLabel",
      label: "Expand group accessible label prefix",
      defaultValue: "Expand",
    },
    {
      type: "text",
      name: "footerMenuCollapseLabel",
      label: "Collapse group accessible label prefix",
      defaultValue: "Collapse",
    },
  ],
} satisfies WeaverseNextThemeSchemaGroup;
