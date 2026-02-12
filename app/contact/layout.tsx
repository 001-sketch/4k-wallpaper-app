import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Wallscape team for support, feedback, or partnership inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Wallscape",
    description:
      "Contact the Wallscape team for support, feedback, or partnership inquiries.",
    type: "website",
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
    title: "Contact Wallscape",
    description:
      "Contact the Wallscape team for support, feedback, or partnership inquiries.",
    images: ["https://images.unsplash.com/photo-1579508542697-bb18e7d9aeaa?w=1200&q=80"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
