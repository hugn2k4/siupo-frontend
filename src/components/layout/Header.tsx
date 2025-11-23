import { AppBar, Box, Container, Toolbar } from "@mui/material";
import Actions from "./components/Actions";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      component="header"
      sx={{
        bgcolor: "black",
        boxShadow: "none",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 80 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo - always on left */}
          <Box sx={{ flexShrink: 0 }}>
            <Logo />
          </Box>

          {/* Desktop: Navbar center */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Navbar />
          </Box>

          {/* Actions - always on right */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Actions />
            {/* Mobile: Navbar hamburger */}
            <Box sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}>
              <Navbar />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
