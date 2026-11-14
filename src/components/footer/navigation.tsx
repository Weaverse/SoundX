"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

import { cn } from "@/lib/cn";

import "./navigation.css";

import type { FooterLabels, FooterMenuItem, FooterProps } from "./types";

type FooterNavigationProps = Pick<FooterProps, "menu" | "className"> & {
  labels: Pick<FooterLabels, "navigation" | "expand" | "collapse">;
};

type FooterNavigationGroupProps = {
  item: FooterMenuItem;
  index: number;
  labels: FooterNavigationProps["labels"];
};

const LINK_CLASS = cn(
  "text-footer-text",
  "underline decoration-transparent underline-offset-4",
  "transition-colors duration-200 ease-out",
  "hover:text-text-subtle hover:decoration-current",
  "motion-reduce:transition-none",
  "focus-visible:outline-2 focus-visible:outline-offset-4",
  "focus-visible:outline-current",
);

function FooterNavigationGroup({
  item,
  index,
  labels,
}: FooterNavigationGroupProps) {
  let [expanded, setExpanded] = useState(false);
  let panelId = useId();

  let number = String(index + 1).padStart(2, "0");
  let heading = `${number} / ${item.title}`;
  let hasChildren = item.children.length > 0;
  let isExternal = /^https?:\/\//i.test(item.href);

  let arrow = (
    <Image
      src={
        isExternal
          ? "/icons/footer/arrow-up-right.svg"
          : "/icons/footer/arrow-right.svg"
      }
      alt=""
      width={16}
      height={16}
    />
  );

  return (
    <li className="border-t border-[#E6E2E8] px-10 py-7 lg:px-4">
      <div className="flex items-center gap-6 md:gap-10 lg:gap-4">
        <h3 className="m-0 min-w-0 flex-1 text-[11px] leading-normal font-medium uppercase text-text-subtle md:w-[100px] md:flex-none lg:w-[88px]">
          {hasChildren ? (
            <>
              <Link
                href={item.href}
                className={cn(LINK_CLASS, "hidden md:inline")}
              >
                {heading}
              </Link>

              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                aria-label={`${expanded ? labels.collapse : labels.expand} ${item.title}`}
                onClick={() => setExpanded((value) => !value)}
                className={cn(
                  "flex min-h-11 w-full items-center justify-between gap-4",
                  "text-left uppercase md:hidden",
                  "focus-visible:outline-2 focus-visible:outline-offset-4",
                  "focus-visible:outline-current",
                )}
              >
                <span>{heading}</span>

                <span
                  className={cn(
                    "shrink-0 transition-transform duration-[350ms]",
                    "motion-reduce:transition-none",
                    expanded && "rotate-90",
                  )}
                >
                  {arrow}
                </span>
              </button>
            </>
          ) : (
            <Link
              href={item.href}
              className={cn(
                LINK_CLASS,
                "flex min-h-11 items-center justify-between gap-4 md:min-h-0",
              )}
            >
              <span>{heading}</span>
              <span className="shrink-0 md:hidden">{arrow}</span>
            </Link>
          )}
        </h3>

        {hasChildren ? (
          <ul className="hidden min-w-0 flex-1 flex-nowrap items-center gap-2 overflow-x-auto p-2 text-[18px] leading-normal md:flex">
            {item.children.map((child, childIndex) => (
              <li
                key={child.id}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap"
              >
                {childIndex > 0 ? (
                  <span aria-hidden="true" className="text-footer-text">
                    ·
                  </span>
                ) : null}

                <Link href={child.href} className={LINK_CLASS}>
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <Link
          href={item.href}
          aria-label={item.title}
          className={cn(
            LINK_CLASS,
            "soundx-footer-arrow-link ml-auto hidden min-h-11 min-w-11 shrink-0 items-center justify-center md:inline-flex",
          )}
        >
          <span
            aria-hidden="true"
            className="soundx-footer-arrow-window"
            data-direction={isExternal ? "diagonal" : "horizontal"}
          >
            <span className="soundx-footer-arrow-original">{arrow}</span>
            <span className="soundx-footer-arrow-copy">{arrow}</span>
          </span>
        </Link>
      </div>

      {hasChildren ? (
        <div
          id={panelId}
          inert={!expanded}
          aria-hidden={!expanded}
          className="soundx-footer-submenu md:hidden"
          data-expanded={expanded}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="space-y-1 pt-4 text-[14px] leading-normal">
              {item.children.map((child) => (
                <li key={child.id}>
                  <Link
                    href={child.href}
                    className={cn(LINK_CLASS, "block py-3")}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </li>
  );
}

export default function FooterNavigation({
  menu,
  labels,
  className,
}: FooterNavigationProps) {
  if (!menu.length) {
    return null;
  }

  return (
    <nav aria-label={labels.navigation} className={cn("font-sans", className)}>
      <ul className="m-0 list-none p-0">
        {menu.map((item, index) => (
          <FooterNavigationGroup
            key={item.id}
            item={item}
            index={index}
            labels={labels}
          />
        ))}
      </ul>
    </nav>
  );
}
