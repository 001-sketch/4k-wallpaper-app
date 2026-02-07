import { createNeonAuth } from "@neondatabase/auth/next/server";

let cachedAuth: ReturnType<typeof createNeonAuth> | null = null;

export function getAuth() {
  if (cachedAuth) {
    return cachedAuth;
  }

  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  const secret = process.env.NEON_AUTH_COOKIE_SECRET;

  if (!baseUrl || !secret) {
    throw new Error(
      "Missing NEON_AUTH_BASE_URL or NEON_AUTH_COOKIE_SECRET environment variables."
    );
  }

  cachedAuth = createNeonAuth({
    baseUrl,
    cookies: { secret },
  });

  return cachedAuth;
}
