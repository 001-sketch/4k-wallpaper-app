export interface Wallpaper {
  id: string;
  title: string;
  slug: string;
  description: string;
  artist: {
    id: string;
    name: string;
    avatar: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: string[];
  metadata: {
    width: number;
    height: number;
    aspectRatio: string;
    fileSize: number;
    format: string;
    colorPalette: string[];
  };
  urls: {
    thumbnail: string;
    preview: string;
    full: string;
  };
  stats: {
    downloads: number;
    favorites: number;
    views: number;
  };
  isPremium: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  wallpaperCount: number;
  color: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Nature",
    slug: "nature",
    icon: "Mountain",
    wallpaperCount: 2840,
    color: "#22c55e",
  },
  {
    id: "2",
    name: "Abstract",
    slug: "abstract",
    icon: "Shapes",
    wallpaperCount: 1920,
    color: "#8b5cf6",
  },
  {
    id: "3",
    name: "Minimal",
    slug: "minimal",
    icon: "Circle",
    wallpaperCount: 1540,
    color: "#64748b",
  },
  {
    id: "4",
    name: "Space",
    slug: "space",
    icon: "Star",
    wallpaperCount: 980,
    color: "#3b82f6",
  },
  {
    id: "5",
    name: "Architecture",
    slug: "architecture",
    icon: "Building",
    wallpaperCount: 1230,
    color: "#f59e0b",
  },
  {
    id: "6",
    name: "Anime",
    slug: "anime",
    icon: "Sparkles",
    wallpaperCount: 3420,
    color: "#ec4899",
  },
  {
    id: "7",
    name: "Dark",
    slug: "dark",
    icon: "Moon",
    wallpaperCount: 2100,
    color: "#1e293b",
  },
  {
    id: "8",
    name: "Gradient",
    slug: "gradient",
    icon: "Palette",
    wallpaperCount: 890,
    color: "#06b6d4",
  },
];

// High-quality wallpaper images from Unsplash
const unsplashImages = [
  {
    id: "aurora",
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80",
    title: "Northern Lights Aurora",
    category: "nature",
    colors: ["#0a2342", "#2ca58d", "#84bc9c"],
  },
  {
    id: "mountain-lake",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    title: "Alpine Mountain Lake",
    category: "nature",
    colors: ["#1a365d", "#4a5568", "#e2e8f0"],
  },
  {
    id: "abstract-fluid",
    url: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=1920&q=80",
    title: "Fluid Abstract Art",
    category: "abstract",
    colors: ["#7c3aed", "#ec4899", "#f97316"],
  },
  {
    id: "galaxy",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80",
    title: "Cosmic Galaxy",
    category: "space",
    colors: ["#1e1b4b", "#5b21b6", "#c084fc"],
  },
  {
    id: "minimal-arch",
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80",
    title: "Minimal Architecture",
    category: "minimal",
    colors: ["#f8fafc", "#e2e8f0", "#94a3b8"],
  },
  {
    id: "neon-city",
    url: "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=1920&q=80",
    title: "Neon City Lights",
    category: "architecture",
    colors: ["#0f172a", "#7c3aed", "#ec4899"],
  },
  {
    id: "sunset-beach",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
    title: "Tropical Sunset Beach",
    category: "nature",
    colors: ["#fb923c", "#fbbf24", "#0ea5e9"],
  },
  {
    id: "forest-mist",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80",
    title: "Misty Forest",
    category: "nature",
    colors: ["#14532d", "#166534", "#4ade80"],
  },
  {
    id: "gradient-mesh",
    url: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80",
    title: "Gradient Mesh",
    category: "gradient",
    colors: ["#7c3aed", "#2563eb", "#06b6d4"],
  },
  {
    id: "dark-mountain",
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80",
    title: "Dark Mountain Peak",
    category: "dark",
    colors: ["#0f172a", "#1e293b", "#475569"],
  },
  {
    id: "desert-dunes",
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80",
    title: "Golden Desert Dunes",
    category: "nature",
    colors: ["#d97706", "#f59e0b", "#fcd34d"],
  },
  {
    id: "abstract-wave",
    url: "https://images.unsplash.com/photo-1604076913837-52ab5f0f0640?w=1920&q=80",
    title: "Abstract Wave",
    category: "abstract",
    colors: ["#1e40af", "#3b82f6", "#93c5fd"],
  },
  {
    id: "nebula",
    url: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1920&q=80",
    title: "Nebula Dreams",
    category: "space",
    colors: ["#312e81", "#6366f1", "#a78bfa"],
  },
  {
    id: "cherry-blossom",
    url: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&q=80",
    title: "Cherry Blossom",
    category: "nature",
    colors: ["#fce7f3", "#f9a8d4", "#ec4899"],
  },
  {
    id: "geometric",
    url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80",
    title: "Geometric Patterns",
    category: "abstract",
    colors: ["#0f172a", "#1e293b", "#64748b"],
  },
  {
    id: "ocean-wave",
    url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=80",
    title: "Ocean Wave",
    category: "nature",
    colors: ["#0c4a6e", "#0284c7", "#7dd3fc"],
  },
  {
    id: "tokyo-night",
    url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80",
    title: "Tokyo Night",
    category: "architecture",
    colors: ["#0f172a", "#7c3aed", "#f472b6"],
  },
  {
    id: "autumn-forest",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80",
    title: "Autumn Forest Path",
    category: "nature",
    colors: ["#92400e", "#d97706", "#fbbf24"],
  },
  {
    id: "milky-way",
    url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80",
    title: "Milky Way Galaxy",
    category: "space",
    colors: ["#0c0a09", "#1c1917", "#44403c"],
  },
  {
    id: "waterfall",
    url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1920&q=80",
    title: "Majestic Waterfall",
    category: "nature",
    colors: ["#14532d", "#22c55e", "#86efac"],
  },
];

const artists = [
  { id: "1", name: "Alex Chen", avatar: "AC" },
  { id: "2", name: "Maria Silva", avatar: "MS" },
  { id: "3", name: "James Park", avatar: "JP" },
  { id: "4", name: "Sophie Turner", avatar: "ST" },
  { id: "5", name: "David Kim", avatar: "DK" },
];

function generateWallpaper(
  imageData: (typeof unsplashImages)[0],
  index: number
): Wallpaper {
  const category = categories.find((c) => c.slug === imageData.category)!;
  const artist = artists[index % artists.length];
  const isLandscape = Math.random() > 0.3;
  const width = isLandscape ? 3840 : 2160;
  const height = isLandscape ? 2160 : 3840;

  return {
    id: `wp-${imageData.id}-${index}`,
    title: imageData.title,
    slug: imageData.id,
    description: `A stunning ${category.name.toLowerCase()} wallpaper in ultra-high resolution.`,
    artist: {
      id: artist.id,
      name: artist.name,
      avatar: artist.avatar,
    },
    category: {
      id: category.id,
      name: category.name,
      slug: category.slug,
    },
    tags: [category.slug, "4k", "hd", imageData.id.split("-")[0]],
    metadata: {
      width,
      height,
      aspectRatio: isLandscape ? "16:9" : "9:16",
      fileSize: Math.floor(Math.random() * 5000000) + 2000000,
      format: "jpeg",
      colorPalette: imageData.colors,
    },
    urls: {
      thumbnail: imageData.url.replace("w=1920", "w=400"),
      preview: imageData.url.replace("w=1920", "w=1080"),
      full: imageData.url,
    },
    stats: {
      downloads: Math.floor(Math.random() * 50000) + 1000,
      favorites: Math.floor(Math.random() * 10000) + 500,
      views: Math.floor(Math.random() * 200000) + 10000,
    },
    isPremium: Math.random() > 0.7,
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toISOString(),
  };
}

export const wallpapers: Wallpaper[] = unsplashImages.map((img, idx) =>
  generateWallpaper(img, idx)
);

export const trendingWallpapers = [...wallpapers]
  .sort((a, b) => b.stats.views - a.stats.views)
  .slice(0, 10);

export const featuredWallpaper = wallpapers[0];

export function getWallpapersByCategory(slug: string): Wallpaper[] {
  return wallpapers.filter((w) => w.category.slug === slug);
}

export function searchWallpapers(query: string): Wallpaper[] {
  const lowercaseQuery = query.toLowerCase();
  return wallpapers.filter(
    (w) =>
      w.title.toLowerCase().includes(lowercaseQuery) ||
      w.tags.some((t) => t.includes(lowercaseQuery)) ||
      w.category.name.toLowerCase().includes(lowercaseQuery)
  );
}

export function getWallpaperById(id: string): Wallpaper | undefined {
  return wallpapers.find((w) => w.id === id);
}

export function getSimilarWallpapers(wallpaper: Wallpaper): Wallpaper[] {
  return wallpapers
    .filter(
      (w) => w.category.slug === wallpaper.category.slug && w.id !== wallpaper.id
    )
    .slice(0, 6);
}
