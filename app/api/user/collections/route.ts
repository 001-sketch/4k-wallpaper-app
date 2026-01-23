import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function getOrCreateUser() {
  const cookieStore = await cookies();
  let userId = cookieStore.get("wallscape_user_id")?.value;

  if (!userId) {
    const result = await sql`
      INSERT INTO users (email, username)
      VALUES (
        'anon_' || gen_random_uuid() || '@wallscape.app',
        'User_' || substr(gen_random_uuid()::text, 1, 8)
      )
      RETURNING id
    `;
    userId = result[0].id;
  }

  return userId;
}

export async function GET() {
  try {
    const userId = await getOrCreateUser();

    const collections = await sql`
      SELECT 
        c.*,
        COUNT(cw.wallpaper_id)::int as wallpaper_count,
        ARRAY(
          SELECT w.preview_url 
          FROM collection_wallpapers cw2
          JOIN wallpapers w ON cw2.wallpaper_id = w.id
          WHERE cw2.collection_id = c.id
          ORDER BY cw2.created_at DESC
          LIMIT 4
        ) as preview_urls
      FROM collections c
      LEFT JOIN collection_wallpapers cw ON cw.collection_id = c.id
      WHERE c.user_id = ${userId}
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `;

    const response = NextResponse.json({ collections, userId });

    const cookieStore = await cookies();
    if (!cookieStore.get("wallscape_user_id")) {
      response.cookies.set("wallscape_user_id", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    return response;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, isPublic } = await request.json();
    const userId = await getOrCreateUser();

    const result = await sql`
      INSERT INTO collections (user_id, name, description, is_public)
      VALUES (${userId}, ${name}, ${description || null}, ${isPublic || false})
      RETURNING *
    `;

    const response = NextResponse.json({ collection: result[0], userId });

    const cookieStore = await cookies();
    if (!cookieStore.get("wallscape_user_id")) {
      response.cookies.set("wallscape_user_id", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    return response;
  } catch (error) {
    console.error("Error creating collection:", error);
    return NextResponse.json(
      { error: "Failed to create collection" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { collectionId } = await request.json();
    const userId = await getOrCreateUser();

    await sql`
      DELETE FROM collections 
      WHERE id = ${collectionId} AND user_id = ${userId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json(
      { error: "Failed to delete collection" },
      { status: 500 }
    );
  }
}
