export interface ApiResponse<T = null> {
  success: boolean;
  code: string;
  message: string;
  data: T | null;
  timestamp: string;
}
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
