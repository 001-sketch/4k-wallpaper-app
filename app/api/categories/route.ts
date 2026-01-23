import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await sql`
      SELECT 
        c.*,
        COUNT(w.id)::int as wallpaper_count,
        (
          SELECT w2.preview_url 
          FROM wallpapers w2 
          WHERE w2.category_id = c.id 
          ORDER BY w2.downloads DESC 
          LIMIT 1
        ) as preview_url
      FROM categories c
      LEFT JOIN wallpapers w ON w.category_id = c.id
      GROUP BY c.id
      ORDER BY c.name
    `;

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
