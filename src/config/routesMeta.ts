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
};

export default ROUTES_META;
