import Footer from "./Footer";
import { Box, Container } from "@mui/material";
import Header from "./Header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Container sx={{ mt: 4, flex: 1 }}>{children}</Container>
      <Footer />
    </Box>
  );
};

export default Layout;
