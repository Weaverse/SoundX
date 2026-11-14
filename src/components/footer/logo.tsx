import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

import type { FooterProps } from "./types";

type FooterLogoProps = Pick<
  FooterProps,
  "logo" | "brandName" | "homeHref" | "className"
>;

export default function FooterLogo({
  logo,
  brandName,
  homeHref,
  className,
}: FooterLogoProps) {
  let hasStyledWordmark = brandName === "SOUNDX";

  return (
    <Link
      href={homeHref}
      aria-label={logo?.altText || brandName}
      className={cn(
        "inline-flex w-full max-w-full items-center [container-type:inline-size]",
        "text-footer-text",
        "focus-visible:outline-2 focus-visible:outline-offset-4",
        "focus-visible:outline-current",
        className,
      )}
    >
      {logo ? (
        <Image
          src={logo.url}
          unoptimized
          alt={logo.altText || brandName}
          width={logo.width || 320}
          height={logo.height || 100}
          sizes="(min-width: 768px) 600px, 350px"
          className="h-auto max-h-[120px] w-auto max-w-full object-contain"
        />
      ) : (
        <span className="whitespace-nowrap font-[family-name:var(--font-inter)] text-[min(78px,22cqw)] leading-none font-black md:text-[min(120px,22cqw)]">
          {hasStyledWordmark ? (
            <>
              SOUND
              <span className="font-normal md:font-light">X</span>
            </>
          ) : (
            brandName
          )}
        </span>
      )}
    </Link>
  );
}
