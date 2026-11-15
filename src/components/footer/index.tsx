import { cn } from "@/lib/cn";

import FooterBottomBar from "./bottom-bar";
import FooterLogo from "./logo";
import FooterNavigation from "./navigation";
import FooterNewsletter from "./newsletter";
import type { FooterProps } from "./types";

export default function Footer({
  menu,
  legalMenu,
  homeHref,
  logo,
  brandName,
  copyrightName,
  copyrightYear,
  newsletter,
  localeControl,
  paymentMethods,
  labels,
  className,
}: FooterProps) {
  return (
    <footer className={cn("w-full min-w-0", className)}>
      <div className="bg-footer-background">
        <div
          className={cn(
            "mx-auto grid w-full min-w-0 grid-cols-1",
            "lg:w-[90%] lg:max-w-[2000px] lg:gap-16 lg:px-8",
            newsletter && "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]",
          )}
        >
          {newsletter ? (
            <FooterNewsletter
              newsletter={newsletter}
              className="min-w-0 lg:col-start-2 lg:row-start-1"
            />
          ) : null}

          <div
            className={cn(
              "min-w-0",
              newsletter && "lg:col-start-1 lg:row-start-1",
            )}
          >
            <div className="px-10 pt-10 pb-14 md:pt-20 lg:px-4">
              <FooterLogo
                logo={logo}
                brandName={brandName}
                homeHref={homeHref}
              />
            </div>

            <FooterNavigation menu={menu} labels={labels} />
          </div>
        </div>
      </div>

      <FooterBottomBar
        legalMenu={legalMenu}
        copyrightName={copyrightName}
        copyrightYear={copyrightYear}
        localeControl={localeControl}
        paymentMethods={paymentMethods}
        labels={labels}
      />
    </footer>
  );
}
