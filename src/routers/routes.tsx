import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dev from "../Dev";
import AboutUsPage from "../pages/AboutUs/AboutUsPage";
import RequestForgotPassword from "../pages/Auth/components/RequestForgotPassword";
import SetNewPassword from "../pages/Auth/components/SetNewPassword";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import SignInPage from "../pages/Auth/SignInPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import CheckoutPage from "../pages/CheckOut/CheckoutPage";
import ChefPage from "../pages/Chef/ChefPage";
import HomePage from "../pages/Home/HomePage";
import MenuPage from "../pages/Menu/MenuPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import OurShopPage from "../pages/Shop/OurShopPage";
import ShopDetailPage from "../pages/ShopDetail/ShopDetailPage";
import ShoppingCartPage from "../pages/ShoppingCart/shoppingCart";
import PublicRoute from "./PublicRoute";
import PlaceTableForGuest from "../pages/PlaceTableForGuest/PlaceTableForGuest";
import OrderAtTable from "../pages/OrderAtTable/OrderAtTable";
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
      {
        path: "signin",
        element: (
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        ),
        children: [
          { path: "", element: <RequestForgotPassword /> },
          { path: "set-new-password", element: <SetNewPassword /> },
        ],
      },
      { path: "dev", element: <Dev /> },
      { path: "placetable", element: <PlaceTableForGuest /> },
      { path: "orderattable", element: <OrderAtTable /> },
    ],
  },
]);

export default router;
