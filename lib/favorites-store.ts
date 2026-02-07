"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Wallpaper } from "./db";

export interface Collection {
  id: string;
  name: string;
  description?: string;
  wallpaperIds: string[];
  previewUrls?: string[];
  createdAt: string;
}

interface FavoritesState {
  favorites: string[];
  downloads: string[];
  collections: Collection[];
  isLoading: boolean;
  
  // Local actions (optimistic)
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addDownload: (id: string) => void;
  isDownloaded: (id: string) => boolean;
  createCollection: (name: string) => void;
  deleteCollection: (id: string) => void;
  addToCollection: (collectionId: string, wallpaperId: string) => void;
  removeFromCollection: (collectionId: string, wallpaperId: string) => void;
  
  // API sync actions
  syncFavorite: (id: string, action: 'add' | 'remove') => Promise<void>;
  syncDownload: (id: string, resolution?: string) => Promise<void>;
  syncCollection: (action: 'create' | 'delete', data: { id?: string; name?: string }) => Promise<void>;
  fetchUserData: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      downloads: [],
      collections: [],
      isLoading: false,

      addFavorite: (id: string) => {
        set((state) => ({
          favorites: [...state.favorites, id],
        }));
        // Sync with API
        get().syncFavorite(id, 'add');
      },

      removeFavorite: (id: string) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== id),
        }));
        // Sync with API
        get().syncFavorite(id, 'remove');
      },

      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },

      addDownload: (id: string) => {
        set((state) => ({
          downloads: state.downloads.includes(id)
            ? state.downloads
            : [...state.downloads, id],
        }));
        // Sync with API
        get().syncDownload(id);
      },

      isDownloaded: (id: string) => {
        return get().downloads.includes(id);
      },

      createCollection: (name: string) => {
        const newCollection: Collection = {
          id: `col-${Date.now()}`,
          name,
          wallpaperIds: [],
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          collections: [...state.collections, newCollection],
        }));
        // Sync with API
        get().syncCollection('create', { name });
      },

      deleteCollection: (id: string) => {
        set((state) => ({
          collections: state.collections.filter((c) => c.id !== id),
        }));
        // Sync with API
        get().syncCollection('delete', { id });
      },

      addToCollection: (collectionId: string, wallpaperId: string) => {
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === collectionId
              ? { ...c, wallpaperIds: [...c.wallpaperIds, wallpaperId] }
              : c
          ),
        }));
        // API sync would go here for collection items
      },

      removeFromCollection: (collectionId: string, wallpaperId: string) => {
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === collectionId
              ? {
                  ...c,
                  wallpaperIds: c.wallpaperIds.filter((w) => w !== wallpaperId),
                }
              : c
          ),
        }));
      },

      // API sync methods
      syncFavorite: async (id: string, action: 'add' | 'remove') => {
        try {
          if (action === 'add') {
              await fetch('/api/user/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ wallpaperId: id }),
              });
          } else {
            await fetch('/api/user/favorites', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ wallpaperId: id }),
            });
          }
        } catch (error) {
          console.error('Failed to sync favorite:', error);
        }
      },

      syncDownload: async (id: string, resolution?: string) => {
        try {
          await fetch('/api/user/downloads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ wallpaperId: id, resolution: resolution || '4k' }),
          });
        } catch (error) {
          console.error('Failed to sync download:', error);
        }
      },

      syncCollection: async (action: 'create' | 'delete', data: { id?: string; name?: string }) => {
        try {
          if (action === 'create') {
            await fetch('/api/user/collections', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ name: data.name }),
            });
          } else if (data.id) {
            await fetch('/api/user/collections', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ collectionId: data.id }),
            });
          }
        } catch (error) {
          console.error('Failed to sync collection:', error);
        }
      },

      fetchUserData: async () => {
        set({ isLoading: true });
        try {
          const [favRes, dlRes, colRes] = await Promise.all([
            fetch('/api/user/favorites', { credentials: 'include' }),
            fetch('/api/user/downloads', { credentials: 'include' }),
            fetch('/api/user/collections', { credentials: 'include' }),
          ]);

          if (favRes.ok) {
            const { favorites } = await favRes.json();
            set({ favorites: favorites.map((f: Wallpaper) => f.id) });
          }

          if (dlRes.ok) {
            const { downloads } = await dlRes.json();
            set({ downloads: downloads.map((d: Wallpaper) => d.id) });
          }

          if (colRes.ok) {
            const { collections } = await colRes.json();
            set({
              collections: collections.map((c: { id: string; name: string; description?: string; wallpaper_count: number; preview_urls?: string[]; created_at: string }) => ({
                id: c.id,
                name: c.name,
                description: c.description,
                wallpaperIds: [],
                previewUrls: c.preview_urls,
                createdAt: c.created_at,
              })),
            });
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "wallscape-favorites",
    }
  )
);
