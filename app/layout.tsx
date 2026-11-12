import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { FilmRuntime } from "@/components/film/runtime";
import { profile, film } from "@/content/profile";
import { storyBody, storyDisplay } from "./fonts/story-fonts";
import "./globals.css";

export const metadata: Metadata = { title: `Lovind | ${film.title}`, description: profile.metadata.description };
export const viewport: Viewport = { themeColor: "#0B0D12" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className={`${storyBody.variable} ${storyDisplay.variable}`} data-font-mode="local-geist-garamond"><head>
    <noscript><style>{'.story-window{min-height:0!important}.story-window-stage{position:static!important;min-height:0!important}'}</style></noscript>
  </head><body><FilmRuntime>{children}</FilmRuntime></body></html>;
}
