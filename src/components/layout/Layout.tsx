import { Box } from "@mui/material";
import { useLocation, matchPath } from "react-router-dom";
import ROUTES_META from "../../config/routesMeta";
import Footer from "./Footer";
import Header from "./Header";
import PageHeader from "./PageHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  const matchedKey = Object.keys(ROUTES_META).find((route) => matchPath({ path: route, end: true }, pathname));

  const meta = matchedKey ? ROUTES_META[matchedKey] : null;

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
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
