import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../../hooks/useGlobal";
import { useSnackbar } from "../../../hooks/useSnackbar";

function Actions() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isLogin, logout } = useGlobal();
  const { showSnackbar } = useSnackbar();

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate("/signin");
    handleMenuClose();
  };

  const handleSignUp = () => {
    navigate("/signup");
    handleMenuClose();
  };

  const handleProfile = () => {
    // TODO: Navigate to profile page
    console.log("Navigate to profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    showSnackbar("Đăng xuất thành công", "success");
    setTimeout(() => {
      navigate("/signin");
    }, 500);

    handleMenuClose();
  };

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
        <IconButton aria-label="Tài khoản" onClick={handleAccountClick} sx={iconButtonSx}>
          <PersonOutlineOutlinedIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
        </IconButton>
      </Tooltip>

      {/* Account Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            minWidth: 200,
            borderRadius: 1,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          },
        }}
      >
        {isLogin
          ? [
              <MenuItem key="profile" onClick={handleProfile}>
                <ListItemIcon>
                  <AccountCircleOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Thông tin cá nhân</ListItemText>
              </MenuItem>,
              <Divider key="divider" />,
              <MenuItem key="logout" onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Đăng xuất</ListItemText>
              </MenuItem>,
            ]
          : [
              <MenuItem key="login" onClick={handleLogin}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Đăng nhập</ListItemText>
              </MenuItem>,
              <MenuItem key="signup" onClick={handleSignUp}>
                <ListItemIcon>
                  <PersonAddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Đăng ký</ListItemText>
              </MenuItem>,
            ]}
      </Menu>

      <Tooltip title="Giỏ hàng" arrow>
        <IconButton aria-label="Xem giỏ hàng" sx={iconButtonSx}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default Actions;
