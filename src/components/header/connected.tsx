"use client";

import { useThemeSettings } from "@weaverse/hydrogen/next";
import type { ComponentProps } from "react";

import { useNavigation } from "@/lib/storefront/use-navigation";

import Header from "./index";
import type { HeaderLogo } from "./types";

type HeaderSettings = {
  headerMenuHandle?: string;
  headerLogo?: HeaderLogo;
  headerShowCountrySelector?: boolean;
  headerShowContactInformation?: boolean;
  headerContactHeading?: string;
  headerPhoneNumber?: string;
  headerPhoneLabel?: string;
  headerEmailAddress?: string;
  headerMenuTitle?: string;
  headerMenuCloseLabel?: string;
  headerHomeLabel?: string;
  headerMenuExpandLabel?: string;
  headerMenuCollapseLabel?: string;
};

type ConnectedHeaderProps = Omit<
  ComponentProps<typeof Header>,
  "logo" | "mobileMenuLabels" | "contact"
> & { menuHandle: string };

export default function ConnectedHeader({
  menuHandle,
  ...props
}: ConnectedHeaderProps) {
  let settings = useThemeSettings<HeaderSettings>();
  let handle = settings.headerMenuHandle?.trim() || "main-menu";
  let menu = useNavigation(handle, menuHandle, props.menu);

  return (
    <Header
      {...props}
      menu={menu}
      logo={settings.headerLogo}
      localeControl={
        settings.headerShowCountrySelector === false
          ? undefined
          : props.localeControl
      }
      mobileMenuLabels={{
        title: settings.headerMenuTitle ?? "Menu",
        close: settings.headerMenuCloseLabel ?? "Close menu",
        home: settings.headerHomeLabel ?? "Home",
        expand: settings.headerMenuExpandLabel ?? "Expand",
        collapse: settings.headerMenuCollapseLabel ?? "Collapse",
      }}
      contact={
        settings.headerShowContactInformation === false
          ? undefined
          : {
              heading: settings.headerContactHeading,
              phoneNumber: settings.headerPhoneNumber,
              phoneLabel: settings.headerPhoneLabel,
              emailAddress: settings.headerEmailAddress,
            }
      }
    />
  );
}
