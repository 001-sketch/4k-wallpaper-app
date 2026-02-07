import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "./auth";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      setAccessToken: (token) => {
        set({ accessToken: token });
      },

      logout: async () => {
        try {
          // Call logout API
          await fetch("/api/auth/logout", {
            method: "POST",
          });
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          // Clear state regardless of API call success
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
          });
        }
      },

      refreshAccessToken: async () => {
        try {
          const response = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include", // Include cookies
          });

          if (!response.ok) {
            // If refresh fails, clear state
            set({
              user: null,
              accessToken: null,
              isAuthenticated: false,
            });
            return false;
          }

          const data = await response.json();

          set({
            user: data.user,
            accessToken: data.accessToken,
            isAuthenticated: true,
          });

          return true;
        } catch (error) {
          console.error("Token refresh error:", error);
          
          // Clear state on refresh failure
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
          });

          return false;
        }
      },

      checkAuth: async () => {
        const { accessToken } = get();

        // If we have a token, verify it's still valid
        if (accessToken) {
          try {
            const response = await fetch("/api/auth/me", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              set({ user: data.user, isAuthenticated: true });
              return;
            }
          } catch (error) {
            console.error("Auth check error:", error);
          }

          // Token is invalid, try to refresh
          await get().refreshAccessToken();
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
