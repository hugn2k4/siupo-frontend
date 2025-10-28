import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGlobal } from "../hooks/useGlobal";

export default function PublicRoute() {
  const { isLogin } = useGlobal();
  const location = useLocation();

  if (isLogin) {
    const from = (location.state as { from?: string })?.from || "/";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}
