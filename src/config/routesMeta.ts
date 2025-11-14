interface RouteMeta {
  title: string;
  breadcrumb: { label: string; path?: string }[];
  backgroundImage?: string;
}

const ROUTES_META: Record<string, RouteMeta> = {
  "/menu": {
    title: "Our Menu",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Menu " }],
  },
  "/about": {
    title: "About Us",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "About" }],
  },
  "/cart": {
    title: "Shoping Cart",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Cart" }],
  },
  "/checkout": {
    title: "Checkout",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Cart", path: "/cart" }, { label: "Checkout" }],
  },
  "/shop": {
    title: "Our Shop",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Shop" }],
  },
  "/chef": {
    title: "Our Chef",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Chef" }],
  },
  "/404": {
    title: "404 Error",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "404" }],
  },
  "/signin": {
    title: "Sign In",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Sign In" }],
  },
  "/signup": {
    title: "Sign Up",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Sign Up" }],
  },
  "/forgot-password": {
    title: "Forgot Password",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "SignIn", path: "/signin" }, { label: "Forgot Password" }],
  },
  "/forgot-password/set-new-password": {
    title: "Set New Password",
    breadcrumb: [
      { label: "Home", path: "/" },
      { label: "SignIn", path: "/signin" },
      { label: "Forgot Password", path: "/forgot-password" },
      { label: "Set New Password" },
    ],
  },
  "/shop/:productId": {
    title: "Product Detail",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Shop", path: "/shop" }, { label: "Product Detail" }],
  },
  "/account/dashboard": {
    title: "Account",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Account" }],
  },
  "/account/settings": {
    title: "Account",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Account" }],
  },
  "/account/wishlist": {
    title: "Account",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "WishList" }],
  },
  "/orders": {
    title: "My Orders",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Orders" }],
  },
};

export default ROUTES_META;
