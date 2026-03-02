import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getWallpapersByCategory } from "@/lib/server-data";
import type { Wallpaper } from "@/lib/db";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  const description =
    category.description ||
    `Browse our collection of stunning ${category.name} wallpapers in 4K, 5K, and 8K resolution. Free to download for desktop and mobile.`;

  return {
    title: `${category.name} Wallpapers – 4K & HD`,
    description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      title: `${category.name} Wallpapers – 4K & HD`,
      description,
      ...(category.preview_url && {
        images: [
          {
            url: category.preview_url,
            alt: `${category.name} wallpaper preview`,
          },
        ],
      }),
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, wallpapers] = await Promise.all([
    getCategoryBySlug(slug),
    getWallpapersByCategory(slug, 48),
  ]);

  if (!category) notFound();

  const description =
    category.description ||
    `Browse our collection of stunning ${category.name} wallpapers in 4K, 5K, and 8K resolution. Free to download for desktop and mobile.`;

  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/wallpapers"
                className="hover:text-foreground transition-colors"
              >
                Wallpapers
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {category.name}
            </li>
          </ol>
        </nav>

        {/* Category hero */}
        <div className="relative mb-10 rounded-3xl overflow-hidden">
          {category.preview_url ? (
            <div className="relative w-full aspect-[3/1]">
              <Image
                src={category.preview_url}
                alt={`${category.name} wallpaper category`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
          ) : (
            <div
              className="w-full aspect-[3/1]"
              style={{
                background: category.color
                  ? `linear-gradient(135deg, ${category.color}66, ${category.color}22)`
                  : "linear-gradient(135deg, #6366f166, #6366f122)",
              }}
            />
          )}

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {category.name} Wallpapers
            </h1>
            <p className="text-white/80 text-base max-w-xl">{description}</p>
            {category.wallpaper_count > 0 && (
              <p className="text-white/60 text-sm mt-2">
                {category.wallpaper_count.toLocaleString()} wallpapers available
              </p>
            )}
          </div>
        </div>

        {/* Wallpaper grid */}
        {wallpapers.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">
            No wallpapers in this category yet. Check back soon!
          </p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
            {wallpapers.map((wallpaper) => (
              <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
            ))}
          </div>
        )}

        {/* Browse more link */}
        <div className="mt-12 text-center">
          <Link
            href="/wallpapers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          >
            Browse all wallpapers →
          </Link>
        </div>
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <p className="text-sm font-semibold text-white truncate">
            {wallpaper.title}
          </p>
        </div>
      </Link>
    </div>
  );
}
