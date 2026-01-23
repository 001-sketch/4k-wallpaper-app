"use client";

import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { ArrowLeft, Grid3X3, Rows3, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Wallpaper, Category } from "@/lib/db";
import { MasonryGrid } from "./masonry-grid";

interface ExplorePageProps {
  initialCategory?: string;
  onWallpaperClick: (wallpaper: Wallpaper) => void;
  onBack?: () => void;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function ExplorePage({
  initialCategory,
  onWallpaperClick,
  onBack,
}: ExplorePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch categories
  const { data: categoriesData, isLoading: isLoadingCategories } = useSWR(
    `/api/categories`,
    fetcher
  );

  // Fetch wallpapers for selected category
  const { data: wallpapersData, isLoading: isLoadingWallpapers } = useSWR(
    selectedCategory ? `/api/wallpapers?category=${selectedCategory}&limit=30` : null,
    fetcher
  );

  const categories: Category[] = categoriesData?.categories || [];
  const displayWallpapers: Wallpaper[] = wallpapersData?.wallpapers || [];

  const selectedCategoryData = selectedCategory
    ? categories.find((c) => c.slug === selectedCategory)
    : null;

  return (
    <div className="pb-24 min-h-screen">
      {/* Header */}
      <header className="px-4 pt-4 pb-4 safe-top sticky top-0 z-40 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Back to categories"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {selectedCategoryData?.name || "Explore"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {selectedCategory
                  ? `${displayWallpapers.length} wallpapers`
                  : `${categories.length} categories`}
              </p>
            </div>
          </div>

          {selectedCategory && (
            <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-full transition-all",
                  viewMode === "grid" ? "bg-background" : "text-muted-foreground"
                )}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded-full transition-all",
                  viewMode === "list" ? "bg-background" : "text-muted-foreground"
                )}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
              >
                <Rows3 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Categories grid */}
      {!selectedCategory && (
        <div className="px-4 grid grid-cols-2 gap-3">
          {isLoadingCategories ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-2xl bg-secondary animate-pulse"
              />
            ))
          ) : (
            categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                onClick={() => setSelectedCategory(category.slug)}
              />
            ))
          )}
        </div>
      )}

      {/* Wallpapers for selected category */}
      {selectedCategory && (
        <div className="mt-2">
          {viewMode === "grid" ? (
            <MasonryGrid
              wallpapers={displayWallpapers}
              onWallpaperClick={onWallpaperClick}
              isLoading={isLoadingWallpapers}
            />
          ) : (
            <div className="px-4 space-y-3">
              {isLoadingWallpapers ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-20 rounded-2xl bg-secondary animate-pulse"
                  />
                ))
              ) : (
                displayWallpapers.map((wallpaper, index) => (
                  <WallpaperListItem
                    key={wallpaper.id}
                    wallpaper={wallpaper}
                    index={index}
                    onClick={() => onWallpaperClick(wallpaper)}
                  />
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CategoryCard({
  category,
  index,
  onClick,
}: {
  category: Category;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative aspect-[4/3] rounded-2xl overflow-hidden group",
        "animate-in fade-in slide-in-from-bottom-4"
      )}
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: "backwards",
      }}
      aria-label={`Browse ${category.name} - ${category.wallpaper_count} wallpapers`}
    >
      {category.preview_url && (
        <Image
          src={category.preview_url || "/placeholder.svg"}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${category.color || "#6366f1"}99 0%, ${category.color || "#6366f1"}33 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-base font-bold text-foreground text-left">
          {category.name}
        </h3>
        <p className="text-xs text-foreground/70 text-left">
          {category.wallpaper_count?.toLocaleString() || 0} wallpapers
        </p>
      </div>
    </button>
  );
}

function WallpaperListItem({
  wallpaper,
  index,
  onClick,
}: {
  wallpaper: Wallpaper;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-2 rounded-2xl bg-secondary hover:bg-secondary/80 transition-all",
        "animate-in fade-in slide-in-from-right-4"
      )}
      style={{
        animationDelay: `${index * 30}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={wallpaper.thumbnail_url || wallpaper.preview_url || "/placeholder.svg"}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <h4 className="text-sm font-semibold text-foreground truncate">
          {wallpaper.title}
        </h4>
        <p className="text-xs text-muted-foreground">
          {wallpaper.width}x{wallpaper.height}
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Download className="w-3 h-3" />
          {(wallpaper.downloads / 1000).toFixed(1)}k downloads
        </p>
      </div>
    </button>
  );
}
