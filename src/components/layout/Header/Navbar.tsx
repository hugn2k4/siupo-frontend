import { Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
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
