import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RedirectIfAuth from "./components/common/RedirectIfAuth";
import AuthPage from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "*", element: <NotFound /> },
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
