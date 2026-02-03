"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Heart,
  Download,
  Share2,
  Bookmark,
  ChevronDown,
  Crown,
  Eye,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Wallpaper } from "@/lib/db";
import { useFavoritesStore } from "@/lib/favorites-store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface WallpaperPreviewProps {
  wallpaper: Wallpaper | null;
  isOpen: boolean;
  onClose: () => void;
}

export function WallpaperPreview({
  wallpaper,
  isOpen,
  onClose,
}: WallpaperPreviewProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const { isFavorite, addFavorite, removeFavorite, addDownload } =
    useFavoritesStore();

  useEffect(() => {
    if (!isOpen) {
      setShowInfo(false);
      setDownloadComplete(false);
    }
  }, [isOpen]);

  if (!wallpaper) return null;

  const favorite = isFavorite(wallpaper.id);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavorite(wallpaper.id);
    } else {
      addFavorite(wallpaper.id);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // Fetch the image
      const response = await fetch(wallpaper.full_url);
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${wallpaper.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      addDownload(wallpaper.id);
      setIsDownloading(false);
      setDownloadComplete(true);

      setTimeout(() => setDownloadComplete(false), 2000);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: wallpaper.title,
          text: `Check out this amazing wallpaper: ${wallpaper.title}`,
          url: wallpaper.full_url,
        });
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(wallpaper.full_url);
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(1) + " MB";
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        className="h-[100dvh] p-0 border-0 bg-background rounded-t-3xl"
      >
        <div className="relative h-full flex flex-col">
          {/* Full screen image */}
          <div className="relative flex-1 min-h-0">
            <Image
              src={wallpaper.preview_url || wallpaper.full_url || "/placeholder.svg"}
              alt={wallpaper.title}
              fill
              className="object-cover"
              priority
            />

            {/* Top controls */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between safe-top">
              <button
                onClick={onClose}
                className="p-2 rounded-full glass"
                aria-label="Close preview"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              <div className="flex items-center gap-2">
                {wallpaper.is_premium && (
                  <div className="glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-medium text-foreground">
                      Premium
                    </span>
                  </div>
                )}
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full glass"
                  aria-label="Share wallpaper"
                >
                  <Share2 className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>

            {/* Info toggle button */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={cn(
                "absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass flex items-center gap-2 transition-all duration-300",
                showInfo && "rotate-180"
              )}
              aria-expanded={showInfo}
              aria-label={showInfo ? "Hide details" : "Show details"}
            >
              <ChevronDown className="w-4 h-4 text-foreground" />
            </button>

            {/* Stats overlay */}
            <div className="absolute bottom-16 left-4 right-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 text-foreground/80">
                <Eye className="w-4 h-4" />
                <span className="text-xs">
                  {((wallpaper.views || 0) / 1000).toFixed(1)}k
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-foreground/80">
                <Heart className="w-4 h-4" />
                <span className="text-xs">
                  {((wallpaper.favorites || 0) / 1000).toFixed(1)}k
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-foreground/80">
                <Download className="w-4 h-4" />
                <span className="text-xs">
                  {((wallpaper.downloads || 0) / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 glass rounded-t-3xl transition-all duration-500 ease-out",
              showInfo
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            )}
          >
            <SheetHeader className="px-6 pt-6 pb-2">
              <SheetTitle className="text-left text-xl font-bold text-foreground">
                {wallpaper.title}
              </SheetTitle>
            </SheetHeader>

            <div className="px-6 pb-6 space-y-4">
              {/* Category info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                  <span className="text-sm font-semibold text-foreground">
                    {wallpaper.category_name?.charAt(0) || "W"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {wallpaper.category_name || "Wallpaper"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {wallpaper.description || "Beautiful wallpaper"}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground">
                  {wallpaper.width}x{wallpaper.height}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground">
                  {wallpaper.aspect_ratio}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground">
                  {formatFileSize(wallpaper.file_size)}
                </span>
              </div>

              {/* Color palette */}
              {wallpaper.color_palette && wallpaper.color_palette.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Colors:</span>
                  <div className="flex gap-1">
                    {wallpaper.color_palette.map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                        aria-label={`Color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {wallpaper.tags && wallpaper.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {wallpaper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-muted-foreground capitalize"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action bar */}
          <div className="glass px-6 py-4 flex items-center gap-3 safe-bottom">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full h-12 w-12 border-border bg-secondary",
                favorite && "bg-accent/20 border-accent"
              )}
              onClick={handleFavoriteToggle}
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-all duration-300",
                  favorite ? "fill-accent text-accent" : "text-foreground"
                )}
              />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-border bg-secondary"
              aria-label="Add to collection"
            >
              <Bookmark className="w-5 h-5 text-foreground" />
            </Button>

            <Button
              className={cn(
                "flex-1 h-12 rounded-full font-semibold text-sm transition-all duration-300",
                downloadComplete
                  ? "bg-green-500 hover:bg-green-600"
                  : "gradient-bg hover:opacity-90"
              )}
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                  <span>Downloading...</span>
                </div>
              ) : downloadComplete ? (
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>Downloaded!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  <span>Download {wallpaper.is_premium ? "4K" : "HD"}</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
