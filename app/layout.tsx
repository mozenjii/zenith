import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

/**
 * The three faces are taken from the target list in the `minimalist-ui` skill,
 * not chosen freehand. That skill names its sans targets as SF Pro Display /
 * Geist Sans / Helvetica Neue / Switzer, its editorial serifs as Lyon Text /
 * Newsreader / Playfair Display / Instrument Serif, and its monospace as Geist
 * Mono / SF Mono / JetBrains Mono. It also rules out Inter, Roboto and Open
 * Sans outright.
 *
 * Geist and Geist Mono are the two from those lists that are properly
 * available as web fonts, and they are drawn as a family, so the sans and the
 * mono share their skeleton — numerals line up between a label and the metric
 * beneath it. Instrument Serif carries the editorial register and gives the
 * mathematics somewhere to sit.
 *
 * Hanken Grotesk, which this replaced, was the weak link: a competent grotesk
 * with no particular character, doing the most visible job on the page.
 */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap"
});

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const description =
  "Mohib Ahmad — computer science undergraduate, founder, and independent researcher. A rules-as-code compiler, a prior-authorization control plane, a shipped AI services company, and a preprint on maximum nullity in generalized Petersen graphs.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${profile.name} — Engineering and research`,
    template: `%s — ${profile.name}`
  },
  description,
  authors: [{ name: profile.name, url: profile.orcidUrl }],
  openGraph: {
    title: `${profile.name} — Engineering and research`,
    description,
    type: "profile",
    images: ["/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Engineering and research`,
    description
  },
  icons: { icon: "/icon.svg" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {/*
          Skip link. Visually hidden until focused, then it becomes the first
          thing a keyboard user lands on — "location is always answerable" in
          DESIGN.md starts here.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-[#06231f]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
