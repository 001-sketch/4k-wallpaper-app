import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    response.cookies.set("wallscape_cookie_consent", "yes", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  } catch (error) {
    console.error("Error setting consent cookie:", error);
    return NextResponse.json({ error: "Failed to set consent" }, { status: 500 });
  }
}
