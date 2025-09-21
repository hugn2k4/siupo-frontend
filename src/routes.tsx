import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RedirectIfAuth from "./components/common/RedirectIfAuth";
import AuthPage from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import ShopDetail from "./pages/ShopDetail/ShopDetail";
import ChefPage from "./pages/Chef/ChefPage";
import OurShop from "./pages/Shop/Shop";
import AboutUs from "./pages/AboutUs/AboutUS";
import MenuPage from "./pages/Menu/MenuPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "menu", element: <MenuPage /> },
      { path: "shopdetail", element: <ShopDetail /> },
      { path: "about", element: <AboutUs /> },
      { path: "ourshop", element: <OurShop /> },
      { path: "chef", element: <ChefPage /> },
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
