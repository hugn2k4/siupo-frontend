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
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Shoping Cart" }],
  },
  "/checkout": {
    title: "Checkout",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Checkout" }],
  },
  "/ourshop": {
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
  "/shopdetail": {
    title: "Shop Detail",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Our Shop", path: "/ourshop" }, { label: "Product Detail" }],
  },
};

export default ROUTES_META;
