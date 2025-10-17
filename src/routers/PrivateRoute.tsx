import { Navigate } from "react-router-dom";
import { useGlobal } from "../hooks/useGlobal";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLogin } = useGlobal();

  if (!isLogin) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
