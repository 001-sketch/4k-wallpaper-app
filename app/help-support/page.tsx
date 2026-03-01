"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HelpSupport() {
  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Help &amp; Support
          </h1>
          <p className="text-muted-foreground">
            Find answers to common questions and learn how to get the most out of Wallscape.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Getting Started</h2>
            <p>Welcome to Wallscape! Here&apos;s how to get started:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Browse wallpapers from the home screen or use the search feature</li>
              <li>Tap any wallpaper to view it in full detail</li>
              <li>Use the download button to save a wallpaper to your device</li>
              <li>Add wallpapers to your favorites by tapping the heart icon</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Downloading Wallpapers</h2>
            <p>To download a wallpaper:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Open the wallpaper detail page</li>
              <li>Tap the download icon to save it to your device</li>
              <li>Choose the resolution that best fits your screen</li>
              <li>Enable &quot;Auto-download on WiFi&quot; in Settings to automatically cache favorites</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Managing Your Favorites</h2>
            <p>Your favorites are stored locally and sync across your sessions:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Tap the heart icon on any wallpaper to add it to favorites</li>
              <li>Access all your favorites from the Favorites tab</li>
              <li>Remove a wallpaper from favorites by tapping the heart icon again</li>
              <li>Favorites are preserved even after clearing the cache</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Storage &amp; Cache</h2>
            <p>Wallscape caches images to improve performance:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Cached images load faster on subsequent visits</li>
              <li>You can view cache usage in Settings &gt; Storage</li>
              <li>Clear the cache at any time to free up space — your favorites will not be affected</li>
              <li>The cache is automatically managed to stay within reasonable limits</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
            <p>
              Still have questions? Reach out to us via{" "}
              <Link href="/contact" className="text-accent hover:underline">
                our contact page
              </Link>
              . We aim to respond within 1–2 business days.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
