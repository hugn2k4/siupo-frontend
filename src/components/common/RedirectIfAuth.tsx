import { Navigate } from "react-router-dom";

export default function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
}
