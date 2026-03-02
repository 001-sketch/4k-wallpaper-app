import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWallpaperBySlug, getRelatedWallpapers } from "@/lib/server-data";
import type { Wallpaper } from "@/lib/db";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wallpaper = await getWallpaperBySlug(slug);
  if (!wallpaper) return { title: "Wallpaper Not Found" };

  const description = buildDescription(wallpaper);
  const altText = buildAltText(wallpaper);

  return {
    title: `${wallpaper.title} – 4K Wallpaper`,
    description,
    alternates: { canonical: `/wallpapers/${wallpaper.slug}` },
    openGraph: {
      title: `${wallpaper.title} – 4K Wallpaper`,
      description,
      images: [
        {
          url: wallpaper.preview_url || wallpaper.full_url,
          width: wallpaper.width,
          height: wallpaper.height,
          alt: altText,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${wallpaper.title} – 4K Wallpaper`,
      description,
      images: [wallpaper.preview_url || wallpaper.full_url],
    },
  };
}

export default async function WallpaperDetailPage({ params }: Props) {
  const { slug } = await params;
  const wallpaper = await getWallpaperBySlug(slug);
  if (!wallpaper) notFound();

  const related = await getRelatedWallpapers(wallpaper, 6);
  const description = buildDescription(wallpaper);
  const altText = buildAltText(wallpaper);
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const imageObjectJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: wallpaper.title,
    description,
    contentUrl: wallpaper.full_url,
    thumbnailUrl: wallpaper.thumbnail_url || wallpaper.preview_url,
    url: `${appUrl}/wallpapers/${wallpaper.slug}`,
    ...(wallpaper.width && { width: String(wallpaper.width) }),
    ...(wallpaper.height && { height: String(wallpaper.height) }),
    ...(wallpaper.tags?.length && { keywords: wallpaper.tags.join(", ") }),
    encodingFormat: wallpaper.format ? `image/${wallpaper.format}` : "image/jpeg",
  };

  return (
    <main className="min-h-screen pt-20 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectJsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-5xl">
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
            <li aria-current="page" className="text-foreground truncate max-w-[200px]">
              {wallpaper.title}
            </li>
          </ol>
        </nav>

        {/* Main wallpaper image */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-8">
          <Image
            src={wallpaper.preview_url || wallpaper.full_url || "/placeholder.svg"}
            alt={altText}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        {/* Title and meta */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Link
              href={`/categories/${wallpaper.category_slug}`}
              className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {wallpaper.category_name}
            </Link>
            {wallpaper.is_premium && (
              <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-medium">
                Premium
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            {wallpaper.title}
          </h1>

          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {/* Metadata details */}
        <div className="glass p-6 rounded-2xl border border-glass-border mb-8">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Image Details
          </h2>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {wallpaper.width && wallpaper.height && (
              <div>
                <dt className="text-muted-foreground mb-1">Resolution</dt>
                <dd className="font-medium text-foreground">
                  {wallpaper.width}×{wallpaper.height}
                </dd>
              </div>
            )}
            {wallpaper.aspect_ratio && (
              <div>
                <dt className="text-muted-foreground mb-1">Aspect Ratio</dt>
                <dd className="font-medium text-foreground">
                  {wallpaper.aspect_ratio}
                </dd>
              </div>
            )}
            {wallpaper.format && (
              <div>
                <dt className="text-muted-foreground mb-1">Format</dt>
                <dd className="font-medium text-foreground uppercase">
                  {wallpaper.format}
                </dd>
              </div>
            )}
            {wallpaper.file_size != null && wallpaper.file_size > 0 && (
              <div>
                <dt className="text-muted-foreground mb-1">File Size</dt>
                <dd className="font-medium text-foreground">
                  {(wallpaper.file_size / 1024 / 1024).toFixed(1)} MB
                </dd>
              </div>
            )}
          </dl>

          {/* Tags */}
          {wallpaper.tags?.length > 0 && (
            <div className="mt-4 pt-4 border-t border-glass-border">
              <dt className="text-muted-foreground text-sm mb-2">Tags</dt>
              <dd className="flex flex-wrap gap-2">
                {wallpaper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground capitalize"
                  >
                    #{tag}
                  </span>
                ))}
              </dd>
            </div>
          )}

          {/* Color palette */}
          {wallpaper.color_palette?.length > 0 && (
            <div className="mt-4 pt-4 border-t border-glass-border">
              <p className="text-muted-foreground text-sm mb-2">Color Palette</p>
              <div className="flex gap-2">
                {wallpaper.color_palette.map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                    title={color}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Download CTA */}
        <div className="mb-12">
          <a
            href={wallpaper.full_url}
            target="_blank"
            rel="noreferrer"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg font-semibold text-sm text-white hover:opacity-90 transition-opacity"
          >
            Download Full Resolution
          </a>
        </div>

        {/* Related wallpapers */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="text-xl font-bold text-foreground mb-4"
            >
              Related {wallpaper.category_name} Wallpapers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {related.map((rel) => (
                <RelatedCard key={rel.id} wallpaper={rel} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href={`/categories/${wallpaper.category_slug}`}
                className="text-sm text-primary hover:underline"
              >
                View all {wallpaper.category_name} wallpapers →
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function RelatedCard({ wallpaper }: { wallpaper: Wallpaper }) {
  const alt = buildAltText(wallpaper);
  return (
    <Link
      href={`/wallpapers/${wallpaper.slug}`}
      className="relative aspect-video rounded-2xl overflow-hidden group block"
      aria-label={`View ${wallpaper.title}`}
    >
      <Image
        src={
          wallpaper.thumbnail_url ||
          wallpaper.preview_url ||
          "/placeholder.svg"
        }
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <p className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {wallpaper.title}
      </p>
    </Link>
  );
}

function buildAltText(wallpaper: Wallpaper): string {
  const parts: string[] = [wallpaper.title];
  if (wallpaper.category_name) parts.push(wallpaper.category_name);
  if (wallpaper.tags?.length) parts.push(...wallpaper.tags.slice(0, 3));
  parts.push("4K wallpaper");
  return parts.filter(Boolean).join(", ");
}

function buildDescription(wallpaper: Wallpaper): string {
  if (wallpaper.description) return wallpaper.description;

  const PIXELS_PER_MEGAPIXEL = 1_000_000;
  const parts: string[] = [];
  parts.push(`${wallpaper.title} is a`);

  if (wallpaper.width && wallpaper.height) {
    const megapixels = Math.round(
      (wallpaper.width * wallpaper.height) / PIXELS_PER_MEGAPIXEL
    );
    if (megapixels >= 8) parts.push("stunning 8K");
    else if (megapixels >= 5) parts.push("crisp 5K");
    else parts.push("vibrant 4K");
  } else {
    parts.push("high-resolution");
  }

  if (wallpaper.category_name) {
    parts.push(`${wallpaper.category_name.toLowerCase()} wallpaper`);
  } else {
    parts.push("wallpaper");
  }

  if (wallpaper.tags?.length) {
    const displayTags = wallpaper.tags
      .filter((t) => t !== "4k" && t !== "hd")
      .slice(0, 3);
    if (displayTags.length) {
      parts.push(`featuring ${displayTags.join(", ")}`);
    }
  }

  parts.push("— perfect for desktop and mobile screens.");
  return parts.join(" ");
}
