import type { AuthUser } from "@/lib/auth";

// Auth API Response Types
export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

export interface ErrorResponse {
  error: string;
  retryAfter?: number; // For rate limiting
}

export interface MessageResponse {
  message: string;
}

export interface SessionResponse {
  sessions: SessionInfo[];
}

export interface SessionInfo {
  id: string;
  user_agent: string;
  ip_address: string;
  created_at: string;
  last_active: string;
  current: boolean;
}

export interface ProfileResponse {
  user: AuthUser;
}

export interface ChangePasswordResponse {
  message: string;
}

// Request body types
export interface SignupRequest {
  email: string;
  password: string;
  username?: string;
  displayName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  displayName?: string;
  username?: string;
  avatar_url?: string;
}

export interface ChangePasswordRequest {
  currentPassword?: string;
  password: string;
}

// Utility type for API responses
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  retryAfter?: number;
};
