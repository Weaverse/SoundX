"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";

import type { HeaderMenuItem } from "./types";

type HelpCenterMenuProps = {
  items: HeaderMenuItem[];
  open: boolean;
  className?: string;
};

const ITEM_CLASS = cn(
  "flex w-full items-center justify-between gap-2.5 text-left",
  "font-sans text-sm font-normal leading-[1.5] text-text-main",
  "transition-colors duration-200 hover:text-[var(--help-menu-accent,#34285e)]",
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
  "motion-reduce:transition-none",
);

export default function HelpCenterMenu({
  items,
  open,
  className,
}: HelpCenterMenuProps) {
  let [activeItemId, setActiveItemId] = useState<string | null>(null);
  let prefix = useId();
  let triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  let panelRefs = useRef<Record<string, HTMLUListElement | null>>({});
  let focusSubmenu = useRef(false);
  let openedByHover = useRef<string | null>(null);

  let closeSubmenu = useCallback(() => {
    focusSubmenu.current = false;
    openedByHover.current = null;
    setActiveItemId(null);
  }, []);

  useEffect(() => {
    if (!open) closeSubmenu();
  }, [open, closeSubmenu]);

  useEffect(() => {
    if (activeItemId && focusSubmenu.current) {
      panelRefs.current[activeItemId]
        ?.querySelector<HTMLAnchorElement>("a[href]")
        ?.focus();
      focusSubmenu.current = false;
    }
  }, [activeItemId]);

  if (items.length === 0) return null;

  return (
    <ul
      className={cn(
        "m-0 flex min-w-[186px] list-none flex-col gap-2 rounded-[8px] bg-background px-5 py-4 shadow-[0_4px_2px_rgba(0,0,0,0.04)]",
        className,
      )}
    >
      {items.map((item) => {
        let hasChildren = item.children.length > 0;
        let expanded = open && activeItemId === item.id;
        return (
          <li
            key={item.id}
            className="relative"
            onMouseEnter={() => {
              if (!hasChildren) {
                closeSubmenu();
              } else if (!expanded) {
                openedByHover.current = item.id;
                setActiveItemId(item.id);
              }
            }}
            onMouseLeave={closeSubmenu}
            onBlur={(event) => {
              if (
                !event.relatedTarget ||
                !event.currentTarget.contains(event.relatedTarget)
              )
                closeSubmenu();
            }}
            onKeyDown={(event) => {
              if (
                expanded &&
                (event.key === "Escape" || event.key === "ArrowLeft")
              ) {
                event.preventDefault();
                event.stopPropagation();
                closeSubmenu();
                triggerRefs.current[item.id]?.focus();
              }
            }}
          >
            {hasChildren ? (
              <>
                <button
                  ref={(element) => {
                    triggerRefs.current[item.id] = element;
                  }}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`${prefix}-${item.id}`}
                  className={cn(
                    ITEM_CLASS,
                    "cursor-pointer border-0 bg-transparent p-0",
                  )}
                  onClick={(event) => {
                    let keepOpen =
                      event.detail > 0 && openedByHover.current === item.id;
                    openedByHover.current = null;
                    if (keepOpen) return;
                    setActiveItemId((active) =>
                      active === item.id ? null : item.id,
                    );
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") {
                      event.preventDefault();
                      openedByHover.current = null;
                      if (expanded) {
                        panelRefs.current[item.id]
                          ?.querySelector<HTMLAnchorElement>("a[href]")
                          ?.focus();
                      } else {
                        focusSubmenu.current = true;
                        setActiveItemId(item.id);
                      }
                    }
                  }}
                >
                  {item.title}
                  <Icon name="chevron-up" size={16} className="rotate-90" />
                </button>
                <div
                  aria-hidden={!expanded}
                  inert={!expanded}
                  data-state={expanded ? "open" : "closed"}
                  className="soundx-desktop-dropdown absolute top-0 left-full z-10 pl-2"
                >
                  <ul
                    id={`${prefix}-${item.id}`}
                    ref={(element) => {
                      panelRefs.current[item.id] = element;
                    }}
                    className="m-0 flex min-w-[139px] list-none flex-col gap-2 rounded-[8px] bg-background px-5 py-4 shadow-[0_4px_2px_rgba(0,0,0,0.04)]"
                  >
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={child.href}
                          className={cn(ITEM_CLASS, "whitespace-nowrap")}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <Link href={item.href} className={ITEM_CLASS}>
                {item.title}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
