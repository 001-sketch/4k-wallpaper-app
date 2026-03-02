/**
 * Safe server-side data access utilities.
 * All functions handle missing DATABASE_URL or DB errors gracefully
 * so builds never crash when the environment is not configured.
 */
import type { Wallpaper, Category } from "@/lib/db";

type QueryFn = <T = Record<string, unknown>>(
  queryText: string,
  params?: (string | number | boolean | null)[]
) => Promise<T[]>;

async function getQuery(): Promise<QueryFn | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const mod = await import("@/lib/db");
    return mod.query as QueryFn;
  } catch {
    return null;
  }
}

export async function getAllWallpaperSlugs(): Promise<
  Array<{ id: string; slug: string }>
> {
  const query = await getQuery();
  if (!query) return [];
  try {
    return await query<{ id: string; slug: string }>(
      "SELECT id, slug FROM wallpapers ORDER BY created_at DESC LIMIT 5000"
    );
  } catch {
    return [];
  }
}

export async function getWallpapers(
  limit = 30,
  sort: "trending" | "newest" | "popular" = "trending"
): Promise<Wallpaper[]> {
  const query = await getQuery();
  if (!query) return [];
  try {
    // ORDER BY cannot be parameterized; use an explicit whitelist of safe
    // column expressions so no user-supplied string ever reaches the query.
    const orderMap: Record<"trending" | "newest" | "popular", string> = {
      trending:
        "(w.downloads * 0.5 + w.favorites * 0.3 + w.views * 0.2) DESC",
      newest: "w.created_at DESC",
      popular: "w.downloads DESC",
    };
    const order = orderMap[sort] ?? "w.created_at DESC";
    return await query<Wallpaper>(
      `SELECT w.*, c.name AS category_name, c.slug AS category_slug
       FROM wallpapers w
       JOIN categories c ON w.category_id = c.id
       ORDER BY ${order}
       LIMIT $1`,
      [limit]
    );
  } catch {
    return [];
  }
}

export async function getWallpaperBySlug(
  slug: string
): Promise<Wallpaper | null> {
  const query = await getQuery();
  if (!query) return null;
  try {
    const rows = await query<Wallpaper>(
      `SELECT w.*, c.name AS category_name, c.slug AS category_slug
       FROM wallpapers w
       JOIN categories c ON w.category_id = c.id
       WHERE w.slug = $1
       LIMIT 1`,
      [slug]
    );
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedWallpapers(
  wallpaper: Wallpaper,
  limit = 6
): Promise<Wallpaper[]> {
  const query = await getQuery();
  if (!query) return [];
  try {
    return await query<Wallpaper>(
      `SELECT w.*, c.name AS category_name, c.slug AS category_slug
       FROM wallpapers w
       JOIN categories c ON w.category_id = c.id
       WHERE w.category_id = $1 AND w.id != $2
       ORDER BY w.downloads DESC
       LIMIT $3`,
      [wallpaper.category_id, wallpaper.id, limit]
    );
  } catch {
    return [];
  }
}

export async function getAllCategorySlugs(): Promise<
  Array<{ slug: string }>
> {
  const query = await getQuery();
  if (!query) return [];
  try {
    return await query<{ slug: string }>(
      "SELECT slug FROM categories ORDER BY name"
    );
  } catch {
    return [];
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const query = await getQuery();
  if (!query) return null;
  try {
    const rows = await query<Category>(
      `SELECT c.*,
              COUNT(w.id)::int AS wallpaper_count,
              (SELECT w2.preview_url FROM wallpapers w2
               WHERE w2.category_id = c.id
               ORDER BY w2.downloads DESC LIMIT 1) AS preview_url
       FROM categories c
       LEFT JOIN wallpapers w ON w.category_id = c.id
       WHERE c.slug = $1
       GROUP BY c.id
       LIMIT 1`,
      [slug]
    );
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getWallpapersByCategory(
  categorySlug: string,
  limit = 30
): Promise<Wallpaper[]> {
  const query = await getQuery();
  if (!query) return [];
  try {
    return await query<Wallpaper>(
      `SELECT w.*, c.name AS category_name, c.slug AS category_slug
       FROM wallpapers w
       JOIN categories c ON w.category_id = c.id
       WHERE c.slug = $1
       ORDER BY w.downloads DESC
       LIMIT $2`,
      [categorySlug, limit]
    );
  } catch {
    return [];
  }
}
