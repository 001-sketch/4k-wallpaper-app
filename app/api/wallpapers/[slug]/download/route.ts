import { query } from "@/lib/db";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const result = await query<{ full_url: string; title: string; format: string }>(
    `SELECT full_url, title, format FROM wallpapers WHERE slug = $1 LIMIT 1`,
    [slug]
  );
  const wallpaper = result[0];

  if (!wallpaper) {
    return NextResponse.json({ error: "Wallpaper not found" }, { status: 404 });
  }

  try {
    const imageResponse = await fetch(wallpaper.full_url);
    if (!imageResponse.ok || !imageResponse.body) {
      return NextResponse.json(
        { error: "Wallpaper download is unavailable" },
        { status: 502 }
      );
    }

    const extension = wallpaper.format || "jpg";
    const filename = `${wallpaper.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.${extension}`;

    return new NextResponse(imageResponse.body, {
      headers: {
        "Content-Type": imageResponse.headers.get("content-type") || "image/jpeg",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error proxying wallpaper download:", error);
    return NextResponse.json(
      { error: "Wallpaper download is unavailable" },
      { status: 502 }
    );
  }
}
