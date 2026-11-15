"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import "./mobile-menu.css";

import { cn } from "@/lib/cn";

import type { HeaderMenuItem } from "./types";

// Keep the close timer aligned with --header-menu-duration in mobile-menu.css.
const MENU_DURATION_MS = 300;

type MobileMenuLabels = {
  title: string;
  close: string;
  home: string;
  expand: string;
  collapse: string;
};

type MobileMenuProps = {
  id: string;
  menu: HeaderMenuItem[];
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
  nested?: boolean;
};

function MenuItem({ item, labels, onNavigate, nested = false }: MenuItemProps) {
  let [expanded, setExpanded] = useState(false);
  let panelId = useId();
  let hasChildren = item.children.length > 0;

  return (
    <li className={cn(!nested && "border-t border-border-subtle")}>
      <div className="flex items-center gap-4">
        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "min-w-0 flex-1 break-words",
            nested ? "py-2" : "py-4",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-current",
          )}
        >
          {item.title}
        </Link>

        {hasChildren ? (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={panelId}
            aria-label={`${expanded ? labels.collapse : labels.expand} ${item.title}`}
            onClick={() => setExpanded((value) => !value)}
            className={cn(
              "flex size-8 shrink-0 items-center justify-center",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-current",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "transition-transform duration-200 motion-reduce:transition-none",
                expanded && "rotate-90",
              )}
            >
              <Image
                src="/icons/header/chevron-right.svg"
                alt=""
                width={14}
                height={14}
              />
            </span>
          </button>
        ) : null}
      </div>

      {hasChildren ? (
        <ul
          id={panelId}
          hidden={!expanded}
          className="m-0 list-none space-y-0.5 pb-4 pl-3"
        >
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              labels={labels}
              onNavigate={onNavigate}
              nested
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function MobileMenu({
  id,
  menu,
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

  let phoneNumber = contact?.phoneNumber?.trim();
  let emailAddress = contact?.emailAddress?.trim();
  let hasContact = Boolean(phoneNumber || emailAddress);

  let finishClosing = useCallback(() => {
    let dialog = dialogRef.current;
    if (dialog?.open) dialog.close();

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
        "overflow-hidden border-0 bg-background p-0",
        "text-text-main",
      )}
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center gap-4 px-4 pt-4 pb-4">
          <h2 id={titleId} className="m-0 flex-1 font-heading text-heading-h6">
            {labels.title}
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
          aria-label={labels.title}
          className="min-h-0 flex-1 overflow-y-auto px-4 pt-4 pb-4"
        >
          <ul className="m-0 list-none border-b border-border-subtle p-0 font-sans text-ui-base-medium">
            <li className="border-t border-border-subtle">
              <Link
                href={homeHref}
                onClick={onClose}
                className={cn(
                  "block py-4",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-current",
                )}
              >
                {labels.home}
              </Link>
            </li>

            {menu.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                labels={labels}
                onNavigate={onClose}
              />
            ))}
          </ul>
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
