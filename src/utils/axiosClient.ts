import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { API_BASE_URL, DEFAULT_HEADERS } from "../config";

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

    // Log request with ID
    console.log(`🔹 [${reqId}] Request:`, {
      url: config.url,
      method: config.method?.toUpperCase(),
      data: config.data,
    });

    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

let isRefreshing = false;
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

    // Log response with matching ID
    console.log(`✅ [${reqId}] Response:`, {
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
      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log(`🔄 [${reqId}] Refreshing token...`);
        const res = await axiosClient.post("/auth/refresh-token");
        const newAccessToken = res.data?.data?.accessToken || res.data?.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        onAccessTokenFetched(newAccessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        localStorage.removeItem("accessToken");
        console.error(`❌ [${reqId}] Refresh token failed`);
        return Promise.reject(refreshError);
      }
    }

    // Log error with request ID
    console.error(`❌ [${reqId}] ${error.response?.status || "ERR"} ${error.config?.url || "Unknown"}`);

    return Promise.reject(error);
  }
);

export default axiosClient;
