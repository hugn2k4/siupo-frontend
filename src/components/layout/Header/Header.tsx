import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Actions from "./Actions";

const Header = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Logo />
            <Navbar />
            <Actions />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
