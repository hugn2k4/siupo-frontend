import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Actions from "./Actions";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-around" }}>
            <Logo />
            <Box sx={{ order: { xs: 2, md: 3 } }}>
              <Actions />
            </Box>

            <Box sx={{ order: { xs: 3, md: 2 } }}>
              <Navbar />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
