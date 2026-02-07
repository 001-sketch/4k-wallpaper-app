-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  wallpaper_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallpapers table
CREATE TABLE IF NOT EXISTS wallpapers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  aspect_ratio VARCHAR(20),
  file_size INTEGER,
  format VARCHAR(20) DEFAULT 'jpeg',
  thumbnail_url TEXT NOT NULL,
  preview_url TEXT NOT NULL,
  full_url TEXT NOT NULL,
  color_palette TEXT[], -- Array of hex colors
  tags TEXT[],
  downloads INTEGER DEFAULT 0,
  favorites INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  artist_name VARCHAR(100),
  artist_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  wallpaper_id UUID REFERENCES wallpapers(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, wallpaper_id)
);

-- User downloads table
CREATE TABLE IF NOT EXISTS user_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  wallpaper_id UUID REFERENCES wallpapers(id) ON DELETE CASCADE,
  resolution VARCHAR(20),
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collection wallpapers junction table
CREATE TABLE IF NOT EXISTS collection_wallpapers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  wallpaper_id UUID REFERENCES wallpapers(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collection_id, wallpaper_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_wallpapers_category ON wallpapers(category_id);
CREATE INDEX IF NOT EXISTS idx_wallpapers_featured ON wallpapers(is_featured);
CREATE INDEX IF NOT EXISTS idx_wallpapers_downloads ON wallpapers(downloads DESC);
CREATE INDEX IF NOT EXISTS idx_wallpapers_created ON wallpapers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_downloads_user ON user_downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_collections_user ON collections(user_id);

-- Insert default categories
INSERT INTO categories (name, slug, description, icon) VALUES
  ('Nature', 'nature', 'Landscapes, mountains, forests, and natural wonders', 'mountain'),
  ('Abstract', 'abstract', 'Digital art, patterns, and geometric designs', 'shapes'),
  ('Minimal', 'minimal', 'Clean, simple, and elegant designs', 'minus'),
  ('Space', 'space', 'Galaxies, planets, stars, and cosmic imagery', 'star'),
  ('Architecture', 'architecture', 'Buildings, cityscapes, and urban photography', 'building'),
  ('Anime', 'anime', 'Japanese animation and manga-inspired art', 'palette'),
  ('Dark', 'dark', 'Dark and moody aesthetics', 'moon'),
  ('Gradient', 'gradient', 'Beautiful color gradients and transitions', 'blend')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample wallpapers
INSERT INTO wallpapers (title, slug, category_id, width, height, aspect_ratio, thumbnail_url, preview_url, full_url, tags, downloads, favorites, views, is_featured, artist_name) VALUES
  ('Mountain Sunrise', 'mountain-sunrise', (SELECT id FROM categories WHERE slug = 'nature'), 3840, 2160, '16:9', 
   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', 
   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&q=80',
   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=3840&q=90',
   ARRAY['mountains', 'sunrise', 'landscape', 'clouds'], 15420, 2341, 89234, true, 'Samuel Ferrara'),
  
  ('Northern Lights', 'northern-lights', (SELECT id FROM categories WHERE slug = 'nature'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80',
   'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1080&q=80',
   'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=3840&q=90',
   ARRAY['aurora', 'night', 'sky', 'stars'], 12350, 1892, 67432, true, 'Jonatan Pie'),
  
  ('Ocean Waves', 'ocean-waves', (SELECT id FROM categories WHERE slug = 'nature'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80',
   'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1080&q=80',
   'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=3840&q=90',
   ARRAY['ocean', 'waves', 'blue', 'water'], 9870, 1456, 54321, false, 'Matt Hardy'),
  
  ('Abstract Fluid', 'abstract-fluid', (SELECT id FROM categories WHERE slug = 'abstract'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&q=80',
   'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=1080&q=80',
   'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=3840&q=90',
   ARRAY['abstract', 'fluid', 'colorful', 'art'], 8765, 1234, 43210, true, 'Pawel Czerwinski'),
  
  ('Geometric Patterns', 'geometric-patterns', (SELECT id FROM categories WHERE slug = 'abstract'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&q=80',
   'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1080&q=80',
   'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=3840&q=90',
   ARRAY['geometric', 'patterns', 'shapes', '3d'], 7654, 1098, 38765, false, 'Scott Webb'),
  
  ('Minimal Lines', 'minimal-lines', (SELECT id FROM categories WHERE slug = 'minimal'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=80',
   'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1080&q=80',
   'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=3840&q=90',
   ARRAY['minimal', 'gradient', 'simple', 'clean'], 6543, 987, 32109, false, 'Gradienta'),
  
  ('White Marble', 'white-marble', (SELECT id FROM categories WHERE slug = 'minimal'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?w=400&q=80',
   'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?w=1080&q=80',
   'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?w=3840&q=90',
   ARRAY['marble', 'white', 'texture', 'elegant'], 5432, 876, 28765, false, 'Henry Co'),
  
  ('Galaxy Nebula', 'galaxy-nebula', (SELECT id FROM categories WHERE slug = 'space'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80',
   'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1080&q=80',
   'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=3840&q=90',
   ARRAY['galaxy', 'nebula', 'space', 'stars'], 11234, 1765, 56789, true, 'NASA'),
  
  ('Planet Earth', 'planet-earth', (SELECT id FROM categories WHERE slug = 'space'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&q=80',
   'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1080&q=80',
   'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=3840&q=90',
   ARRAY['earth', 'planet', 'space', 'blue'], 9876, 1543, 48765, false, 'NASA'),
  
  ('Tokyo Night', 'tokyo-night', (SELECT id FROM categories WHERE slug = 'architecture'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80',
   'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1080&q=80',
   'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=3840&q=90',
   ARRAY['tokyo', 'city', 'night', 'neon'], 13456, 2109, 71234, true, 'Jezael Melgoza'),
  
  ('Dubai Skyline', 'dubai-skyline', (SELECT id FROM categories WHERE slug = 'architecture'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
   'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1080&q=80',
   'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=3840&q=90',
   ARRAY['dubai', 'skyline', 'architecture', 'modern'], 8765, 1321, 45678, false, 'David Rodrigo'),
  
  ('Anime Sunset', 'anime-sunset', (SELECT id FROM categories WHERE slug = 'anime'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80',
   'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1080&q=80',
   'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=3840&q=90',
   ARRAY['anime', 'sunset', 'sky', 'clouds'], 7654, 1198, 39876, false, 'Jr Korpa'),
  
  ('Dark Forest', 'dark-forest', (SELECT id FROM categories WHERE slug = 'dark'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80',
   'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1080&q=80',
   'https://images.unsplash.com/photo-1448375240586-882707db888b?w=3840&q=90',
   ARRAY['forest', 'dark', 'trees', 'moody'], 6543, 1087, 34567, false, 'Sebastian Unrau'),
  
  ('Midnight City', 'midnight-city', (SELECT id FROM categories WHERE slug = 'dark'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400&q=80',
   'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1080&q=80',
   'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=3840&q=90',
   ARRAY['city', 'night', 'dark', 'lights'], 5432, 976, 29876, false, 'Pedro Lastra'),
  
  ('Purple Gradient', 'purple-gradient', (SELECT id FROM categories WHERE slug = 'gradient'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80',
   'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1080&q=80',
   'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=3840&q=90',
   ARRAY['gradient', 'purple', 'colorful', 'vibrant'], 10234, 1654, 52341, true, 'Gradienta'),
  
  ('Sunset Gradient', 'sunset-gradient', (SELECT id FROM categories WHERE slug = 'gradient'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1557683316-973673bdar25?w=400&q=80',
   'https://images.unsplash.com/photo-1557683316-973673bdar25?w=1080&q=80',
   'https://images.unsplash.com/photo-1557683316-973673bdar25?w=3840&q=90',
   ARRAY['gradient', 'sunset', 'orange', 'warm'], 4321, 765, 23456, false, 'Gradienta'),
  
  ('Misty Mountains', 'misty-mountains', (SELECT id FROM categories WHERE slug = 'nature'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
   'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1080&q=80',
   'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=3840&q=90',
   ARRAY['mountains', 'mist', 'fog', 'landscape'], 8765, 1432, 45678, false, 'Kalen Emsley'),
  
  ('Neon Abstract', 'neon-abstract', (SELECT id FROM categories WHERE slug = 'abstract'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80',
   'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1080&q=80',
   'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=3840&q=90',
   ARRAY['neon', 'abstract', 'colorful', 'glow'], 7654, 1234, 38765, false, 'Fakurian Design'),
  
  ('Starry Night Sky', 'starry-night-sky', (SELECT id FROM categories WHERE slug = 'space'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&q=80',
   'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1080&q=80',
   'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=3840&q=90',
   ARRAY['stars', 'night', 'sky', 'milkyway'], 9876, 1567, 51234, false, 'Graham Holtshausen'),
  
  ('Cherry Blossom', 'cherry-blossom', (SELECT id FROM categories WHERE slug = 'nature'), 3840, 2160, '16:9',
   'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&q=80',
   'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1080&q=80',
   'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=3840&q=90',
   ARRAY['cherry', 'blossom', 'spring', 'pink'], 6543, 1098, 34567, false, 'AJ')
ON CONFLICT (slug) DO NOTHING;

-- Update category wallpaper counts
UPDATE categories SET wallpaper_count = (
  SELECT COUNT(*) FROM wallpapers WHERE wallpapers.category_id = categories.id
);
