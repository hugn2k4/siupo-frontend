/**
 * Authentication utility functions
 * Handles logout and session expiration
 */
import { logger } from "./logger";

let globalLogoutHandler: (() => void) | null = null;
let globalShowSnackbar:
  | ((message: string, severity?: "success" | "error" | "info" | "warning", duration?: number) => void)
  | null = null;
let isSessionExpiring = false; // Flag to prevent multiple calls

/**
 * Register global handlers for logout and notifications
 * This should be called once in the app initialization (e.g., App.tsx or main provider)
 */
export const registerAuthHandlers = (
  logout: () => void,
  showSnackbar: (message: string, severity?: "success" | "error" | "info" | "warning", duration?: number) => void
) => {
  globalLogoutHandler = logout;
  globalShowSnackbar = showSnackbar;
  logger.log("✅ Auth handlers registered successfully");
};

/**
 * Handle session expiration
 * - Clear all tokens from localStorage
 * - Show notification
 * - Trigger logout in global state
 * - Redirect to home page
 */
export const handleSessionExpired = () => {
  // Prevent multiple calls
  if (isSessionExpiring) {
    logger.log("⏭️ handleSessionExpired already in progress, skipping...");
    return;
  }

  isSessionExpiring = true;
  logger.log("🚪 handleSessionExpired called");

  // Clear tokens
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  logger.log("🗑️ Tokens cleared from localStorage");

  // Show notification if available
  const notificationDuration = 2000; // 2 seconds
  if (globalShowSnackbar) {
    logger.log("📢 Showing session expired notification");
    globalShowSnackbar("Your session has expired. Please login again.", "warning", notificationDuration);
  } else {
    logger.warn("⚠️ globalShowSnackbar not available");
  }

  // Trigger logout if available
  if (globalLogoutHandler) {
    logger.log("👋 Calling global logout handler");
    globalLogoutHandler();
  } else {
    logger.warn("⚠️ globalLogoutHandler not available");
  }

  // Redirect to home page after notification duration
  logger.log(`🏠 Redirecting to home page in ${notificationDuration}ms...`);
  setTimeout(() => {
    window.location.href = "/";
  }, notificationDuration);
};

/**
 * Manual logout with notification
 */
export const handleLogout = (message = "Logged out successfully") => {
  // Clear tokens
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  // Show notification if available
  if (globalShowSnackbar) {
    globalShowSnackbar(message, "success", 3000);
  }

  // Trigger logout if available
  if (globalLogoutHandler) {
    globalLogoutHandler();
  }

  // Redirect to home page
  window.location.href = "/";
};
