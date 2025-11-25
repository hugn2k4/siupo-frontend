import { type ReactNode, useEffect } from "react";
import { useGlobal } from "../../hooks/useGlobal";
import { useSnackbar } from "../../hooks/useSnackbar";
import { registerAuthHandlers } from "../../utils/authUtils";

export default function AuthHandlerInitializer({ children }: { children: ReactNode }) {
  const { logout } = useGlobal();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    registerAuthHandlers(logout, showSnackbar);
  }, [logout, showSnackbar]);

  return <>{children}</>;
}
