import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function getUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("wallscape_user_id")?.value;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get collection details
    const collectionResult = await sql`
      SELECT * FROM collections 
      WHERE id = ${id} AND (user_id = ${userId} OR is_public = true)
    `;

    if (collectionResult.length === 0) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    // Get wallpapers in collection
    const wallpapers = await sql`
      SELECT 
        w.*,
        c.name as category_name,
        c.slug as category_slug,
        cw.created_at as added_at
      FROM collection_wallpapers cw
      JOIN wallpapers w ON cw.wallpaper_id = w.id
      JOIN categories c ON w.category_id = c.id
      WHERE cw.collection_id = ${id}
      ORDER BY cw.created_at DESC
    `;

    return NextResponse.json({
      collection: collectionResult[0],
      wallpapers,
    });
  } catch (error) {
    console.error("Error fetching collection:", error);
    return NextResponse.json(
      { error: "Failed to fetch collection" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { wallpaperId } = await request.json();
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const collection = await sql`
      SELECT id FROM collections WHERE id = ${id} AND user_id = ${userId}
    `;

    if (collection.length === 0) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    // Add wallpaper to collection
    await sql`
      INSERT INTO collection_wallpapers (collection_id, wallpaper_id)
      VALUES (${id}, ${wallpaperId})
      ON CONFLICT (collection_id, wallpaper_id) DO NOTHING
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding to collection:", error);
    return NextResponse.json(
      { error: "Failed to add to collection" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { wallpaperId } = await request.json();
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const collection = await sql`
      SELECT id FROM collections WHERE id = ${id} AND user_id = ${userId}
    `;

    if (collection.length === 0) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    // Remove wallpaper from collection
    await sql`
      DELETE FROM collection_wallpapers 
      WHERE collection_id = ${id} AND wallpaper_id = ${wallpaperId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from collection:", error);
    return NextResponse.json(
      { error: "Failed to remove from collection" },
      { status: 500 }
    );
  }
}
