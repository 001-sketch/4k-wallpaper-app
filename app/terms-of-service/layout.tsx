import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review the terms and conditions for using the Wallscape application.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Wallscape Terms of Service",
    description:
      "Review the terms and conditions for using the Wallscape application.",
    type: "article",
    images: [
      {
        url: "https://images.unsplash.com/photo-1579508542697-bb18e7d9aeaa?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Featured sports car wallpaper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wallscape Terms of Service",
    description:
      "Review the terms and conditions for using the Wallscape application.",
    images: ["https://images.unsplash.com/photo-1579508542697-bb18e7d9aeaa?w=1200&q=80"],
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
