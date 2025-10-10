import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Actions() {
  const navigate = useNavigate();

  const iconButtonSx = {
    color: "white",
    "&:hover": {
      color: "var(--color-primary)",
      // bgcolor: "rgba(255, 255, 255, 0.1)",
    },
    "&:not(:hover)": {
      color: "white",
    },
    transition: "all 0.2s ease",
    p: { xs: 1, md: 1.5 },
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Tooltip title="Tìm kiếm" arrow>
        <IconButton aria-label="Tìm kiếm sản phẩm" sx={iconButtonSx}>
          <SearchIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Tài khoản" arrow>
        <IconButton aria-label="Tài khoản" onClick={() => navigate("/signin")} sx={iconButtonSx}>
          <PersonOutlineOutlinedIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Giỏ hàng" arrow>
        <IconButton aria-label="Xem giỏ hàng" sx={iconButtonSx}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default Actions;
