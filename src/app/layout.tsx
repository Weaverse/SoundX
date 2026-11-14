import { WeaverseNextStudioConnect } from "@weaverse/hydrogen/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";

import { cn } from "@/lib/cn";

import "./globals.css";
import { Suspense } from "react";
import ConnectedAnnouncementBar from "@/components/announcement-bar/connected";
import ConnectedFooter from "@/components/footer/connected";
import ConnectedHeader from "@/components/header/connected";
import { readShopifyNavigationOrEmpty } from "@/lib/storefront/shopify/navigation";
import { WeaverseRoot } from "@/lib/weaverse/root";
import { loadWeaverseThemeSettings } from "@/lib/weaverse/server";

const INTER_FONT = localFont({
  src: "./fonts/inter-variable.ttf",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

const OPEN_SANS_FONT = localFont({
  src: "./fonts/open-sans-variable.ttf",
  weight: "300 800",
  style: "normal",
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoundX",
  description: "SoundX is an electronics and tech storefront.",
};
async function ThemeLayout({ children }: { children: React.ReactNode }) {
  let themeData = await loadWeaverseThemeSettings({
    type: "INDEX",
    pathname: "/",
  });

  let configuredHandle = themeData?.theme?.headerMenuHandle;

  let menuHandle =
    typeof configuredHandle === "string" && configuredHandle.trim()
      ? configuredHandle.trim()
      : "main-menu";

  let configuredFooterHandle = themeData?.theme?.footerMenuHandle;
  let configuredLegalHandle = themeData?.theme?.footerLegalMenuHandle;
  let footerHandle =
    typeof configuredFooterHandle === "string" && configuredFooterHandle.trim()
      ? configuredFooterHandle.trim()
      : "footer-navigation";
  let legalHandle =
    typeof configuredLegalHandle === "string" && configuredLegalHandle.trim()
      ? configuredLegalHandle.trim()
      : "footer-legal";

  let [menu, footerMenu, legalMenu] = await Promise.all([
    readShopifyNavigationOrEmpty(menuHandle),
    readShopifyNavigationOrEmpty(footerHandle),
    readShopifyNavigationOrEmpty(legalHandle),
  ]);

  return (
    <WeaverseRoot
      theme={themeData?.theme}
      merchantOverrides={themeData?.merchantOverrides}
    >
      <ConnectedAnnouncementBar />

      <ConnectedHeader
        menu={menu}
        menuHandle={menuHandle}
        homeHref="/"
        accountHref="/account"
        cartHref="/cart"
        searchHref="/search"
        cartQuantity={0}
        navigationLabel="Main navigation"
        menuLabel="Open menu"
        searchLabel="Search"
        accountLabel="Account"
        cartLabel="Cart"
      />
      <div className="flex-1">{children}</div>

      <ConnectedFooter
        menu={footerMenu}
        menuHandle={footerHandle}
        legalMenuHandle={legalHandle}
        legalMenu={legalMenu}
        homeHref="/"
        copyrightYear={new Date().getFullYear()}
        paymentMethods={[
          { name: "Visa", file: "visa" },
          { name: "PayPal", file: "paypal" },
          { name: "American Express", file: "amex" },
          { name: "Mastercard", file: "mastercard" },
          { name: "JCB", file: "jcb" },
          { name: "Amazon Pay", file: "amazon-pay" },
        ].map((payment) => (
          <Image
            key={payment.file}
            src={`/icons/payments/${payment.file}.svg`}
            alt={payment.name}
            width={38.001}
            height={24.001}
            className="shrink-0"
          />
        ))}
      />
    </WeaverseRoot>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        INTER_FONT.variable,
        OPEN_SANS_FONT.variable,
        "h-full antialiased",
      )}
    >
      <body className="min-h-dvh flex flex-col">
        <WeaverseNextStudioConnect />
        <Suspense fallback={null}>
          <ThemeLayout>{children}</ThemeLayout>
        </Suspense>
      </body>
    </html>
  );
}
