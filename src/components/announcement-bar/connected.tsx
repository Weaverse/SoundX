"use client";

import { useThemeSettings } from "@weaverse/hydrogen/next";
import Image from "next/image";
import AnnouncementBar, { type AnnouncementItem } from "./index";

type AnnouncementSlot = 1 | 2 | 3;

type AnnouncementSettings = {
  announcementBarEnabled?: boolean;
  announcementPauseLabel?: string;
  announcementResumeLabel?: string;
  announcementHelpEnabled?: boolean;
  announcementHelpLabel?: string;
  announcementHelpLink?: string;
} & Partial<Record<`announcementBar${AnnouncementSlot}Enabled`, boolean>> &
  Partial<
    Record<
      | `announcementEmoji${AnnouncementSlot}`
      | `announcement${AnnouncementSlot}TextBefore`
      | `announcement${AnnouncementSlot}Highlight`
      | `announcement${AnnouncementSlot}TextAfter`
      | `announcement${AnnouncementSlot}Link`,
      string
    >
  >;

export default function ConnectedAnnouncementBar() {
  let settings = useThemeSettings<AnnouncementSettings>();

  if (settings.announcementBarEnabled === false) {
    return null;
  }

  let slots: AnnouncementSlot[] = [1, 2, 3];
  let announcements: AnnouncementItem[] = [];

  for (let slot of slots) {
    if (settings[`announcementBar${slot}Enabled`] === false) {
      continue;
    }

    let textBefore = settings[`announcement${slot}TextBefore`] ?? "";
    let highlight = settings[`announcement${slot}Highlight`] ?? "";
    let textAfter = settings[`announcement${slot}TextAfter`] ?? "";

    if (!`${textBefore}${highlight}${textAfter}`.trim()) {
      continue;
    }

    announcements.push({
      id: `announcement-${slot}`,
      emoji: settings[`announcementEmoji${slot}`],
      textBefore,
      highlight,
      textAfter,
      href: settings[`announcement${slot}Link`]?.trim() || undefined,
    });
  }

  if (announcements.length === 0) {
    return null;
  }
  let helpLabel = settings.announcementHelpLabel?.trim();
  let helpHref = settings.announcementHelpLink?.trim();
  let helpLink =
    settings.announcementHelpEnabled !== false && helpLabel && helpHref
      ? {
          label: helpLabel,
          href: helpHref,
          icon: <Image src="/icons/help.svg" alt="" width={14} height={14} />,
        }
      : undefined;

  return (
    <AnnouncementBar
      announcements={announcements}
      helpLink={helpLink}
      pauseLabel={settings.announcementPauseLabel}
      resumeLabel={settings.announcementResumeLabel}
    />
  );
}
