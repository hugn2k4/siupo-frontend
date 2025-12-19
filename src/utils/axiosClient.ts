import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { API_BASE_URL, DEFAULT_HEADERS } from "../config";
import { handleSessionExpired } from "./authUtils";
import { logger } from "./logger";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS,
  withCredentials: true,
});

// Generate unique request ID
let requestId = 0;
function generateRequestId(): number {
  return ++requestId;
}

// ----- REQUEST INTERCEPTOR -----
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Generate and attach request ID
    const reqId = generateRequestId();
    config.headers["X-Request-ID"] = reqId.toString();

    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request with ID (only in development)
    logger.log(`🔹 [${reqId}] Request:`, {
      url: config.url,
      method: config.method?.toUpperCase(),
      data: config.data,
    });

    return config;
  },
  (error) => {
    logger.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let isSessionExpired = false; // Flag to prevent multiple session expired calls
let subscribers: ((token: string) => void)[] = [];

function onAccessTokenFetched(newToken: string) {
  subscribers.forEach((cb) => cb(newToken));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

// ----- RESPONSE INTERCEPTOR -----
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Get request ID from headers
    const reqId = response.config.headers["X-Request-ID"] || "?";

    // Log response with matching ID (only in development)
    logger.log(`✅ [${reqId}] Response:`, {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const reqId = originalRequest?.headers?.["X-Request-ID"] || "?";

    // ----- Handle 401 + Refresh token -----
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip retry for refresh-token endpoint itself to avoid infinite loop
      if (originalRequest.url?.includes("/auth/refresh-token")) {
        logger.error(`❌ [${reqId}] Refresh token expired - Logging out`);
        isRefreshing = false;
        subscribers = []; // Clear all waiting requests

        // Only handle session expired once
        if (!isSessionExpired) {
          isSessionExpired = true;
          handleSessionExpired();
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addSubscriber((newToken) => {
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(axiosClient(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        logger.log(`🔄 [${reqId}] Refreshing token...`);
        const res = await axiosClient.post("/auth/refresh-token");
        const newAccessToken = res.data?.data?.accessToken || res.data?.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token received");
        }

        localStorage.setItem("accessToken", newAccessToken);
        logger.log(`✅ [${reqId}] Token refreshed successfully`);

        onAccessTokenFetched(newAccessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        subscribers = []; // Clear all waiting requests
        logger.error(`❌ [${reqId}] Refresh token failed - Session expired`, refreshError);

        // Only handle session expired once
        if (!isSessionExpired) {
          isSessionExpired = true;
          handleSessionExpired();
        }
        return Promise.reject(refreshError);
      }
    }

    // Log error with request ID and detailed info
    const errorInfo = {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    };
    logger.error(`❌ [${reqId}] ${error.response?.status || "ERR"} ${error.config?.url || "Unknown"}`, errorInfo);

    return Promise.reject(error);
  }
);

export default axiosClient;
