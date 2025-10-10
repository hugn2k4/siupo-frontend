import React, { createContext, useCallback, useState } from "react";
import AppSnackbar from "../components/common/Snackbar";

type Severity = "success" | "error" | "info" | "warning";

interface SnackbarItem {
  id: string;
  message: string;
  severity: Severity;
  autoHideDuration?: number;
}

interface SnackbarContextProps {
  showSnackbar: (message: string, severity?: Severity, autoHideDuration?: number) => string;
  closeSnackbar: (id: string) => void;
}

const SnackbarContext = createContext<SnackbarContextProps>({
  showSnackbar: () => "",
  closeSnackbar: () => {},
});

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queue, setQueue] = useState<SnackbarItem[]>([]);

  const showSnackbar = useCallback((message: string, severity: Severity = "success", autoHideDuration = 3000) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setQueue((q) => [...q, { id, message, severity, autoHideDuration }]);
    return id;
  }, []);

  const closeSnackbar = useCallback((id: string) => {
    setQueue((q) => q.filter((n) => n.id !== id));
  }, []);

  const handleClose = (id: string) => () => {
    closeSnackbar(id);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
      {children}
      {/* render stacked snackbars in order: top = index 0 */}
      {queue.map((item, index) => (
        <AppSnackbar
          key={item.id}
          open={true}
          message={item.message}
          severity={item.severity}
          autoHideDuration={item.autoHideDuration}
          onClose={handleClose(item.id)}
          stackIndex={index}
        />
      ))}
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext };
