/**
 * Simple in-memory rate limiting for auth endpoints
 * Stores request counts by IP address with TTL
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

/**
 * Check if an IP has exceeded the rate limit
 * @param ip - Client IP address
 * @param limit - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns boolean - true if limit exceeded, false otherwise
 */
export function isRateLimited(
  ip: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean {
  const now = Date.now();
  const key = `${ip}`;

  if (!store[key]) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return false;
  }

  const data = store[key];

  // Reset if window has passed
  if (now > data.resetTime) {
    data.count = 1;
    data.resetTime = now + windowMs;
    return false;
  }

  // Increment count
  data.count++;

  return data.count > limit;
}

/**
 * Get remaining requests for an IP
 */
export function getRemainingRequests(
  ip: string,
  limit: number = 5
): number {
  const key = `${ip}`;
  const data = store[key];

  if (!data || Date.now() > data.resetTime) {
    return limit;
  }

  return Math.max(0, limit - data.count);
}

/**
 * Get reset time for an IP (in seconds)
 */
export function getResetTime(ip: string): number {
  const key = `${ip}`;
  const data = store[key];

  if (!data) {
    return 0;
  }

  const remaining = Math.max(0, data.resetTime - Date.now());
  return Math.ceil(remaining / 1000);
}

/**
 * Clear rate limit for an IP (admin use)
 */
export function clearRateLimit(ip: string): void {
  delete store[`${ip}`];
}

/**
 * Clear all rate limits (admin use)
 */
export function clearAllRateLimits(): void {
  Object.keys(store).forEach((key) => delete store[key]);
}

/**
 * Periodic cleanup of expired rate limit entries
 * Run this periodically to prevent memory leaks
 */
export function cleanupExpiredLimits(): void {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (now > store[key].resetTime) {
      delete store[key];
    }
  });
}

// Clean up expired entries every 5 minutes
setInterval(cleanupExpiredLimits, 5 * 60 * 1000);
