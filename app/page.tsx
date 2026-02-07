"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";
import type { Wallpaper } from "@/lib/db";
import { HeaderNav } from "@/components/wallpaper/header-nav";
import { Footer } from "@/components/wallpaper/footer";
import { HomeFeed } from "@/components/wallpaper/home-feed";
import { ExplorePage } from "@/components/wallpaper/explore-page";
import { SearchPage } from "@/components/wallpaper/search-page";
import { LibraryPage } from "@/components/wallpaper/library-page";
import { SettingsPage } from "@/components/wallpaper/settings-page";
import { WallpaperPreview } from "@/components/wallpaper/wallpaper-preview";
import Loading from "./loading";

export default function WallpaperApp() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(
    null
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [exploreCategory, setExploreCategory] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (searchParams.get("auth") === "signup") {
      toast.success("Account created successfully. You're now signed in.");

      const params = new URLSearchParams(searchParams.toString());
      params.delete("auth");
      const next = params.toString();
      router.replace(next ? `/?${next}` : "/");
    }
  }, [searchParams, router]);

  const handleWallpaperClick = useCallback((wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setIsPreviewOpen(true);
  }, []);

  const handleClosePreview = useCallback(() => {
    setIsPreviewOpen(false);
    // Keep the wallpaper selected briefly for animation
    setTimeout(() => setSelectedWallpaper(null), 300);
  }, []);

  const handleCategoryClick = useCallback((categorySlug: string) => {
    if (categorySlug === "all") {
      setExploreCategory(undefined);
    } else {
      setExploreCategory(categorySlug);
    }
    setActiveTab("explore");
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    if (tab !== "explore") {
      setExploreCategory(undefined);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Toaster position="top-right" />
      {/* Header navigation */}
      <HeaderNav activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Page content */}
      <div className="relative pt-16">
        {activeTab === "home" && (
          <HomeFeed
            onWallpaperClick={handleWallpaperClick}
            onCategoryClick={handleCategoryClick}
          />
        )}

        {activeTab === "explore" && (
          <ExplorePage
            initialCategory={exploreCategory}
            onWallpaperClick={handleWallpaperClick}
          />
        )}

        {activeTab === "search" && (
          <SearchPage onWallpaperClick={handleWallpaperClick} />
        )}

        {activeTab === "library" && (
          <LibraryPage onWallpaperClick={handleWallpaperClick} />
        )}

        {activeTab === "settings" && <SettingsPage />}
      </div>

      {/* Wallpaper preview modal */}
      <WallpaperPreview
        wallpaper={selectedWallpaper}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
