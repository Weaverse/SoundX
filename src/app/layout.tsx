import { WeaverseNextStudioConnect } from "@weaverse/next";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";

import { cn } from "@/lib/cn";

import "./globals.css";

const INTER_FONT = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const OPEN_SANS_FONT = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoundX",
  description: "SoundX is an electronics and tech storefront.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        INTER_FONT.variable,
        OPEN_SANS_FONT.variable,
        "h-full antialiased",
      )}
    >
      <body className="min-h-full flex flex-col">
        <WeaverseNextStudioConnect />
        {children}
      </body>
    </html>
  );
}
