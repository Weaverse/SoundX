import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

import type { HeaderLogo } from "./types";

type LogoProps = {
  logo?: HeaderLogo;
  homeHref: string;
  className?: string;
};

export default function Logo({ logo, homeHref, className }: LogoProps) {
  return (
    <Link
      href={homeHref}
      className={cn(
        "inline-flex shrink-0 items-center gap-1",
        "text-header-text",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-4",
        "focus-visible:outline-current",
        className,
      )}
    >
      {logo?.url ? (
        <span className="relative block h-11 w-[164px]">
          <Image
            src={logo.url}
            unoptimized
            alt={logo.altText?.trim() || "SoundX"}
            fill
            sizes="164px"
            className="object-contain"
          />
        </span>
      ) : (
        <>
          <Image src="/brand/soundx-mark.svg" alt="" width={44} height={44} />

          <span className="whitespace-nowrap font-[family-name:var(--font-inter)] text-[32px] leading-none font-medium">
            SoundX
          </span>
        </>
      )}
    </Link>
  );
}
