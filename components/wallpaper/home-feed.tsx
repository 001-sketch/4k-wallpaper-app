"use client";

import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { ChevronRight, Sparkles, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Wallpaper, Category } from "@/lib/db";
import { MasonryGrid } from "./masonry-grid";

interface HomeFeedProps {
  onWallpaperClick: (wallpaper: Wallpaper) => void;
  onCategoryClick: (categorySlug: string) => void;
}

type FeedFilter = "trending" | "newest" | "popular";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function HomeFeed({ onWallpaperClick, onCategoryClick }: HomeFeedProps) {
  const [feedFilter, setFeedFilter] = useState<FeedFilter>("trending");

  // Fetch wallpapers based on filter
  const { data: wallpapersData, isLoading: isLoadingWallpapers } = useSWR(
    `/api/wallpapers?sort=${feedFilter}&limit=20`,
    fetcher
  );

  // Fetch featured wallpaper
  const { data: featuredData } = useSWR(
    `/api/wallpapers?featured=true&limit=1`,
    fetcher
  );

  // Fetch categories
  const { data: categoriesData } = useSWR(`/api/categories`, fetcher);

  const wallpapers: Wallpaper[] = wallpapersData?.wallpapers || [];
  const featuredWallpaper: Wallpaper | null = featuredData?.wallpapers?.[0] || null;
  const categories: Category[] = categoriesData?.categories || [];

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="px-4 pt-4 pb-6 safe-top">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Wallscape</h1>
            <p className="text-sm text-muted-foreground">
              Discover stunning wallpapers
            </p>
          </div>
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-foreground" />
          </div>
        </div>
      </header>

      {/* Featured wallpaper */}
      {featuredWallpaper && (
        <section className="px-4 mb-6">
          <button
            className="relative w-full aspect-[2/1] rounded-3xl overflow-hidden group"
            onClick={() => onWallpaperClick(featuredWallpaper)}
            aria-label={`Featured: ${featuredWallpaper.title}`}
          >
            <Image
              src={featuredWallpaper.preview_url || "/placeholder.svg"}
              alt={featuredWallpaper.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-medium">
                  Featured
                </span>
                <span className="px-2 py-0.5 rounded-full bg-foreground/20 text-foreground text-[10px]">
                  {featuredWallpaper.category_name}
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground text-left">
                {featuredWallpaper.title}
              </h2>
            </div>
          </button>
        </section>
      )}

      {/* Quick categories */}
      <section className="mb-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h3 className="text-sm font-semibold text-foreground">Categories</h3>
          <button
            className="flex items-center gap-1 text-xs text-primary"
            onClick={() => onCategoryClick("all")}
            aria-label="View all categories"
          >
            View all
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto hide-scrollbar pb-2">
          {categories.slice(0, 6).map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.slug)}
              className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl bg-secondary hover:bg-secondary/80 transition-all duration-300 min-w-[72px]"
              aria-label={`Browse ${category.name} wallpapers`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: (category.color || "#6366f1") + "20" }}
              >
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: category.color || "#6366f1" }}
                />
              </div>
              <span className="text-[10px] font-medium text-foreground">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Feed filters */}
      <section className="px-4 mb-4">
        <div className="flex items-center gap-2">
          {[
            { id: "trending" as FeedFilter, icon: TrendingUp, label: "Trending" },
            { id: "newest" as FeedFilter, icon: Clock, label: "New" },
            { id: "popular" as FeedFilter, icon: Sparkles, label: "Popular" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFeedFilter(filter.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300",
                feedFilter === filter.id
                  ? "gradient-bg text-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
              aria-pressed={feedFilter === filter.id}
            >
              <filter.icon className="w-3.5 h-3.5" />
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry grid */}
      <MasonryGrid
        wallpapers={wallpapers}
        onWallpaperClick={onWallpaperClick}
        isLoading={isLoadingWallpapers}
      />
    </div>
  );
}
