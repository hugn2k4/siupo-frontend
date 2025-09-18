import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AboutUs from "./pages/AboutUs/AboutUS";
import SignInPage from "./pages/Auth/SignInPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import OurShop from "./pages/Shop/Shop";
import ShopDetail from "./pages/ShopDetail/ShopDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "shopdetail", element: <ShopDetail /> },
      { path: "about", element: <AboutUs /> },
      { path: "ourshop", element: <OurShop /> },
      { path: "*", element: <NotFound /> },
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);

export default router;
