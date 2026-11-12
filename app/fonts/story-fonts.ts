import localFont from "next/font/local";

export const storyBody = localFont({
  src: "./Geist-Variable.woff2",
  weight: "100 900",
  variable: "--font-story-body-local",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

export const storyDisplay = localFont({
  src: "./EBGaramond-Regular.woff2",
  weight: "400",
  variable: "--font-story-display-local",
  display: "swap",
  preload: true,
  adjustFontFallback: "Times New Roman",
});
