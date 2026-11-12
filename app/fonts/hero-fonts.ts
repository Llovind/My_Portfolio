import localFont from "next/font/local";

export const heroMono = localFont({
  src: "./JetBrainsMono-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-hero-mono",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

