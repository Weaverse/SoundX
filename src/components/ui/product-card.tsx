import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export type ProductCardProps = {
  href: string;
  title: string;
  image: { src: string; alt: string; sizes?: string } | null;
  price: string;
  brand?: string;
  compareAtPrice?: string;
  badges?: Array<
    Pick<BadgeProps, "variant" | "backgroundColor" | "textColor"> & {
      label: string;
    }
  >;
  rating?: { value: number; count: number };
  swatches?: Array<{
    label: string;
    color: string;
    selected?: boolean;
  }>;
  availabilityLabel?: string;

  hoverImage?: ProductCardProps["image"];
  actions?: ReactNode;
};

const RATING_STARS = [1, 2, 3, 4, 5] as const;

function ProductRating({
  value,
  count,
}: NonNullable<ProductCardProps["rating"]>) {
  let score = Number.isFinite(value) ? Math.min(5, Math.max(0, value)) : 0;

  return (
    <div className="flex items-center gap-2 font-sans text-ui-base leading-tight text-black">
      <span
        role="img"
        aria-label={`${score}/5`}
        className="flex items-center gap-0.5"
      >
        {RATING_STARS.map((star) => {
          let fill = Math.min(1, Math.max(0, score - star + 1));

          return (
            <span key={star} className="relative size-4 shrink-0">
              <Image
                src="/icons/product-rating-star.svg"
                alt=""
                width={16}
                height={16}
                className={cn("block", fill < 1 && "opacity-25")}
              />
              {fill > 0 && fill < 1 && (
                <span
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <Image
                    src="/icons/product-rating-star.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="block max-w-none"
                  />
                </span>
              )}
            </span>
          );
        })}
      </span>
      <span>({count})</span>
    </div>
  );
}

export function ProductCard({
  href,
  title,
  image,
  price,
  brand,
  compareAtPrice,
  badges,
  rating,
  swatches,
  availabilityLabel,
  hoverImage,
  actions,
}: ProductCardProps) {
  return (
    <article className="group/card flex w-full min-w-0 flex-col gap-6 pb-1">
      <div className="group/image relative aspect-square w-full overflow-hidden rounded-md bg-background">
        <Link
          href={href}
          aria-label={title}
          className="absolute inset-0 rounded-md focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-border-primary"
        >
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              sizes={image.sizes}
              fill
              className="object-cover"
            />
          )}

          {image && hoverImage && (
            <Image
              src={hoverImage.src}
              alt=""
              aria-hidden="true"
              sizes={hoverImage.sizes ?? image.sizes}
              fill
              className="pointer-events-none object-cover opacity-0 transition-opacity duration-500 ease-out group-hover/image:opacity-100 group-focus-within/image:opacity-100 motion-reduce:transition-none"
            />
          )}
          {badges && badges.length > 0 && (
            <div className="absolute top-2.5 left-0 flex flex-col items-start gap-1">
              {badges.map(({ label, ...badge }) => (
                <Badge key={label} {...badge}>
                  {label}
                </Badge>
              ))}
            </div>
          )}
        </Link>
        {actions && (
          <div className="absolute right-0 bottom-0 flex translate-x-[49px] flex-col gap-1 opacity-0 transition-[translate,opacity] duration-500 ease-out group-hover/image:translate-x-0 group-hover/image:opacity-100 group-focus-within/image:translate-x-0 group-focus-within/image:opacity-100 motion-reduce:transition-none [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100">
            {actions}
          </div>
        )}
      </div>

      <Link
        href={href}
        className="flex min-w-0 flex-col gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary"
      >
        <div className="flex min-w-0 flex-col gap-1">
          {brand && (
            <p className="font-sans text-ui-sm break-words text-text-subtle">
              {brand}
            </p>
          )}
          <h3 className="font-body text-body-semibold break-words text-primary-background">
            {title}
          </h3>
          {rating && <ProductRating {...rating} />}
        </div>

        <div className="flex min-h-7 flex-wrap items-center gap-x-2 font-sans text-ui-base-medium text-text-main">
          <span>{price}</span>
          {compareAtPrice && (
            <del className="font-normal text-text-subtle">{compareAtPrice}</del>
          )}
        </div>

        {swatches && swatches.length > 0 && (
          <ul className="flex flex-wrap gap-2 px-0.5">
            {swatches.map(({ label, color, selected }) => (
              <li
                key={label}
                className={cn(
                  "flex items-center justify-center rounded-sm px-[3px] py-1",
                  selected && "border border-border-primary",
                )}
              >
                <span className="sr-only">{label}</span>
                <span
                  className="h-2.5 w-7 rounded-sm"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        )}

        {availabilityLabel && (
          <p className="font-sans text-ui-sm text-[#1b73e8]">
            {availabilityLabel}
          </p>
        )}
      </Link>
    </article>
  );
}
