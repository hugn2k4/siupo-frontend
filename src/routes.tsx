import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RedirectIfAuth from "./components/common/RedirectIfAuth";
import AuthPage from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import ShopDetail from "./pages/ShopDetail/ShopDetail";
import AboutUs from "./pages/AboutUs/AboutUS";
import ShoppingCart from "./pages/ShoppingCart/shoppingCart";
import CheckoutPage from "./pages/CheckOut/CheckoutPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "cart", element: <ShoppingCart /> },
      { path: "shopdetail", element: <ShopDetail /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "about", element: <AboutUs /> },
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
