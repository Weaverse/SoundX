import Link from "next/link";

import { cn } from "@/lib/cn";

import type { FooterLabels, FooterProps } from "./types";

type FooterBottomBarProps = Pick<
  FooterProps,
  | "legalMenu"
  | "copyrightName"
  | "copyrightYear"
  | "localeControl"
  | "paymentMethods"
  | "className"
> & {
  labels: Pick<FooterLabels, "legalNavigation" | "paymentMethods">;
};

export default function FooterBottomBar({
  legalMenu,
  copyrightName,
  copyrightYear,
  localeControl,
  paymentMethods,
  labels,
  className,
}: FooterBottomBarProps) {
  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-1 items-center gap-5",
        "bg-white px-6 py-8 min-[430px]:px-10",
        "font-sans text-[12px] leading-normal font-normal text-text-subtle",
        "md:grid-cols-[minmax(0,1fr)_auto]",
        "lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-2 lg:contents">
        {legalMenu.length > 0 || localeControl ? (
          <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-3 lg:order-2 lg:justify-center">
            {legalMenu.length > 0 ? (
              <nav aria-label={labels.legalNavigation}>
                <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 gap-y-3 p-0">
                  {legalMenu.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={cn(
                          "underline decoration-transparent underline-offset-4",
                          "transition-colors duration-200 ease-out",
                          "hover:text-[#262627] hover:decoration-current",
                          "focus-visible:outline-2",
                          "focus-visible:outline-offset-4",
                          "focus-visible:outline-[#262627]",
                          "motion-reduce:transition-none",
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            {localeControl}
          </div>
        ) : null}

        <p className="m-0 break-words lg:order-1">
          © {copyrightYear} {copyrightName}
        </p>
      </div>

      {paymentMethods ? (
        <section
          aria-label={labels.paymentMethods}
          className={cn(
            "flex min-w-0 flex-wrap items-center gap-3",
            "md:justify-end lg:order-3",
          )}
        >
          {paymentMethods}
        </section>
      ) : null}
    </div>
  );
}
