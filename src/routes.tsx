import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RedirectIfAuth from "./components/common/RedirectIfAuth";
import AuthPage from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import ShoppingCartPage from "./pages/ShoppingCart/shoppingCart";
import CheckoutPage from "./pages/CheckOut/CheckoutPage";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import SignInPage from "./pages/Auth/SignInPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import OurShopPage from "./pages/Shop/OurShopPage";
import ShopDetailPage from "./pages/ShopDetail/ShopDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "cart", element: <ShoppingCartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "", element: <HomePage /> },
      { path: "shopdetail", element: <ShopDetailPage /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "ourshop", element: <OurShopPage /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);

export default router;
