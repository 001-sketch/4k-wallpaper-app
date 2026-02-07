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

    const downloads = await sql`
      SELECT 
        w.*,
        c.name as category_name,
        c.slug as category_slug,
        d.resolution as downloaded_resolution,
        d.created_at as downloaded_at
      FROM downloads d
      JOIN wallpapers w ON d.wallpaper_id = w.id
      JOIN categories c ON w.category_id = c.id
      WHERE d.user_id = ${userId}
      ORDER BY d.created_at DESC
    `;

    const response = NextResponse.json({ downloads, userId });
    
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
    console.error("Error fetching downloads:", error);
    return NextResponse.json(
      { error: "Failed to fetch downloads" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { wallpaperId, resolution } = await request.json();
    const userId = await getOrCreateUser();

    // Record download
    await sql`
      INSERT INTO downloads (user_id, wallpaper_id, resolution)
      VALUES (${userId}, ${wallpaperId}, ${resolution || "4k"})
    `;

    // Increment download count
    await sql`
      UPDATE wallpapers 
      SET downloads = downloads + 1 
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
    console.error("Error recording download:", error);
    return NextResponse.json(
      { error: "Failed to record download" },
      { status: 500 }
    );
  }
}
