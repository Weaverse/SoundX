import type { WeaverseNextThemeSchema } from "@weaverse/hydrogen/next";

import { announcementBarSettings } from "./settings/announcement-bar";
import { buttonSettings } from "./settings/button";
import { colorSettings } from "./settings/colors";
import { footerSettings } from "./settings/footer";
import { headerSettings } from "./settings/header";
import { layoutSettings } from "./settings/layout";
import { typographySettings } from "./settings/typography";
export const themeSchema: WeaverseNextThemeSchema = {
  info: {
    name: "SoundX",
    version: "1.0.0",
  },
  settings: [
    announcementBarSettings,
    headerSettings,
    footerSettings,
    layoutSettings,
    colorSettings,
    typographySettings,
    buttonSettings,
  ],
};
