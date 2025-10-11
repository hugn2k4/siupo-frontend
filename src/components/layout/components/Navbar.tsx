import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menu from "../../../config/menuConfig";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop Menu */}
      <Box
        component="nav"
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: 4,
        }}
        role="navigation"
        aria-label="Menu chính"
      >
        {menu.map((item) => (
          <Box
            key={item.path}
            component={Link}
            to={item.path}
            sx={{
              color: location.pathname === item.path ? "var(--color-primary)" : "white",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: { md: "0.875rem", lg: "1rem" },
              transition: "color 0.2s ease",
              position: "relative",
              "&:hover": {
                color: "var(--color-primary)",
              },
              "&:not(:hover)": {
                color: location.pathname === item.path ? "var(--color-primary)" : "white",
              },
              // ? Underline for active link
              // "&::after":
              //   location.pathname === item.path
              //     ? {
              //         content: '""',
              //         position: "absolute",
              //         bottom: -8,
              //         left: 0,
              //         right: 0,
              //         height: 2,
              //         bgcolor: "var(--color-primary)",
              //       }
              //     : {},
            }}
            aria-current={location.pathname === item.path ? "page" : undefined}
          >
            {item.label}
          </Box>
        ))}
      </Box>

      {/* Mobile Menu Button */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          onClick={() => setMobileMenuOpen(true)}
          sx={{ color: "white", p: 1 }}
          size="large"
          aria-label="Mở menu điều hướng"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "black",
            color: "white",
          },
        }}
        ModalProps={{
          "aria-labelledby": "mobile-menu-title",
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "grey.800" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography id="mobile-menu-title" variant="h6" sx={{ color: "white", fontWeight: 600 }}>
              Menu
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: "white" }} aria-label="Đóng menu">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <List component="nav" role="navigation" aria-label="Menu di động">
          {menu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                selected={location.pathname === item.path}
                sx={{
                  py: 2,
                  "&.Mui-selected": {
                    bgcolor: "rgba(255, 152, 0, 0.1)",
                    borderRight: "3px solid",
                    borderColor: "var(--color-primary)",
                    "& .MuiListItemText-primary": {
                      color: "var(--color-primary)",
                      fontWeight: 600,
                    },
                  },
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                  },
                }}
                aria-current={location.pathname === item.path ? "page" : undefined}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      color: "white",
                      fontWeight: 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
