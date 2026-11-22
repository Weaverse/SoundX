"use client";

import { useThemeSettings } from "@weaverse/hydrogen/next";
import type { ComponentProps } from "react";

import { useNavigation } from "@/lib/storefront/use-navigation";

import type { BrandMenuItem } from "./brand-menu";
import type { CategoryMenuBanner } from "./category-menu";
import Header from "./index";
import type { HeaderLogo } from "./types";

type BrandImageSlot = 1 | 2 | 3 | 4;

type BrandImageSettings = Partial<
  Record<
    | `headerBrand${BrandImageSlot}MenuItem`
    | `headerBrand${BrandImageSlot}ImageAlt`,
    string
  >
> &
  Partial<Record<`headerBrand${BrandImageSlot}Image`, HeaderLogo>>;

type HeaderSettings = BrandImageSettings & {
  headerMenuHandle?: string;
  headerCategoryMenuItem?: string;
  headerCategoryBannerImage?: {
    url: string;
    altText?: string;
  };
  headerCategoryBannerImageAlt?: string;
  headerCategoryBannerEyebrow?: string;
  headerCategoryBannerTitle?: string;
  headerCategoryBannerLink?: string;
  headerBrandMenuItem?: string;
  headerHelpMenuItem?: string;
  headerLogo?: HeaderLogo;
  headerShowCountrySelector?: boolean;
  headerShowContactInformation?: boolean;
  headerContactHeading?: string;
  headerPhoneNumber?: string;
  headerPhoneLabel?: string;
  headerEmailAddress?: string;
  headerMenuTitle?: string;
  headerMenuCloseLabel?: string;
  headerMenuBackLabel?: string;
  headerHomeLabel?: string;
  headerMenuExpandLabel?: string;
  headerMenuCollapseLabel?: string;
};

type ConnectedHeaderProps = Omit<
  ComponentProps<typeof Header>,
  | "logo"
  | "mobileMenuLabels"
  | "contact"
  | "categoryMenuItemId"
  | "categoryBanner"
  | "brandMenuItemId"
  | "helpMenuItemId"
  | "brands"
> & { menuHandle: string };

export default function ConnectedHeader({
  menuHandle,
  ...props
}: ConnectedHeaderProps) {
  let settings = useThemeSettings<HeaderSettings>();
  let handle = settings.headerMenuHandle?.trim() || "main-menu";
  let menu = useNavigation(handle, menuHandle, props.menu);

  function findMenuItem(selector?: string) {
    return menu.find((item) => item.id === selector || item.title === selector);
  }

  let categoryMenuItem = findMenuItem(
    settings.headerCategoryMenuItem?.trim() ?? "Shop by Category",
  );

  let brandMenuItem = findMenuItem(
    settings.headerBrandMenuItem?.trim() ?? "Shop by Brand",
  );
  // Match images by menu identity, never by position in the Shopify menu.
  let brandImages = ([1, 2, 3, 4] as const).map((slot) => ({
    selector: settings[`headerBrand${slot}MenuItem`]?.trim(),
    image: settings[`headerBrand${slot}Image`],
    alt: settings[`headerBrand${slot}ImageAlt`],
  }));
  let brands: BrandMenuItem[] = (brandMenuItem?.children ?? []).map(
    ({ id, title, href }) => {
      let binding =
        brandImages.find((entry) => entry.selector === id) ??
        brandImages.find((entry) => entry.selector === title);
      let src = binding?.image?.url?.trim();

      return {
        id,
        title,
        href,
        image: src
          ? {
              src,
              alt: binding?.alt?.trim() ?? binding?.image?.altText ?? "",
            }
          : undefined,
      };
    },
  );

  let helpMenuItem = findMenuItem(
    settings.headerHelpMenuItem?.trim() ?? "Help Center",
  );
  let bannerImage = settings.headerCategoryBannerImage;
  let bannerSrc = bannerImage?.url?.trim();
  let bannerHref = settings.headerCategoryBannerLink?.trim();

  let categoryBanner: CategoryMenuBanner | undefined;

  if (bannerSrc) {
    categoryBanner = {
      image: {
        src: bannerSrc,
        alt:
          settings.headerCategoryBannerImageAlt?.trim() ??
          bannerImage?.altText ??
          "",
      },
      href: bannerHref || undefined,
      eyebrow: settings.headerCategoryBannerEyebrow,
      title: settings.headerCategoryBannerTitle,
    };
  }
  return (
    <Header
      {...props}
      menu={menu}
      categoryMenuItemId={categoryMenuItem?.id}
      categoryBanner={categoryBanner}
      brandMenuItemId={brandMenuItem?.id}
      helpMenuItemId={helpMenuItem?.id}
      brands={brands}
      logo={settings.headerLogo}
      localeControl={
        settings.headerShowCountrySelector === false
          ? undefined
          : props.localeControl
      }
      mobileMenuLabels={{
        title: settings.headerMenuTitle ?? "Menu",
        close: settings.headerMenuCloseLabel ?? "Close menu",
        back: settings.headerMenuBackLabel ?? "Back to menu",
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
