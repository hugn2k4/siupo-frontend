import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RedirectIfAuth from "./components/common/RedirectIfAuth";
import AuthPage from "./pages/Auth/AuthPage";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import ShopDetailPage from "./pages/ShopDetail/ShopDetailPage";
import OurShopPage from "./pages/Shop/ShopPage";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "shopdetail", element: <ShopDetailPage /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "ourshop", element: <OurShopPage /> },
      { path: "*", element: <NotFoundPage /> },
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
