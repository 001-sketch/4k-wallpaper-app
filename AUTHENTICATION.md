# Authentication Setup Guide

## Overview
This application now includes a complete authentication system with user registration, login, and session management using JWT tokens and Neon PostgreSQL database.

## Features
- ✅ User registration with email and password
- ✅ Secure password hashing using bcrypt
- ✅ JWT-based authentication (access + refresh tokens)
- ✅ HTTP-only cookies for refresh tokens
- ✅ Session management
- ✅ Protected routes
- ✅ Automatic token refresh
- ✅ User profile in header

## Setup Instructions

### 1. Environment Variables
Add the following to your `.env` file:

```bash
DATABASE_URL=your_neon_database_url
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important:** Generate a strong JWT secret using:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. Run Database Migrations
Execute the SQL scripts in order to set up the database:

```bash
# Run these SQL scripts in your Neon database console:
# 1. scripts/001_create_wallpaper_tables.sql (if not already done)
# 2. scripts/003_create_auth_tables.sql (new auth tables)
```

Or use the SQL client:
```bash
psql $DATABASE_URL < scripts/001_create_wallpaper_tables.sql
psql $DATABASE_URL < scripts/003_create_auth_tables.sql
```

### 3. Install Dependencies
The required packages should already be installed:
```bash
pnpm install
```

## Authentication Flow

### Sign Up
1. Navigate to `/login`
2. Click "Sign up"
3. Fill in email, password, and optional username/display name
4. Submit form
5. Automatically logged in and redirected to home

### Login
1. Navigate to `/login`
2. Enter email and password
3. Submit form
4. Access token stored in memory, refresh token in HTTP-only cookie
5. Redirected to home page

### Logout
1. Click "Logout" button in header
2. Refresh token revoked in database
3. Cookie cleared
4. State cleared from client

## API Endpoints

### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "optional_username",
  "displayName": "Optional Name"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "display_name": "Name",
    "is_premium": false
  },
  "accessToken": "jwt_token"
}
```

### POST /api/auth/login
Authenticate existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": { /* user object */ },
  "accessToken": "jwt_token"
}
```

### POST /api/auth/logout
Logout current user.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### GET /api/auth/me
Get current user info (requires Authorization header).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "user": { /* user object */ }
}
```

### POST /api/auth/refresh
Refresh access token using refresh token cookie.

**Response:**
```json
{
  "accessToken": "new_jwt_token",
  "user": { /* user object */ }
}
```

## Client-Side Usage

### Using the Auth Store
```typescript
import { useAuthStore } from "@/lib/auth-store";

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protecting Routes
Create a middleware or use the auth store in your components:

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";

export default function ProtectedPage() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth().then(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    });
  }, [isAuthenticated, checkAuth, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <div>Protected content</div>;
}
```

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt with salt rounds
2. **JWT Tokens**: Short-lived access tokens (15 min) and long-lived refresh tokens (7 days)
3. **HTTP-Only Cookies**: Refresh tokens stored in HTTP-only cookies to prevent XSS
4. **Token Rotation**: Access tokens can be refreshed without re-authentication
5. **Token Revocation**: Refresh tokens can be revoked (logout)
6. **Database Sessions**: Session tracking in database
7. **Automatic Cleanup**: Expired sessions and tokens are cleaned periodically

## Database Schema

### users
- id (UUID, Primary Key)
- email (Unique, Not Null)
- password_hash (Not Null)
- username (Unique, Optional)
- display_name (Optional)
- avatar_url (Optional)
- is_premium (Boolean, Default: false)
- created_at, updated_at (Timestamps)

### sessions
- id (UUID, Primary Key)
- user_id (Foreign Key → users)
- session_token (Unique, Not Null)
- expires_at (Timestamp)
- created_at, updated_at (Timestamps)

### refresh_tokens
- id (UUID, Primary Key)
- user_id (Foreign Key → users)
- token (Unique, Not Null)
- expires_at (Timestamp)
- revoked (Boolean, Default: false)
- revoked_at (Timestamp, Optional)
- created_at (Timestamp)

## Testing

### Test User Registration
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

### Issue: "JWT_SECRET not defined"
**Solution:** Add JWT_SECRET to your .env file

### Issue: "User already exists"
**Solution:** Use a different email or check the users table in your database

### Issue: "Invalid token"
**Solution:** Token may have expired. Try logging in again or use the refresh endpoint

### Issue: "Database connection failed"
**Solution:** Check your DATABASE_URL in .env file

## Next Steps

1. ✅ Basic authentication implemented
2. 🔄 Add password reset functionality
3. 🔄 Add email verification
4. 🔄 Add OAuth providers (Google, GitHub)
5. 🔄 Add two-factor authentication
6. 🔄 Add rate limiting
7. 🔄 Add account settings page

## Support

For issues or questions, please check the documentation or create an issue in the repository.
