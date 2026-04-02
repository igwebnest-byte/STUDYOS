import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { AppProviders } from "@/providers/app-providers";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: "StudyOS",
    template: "%s | StudyOS",
  },
  description:
    "StudyOS helps students manage attendance, schedule, notes, PYQs, and college-specific workflows in one modern workspace.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
