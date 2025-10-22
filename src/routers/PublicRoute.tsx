import { Navigate } from "react-router-dom";
import { useGlobal } from "../hooks/useGlobal";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { isLogin } = useGlobal();

  if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
