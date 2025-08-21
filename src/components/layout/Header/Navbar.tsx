import { Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  const navItems = [
    { label: "Home", path: "/dev" },
    { label: "Menu", path: "/dev" },
    { label: "Blog", path: "/dev" },
    { label: "Pages", path: "/dev" },
    { label: "Shop", path: "/dev" },
    { label: "Contact", path: "/dev" },
  ];

  return (
    <>
      <Box className="flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-white  hover:text-primary transition-colors duration-200 px-2 py-1"
          >
            {item.label}
          </Link>
        ))}
        <div className="flex "></div>
      </Box>
    </>
  );
}

export default Navbar;
