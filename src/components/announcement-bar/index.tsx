"use client";

import Link from "next/link";
import { type ReactNode, useState } from "react";

import "./announcement-bar.css";

import { cn } from "@/lib/cn";

export type AnnouncementItem = {
  id: string;
  emoji?: string;
  textBefore?: string;
  highlight?: string;
  textAfter?: string;
  href?: string;
};

export type AnnouncementBarProps = {
  announcements: AnnouncementItem[];
  helpLink?: {
    label: string;
    href: string;
    icon: ReactNode;
  };
  className?: string;
  pauseLabel?: string;
  resumeLabel?: string;
};

function AnnouncementContent({
  emoji,
  textBefore,
  highlight,
  textAfter,
}: AnnouncementItem) {
  return (
    <span className="inline-flex items-center gap-2">
      {emoji ? (
        <span
          aria-hidden="true"
          className="text-[14px] font-bold text-text-subtle"
        >
          {emoji}
        </span>
      ) : null}

      <span className="whitespace-pre">
        {textBefore}
        {highlight ? (
          <strong className="font-bold text-text-subtle">{highlight}</strong>
        ) : null}
        {textAfter}
      </span>
    </span>
  );
}

export default function AnnouncementBar({
  announcements,
  helpLink,
  className,
  pauseLabel,
  resumeLabel,
}: AnnouncementBarProps) {
  let [paused, setPaused] = useState(false);
  if (announcements.length === 0) {
    return null;
  }

  return (
    <aside
      data-paused={paused}
      className={cn(
        "soundx-announcement-bar",
        "flex items-center gap-2.5 bg-announcement-background p-2.5",
        "font-sans text-[13px] leading-normal font-semibold text-announcement-text",
        className,
      )}
    >
      <div className={cn("soundx-announcement-viewport", "min-w-0 flex-1")}>
        <div className={"soundx-announcement-track"}>
          <ul
            className={cn(
              "soundx-announcement-group",
              "m-0 flex w-max list-none items-center gap-6 p-0",
            )}
          >
            {announcements.map((announcement, index) => (
              <li
                key={announcement.id}
                className="flex shrink-0 items-center gap-6"
              >
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="h-4 w-px shrink-0 bg-text-subtle"
                  />
                ) : null}

                {announcement.href ? (
                  <Link
                    href={announcement.href}
                    className={cn(
                      "inline-flex",
                      "focus-visible:outline-2",
                      "focus-visible:outline-offset-[-2px]",
                      "focus-visible:outline-white",
                    )}
                  >
                    <AnnouncementContent {...announcement} />
                  </Link>
                ) : (
                  <AnnouncementContent {...announcement} />
                )}
              </li>
            ))}
          </ul>
          <ul
            aria-hidden="true"
            inert
            className={cn(
              "soundx-announcement-group",
              "soundx-announcement-copy",
              "m-0 flex w-max list-none items-center gap-6 p-0",
            )}
          >
            {announcements.map((announcement, index) => (
              <li
                key={announcement.id}
                className="flex shrink-0 items-center gap-6"
              >
                {index > 0 ? (
                  <span className="h-4 w-px shrink-0 bg-text-subtle" />
                ) : null}
                <AnnouncementContent {...announcement} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {pauseLabel && resumeLabel ? (
        <button
          type="button"
          className={cn(
            "soundx-announcement-control",
            "flex size-4 shrink-0 items-center justify-center text-text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          )}
          aria-label={paused ? resumeLabel : pauseLabel}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
        </button>
      ) : null}

      {helpLink ? (
        <Link
          href={helpLink.href}
          className={cn(
            "hidden shrink-0 items-center gap-1.5 lg:inline-flex",
            "text-[13px] font-medium text-[#94A3B8]",
            "focus-visible:outline-2",
            "focus-visible:outline-offset-2",
            "focus-visible:outline-white",
          )}
        >
          <span aria-hidden="true" className="flex size-3.5 items-center">
            {helpLink.icon}
          </span>
          <span>{helpLink.label}</span>
        </Link>
      ) : null}
    </aside>
  );
}
