interface RouteMeta {
  title: string;
  titleKey?: string; // Translation key for title
  breadcrumb: { label: string; labelKey?: string; path?: string }[];
  backgroundImage?: string;
}

const ROUTES_META: Record<string, RouteMeta> = {
  "/menu": {
    title: "Our Menu",
    titleKey: "navigation.menu",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Menu", labelKey: "navigation.menu" },
    ],
  },
  "/about": {
    title: "About Us",
    titleKey: "navigation.about",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "About", labelKey: "navigation.about" },
    ],
  },
  "/cart": {
    title: "Shopping Cart",
    titleKey: "navigation.cart",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Cart", labelKey: "navigation.cart" },
    ],
  },
  "/checkout": {
    title: "Checkout",
    titleKey: "navigation.checkout",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Cart", labelKey: "navigation.cart", path: "/cart" },
      { label: "Checkout", labelKey: "navigation.checkout" },
    ],
  },
  "/shop": {
    title: "Our Shop",
    titleKey: "navigation.shop",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Shop", labelKey: "navigation.shop" },
    ],
  },
  "/chef": {
    title: "Our Chef",
    titleKey: "navigation.chef",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Chef", labelKey: "navigation.chef" },
    ],
  },
  "/404": {
    title: "404 Error",
    breadcrumb: [{ label: "Home", labelKey: "navigation.home", path: "/" }, { label: "404" }],
  },
  "/signin": {
    title: "Sign In",
    titleKey: "actions.login",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Sign In", labelKey: "actions.login" },
    ],
  },
  "/signup": {
    title: "Sign Up",
    titleKey: "actions.signup",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Sign Up", labelKey: "actions.signup" },
    ],
  },
  "/forgot-password": {
    title: "Forgot Password",
    titleKey: "forgotPassword.title",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Sign In", labelKey: "actions.login", path: "/signin" },
      { label: "Forgot Password", labelKey: "forgotPassword.title" },
    ],
  },
  "/forgot-password/set-new-password": {
    title: "Set New Password",
    titleKey: "setNewPassword.title",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Sign In", labelKey: "actions.login", path: "/signin" },
      { label: "Forgot Password", labelKey: "forgotPassword.title", path: "/forgot-password" },
      { label: "Set New Password", labelKey: "setNewPassword.title" },
    ],
  },
  "/shop/:productId": {
    title: "Product Detail",
    titleKey: "navigation.productDetail",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Shop", labelKey: "navigation.shop", path: "/shop" },
      { label: "Product Detail", labelKey: "navigation.productDetail" },
    ],
  },
  "/account/dashboard": {
    title: "Account",
    titleKey: "navigation.account",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Account", labelKey: "navigation.account" },
    ],
  },
  "/account/settings": {
    title: "Account Settings",
    titleKey: "navigation.settings",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Account", labelKey: "navigation.account" },
    ],
  },
  "/account/wishlist": {
    title: "Wishlist",
    titleKey: "navigation.wishlist",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Wishlist", labelKey: "navigation.wishlist" },
    ],
  },
  "/orders": {
    title: "My Orders",
    titleKey: "navigation.orders",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Orders", labelKey: "navigation.orders" },
    ],
  },
  "/contact": {
    title: "Contact Us",
    titleKey: "navigation.contact",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Contact", labelKey: "navigation.contact" },
    ],
  },
  "/vouchers": {
    title: "Vouchers",
    titleKey: "navigation.vouchers",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Vouchers", labelKey: "navigation.vouchers" },
    ],
  },
  "/order-at-table": {
    title: "Order at Table",
    titleKey: "Order At Table",
    breadcrumb: [
      { label: "Home", labelKey: "navigation.home", path: "/" },
      { label: "Order at Table", labelKey: "Order At Table" },
    ],
  },
};

export default ROUTES_META;
