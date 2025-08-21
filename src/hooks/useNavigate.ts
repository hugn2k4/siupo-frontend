import { useNavigate as useRRNavigate } from "react-router-dom";

/**
 * Hook chuyển trang nhanh, có thể mở rộng logic nếu cần
 * Sử dụng: const navigate = useNavigate(); navigate("/path");
 */
export function useNavigate() {
  return useRRNavigate();
}
