import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

export type BrandMenuItem = {
  id: string;
  title: string;
  href: string;
  image?: { src: string; alt: string };
};

type BrandMenuProps = {
  brands: BrandMenuItem[];
  layout: "desktop" | "mobile";
  className?: string;
  onNavigate?: () => void;
};

export default function BrandMenu({
  brands,
  layout,
  className,
  onNavigate,
}: BrandMenuProps) {
  if (brands.length === 0) return null;
  let isDesktop = layout === "desktop";

  return (
    <div
      className={cn(
        isDesktop && "bg-background shadow-[0_4px_2px_rgba(0,0,0,0.04)]",
        className,
      )}
    >
      <div
        className={
          isDesktop
            ? "mx-auto w-[calc(100%-64px)] max-w-[1440px] py-8"
            : "pt-1 pb-4"
        }
      >
        <ul
          className={cn(
            "m-0 grid list-none p-0",
            isDesktop
              ? "w-[calc(100%-24px)] grid-cols-4 gap-6"
              : "grid-cols-2 gap-x-3 gap-y-4",
          )}
        >
          {brands.map((brand) => (
            <li key={brand.id} className="min-w-0">
              <Link
                href={brand.href}
                onClick={onNavigate}
                className={cn(
                  "group flex flex-col rounded-md text-text-main",
                  isDesktop ? "gap-4" : "gap-2",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
                )}
              >
                {brand.image ? (
                  <div
                    className={cn(
                      "relative w-full overflow-hidden rounded-md bg-surface-light",
                      isDesktop ? "h-[212.5px]" : "h-[119px]",
                    )}
                  >
                    <Image
                      src={brand.image.src}
                      alt={brand.image.alt}
                      unoptimized
                      fill
                      sizes={
                        isDesktop ? "320px" : "(max-width: 430px) 50vw, 240px"
                      }
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <span className="font-body text-base font-semibold text-center leading-[1.5] transition-colors duration-200 ease-out group-hover:text-[var(--brand-menu-accent,#34285e)] motion-reduce:transition-none">
                  {brand.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
