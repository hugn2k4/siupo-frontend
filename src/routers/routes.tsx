import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dev from "../Dev";
import AboutUsPage from "../pages/AboutUs/AboutUsPage";
import RequestForgotPassword from "../pages/Auth/components/RequestForgotPassword";
import SetNewPassword from "../pages/Auth/components/SetNewPassword";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import SignInPage from "../pages/Auth/SignInPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import Cart from "../pages/Cart/Cart";
import CheckoutPage from "../pages/CheckOut/CheckoutPage";
import ChefPage from "../pages/Chef/ChefPage";
import HomePage from "../pages/Home/HomePage";
import MenuPage from "../pages/Menu/MenuPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import OrderAtTable from "../pages/OrderAtTable/OrderAtTable";
import OrderSuccessPage from "../pages/OrderSuccess/OrderSuccessPage";
import PlaceTableForGuest from "../pages/PlaceTableForGuest/PlaceTableForGuest";
import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage";
import OurShopPage from "../pages/Shop/OurShopPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "order-success", element: <OrderSuccessPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "chef", element: <ChefPage /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "placetable", element: <PlaceTableForGuest /> },
      { path: "orderattable", element: <OrderAtTable /> },
      { path: "shop", element: <OurShopPage /> },
      { path: "/shop/:productId", element: <ProductDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
      {
        element: <PublicRoute />,
        children: [
          { path: "signin", element: <SignInPage /> },
          { path: "signup", element: <SignUpPage /> },
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
            children: [
              { path: "", element: <RequestForgotPassword /> },
              { path: "set-new-password", element: <SetNewPassword /> },
            ],
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [{ path: "cart", element: <Cart /> }],
      },
      { path: "dev", element: <Dev /> },
      { path: "placetable", element: <PlaceTableForGuest /> },
      { path: "orderattable", element: <OrderAtTable /> },
    ],
  },
]);

export default router;
