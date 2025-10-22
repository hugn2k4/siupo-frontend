import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../hooks/useGlobal";

export default function PrivateRoute() {
  const { isLogin } = useGlobal();

  if (!isLogin) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
