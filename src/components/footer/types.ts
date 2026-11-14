import type { ReactNode } from "react";

export type FooterMenuItem = {
  id: string;
  title: string;
  href: string;
  children: FooterMenuItem[];
};

export type FooterLogo = {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
};

export type FooterNewsletter = {
  eyebrow: string;
  description: string;
  formLabel: string;
  frequency: string;
  heading: string;
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  requiredMessage: string;
  invalidMessage: string;
  successMessage: string;
  errorMessage: string;
};

export type FooterLabels = {
  navigation: string;
  legalNavigation: string;
  expand: string;
  collapse: string;
  countrySelector: string;
  paymentMethods: string;
};

export type FooterProps = {
  menu: FooterMenuItem[];
  legalMenu: FooterMenuItem[];

  homeHref: string;
  logo?: FooterLogo;
  brandName: string;

  copyrightName: string;
  copyrightYear: number;

  newsletter?: FooterNewsletter;
  localeControl?: ReactNode;
  paymentMethods?: ReactNode;

  labels: FooterLabels;
  className?: string;
};
