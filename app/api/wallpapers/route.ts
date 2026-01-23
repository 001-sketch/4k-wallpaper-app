import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const resolution = searchParams.get("resolution");
  const orientation = searchParams.get("orientation");
  const sort = searchParams.get("sort") || "trending";
  const featured = searchParams.get("featured");
  const offset = (page - 1) * limit;

  try {
    let queryText = `
      SELECT 
        w.*,
        c.name as category_name,
        c.slug as category_slug
      FROM wallpapers w
      JOIN categories c ON w.category_id = c.id
      WHERE 1=1
    `;
    const params: (string | number | boolean)[] = [];
    let paramIndex = 1;

    if (category) {
      queryText += ` AND c.slug = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (search) {
      queryText += ` AND (w.title ILIKE $${paramIndex} OR w.description ILIKE $${paramIndex} OR $${paramIndex + 1} = ANY(w.tags))`;
      params.push(`%${search}%`, search.toLowerCase());
      paramIndex += 2;
    }

    if (resolution) {
      if (resolution === "4k") {
        queryText += ` AND w.width >= 3840`;
      } else if (resolution === "5k") {
        queryText += ` AND w.width >= 5120`;
      } else if (resolution === "8k") {
        queryText += ` AND w.width >= 7680`;
      }
    }

    if (orientation) {
      if (orientation === "portrait") {
        queryText += ` AND w.height > w.width`;
      } else if (orientation === "landscape") {
        queryText += ` AND w.width > w.height`;
      } else if (orientation === "square") {
        queryText += ` AND w.width = w.height`;
      }
    }

    if (featured === "true") {
      queryText += ` AND w.is_featured = true`;
    }

    // Sorting
    if (sort === "trending") {
      queryText += ` ORDER BY (w.downloads * 0.5 + w.favorites * 0.3 + w.views * 0.2) DESC`;
    } else if (sort === "newest") {
      queryText += ` ORDER BY w.created_at DESC`;
    } else if (sort === "popular") {
      queryText += ` ORDER BY w.downloads DESC`;
    } else if (sort === "random") {
      queryText += ` ORDER BY RANDOM()`;
    } else {
      queryText += ` ORDER BY w.created_at DESC`;
    }

    queryText += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const wallpapers = await query(queryText, params);

    // Get total count
    let countQueryText = `
      SELECT COUNT(*) as total
      FROM wallpapers w
      JOIN categories c ON w.category_id = c.id
      WHERE 1=1
    `;
    const countParams: (string | number | boolean)[] = [];
    let countParamIndex = 1;

    if (category) {
      countQueryText += ` AND c.slug = $${countParamIndex}`;
      countParams.push(category);
      countParamIndex++;
    }

    if (search) {
      countQueryText += ` AND (w.title ILIKE $${countParamIndex} OR w.description ILIKE $${countParamIndex} OR $${countParamIndex + 1} = ANY(w.tags))`;
      countParams.push(`%${search}%`, search.toLowerCase());
    }

    const countResult = await query<{ total: string }>(countQueryText, countParams);
    const total = parseInt(countResult[0]?.total || "0");

    return NextResponse.json({
      wallpapers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallpapers" },
      { status: 500 }
    );
  }
}
