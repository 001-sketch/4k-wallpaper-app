import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";

/**
 * Hook to protect routes that require authentication
 * Redirects to login if user is not authenticated
 */
export function useProtectedRoute() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      
      if (!isAuthenticated) {
        router.push("/login");
      }
    };

    verifyAuth();
  }, [isAuthenticated, checkAuth, router]);

  return isAuthenticated;
}

/**
 * Hook to optionally verify user is logged in
 * Returns user data without redirecting
 */
export function useAuth() {
  const { user, isAuthenticated, checkAuth, setAccessToken, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isAuthenticated,
    logout,
    setAccessToken,
    checkAuth,
  };
}
