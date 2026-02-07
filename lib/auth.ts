import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "./db";

// JWT Secret - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";
const JWT_EXPIRES_IN = "15m"; // Access token expires in 15 minutes
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // Refresh token expires in 7 days

export type AuthUser = {
    id: string;
    email: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
    is_premium: boolean;
};

export type TokenPayload = {
    userId: string;
    email: string;
    type: "access" | "refresh";
};

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
    password: string,
    hash: string
): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

/**
 * Generate JWT access token
 */
export function generateAccessToken(userId: string, email: string): string {
    return jwt.sign(
        { userId, email, type: "access" } as TokenPayload,
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}

/**
 * Generate JWT refresh token
 */
export function generateRefreshToken(userId: string, email: string): string {
    return jwt.sign(
        { userId, email, type: "refresh" } as TokenPayload,
        JWT_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
        return decoded;
    } catch (error) {
        return null;
    }
}

/**
 * Create a new user
 */
export async function createUser(
    email: string,
    password: string,
    username?: string,
    displayName?: string
): Promise<AuthUser> {
    // Check if user already exists
    const existing = await sql`
        SELECT id FROM users WHERE email = ${email}
    `;

    if (existing.length > 0) {
        throw new Error("User already exists with this email");
    }

    if (username) {
        const existingUsername = await sql`
            SELECT id FROM users WHERE username = ${username}
        `;

        if (existingUsername.length > 0) {
            throw new Error("Username is already taken");
        }
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const [user] = await sql`
        INSERT INTO users (email, password_hash, username, display_name)
        VALUES (${email}, ${passwordHash}, ${username || null}, ${displayName || null})
        RETURNING id, email, username, display_name, avatar_url, is_premium
    `;

    return user as AuthUser;
}

/**
 * Authenticate a user with email and password
 */
export async function authenticateUser(
    email: string,
    password: string
): Promise<AuthUser | null> {
    // Get user by email
    const [user] = await sql`
        SELECT id, email, password_hash, username, display_name, avatar_url, is_premium
        FROM users
        WHERE email = ${email}
    `;

    if (!user) {
        return null;
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);

    if (!isValid) {
        return null;
    }

    // Return user without password hash
    const { password_hash, ...authUser } = user;
    return authUser as AuthUser;
}

/**
 * Store refresh token in database
 */
export async function storeRefreshToken(
    userId: string,
    token: string
): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await sql`
        INSERT INTO refresh_tokens (user_id, token, expires_at)
        VALUES (${userId}, ${token}, ${expiresAt.toISOString()})
    `;
}

/**
 * Verify refresh token from database
 */
export async function verifyRefreshToken(token: string): Promise<string | null> {
    const [refreshToken] = await sql`
        SELECT user_id, expires_at, revoked
        FROM refresh_tokens
        WHERE token = ${token}
    `;

    if (!refreshToken || refreshToken.revoked) {
        return null;
    }

    if (new Date(refreshToken.expires_at) < new Date()) {
        return null;
    }

    return refreshToken.user_id;
}

/**
 * Revoke a refresh token
 */
export async function revokeRefreshToken(token: string): Promise<void> {
    await sql`
        UPDATE refresh_tokens
        SET revoked = true, revoked_at = NOW()
        WHERE token = ${token}
    `;
}

/**
 * Revoke all refresh tokens for a user (logout from all devices)
 */
export async function revokeAllUserTokens(userId: string): Promise<void> {
    await sql`
        UPDATE refresh_tokens
        SET revoked = true, revoked_at = NOW()
        WHERE user_id = ${userId} AND revoked = false
    `;
}

/**
 * Create a session for a user
 */
export async function createSession(
    userId: string,
    sessionToken: string
): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await sql`
        INSERT INTO sessions (user_id, session_token, expires_at)
        VALUES (${userId}, ${sessionToken}, ${expiresAt.toISOString()})
    `;
}

/**
 * Get user by session token
 */
export async function getUserBySessionToken(
    sessionToken: string
): Promise<AuthUser | null> {
    const [session] = await sql`
        SELECT u.id, u.email, u.username, u.display_name, u.avatar_url, u.is_premium
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.session_token = ${sessionToken}
            AND s.expires_at > NOW()
    `;

    if (!session) {
        return null;
    }

    return session as AuthUser;
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<AuthUser | null> {
    const [user] = await sql`
        SELECT id, email, username, display_name, avatar_url, is_premium
        FROM users
        WHERE id = ${userId}
    `;

    if (!user) {
        return null;
    }

    return user as AuthUser;
}

/**
 * Delete a session
 */
export async function deleteSession(sessionToken: string): Promise<void> {
    await sql`
        DELETE FROM sessions WHERE session_token = ${sessionToken}
    `;
}

/**
 * Clean up expired sessions and tokens
 */
export async function cleanupExpired(): Promise<void> {
    await sql`SELECT clean_expired_sessions()`;
}