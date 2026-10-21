import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Serif, Inter_Tight, Unbounded } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "DAILY AI — Tell us what you need.",
    template: "%s · DAILY AI",
  },
  description:
    "DAILY AI turns a plain-language request into a structured plan: what you need, what's missing, what it costs, how long it takes, and who does it.",
  applicationName: "DAILY AI",
  keywords: [
    "DAILY AI",
    "AI request fulfillment",
    "AI assistant",
    "service marketplace",
    "request automation",
  ],
  openGraph: {
    title: "DAILY AI — Tell us what you need.",
    description:
      "One place to ask for almost anything you need. We figure out the best way forward through AI, tools, and trusted providers.",
    siteName: "DAILY AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DAILY AI — Tell us what you need.",
    description:
      "One place to ask for almost anything you need. We figure out the best way forward.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      // The inline script below adds the `js` class before hydration.
      suppressHydrationWarning
      className={`${interTight.variable} ${instrumentSerif.variable} ${unbounded.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          // Marks the document as script-capable so reveal animations only
          // hide content when JavaScript is able to reveal it again.
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;clip-path:none !important}`}</style>
        </noscript>
      </head>
      <body className="grain min-h-screen bg-ink text-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-signal focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
