import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthHandlerInitializer from "./components/common/AuthHandlerInitializer.tsx";
import { GlobalProvider } from "./contexts/GlobalProvider.tsx";
import { PreOrderProvider } from "./contexts/PreOrderContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import "./i18n/config"; // Initialize i18n before rendering
import "./index.css";
import router from "./routers/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <SnackbarProvider>
        <AuthHandlerInitializer>
          <PreOrderProvider>
            <RouterProvider router={router} />
          </PreOrderProvider>
        </AuthHandlerInitializer>
      </SnackbarProvider>
    </GlobalProvider>
  </StrictMode>
);
