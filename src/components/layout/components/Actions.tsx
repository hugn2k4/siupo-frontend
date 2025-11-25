import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../../hooks/useGlobal";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { useTranslation } from "../../../hooks/useTranslation";
import NotificationPopup from "../../../pages/NotificationPopup/NotificationPopup";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import LoginRequiredDialog from "../../common/LoginRequiredDialog";

function Actions() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { isLogin, logout, user } = useGlobal();
  const [showNotificationLoginDialog, setShowNotificationLoginDialog] = useState(false);
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
    navigate("/account/dashboard");
    handleMenuClose();
  };

  const handleWishlist = () => {
    navigate("/account/wishlist");
    handleMenuClose();
  };

  const handleOrder = () => {
    navigate("/orders");
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    showSnackbar(t("messages.logoutSuccess"), "success");
    handleMenuClose();
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  const handleCartClick = () => {
    if (!isLogin) {
      setShowLoginDialog(true);
      return;
    }
    navigate("/cart");
  };

  const handleNotificationClick = () => {
    if (!isLogin) {
      setShowNotificationLoginDialog(true);
    }
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
    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.25, md: 0.5 } }}>
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Notification */}
      {isLogin ? (
        <NotificationPopup />
      ) : (
        <Tooltip title={t("navigation.notification")} arrow>
          <IconButton aria-label="Notification" sx={iconButtonSx} onClick={handleNotificationClick}>
            <NotificationsIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
          </IconButton>
        </Tooltip>
      )}

      {/* Cart */}
      <Tooltip title={t("navigation.cart")} arrow>
        <IconButton aria-label="View cart" sx={iconButtonSx} onClick={handleCartClick}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
        </IconButton>
      </Tooltip>

      {/* User Name & Avatar - Grouped together */}
      <Tooltip title={t("navigation.account")} arrow>
        <Box
          onClick={handleAccountClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            transition: "all 0.2s ease",
            p: { xs: 1, md: 1.5 },
            "&:hover": {
              "& .MuiTypography-root": {
                color: "var(--color-primary)",
              },
              "& .MuiSvgIcon-root": {
                color: "var(--color-primary)",
              },
            },
          }}
        >
          {/* User Name - Only show on desktop when logged in */}
          {isLogin && user && (
            <Typography
              variant="body2"
              sx={{
                display: { xs: "none", md: "block" },
                color: "white",
                fontWeight: 500,
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.fullName || user.email}
            </Typography>
          )}

          {/* Account Icon/Avatar */}
          {isLogin && user ? (
            <Avatar
              src={user.avatarUrl}
              alt={user.fullName || user.email}
              sx={{
                width: { xs: 28, md: 36 },
                height: { xs: 28, md: 36 },
                bgcolor: "var(--color-primary)",
                fontSize: { xs: 13, md: 16 },
                fontWeight: 600,
                border: "2px solid white",
              }}
            >
              {(user.fullName || user.email || "U").charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <PersonOutlineOutlinedIcon sx={{ fontSize: { xs: 20, md: 24 }, color: "white" }} />
          )}
        </Box>
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
                <ListItemText>{t("navigation.profile")}</ListItemText>
              </MenuItem>,
              <MenuItem key="wishlít" onClick={handleWishlist}>
                <ListItemIcon>
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t("navigation.wishlist")}</ListItemText>
              </MenuItem>,
              <MenuItem key="order" onClick={handleOrder}>
                <ListItemIcon>
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t("navigation.orders")}</ListItemText>
              </MenuItem>,
              <Divider key="divider" />,
              <MenuItem key="logout" onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t("actions.logout")}</ListItemText>
              </MenuItem>,
            ]
          : [
              <MenuItem key="login" onClick={handleLogin}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t("actions.login")}</ListItemText>
              </MenuItem>,
              <MenuItem key="signup" onClick={handleSignUp}>
                <ListItemIcon>
                  <PersonAddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t("actions.signup")}</ListItemText>
              </MenuItem>,
            ]}
      </Menu>

      {/* Login Required Dialog for Cart */}
      <LoginRequiredDialog
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        message={t("messages.loginRequiredCart")}
        returnUrl="/cart"
      />

      {/* Login Required Dialog for Notifications */}
      <LoginRequiredDialog
        open={showNotificationLoginDialog}
        onClose={() => setShowNotificationLoginDialog(false)}
        message={t("messages.loginRequiredNotification")}
        returnUrl={window.location.pathname}
      />
    </Box>
  );
}

export default Actions;
