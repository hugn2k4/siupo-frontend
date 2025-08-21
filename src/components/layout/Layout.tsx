import Footer from "./Footer";
import { Container } from "@mui/material";
import Header from "./Header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4, minHeight: "70vh" }}>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
