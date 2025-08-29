import { useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Menu", path: "/" },
    { label: "Blog", path: "/" },
    { label: "Pages", path: "/" },
    { label: "Shop", path: "/" },
    { label: "Contact", path: "/" },
  ];

  return (
    <>
      {/* Desktop Menu */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" }, // Ẩn trên mobile, hiện trên tablet/desktop
          gap: 2,
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-white hover:text-primary transition-colors duration-200 px-2 py-1"
          >
            {item.label}
          </Link>
        ))}
      </Box>

      {/* Mobile Menu (Hamburger) */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Drawer cho Mobile */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
