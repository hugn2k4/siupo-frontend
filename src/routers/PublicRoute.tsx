import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../hooks/useGlobal";

export default function PublicRoute() {
  const { isLogin } = useGlobal();

  if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
