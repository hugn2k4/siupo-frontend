import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalProvider.tsx";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import "./index.css";
import router from "./routers/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </GlobalProvider>
  </StrictMode>
);
