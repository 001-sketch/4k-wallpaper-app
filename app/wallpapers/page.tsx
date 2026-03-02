import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getWallpapers } from "@/lib/server-data";
import type { Wallpaper } from "@/lib/db";

export const metadata: Metadata = {
  title: "Browse 4K Wallpapers",
  description:
    "Explore our full collection of stunning 4K, 5K, and 8K wallpapers. Nature, space, abstract, anime, architecture and more — free to download.",
  alternates: { canonical: "/wallpapers" },
};

export default async function WallpapersPage() {
  const wallpapers = await getWallpapers(60, "trending");

  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Browse 4K Wallpapers
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover our curated collection of ultra-high-resolution wallpapers.
            Free to download in 4K, 5K, and 8K for desktop and mobile.
          </p>
          <nav className="mt-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                Wallpapers
              </li>
            </ol>
          </nav>
        </div>

        {wallpapers.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">
            No wallpapers found. Check back soon!
          </p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
            {wallpapers.map((wallpaper) => (
              <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function WallpaperCard({ wallpaper }: { wallpaper: Wallpaper }) {
  const isPortrait = wallpaper.height > wallpaper.width;
  const altText = [
    wallpaper.title,
    wallpaper.category_name,
    ...(wallpaper.tags ?? []).slice(0, 3),
    "4K wallpaper",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="relative mb-3 rounded-2xl overflow-hidden group">
      <Link
        href={`/wallpapers/${wallpaper.slug}`}
        aria-label={`View ${wallpaper.title} wallpaper`}
      >
        <div
          className={`relative w-full ${isPortrait ? "aspect-[9/16]" : "aspect-[16/10]"}`}
        >
          <Image
            src={
              wallpaper.thumbnail_url ||
              wallpaper.preview_url ||
              "/placeholder.svg"
            }
            alt={altText}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        {/* Gradient + title overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <p className="text-sm font-semibold text-white truncate">
            {wallpaper.title}
          </p>
          <p className="text-xs text-white/70">{wallpaper.category_name}</p>
        </div>
      </Link>
    </div>
  );
}
