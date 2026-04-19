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
  {
    id: "9",
    name: "Sports Cars",
    slug: "sports-cars",
    icon: "Car",
    wallpaperCount: 640,
    color: "#ef4444",
  },
  {
    id: "10",
    name: "Cyberpunk",
    slug: "cyberpunk",
    icon: "Zap",
    wallpaperCount: 760,
    color: "#06b6d4",
  },
  {
    id: "11",
    name: "Retro",
    slug: "retro",
    icon: "Film",
    wallpaperCount: 520,
    color: "#f97316",
  },
];

interface UnsplashImage {
  id: string;
  url: string;
  title: string;
  category: string;
  colors: string[];
  tags?: string[];
}

// High-quality wallpaper images from Unsplash
const unsplashImages: UnsplashImage[] = [
  {
    id: "neon-alley-hero",
    url: "https://images.unsplash.com/photo-1519608425089-7f3bfa6f6bb8?w=1920&q=80",
    title: "Neon Alley Rain Reflections",
    category: "cyberpunk",
    colors: ["#020617", "#0891b2", "#f43f5e"],
    tags: ["neon", "alley", "cyberpunk", "rain", "reflections"],
  },
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
  {
    id: "deep-nebula-glow",
    url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1920&q=80",
    title: "Deep Nebula Glow",
    category: "space",
    colors: ["#020617", "#1d4ed8", "#22d3ee"],
    tags: ["space", "nebula", "oled", "black", "cosmic"],
  },
  {
    id: "cosmic-black-expanse",
    url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1920&q=80",
    title: "Cosmic Black Expanse",
    category: "space",
    colors: ["#000000", "#0f172a", "#38bdf8"],
    tags: ["space", "stars", "cosmic", "deep-black", "oled"],
  },
  {
    id: "bioluminescent-nebula",
    url: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=1920&q=80",
    title: "Bioluminescent Nebula",
    category: "space",
    colors: ["#030712", "#4338ca", "#14b8a6"],
    tags: ["space", "nebula", "bioluminescent", "glow", "night"],
  },
  {
    id: "golden-hour-fog-forest",
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1920&q=80",
    title: "Golden Hour Fog Forest",
    category: "nature",
    colors: ["#1c1917", "#78350f", "#a16207"],
    tags: ["nature", "forest", "fog", "golden-hour", "moody"],
  },
  {
    id: "dark-fir-mist",
    url: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80",
    title: "Dark Fir Mist",
    category: "nature",
    colors: ["#111827", "#374151", "#6b7280"],
    tags: ["nature", "forest", "mist", "atmospheric", "dark"],
  },
  {
    id: "frost-on-leaf-macro",
    url: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=1920&q=80",
    title: "Frost on Leaf Macro",
    category: "nature",
    colors: ["#0f172a", "#64748b", "#cbd5e1"],
    tags: ["nature", "macro", "frost", "leaf", "winter"],
  },
  {
    id: "spiderweb-water-drops",
    url: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=1920&q=80",
    title: "Water Droplets on Spider Web",
    category: "nature",
    colors: ["#020617", "#334155", "#93c5fd"],
    tags: ["nature", "macro", "spiderweb", "droplets", "bokeh"],
  },
  {
    id: "mineral-crystal-macro",
    url: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1920&q=80",
    title: "Mineral Crystal Formation",
    category: "nature",
    colors: ["#1f2937", "#6d28d9", "#c4b5fd"],
    tags: ["nature", "macro", "crystal", "mineral", "texture"],
  },
  {
    id: "maasai-mara-sunrise",
    url: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80",
    title: "Maasai Mara Sunrise",
    category: "nature",
    colors: ["#3f1d0d", "#ea580c", "#facc15"],
    tags: ["nature", "landscape", "east-africa", "maasai-mara", "sunrise"],
  },
  {
    id: "rift-valley-escarpment",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80",
    title: "Rift Valley Escarpment",
    category: "nature",
    colors: ["#0f172a", "#1d4ed8", "#86efac"],
    tags: ["nature", "landscape", "east-africa", "rift-valley", "escarpment"],
  },
  {
    id: "kenya-coastline-dusk",
    url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1920&q=80",
    title: "Kenya Coastline at Dusk",
    category: "nature",
    colors: ["#082f49", "#0369a1", "#f97316"],
    tags: ["nature", "landscape", "east-africa", "kenya", "coastline"],
  },
  {
    id: "brutalist-shadow-facade",
    url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1920&q=80",
    title: "Brutalist Shadow Facade",
    category: "architecture",
    colors: ["#111827", "#4b5563", "#e5e7eb"],
    tags: ["architecture", "brutalist", "concrete", "shadows", "contrast"],
  },
  {
    id: "brutalist-concrete-courtyard",
    url: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?w=1920&q=80",
    title: "Brutalist Concrete Courtyard",
    category: "architecture",
    colors: ["#0f172a", "#52525b", "#d4d4d8"],
    tags: ["architecture", "brutalist", "concrete", "geometry", "light"],
  },
  {
    id: "minimal-dark-texture",
    url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1920&q=80",
    title: "Minimal Dark Texture",
    category: "minimal",
    colors: ["#030712", "#1f2937", "#374151"],
    tags: ["minimal", "dark", "texture", "desktop", "negative-space"],
  },
  {
    id: "negative-space-night",
    url: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?w=1920&q=80",
    title: "Negative Space Night",
    category: "minimal",
    colors: ["#020617", "#111827", "#475569"],
    tags: ["minimal", "dark", "negative-space", "clean", "desktop"],
  },
  {
    id: "cyberpunk-alley-signs",
    url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1920&q=80",
    title: "Cyberpunk Alley Neon Signs",
    category: "cyberpunk",
    colors: ["#020617", "#06b6d4", "#f472b6"],
    tags: ["cyberpunk", "neon", "alley", "rain", "city"],
  },
  {
    id: "neon-rain-street",
    url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1920&q=80",
    title: "Neon Rain Street",
    category: "cyberpunk",
    colors: ["#0f172a", "#0ea5e9", "#e879f9"],
    tags: ["cyberpunk", "street", "neon", "reflections", "night"],
  },
  {
    id: "hologram-alley-night",
    url: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=1920&q=80",
    title: "Hologram Alley at Night",
    category: "cyberpunk",
    colors: ["#020617", "#22d3ee", "#f43f5e"],
    tags: ["cyberpunk", "alley", "hologram", "neon", "rain"],
  },
  {
    id: "teal-black-fluid-gradient",
    url: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1920&q=80",
    title: "Teal to Black Fluid Gradient",
    category: "gradient",
    colors: ["#020617", "#0f766e", "#22d3ee"],
    tags: ["gradient", "abstract", "teal", "black", "fluid"],
  },
  {
    id: "coral-purple-cinematic-gradient",
    url: "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1920&q=80",
    title: "Coral to Purple Cinematic Gradient",
    category: "gradient",
    colors: ["#7e22ce", "#e11d48", "#fb7185"],
    tags: ["gradient", "abstract", "coral", "purple", "cinematic"],
  },
  {
    id: "retro-film-warm-street",
    url: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1920&q=80",
    title: "Retro Film Warm Street",
    category: "retro",
    colors: ["#3f2a1d", "#b45309", "#facc15"],
    tags: ["retro", "film", "35mm", "warm", "faded"],
  },
  {
    id: "analog-grain-sunlight",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80",
    title: "Analog Grain Sunlight",
    category: "retro",
    colors: ["#422006", "#a16207", "#fde68a"],
    tags: ["retro", "analog", "film-grain", "warm", "cinematic"],
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
    tags: [
      ...new Set([
        category.slug,
        "4k",
        "hd",
        ...(imageData.tags || []),
        imageData.id.split("-")[0],
      ]),
    ],
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
