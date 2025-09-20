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
  "/shopdetail": {
    title: "Shop Detail",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Shop Detail" }],
  },
  "/cart": {
    title: "Shoping Cart",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Shoping Cart" }],
  },
  "/checkout": {
    title: "Checkout",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "Checkout" }],
  },
  "/404": {
    title: "404 Error",
    breadcrumb: [{ label: "Home", path: "/" }, { label: "404" }],
  },
};

export default ROUTES_META;
