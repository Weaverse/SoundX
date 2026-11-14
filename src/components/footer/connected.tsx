"use client";

import { useThemeSettings } from "@weaverse/hydrogen/next";

import { useNavigation } from "@/lib/storefront/use-navigation";

import Footer from "./index";
import type { FooterLogo, FooterProps } from "./types";

type FooterSettings = {
  footerMenuHandle?: string;
  footerLegalMenuHandle?: string;
  footerLogo?: FooterLogo;
  footerBrandName: string;
  footerCopyrightName: string;

  footerNewsletterEnabled: boolean;
  footerNewsletterEyebrow: string;
  footerNewsletterDescription: string;
  footerNewsletterFormLabel: string;
  footerNewsletterFrequency: string;
  footerNewsletterHeading: string;
  footerNewsletterEmailLabel: string;
  footerNewsletterEmailPlaceholder: string;
  footerNewsletterSubmitLabel: string;
  footerNewsletterSubmittingLabel: string;
  footerNewsletterRequiredMessage: string;
  footerNewsletterInvalidMessage: string;
  footerNewsletterSuccessMessage: string;
  footerNewsletterErrorMessage: string;

  footerShowCountrySelector: boolean;
  footerCountrySelectorLabel: string;

  footerShowPaymentMethods: boolean;
  footerPaymentMethodsLabel: string;

  footerNavigationLabel: string;
  footerLegalNavigationLabel: string;
  footerMenuExpandLabel: string;
  footerMenuCollapseLabel: string;
};

type ConnectedFooterProps = Omit<
  FooterProps,
  "logo" | "brandName" | "copyrightName" | "newsletter" | "labels"
> & { menuHandle: string; legalMenuHandle: string };

export default function ConnectedFooter({
  menuHandle,
  legalMenuHandle,
  ...props
}: ConnectedFooterProps) {
  let settings = useThemeSettings<FooterSettings>();
  let menu = useNavigation(
    settings.footerMenuHandle?.trim() || "footer-navigation",
    menuHandle,
    props.menu,
  );
  let legalMenu = useNavigation(
    settings.footerLegalMenuHandle?.trim() || "footer-legal",
    legalMenuHandle,
    props.legalMenu,
  );

  return (
    <Footer
      {...props}
      menu={menu}
      legalMenu={legalMenu}
      logo={settings.footerLogo}
      brandName={settings.footerBrandName}
      copyrightName={settings.footerCopyrightName}
      newsletter={
        settings.footerNewsletterEnabled
          ? {
              eyebrow: settings.footerNewsletterEyebrow,
              description: settings.footerNewsletterDescription,
              formLabel: settings.footerNewsletterFormLabel,
              frequency: settings.footerNewsletterFrequency,
              heading: settings.footerNewsletterHeading,
              emailLabel: settings.footerNewsletterEmailLabel,
              emailPlaceholder: settings.footerNewsletterEmailPlaceholder,
              submitLabel: settings.footerNewsletterSubmitLabel,
              submittingLabel: settings.footerNewsletterSubmittingLabel,
              requiredMessage: settings.footerNewsletterRequiredMessage,
              invalidMessage: settings.footerNewsletterInvalidMessage,
              successMessage: settings.footerNewsletterSuccessMessage,
              errorMessage: settings.footerNewsletterErrorMessage,
            }
          : undefined
      }
      localeControl={
        settings.footerShowCountrySelector ? props.localeControl : undefined
      }
      paymentMethods={
        settings.footerShowPaymentMethods ? props.paymentMethods : undefined
      }
      labels={{
        navigation: settings.footerNavigationLabel,
        legalNavigation: settings.footerLegalNavigationLabel,
        expand: settings.footerMenuExpandLabel,
        collapse: settings.footerMenuCollapseLabel,
        countrySelector: settings.footerCountrySelectorLabel,
        paymentMethods: settings.footerPaymentMethodsLabel,
      }}
    />
  );
}
