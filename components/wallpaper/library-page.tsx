"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { Heart, Download, FolderPlus, Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Wallpaper } from "@/lib/db";
import { useFavoritesStore } from "@/lib/favorites-store";
import { MasonryGrid } from "./masonry-grid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LibraryPageProps {
  onWallpaperClick: (wallpaper: Wallpaper) => void;
}

type LibraryTab = "favorites" | "downloads" | "collections";

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then((r) => r.json());

export function LibraryPage({ onWallpaperClick }: LibraryPageProps) {
  const [activeTab, setActiveTab] = useState<LibraryTab>("favorites");
  const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const {
    favorites,
    downloads,
    collections,
    createCollection,
    deleteCollection,
    fetchUserData,
  } = useFavoritesStore();

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Fetch favorites from API
  const { data: favoritesData, isLoading: isLoadingFavorites } = useSWR(
    activeTab === "favorites" ? `/api/user/favorites` : null,
    fetcher
  );

  // Fetch downloads from API
  const { data: downloadsData, isLoading: isLoadingDownloads } = useSWR(
    activeTab === "downloads" ? `/api/user/downloads` : null,
    fetcher
  );

  // Fetch collections from API
  const { data: collectionsData, isLoading: isLoadingCollections, mutate: mutateCollections } = useSWR(
    activeTab === "collections" ? `/api/user/collections` : null,
    fetcher
  );

  // Fetch collection wallpapers
  const { data: collectionWallpapersData, isLoading: isLoadingCollectionWallpapers } = useSWR(
    selectedCollection ? `/api/user/collections/${selectedCollection}` : null,
    fetcher
  );

  const favoriteWallpapers: Wallpaper[] = favoritesData?.favorites || [];
  const downloadedWallpapers: Wallpaper[] = downloadsData?.downloads || [];
  const apiCollections = collectionsData?.collections || [];
  const collectionWallpapers: Wallpaper[] = collectionWallpapersData?.wallpapers || [];
  const selectedCollectionData = collectionWallpapersData?.collection || null;

  const handleCreateCollection = async () => {
    if (newCollectionName.trim()) {
      try {
        await fetch('/api/user/collections', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ name: newCollectionName.trim() }),
        });
        mutateCollections();
        setNewCollectionName("");
        setIsCreateCollectionOpen(false);
      } catch (error) {
        console.error('Failed to create collection:', error);
      }
    }
  };

  const handleDeleteCollection = async (id: string) => {
    try {
      await fetch('/api/user/collections', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ collectionId: id }),
      });
      mutateCollections();
    } catch (error) {
      console.error('Failed to delete collection:', error);
    }
  };

  const tabs = [
    {
      id: "favorites" as LibraryTab,
      icon: Heart,
      label: "Favorites",
      count: favoriteWallpapers.length || favorites.length,
    },
    {
      id: "downloads" as LibraryTab,
      icon: Download,
      label: "Downloads",
      count: downloadedWallpapers.length || downloads.length,
    },
    {
      id: "collections" as LibraryTab,
      icon: FolderPlus,
      label: "Collections",
      count: apiCollections.length || collections.length,
    },
  ];

  return (
    <div className="pb-24 min-h-screen">
      {/* Header */}
      <header className="px-4 pt-4 pb-4 safe-top">
        <h1 className="text-xl font-bold text-foreground">Library</h1>
        <p className="text-xs text-muted-foreground">Your saved wallpapers</p>
      </header>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 p-1 bg-secondary rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedCollection(null);
              }}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count > 0 && (
                <span className="text-[10px] opacity-70">({tab.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "favorites" && (
        <div>
          {isLoadingFavorites ? (
            <MasonryGrid
              wallpapers={[]}
              onWallpaperClick={onWallpaperClick}
              isLoading={true}
            />
          ) : favoriteWallpapers.length > 0 ? (
            <MasonryGrid
              wallpapers={favoriteWallpapers}
              onWallpaperClick={onWallpaperClick}
            />
          ) : (
            <EmptyState
              icon={Heart}
              title="No favorites yet"
              description="Tap the heart icon on any wallpaper to add it to your favorites"
            />
          )}
        </div>
      )}

      {activeTab === "downloads" && (
        <div>
          {isLoadingDownloads ? (
            <MasonryGrid
              wallpapers={[]}
              onWallpaperClick={onWallpaperClick}
              isLoading={true}
            />
          ) : downloadedWallpapers.length > 0 ? (
            <MasonryGrid
              wallpapers={downloadedWallpapers}
              onWallpaperClick={onWallpaperClick}
            />
          ) : (
            <EmptyState
              icon={Download}
              title="No downloads yet"
              description="Downloaded wallpapers will appear here"
            />
          )}
        </div>
      )}

      {activeTab === "collections" && !selectedCollection && (
        <div className="px-4">
          {/* Create collection button */}
          <Dialog
            open={isCreateCollectionOpen}
            onOpenChange={setIsCreateCollectionOpen}
          >
            <DialogTrigger asChild>
              <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-secondary hover:bg-secondary/80 transition-colors mb-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-foreground">
                    Create Collection
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Organize your wallpapers
                  </p>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[90%] rounded-2xl">
              <DialogHeader>
                <DialogTitle>Create Collection</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Collection name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  autoFocus
                />
                <Button
                  className="w-full gradient-bg rounded-xl h-11"
                  onClick={handleCreateCollection}
                  disabled={!newCollectionName.trim()}
                >
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Collections list */}
          {isLoadingCollections ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-20 rounded-2xl bg-secondary animate-pulse"
                />
              ))}
            </div>
          ) : apiCollections.length > 0 ? (
            <div className="space-y-3">
              {apiCollections.map((collection: { id: string; name: string; wallpaper_count: number; preview_urls?: string[] }) => (
                <button
                  key={collection.id}
                  onClick={() => setSelectedCollection(collection.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-secondary hover:bg-secondary/80 transition-colors text-left"
                >
                  {/* Preview grid */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden grid grid-cols-2 gap-0.5 bg-muted flex-shrink-0">
                    {collection.preview_urls && collection.preview_urls.length > 0 ? (
                      collection.preview_urls.slice(0, 4).map((url: string, i: number) => (
                        <div key={i} className="relative">
                          <Image
                            src={url || "/placeholder.svg"}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 row-span-2 flex items-center justify-center">
                        <FolderPlus className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {collection.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {collection.wallpaper_count || 0} wallpapers
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCollection(collection.id);
                    }}
                    className="p-2 rounded-full hover:bg-destructive/20 transition-colors"
                    aria-label={`Delete ${collection.name}`}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FolderPlus}
              title="No collections yet"
              description="Create collections to organize your wallpapers"
            />
          )}
        </div>
      )}

      {/* Selected collection view */}
      {activeTab === "collections" && selectedCollection && (
        <div>
          <div className="px-4 mb-4 flex items-center gap-2">
            <button
              onClick={() => setSelectedCollection(null)}
              className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Back to collections"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {selectedCollectionData?.name || "Collection"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {collectionWallpapers.length} wallpapers
              </p>
            </div>
          </div>

          {isLoadingCollectionWallpapers ? (
            <MasonryGrid
              wallpapers={[]}
              onWallpaperClick={onWallpaperClick}
              isLoading={true}
            />
          ) : collectionWallpapers.length > 0 ? (
            <MasonryGrid
              wallpapers={collectionWallpapers}
              onWallpaperClick={onWallpaperClick}
            />
          ) : (
            <EmptyState
              icon={FolderPlus}
              title="Collection is empty"
              description="Add wallpapers to this collection from the preview screen"
            />
          )}
        </div>
      )}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-[240px]">
        {description}
      </p>
    </div>
  );
}
