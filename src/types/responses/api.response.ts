export interface ApiResponse<T = null> {
  success: boolean;
  code: string;
  message: string;
  data: T | null;
  timestamp: string;
}
