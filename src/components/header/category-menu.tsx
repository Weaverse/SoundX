import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

import type { HeaderMenuItem } from "./types";

export type CategoryMenuBanner = {
  image: {
    src: string;
    alt: string;
  };
  href?: string;
  eyebrow?: string;
  title?: string;
};

type CategoryMenuProps = {
  groups: HeaderMenuItem[];
  banner?: CategoryMenuBanner;
  className?: string;
};

const INTERACTION_CLASS = cn(
  "transition-colors duration-200 ease-out hover:text-[var(--category-menu-accent)]",
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
  "motion-reduce:transition-none",
);

const BANNER_CLASS = cn(
  "relative block min-h-[288px] w-[400px] shrink-0",
  "overflow-hidden rounded-[20px] bg-surface-light text-text-inverse",
);

export default function CategoryMenu({
  groups,
  banner,
  className,
}: CategoryMenuProps) {
  if (groups.length === 0 && !banner) {
    return null;
  }

  let bannerContent = banner && (
    <>
      <Image
        src={banner.image.src}
        alt={banner.image.alt}
        unoptimized
        fill
        sizes="400px"
        className="object-cover"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-black/20" />
      <div className="relative flex min-h-[288px] flex-col justify-between gap-8 p-10">
        {banner.eyebrow ? (
          <span className="font-sans text-sm font-medium leading-normal">
            {banner.eyebrow}
          </span>
        ) : null}
        {banner.title ? (
          <span className="mt-auto font-sans text-[26px] font-medium leading-[33px]">
            {banner.title}
          </span>
        ) : null}
      </div>
    </>
  );

  return (
    <div
      className={cn(
        "bg-background shadow-[0_4px_2px_rgba(0,0,0,0.04)]",
        "[--category-menu-accent:#34285e]",
        className,
      )}
    >
      <div className="mx-auto flex min-h-[360px] w-[calc(100%-64px)] max-w-[1440px] items-stretch gap-6 pt-8 pb-10">
        <ul className="m-0 grid min-w-0 flex-1 list-none grid-cols-4 gap-6 p-0">
          {groups.map((group) => (
            <li
              key={group.id}
              className="flex min-w-0 flex-col items-start gap-4"
            >
              <Link
                href={group.href}
                className={cn(
                  INTERACTION_CLASS,
                  "font-sans text-[20px] leading-[30px] font-medium text-[var(--category-menu-accent)]",
                )}
              >
                {group.title}
              </Link>

              {group.children.length > 0 ? (
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {group.children.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={cn(
                          INTERACTION_CLASS,
                          "font-sans text-[14px] leading-[21px] font-normal text-text-main",
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        {banner &&
          (banner.href ? (
            <Link
              href={banner.href}
              className={cn(
                BANNER_CLASS,
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-main",
              )}
            >
              {bannerContent}
            </Link>
          ) : (
            <div className={BANNER_CLASS}>{bannerContent}</div>
          ))}
      </div>
    </div>
  );
}
