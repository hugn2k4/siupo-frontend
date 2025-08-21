import Navbar from "./Header/Navbar";
import Footer from "./Footer";
import { Container } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, minHeight: "70vh" }}>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
