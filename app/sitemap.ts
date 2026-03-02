import type { MetadataRoute } from "next";
import {
  getAllWallpaperSlugs,
  getAllCategorySlugs,
} from "@/lib/server-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/wallpapers`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/help-support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic wallpaper detail pages
  const wallpaperSlugs = await getAllWallpaperSlugs();
  const wallpaperRoutes: MetadataRoute.Sitemap = wallpaperSlugs.map(
    ({ slug }) => ({
      url: `${baseUrl}/wallpapers/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  // Dynamic category pages
  const categorySlugs = await getAllCategorySlugs();
  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map(
    ({ slug }) => ({
      url: `${baseUrl}/categories/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...categoryRoutes, ...wallpaperRoutes];
}
