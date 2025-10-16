import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { API_BASE_URL, DEFAULT_HEADERS } from "../config";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS,
  withCredentials: true,
});

// ----- REQUEST INTERCEPTOR -----
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log mỗi request
    console.log("🔹 Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
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
    // Log response thành công
    console.log("✅ Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
      headers: response.headers,
    });

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

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
        const res = await axiosClient.post("/auth/refresh");
        const newAccessToken = res.data?.data?.accessToken || res.data?.accessToken;
        localStorage.setItem("token", newAccessToken);

        onAccessTokenFetched(newAccessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        localStorage.removeItem("token");
        console.error("❌ Refresh token failed, please login again");
        return Promise.reject(refreshError);
      }
    }

    // Log lỗi
    if (error.response) {
      console.error("❌ Response error:", {
        url: error.config.url,
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error("❌ No response:", error.request);
    } else {
      console.error("❌ Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
