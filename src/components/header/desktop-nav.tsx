import Link from "next/link";

import { cn } from "@/lib/cn";

import type { HeaderMenuItem } from "./types";

type DesktopNavProps = {
  menu: HeaderMenuItem[];
  label: string;
  className?: string;
};

export default function DesktopNav({
  menu,
  label,
  className,
}: DesktopNavProps) {
  if (menu.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label={label}
      className={cn(
        "hidden min-w-0 flex-1 self-stretch lg:flex",
        "items-center justify-center",
        className,
      )}
    >
      <ul className="m-0 flex list-none items-center justify-center gap-6 p-0">
        {menu.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={cn(
                "inline-flex items-center whitespace-nowrap",
                "font-sans text-ui-base-medium text-header-text",
                "transition-colors duration-200 ease-out hover:text-text-subtle",
                "motion-reduce:transition-none",
                "focus-visible:outline-2",
                "focus-visible:outline-offset-4",
                "focus-visible:outline-current",
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
