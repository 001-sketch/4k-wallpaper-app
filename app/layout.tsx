import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Wallscape - Premium 4K Wallpapers",
    template: "%s | Wallscape"
  },
  description:
    "Discover stunning 4K, 5K, and 8K wallpapers. Curated collections for every screen.",
  keywords: ["wallpapers", "4K", "5K", "8K", "HD", "backgrounds", "desktop", "mobile"],
  authors: [{ name: "Wallscape" }],
  creator: "Wallscape",
  publisher: "Wallscape",
  generator: "Next.js",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Wallscape - Premium 4K Wallpapers",
    description: "Discover stunning 4K, 5K, and 8K wallpapers. Curated collections for every screen.",
    type: "website",
    locale: "en_US",
    siteName: "Wallscape",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wallscape - Premium 4K Wallpapers",
    description: "Discover stunning 4K, 5K, and 8K wallpapers. Curated collections for every screen.",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "photography",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d0d14" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d14" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased overflow-x-hidden bg-background text-foreground min-h-screen`}
      >
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
