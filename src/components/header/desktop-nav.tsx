"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";

import BrandMenu, { type BrandMenuItem } from "./brand-menu";
import CategoryMenu, { type CategoryMenuBanner } from "./category-menu";
import HelpCenterMenu from "./help-center-menu";
import type { HeaderMenuItem } from "./types";

import "./desktop-nav.css";

type DesktopNavProps = {
  menu: HeaderMenuItem[];
  label: string;
  className?: string;
  categoryMenuItemId?: string;
  categoryBanner?: CategoryMenuBanner;
  brandMenuItemId?: string;
  helpMenuItemId?: string;
  brands?: BrandMenuItem[];
};

export default function DesktopNav({
  menu,
  label,
  className,
  categoryMenuItemId,
  categoryBanner,
  brandMenuItemId,
  helpMenuItemId,
  brands = [],
}: DesktopNavProps) {
  // NEW: share hover/focus behavior; only one menu is active at a time.
  let [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  let triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  let panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  let regionRef = useRef<HTMLDivElement>(null);
  let focusPanel = useRef(false);
  let panelPrefix = useId();
  let pathname = usePathname();
  let categoryItem = menu.find((item) => item.id === categoryMenuItemId);
  let brandItem = menu.find((item) => item.id === brandMenuItemId);
  let dropdowns = menu.filter(
    (item) =>
      (item.id === categoryItem?.id &&
        (item.children.length > 0 || !!categoryBanner)) ||
      (item.id === brandItem?.id && brands.length > 0) ||
      (item.id === helpMenuItemId && item.children.length > 0),
  );

  function closeMenus() {
    focusPanel.current = false;
    setActiveMenuId(null);
  }

  useEffect(() => {
    if (pathname) setActiveMenuId(null);
  }, [pathname]);

  useEffect(() => {
    if (activeMenuId && focusPanel.current) {
      panelRefs.current[activeMenuId]
        ?.querySelector<HTMLAnchorElement>("a[href]")
        ?.focus();
      focusPanel.current = false;
    }
  }, [activeMenuId]);

  useEffect(() => {
    if (!activeMenuId) return;
    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !regionRef.current?.contains(event.target)
      ) {
        setActiveMenuId(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveMenuId(null);
        if (activeMenuId) triggerRefs.current[activeMenuId]?.focus();
      }
    }
    function handleClick(event: MouseEvent) {
      if (
        activeMenuId &&
        event.target instanceof Element &&
        panelRefs.current[activeMenuId]?.contains(event.target) &&
        event.target.closest("a[href]")
      )
        setActiveMenuId(null);
    }
    function handleViewportChange() {
      setActiveMenuId(null);
    }
    let desktop = window.matchMedia("(min-width: 90rem)");
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
    desktop.addEventListener("change", handleViewportChange);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
      desktop.removeEventListener("change", handleViewportChange);
    };
  }, [activeMenuId]);

  if (menu.length === 0) return null;
  let itemClass = cn(
    "inline-flex items-center gap-0.5 whitespace-nowrap",
    "font-sans text-ui-base-medium text-header-text",
    "transition-colors duration-200 ease-out hover:text-text-subtle motion-reduce:transition-none",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
  );

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: events are delegated from the accessible links and disclosure buttons.
    <div
      ref={regionRef}
      className={cn(
        "hidden min-w-0 flex-1 self-stretch lg:flex items-center justify-center",
        className,
      )}
      onMouseLeave={closeMenus}
      onBlur={(event) => {
        if (
          !event.relatedTarget ||
          !event.currentTarget.contains(event.relatedTarget)
        )
          closeMenus();
      }}
    >
      <nav aria-label={label}>
        <ul className="m-0 flex list-none items-center justify-center gap-6 p-0">
          {menu.map((item) => (
            <li
              key={item.id}
              className={cn(
                "flex items-center",
                item.id === helpMenuItemId && "relative",
              )}
            >
              {dropdowns.some((dropdown) => dropdown.id === item.id) ? (
                <button
                  ref={(element) => {
                    triggerRefs.current[item.id] = element;
                  }}
                  type="button"
                  aria-expanded={activeMenuId === item.id}
                  aria-controls={`${panelPrefix}-${item.id}`}
                  className={cn(
                    itemClass,
                    "cursor-pointer border-0 bg-transparent p-0",
                  )}
                  onMouseEnter={() => setActiveMenuId(item.id)}
                  onFocus={() => {
                    if (activeMenuId !== item.id) closeMenus();
                  }}
                  onClick={() =>
                    setActiveMenuId((active) =>
                      active === item.id ? null : item.id,
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      if (activeMenuId === item.id) {
                        panelRefs.current[item.id]
                          ?.querySelector<HTMLAnchorElement>("a[href]")
                          ?.focus();
                      } else {
                        focusPanel.current = true;
                        setActiveMenuId(item.id);
                      }
                    }
                  }}
                >
                  {item.title}
                  <Icon name="chevron-up" size={16} className="rotate-180" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={itemClass}
                  onMouseEnter={closeMenus}
                  onFocus={closeMenus}
                  onClick={closeMenus}
                >
                  {item.title}
                </Link>
              )}
              {item.id === helpMenuItemId && item.children.length > 0 ? (
                <div
                  id={`${panelPrefix}-${item.id}`}
                  ref={(element) => {
                    panelRefs.current[item.id] = element;
                  }}
                  aria-hidden={activeMenuId !== item.id}
                  inert={activeMenuId !== item.id}
                  data-state={activeMenuId === item.id ? "open" : "closed"}
                  className="soundx-desktop-dropdown absolute top-full left-0 z-50 w-max pt-5"
                  onMouseEnter={() => setActiveMenuId(item.id)}
                  onMouseLeave={closeMenus}
                >
                  <HelpCenterMenu
                    items={item.children}
                    open={activeMenuId === item.id}
                  />
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      {dropdowns
        .filter((item) => item.id !== helpMenuItemId)
        .map((item) => {
          let open = activeMenuId === item.id;
          return (
            <div
              key={item.id}
              id={`${panelPrefix}-${item.id}`}
              ref={(element) => {
                panelRefs.current[item.id] = element;
              }}
              aria-hidden={!open}
              inert={!open}
              data-state={open ? "open" : "closed"}
              className="soundx-desktop-dropdown absolute inset-x-0 top-[calc(100%-12px)] z-50 pt-3"
              onMouseEnter={() => setActiveMenuId(item.id)}
              onMouseLeave={closeMenus}
            >
              {item.id === categoryMenuItemId ? (
                <CategoryMenu groups={item.children} banner={categoryBanner} />
              ) : (
                <BrandMenu brands={brands} layout="desktop" />
              )}
            </div>
          );
        })}
    </div>
  );
}
