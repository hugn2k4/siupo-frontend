import React, { createContext, useState } from "react";
import AppSnackbar from "../components/common/Snackbar";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

interface SnackbarContextProps {
  showSnackbar: (message: string, severity?: SnackbarState["severity"]) => void;
}

const SnackbarContext = createContext<SnackbarContextProps>({
  showSnackbar: () => {},
});

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message: string, severity: SnackbarState["severity"] = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <AppSnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={handleClose} />
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext };
