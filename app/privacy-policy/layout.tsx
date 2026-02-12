import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Wallscape collects, uses, and protects your personal information.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Wallscape Privacy Policy",
    description:
      "Read how Wallscape collects, uses, and protects your personal information.",
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
    title: "Wallscape Privacy Policy",
    description:
      "Read how Wallscape collects, uses, and protects your personal information.",
    images: ["https://images.unsplash.com/photo-1579508542697-bb18e7d9aeaa?w=1200&q=80"],
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
