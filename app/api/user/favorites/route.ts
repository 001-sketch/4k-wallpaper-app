import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Helper to get or create anonymous user
async function getOrCreateUser() {
  const cookieStore = await cookies();
  let userId = cookieStore.get("wallscape_user_id")?.value;

  if (!userId) {
    // Create anonymous user
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

    const favorites = await sql`
      SELECT 
        w.*,
        c.name as category_name,
        c.slug as category_slug,
        f.created_at as favorited_at
      FROM favorites f
      JOIN wallpapers w ON f.wallpaper_id = w.id
      JOIN categories c ON w.category_id = c.id
      WHERE f.user_id = ${userId}
      ORDER BY f.created_at DESC
    `;

    const response = NextResponse.json({ favorites, userId });

    // Set cookie if new user
    const cookieStore = await cookies();
    if (!cookieStore.get("wallscape_user_id")) {
      response.cookies.set("wallscape_user_id", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    return response;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { wallpaperId } = await request.json();
    const userId = await getOrCreateUser();

    // Add to favorites
    await sql`
      INSERT INTO favorites (user_id, wallpaper_id)
      VALUES (${userId}, ${wallpaperId})
      ON CONFLICT (user_id, wallpaper_id) DO NOTHING
    `;

    // Increment favorites count
    await sql`
      UPDATE wallpapers 
      SET favorites = favorites + 1 
      WHERE id = ${wallpaperId}
    `;

    const response = NextResponse.json({ success: true, userId });

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
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { wallpaperId } = await request.json();
    const userId = await getOrCreateUser();

    await sql`
      DELETE FROM favorites 
      WHERE user_id = ${userId} AND wallpaper_id = ${wallpaperId}
    `;

    // Decrement favorites count
    await sql`
      UPDATE wallpapers 
      SET favorites = GREATEST(0, favorites - 1) 
      WHERE id = ${wallpaperId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}
