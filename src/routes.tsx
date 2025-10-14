import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import SignInPage from "./pages/Auth/SignInPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import CheckoutPage from "./pages/CheckOut/CheckoutPage";
import ChefPage from "./pages/Chef/ChefPage";
import HomePage from "./pages/Home/HomePage";
import MenuPage from "./pages/Menu/MenuPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import OurShopPage from "./pages/Shop/OurShopPage";
import ShopDetailPage from "./pages/ShopDetail/ShopDetailPage";
import ShoppingCartPage from "./pages/ShoppingCart/shoppingCart";

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
      { path: "/shop/:productId", element: <ShopDetailPage /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "ourshop", element: <OurShopPage /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);

export default router;
