// src/config/index.ts
// Cấu hình trung tâm cho toàn bộ project

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8080";

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

// Có thể thêm các config khác ở đây nếu cần
