import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    // Listen for custom auth state changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authStateChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authStateChange", handleAuthChange);
    };
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authStateChange"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authStateChange"));
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth,
  };
};
