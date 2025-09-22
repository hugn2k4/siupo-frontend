import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ShoppingCartPage from "./pages/ShoppingCart/shoppingCart";
import CheckoutPage from "./pages/CheckOut/CheckoutPage";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import SignInPage from "./pages/Auth/SignInPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import OurShopPage from "./pages/Shop/OurShopPage";
import ShopDetailPage from "./pages/ShopDetail/ShopDetailPage";
import ChefPage from "./pages/Chef/ChefPage";
import MenuPage from "./pages/Menu/MenuPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "cart", element: <ShoppingCartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "chef", element: <ChefPage /> },
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
