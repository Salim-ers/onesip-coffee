import localFont from "next/font/local";

export const instrument = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
  preload: true,
});

export const figtree = localFont({
  src: [{ path: "../fonts/figtree-latin-wght-normal.woff2", weight: "300 900", style: "normal" }],
  variable: "--font-figtree",
  display: "swap",
  preload: true,
});
