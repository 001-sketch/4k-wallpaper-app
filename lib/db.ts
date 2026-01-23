import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(process.env.DATABASE_URL);

// Export the tagged template function for simple queries
export { sql };

// Export a query function for dynamic queries with parameters
export async function query<T = Record<string, unknown>>(
  queryText: string,
  params: (string | number | boolean | null)[] = []
): Promise<T[]> {
  return sql.query(queryText, params) as Promise<T[]>;
}

export type Wallpaper = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category_id: string;
  category_name: string;
  category_slug: string;
  width: number;
  height: number;
  aspect_ratio: string;
  file_size: number;
  format: string;
  color_palette: string[];
  thumbnail_url: string;
  preview_url: string;
  full_url: string;
  tags: string[];
  downloads: number;
  favorites: number;
  views: number;
  is_premium: boolean;
  is_featured: boolean;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  wallpaper_count: number;
  preview_url: string | null;
};

export type User = {
  id: string;
  email: string;
  username: string | null;
  avatar_url: string | null;
  is_premium: boolean;
  created_at: string;
};

export type Collection = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  wallpaper_count?: number;
  preview_urls?: string[];
};
