"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useId,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

import DesktopNav from "./desktop-nav";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import type { HeaderProps } from "./types";

type HeaderViewProps = HeaderProps & {
  searchHref: string;
  navigationLabel: string;
  menuLabel: string;
  searchLabel: string;
  accountLabel: string;
  cartLabel: string;
  localeControl?: ReactNode;
  mobileMenuLabels: ComponentProps<typeof MobileMenu>["labels"];
  contact?: ComponentProps<typeof MobileMenu>["contact"];
};

function HeaderIcon({
  name,
}: {
  name: "menu" | "search" | "user-circle" | "shopping-cart";
}) {
  return (
    <Image src={`/icons/header/${name}.svg`} alt="" width={24} height={24} />
  );
}

export default function Header({
  menu,
  logo,
  homeHref,
  accountHref,
  cartHref,
  cartQuantity,
  searchHref,
  navigationLabel,
  menuLabel,
  searchLabel,
  accountLabel,
  cartLabel,
  localeControl,
  mobileMenuLabels,
  contact,
  className,
}: HeaderViewProps) {
  let [menuOpen, setMenuOpen] = useState(false);
  let mobileMenuId = useId();
  let pathname = usePathname();

  useEffect(() => {
    let desktop = window.matchMedia("(min-width: 90rem)");
    function closeOnDesktop() {
      if (desktop.matches) setMenuOpen(false);
    }
    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    // Close a persistent root-layout drawer after route navigation.
    if (pathname) setMenuOpen(false);
  }, [pathname]);

  let iconLinkClass = cn(
    "shrink-0 items-center justify-center p-1",
    "text-header-text",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-current",
  );

  return (
    <header
      className={cn(
        "bg-header-background py-2 text-header-text lg:py-3",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1480px] items-center",
          "gap-2 px-5 py-2 min-[430px]:gap-6",
          "md:px-6 lg:px-8",
        )}
      >
        <div className="flex min-w-0 flex-1 items-center lg:hidden">
          <div className="flex items-center gap-1 min-[390px]:gap-2">
            <Button
              size="icon"
              aria-label={menuLabel}
              onClick={(event) => {
                event.currentTarget.focus();
                setMenuOpen(true);
              }}
              aria-expanded={menuOpen}
              aria-controls={mobileMenuId}
              aria-haspopup="dialog"
              className={cn(
                "rounded-none! bg-transparent! p-1!",
                "text-header-text focus-visible:outline-current!",
              )}
            >
              <HeaderIcon name="menu" />
            </Button>

            <Link
              href={searchHref}
              aria-label={searchLabel}
              className={cn(iconLinkClass, "inline-flex")}
            >
              <HeaderIcon name="search" />
            </Link>
          </div>
        </div>

        <div className="shrink-0 lg:flex lg:w-[280px] lg:items-center">
          <Logo logo={logo} homeHref={homeHref} />
        </div>

        <DesktopNav menu={menu} label={navigationLabel} />

        <div
          className={cn(
            "flex min-w-0 flex-1 items-center justify-end",
            "lg:flex-none lg:gap-3",
          )}
        >
          {localeControl ? (
            <div className="hidden items-center gap-3 lg:flex">
              {localeControl}

              <span aria-hidden="true" className="h-5 w-0.5 bg-border-subtle" />
            </div>
          ) : null}

          <div className="flex items-center gap-1 min-[390px]:gap-2 lg:gap-1">
            <Link
              href={searchHref}
              aria-label={searchLabel}
              className={cn(iconLinkClass, "hidden lg:inline-flex")}
            >
              <HeaderIcon name="search" />
            </Link>

            <Link
              href={accountHref}
              aria-label={accountLabel}
              className={cn(iconLinkClass, "inline-flex")}
            >
              <HeaderIcon name="user-circle" />
            </Link>

            <Link
              href={cartHref}
              aria-label={cartLabel}
              className={cn(iconLinkClass, "inline-flex relative")}
            >
              <HeaderIcon name="shopping-cart" />

              {cartQuantity > 0 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -top-0.5 -right-[3px]",
                    "flex min-w-4 items-center justify-center",
                    "h-4 rounded-full bg-surface-subtle px-1",
                    "font-sans text-[12px] leading-none font-semibold",
                    "text-black",
                  )}
                >
                  {cartQuantity}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      </div>
      <MobileMenu
        id={mobileMenuId}
        menu={menu}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        homeHref={homeHref}
        labels={mobileMenuLabels}
        contact={contact}
      />
    </header>
  );
}
