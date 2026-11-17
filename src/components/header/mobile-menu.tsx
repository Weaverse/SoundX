"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import "./mobile-menu.css";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";

import BrandMenu, { type BrandMenuItem } from "./brand-menu";
import type { HeaderMenuItem } from "./types";

// Keep the close timer aligned with --header-menu-duration in mobile-menu.css.
const MENU_DURATION_MS = 450;

type MobileMenuLabels = {
  title: string;
  close: string;
  home: string;
  expand: string;
  collapse: string;
  back?: string;
};

type MobileMenuProps = {
  id: string;
  menu: HeaderMenuItem[];
  brandMenuItemId?: string;
  categoryMenuItemId?: string;
  brands?: BrandMenuItem[];
  open: boolean;
  onClose: () => void;
  homeHref: string;
  labels: MobileMenuLabels;
  contact?: {
    heading?: string;
    phoneNumber?: string;
    phoneLabel?: string;
    emailAddress?: string;
  };
};

type MenuItemProps = {
  item: HeaderMenuItem;
  labels: MobileMenuLabels;
  onNavigate: () => void;
  depth?: number;
  categoryBranch?: boolean;
};

function MenuItem({
  item,
  labels,
  onNavigate,
  depth = 0,
  categoryBranch = false,
}: MenuItemProps) {
  let [expanded, setExpanded] = useState(false);
  let panelId = useId();
  let hasChildren = item.children.length > 0;
  let isHeading = depth === 0 || (categoryBranch && depth === 1);
  let textClass = isHeading
    ? "font-body text-[16px] leading-[24px] font-semibold"
    : "font-body text-[16px] leading-[24px] font-normal";
  let controlClass = cn(
    "flex w-full min-w-0 items-center justify-between gap-4 text-left text-text-main",
    textClass,
    isHeading ? "py-4" : "py-0",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
  );

  return (
    <li className={cn(isHeading && "border-t border-border-subtle")}>
      {hasChildren ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={`${expanded ? labels.collapse : labels.expand} ${item.title}`}
          onClick={() => setExpanded((value) => !value)}
          className={cn(controlClass, "cursor-pointer border-0 bg-transparent")}
        >
          <span className="min-w-0 break-words">{item.title}</span>
          <Icon
            name="chevron-up"
            size={16}
            className={cn(
              "shrink-0 transition-transform duration-[450ms] motion-reduce:transition-none",
              expanded ? "rotate-180" : "rotate-90",
            )}
          />
        </button>
      ) : (
        <Link href={item.href} onClick={onNavigate} className={controlClass}>
          {item.title}
        </Link>
      )}

      {hasChildren ? (
        <div
          id={panelId}
          inert={!expanded}
          aria-hidden={!expanded}
          data-state={expanded ? "open" : "closed"}
          className="soundx-mobile-submenu"
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="m-0 flex list-none flex-col gap-2 pb-4 pl-2">
              {item.children.map((child) => (
                <MenuItem
                  key={child.id}
                  item={child}
                  labels={labels}
                  onNavigate={onNavigate}
                  depth={depth + 1}
                  categoryBranch={categoryBranch}
                />
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </li>
  );
}

export default function MobileMenu({
  id,
  menu,
  brandMenuItemId,
  categoryMenuItemId,
  brands = [],
  open,
  onClose,
  homeHref,
  labels,
  contact,
}: MobileMenuProps) {
  let dialogRef = useRef<HTMLDialogElement>(null);
  let titleId = useId();
  let closeRef = useRef<HTMLButtonElement>(null);
  let previousFocusRef = useRef<Element | null>(null);
  let previousOverflowRef = useRef<string | null>(null);
  // One dialog, two navigation views: root menu or a selected parent's children.
  let [activePanelId, setActivePanelId] = useState<string | null>(null);
  let activePanel = menu.find((item) => item.id === activePanelId);
  let backRef = useRef<HTMLButtonElement>(null);
  let rootTriggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  let restoreTriggerId = useRef<string | null>(null);
  let navigationRef = useRef<HTMLElement>(null);
  let contentId = useId();

  useEffect(() => {
    if (navigationRef.current) navigationRef.current.scrollTop = 0;
    if (activePanelId) {
      backRef.current?.focus();
    } else if (restoreTriggerId.current) {
      rootTriggerRefs.current[restoreTriggerId.current]?.focus();
      restoreTriggerId.current = null;
    }
  }, [activePanelId]);

  function goBack() {
    restoreTriggerId.current = activePanelId;
    setActivePanelId(null);
  }

  let phoneNumber = contact?.phoneNumber?.trim();
  let emailAddress = contact?.emailAddress?.trim();
  let hasContact = Boolean(phoneNumber || emailAddress);

  let finishClosing = useCallback(() => {
    let dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
      setActivePanelId(null);
      restoreTriggerId.current = null;
    }

    if (previousOverflowRef.current !== null) {
      document.body.style.overflow = previousOverflowRef.current;
      previousOverflowRef.current = null;
    }

    let previousFocus = previousFocusRef.current;
    previousFocusRef.current = null;
    if (
      previousFocus instanceof HTMLElement &&
      previousFocus.isConnected &&
      previousFocus.getClientRects().length > 0
    ) {
      previousFocus.focus();
    }
  }, []);

  useEffect(() => {
    let dialog = dialogRef.current;
    if (!dialog) return;

    let reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let desktop = window.matchMedia("(min-width: 90rem)").matches;
    let frame: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (open) {
      if (!dialog.open) {
        previousFocusRef.current = document.activeElement;
        previousOverflowRef.current = document.body.style.overflow;
        dialog.dataset.state = "closed";
        dialog.showModal();
        document.body.style.overflow = "hidden";
        // Flush the off-screen start position before transitioning in.
        dialog.getBoundingClientRect();
        closeRef.current?.focus();
      }

      if (reduceMotion) {
        dialog.dataset.state = "open";
      } else {
        frame = requestAnimationFrame(() => {
          dialog.dataset.state = "open";
        });
      }
    } else if (dialog.open) {
      dialog.dataset.state = "closed";
      if (reduceMotion || desktop) {
        finishClosing();
      } else {
        // Keep the dialog modal and the body locked until the exit completes.
        timer = setTimeout(finishClosing, MENU_DURATION_MS);
      }
    }

    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [open, finishClosing]);

  useEffect(() => () => finishClosing(), [finishClosing]);

  return (
    <dialog
      id={id}
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        if (event.target !== event.currentTarget) {
          return;
        }

        let bounds = event.currentTarget.getBoundingClientRect();

        let outside =
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom;

        if (outside) {
          onClose();
        }
      }}
      className={cn(
        "soundx-mobile-menu",
        "fixed inset-y-0 left-0 m-0",
        "h-dvh max-h-dvh w-[360px] max-w-full",
        "overflow-hidden rounded-l-none rounded-r-md border-0 bg-background p-0",
        "text-text-main",
      )}
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center gap-4 px-4 pt-4 pb-4">
          {activePanel ? (
            <button
              ref={backRef}
              type="button"
              aria-label={labels.back ?? labels.title}
              onClick={goBack}
              className="flex size-5 shrink-0 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            >
              <Icon name="arrow-right" size={20} className="rotate-180" />
            </button>
          ) : null}
          <h2
            id={titleId}
            className="m-0 flex-1 font-sans text-[20px] leading-[30px] font-medium"
          >
            {activePanel?.title ?? labels.title}
          </h2>

          <button
            type="button"
            aria-label={labels.close}
            onClick={onClose}
            ref={closeRef}
            className={cn(
              "flex size-8 shrink-0 items-center justify-center",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-current",
            )}
          >
            <Image
              src="/icons/header/close.svg"
              alt=""
              width={20}
              height={20}
            />
          </button>
        </div>

        <nav
          ref={navigationRef}
          id={contentId}
          aria-label={activePanel?.title ?? labels.title}
          className="min-h-0 flex-1 overflow-y-auto px-4 pt-4 pb-4"
        >
          <div key={activePanel?.id ?? "main"} className="soundx-mobile-panel">
            {activePanel ? (
              activePanel.id === brandMenuItemId &&
              brands.length > 0 &&
              activePanel.children.every(
                (item) => item.children.length === 0,
              ) ? (
                <BrandMenu
                  brands={brands}
                  layout="mobile"
                  onNavigate={onClose}
                />
              ) : (
                <ul className="m-0 list-none border-b border-border-subtle p-0">
                  {activePanel.children.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      labels={labels}
                      onNavigate={onClose}
                      depth={activePanel.id === categoryMenuItemId ? 1 : 0}
                      categoryBranch={activePanel.id === categoryMenuItemId}
                    />
                  ))}
                </ul>
              )
            ) : (
              <ul className="m-0 list-none border-b border-border-subtle p-0 font-body text-[16px] leading-[24px] font-semibold">
                <li className="border-t border-border-subtle">
                  <Link
                    href={homeHref}
                    onClick={onClose}
                    className="block py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                  >
                    {labels.home}
                  </Link>
                </li>
                {menu.map((item) => (
                  <li key={item.id} className="border-t border-border-subtle">
                    {item.children.length > 0 ? (
                      <button
                        ref={(element) => {
                          rootTriggerRefs.current[item.id] = element;
                        }}
                        type="button"
                        aria-controls={contentId}
                        aria-label={`${labels.expand} ${item.title}`}
                        onClick={() => setActivePanelId(item.id)}
                        className="flex w-full items-center justify-between gap-4 border-0 bg-transparent py-4 text-left font-inherit text-text-main focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                      >
                        <span className="min-w-0 break-words">
                          {item.title}
                        </span>
                        <Icon
                          name="chevron-up"
                          size={16}
                          className="shrink-0 rotate-90"
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        {hasContact ? (
          <div className="max-h-[40dvh] shrink-0 overflow-y-auto border-t border-border-subtle px-4 py-5">
            {contact?.heading ? (
              <p className="m-0 mb-2 font-body text-[14px] leading-[1.5] font-semibold">
                {contact.heading}
              </p>
            ) : null}

            <div className="flex flex-col gap-2 font-body text-[14px] leading-[1.5]">
              {phoneNumber ? (
                <a
                  href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                >
                  <Image
                    src="/icons/header/phone.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                  <span className="min-w-0 break-words">
                    {contact?.phoneLabel ? `${contact.phoneLabel} ` : ""}
                    {phoneNumber}
                  </span>
                </a>
              ) : null}

              {emailAddress ? (
                <a
                  href={`mailto:${emailAddress}`}
                  className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                >
                  <Image
                    src="/icons/header/envelope.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                  <span className="min-w-0 break-all">{emailAddress}</span>
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
