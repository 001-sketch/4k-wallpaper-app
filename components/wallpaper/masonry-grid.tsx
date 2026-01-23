"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Heart, Download, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Wallpaper } from "@/lib/db";
import { useFavoritesStore } from "@/lib/favorites-store";

interface MasonryGridProps {
  wallpapers: Wallpaper[];
  onWallpaperClick: (wallpaper: Wallpaper) => void;
  isLoading?: boolean;
}

export function MasonryGrid({ wallpapers, onWallpaperClick, isLoading }: MasonryGridProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleFavoriteClick = (e: React.MouseEvent, wallpaper: Wallpaper) => {
    e.stopPropagation();
    if (isFavorite(wallpaper.id)) {
      removeFavorite(wallpaper.id);
    } else {
      addFavorite(wallpaper.id);
    }
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 px-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "relative mb-3 rounded-2xl overflow-hidden animate-pulse bg-secondary",
              index % 3 === 0 ? "aspect-[9/16]" : "aspect-[16/10]"
            )}
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (wallpapers.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-muted-foreground">No wallpapers found</p>
      </div>
    );
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-3 px-4">
      {wallpapers.map((wallpaper, index) => {
        const isPortrait = wallpaper.height > wallpaper.width;
        const favorite = isFavorite(wallpaper.id);
        const isLoaded = loadedImages.has(wallpaper.id);

        return (
          <div
            key={wallpaper.id}
            className={cn(
              "relative mb-3 rounded-2xl overflow-hidden cursor-pointer group",
              "transform transition-all duration-500 hover:scale-[1.02]",
              "animate-in fade-in slide-in-from-bottom-4",
              !isLoaded && "animate-pulse bg-secondary"
            )}
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: "backwards",
            }}
            onClick={() => onWallpaperClick(wallpaper)}
            role="button"
            tabIndex={0}
            aria-label={`View ${wallpaper.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onWallpaperClick(wallpaper);
              }
            }}
          >
            <div
              className={cn(
                "relative w-full",
                isPortrait ? "aspect-[9/16]" : "aspect-[16/10]"
              )}
            >
              <Image
                src={wallpaper.thumbnail_url || wallpaper.preview_url || "/placeholder.svg"}
                alt={wallpaper.title}
                fill
                className={cn(
                  "object-cover transition-all duration-700",
                  isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                )}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                onLoad={() => handleImageLoad(wallpaper.id)}
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Premium badge */}
            {wallpaper.is_premium && (
              <div className="absolute top-2 left-2 glass rounded-full px-2 py-1 flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-medium text-foreground">PRO</span>
              </div>
            )}

            {/* Quick actions */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <button
                onClick={(e) => handleFavoriteClick(e, wallpaper)}
                className={cn(
                  "p-2 rounded-full glass transition-all duration-300",
                  favorite && "bg-accent/20"
                )}
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition-all duration-300",
                    favorite ? "fill-accent text-accent scale-110" : "text-foreground"
                  )}
                />
              </button>
            </div>

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <h3 className="text-sm font-semibold text-foreground truncate">
                {wallpaper.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-muted-foreground">
                  {wallpaper.width}x{wallpaper.height}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {(wallpaper.downloads / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
