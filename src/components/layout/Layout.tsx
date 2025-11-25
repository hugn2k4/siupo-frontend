import { Box } from "@mui/material";
import { matchPath, useLocation } from "react-router-dom";
import ROUTES_META from "../../config/routesMeta";
import { useRouteMeta } from "../../hooks/useRouteMeta";
import Footer from "./Footer";
import Header from "./Header";
import PageHeader from "./PageHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  const matchedKey = Object.keys(ROUTES_META).find((route) => matchPath({ path: route, end: true }, pathname));

  const meta = useRouteMeta(matchedKey || pathname);

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        paddingTop: { xs: "64px", md: "80px" }, // Match Header height
      }}
    >
      <Header />

      {meta && <PageHeader title={meta.title} breadcrumb={meta.breadcrumb} backgroundImage={meta.backgroundImage} />}

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</Box>

      <Footer />
    </Box>
  );
};

export default Layout;
