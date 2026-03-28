import { DM_Sans, DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Code Reviewer",
    template: "%s · Code Reviewer",
  },
  description: "AI-powered code review — catch issues, improve quality, ship with confidence.",
  keywords: ["code review", "AI", "static analysis", "developer tools"],
  authors: [{ name: "Code Reviewer" }],
  themeColor: "#0d0f14",
  colorScheme: "dark",
  openGraph: {
    title: "Code Reviewer",
    description: "AI-powered code review — catch issues, improve quality, ship with confidence.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0f14",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}