import { Outlet } from "react-router-dom";
import AuthFormWrapper from "./components/AuthFormWrapper";

export default function ForgotPasswordPage() {
  return (
    <AuthFormWrapper>
      <Outlet />
    </AuthFormWrapper>
  );
}
