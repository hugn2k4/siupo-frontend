import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import AuthPage from "./pages/Auth/Auth";
import RedirectIfAuth from "./components/common/RedirectIfAuth";
import Header from "./components/layout/Header/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      
    ],
  },
  {
    path: "/login",
    element: (
      <RedirectIfAuth>
        <AuthPage />
      </RedirectIfAuth>
    ),
  },
  {
    path: "/register",
    element: (
      <RedirectIfAuth>
        <AuthPage />
      </RedirectIfAuth>
    ),
  },
]);

export default router;
