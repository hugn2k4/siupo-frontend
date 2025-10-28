import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import LogoImg from "../../../assets/images/image_logo.png";

function Logo() {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
        height: { xs: 48, md: 56 },
        textDecoration: "none",
      }}
      aria-label="Siupo Restaurant - Trang chủ"
    >
      <img
        src={LogoImg}
        alt="Siupo Restaurant Logo"
        style={{
          height: "100%",
          width: "auto",
          objectFit: "contain",
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      />
    </Box>
  );
}

export default Logo;
