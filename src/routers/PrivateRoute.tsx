import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MyButton from "../components/common/Button";
import { useGlobal } from "../hooks/useGlobal";

export default function PrivateRoute() {
  const { isLogin } = useGlobal();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(!isLogin);

  if (isLogin) return <Outlet />;

  const handleCancel = () => {
    setOpen(false);
    navigate(-1); // quay về trang trước đó
  };

  const handleSignIn = () => {
    // Navigate to signin with return URL in state
    navigate("/signin", {
      state: { from: location.pathname + location.search },
    });
  };

  const handleSignUp = () => {
    // Navigate to signup with return URL in state
    navigate("/signup", {
      state: { from: location.pathname + location.search },
    });
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="xs" fullWidth>
      <Box sx={{ position: "relative", p: 3 }}>
        <IconButton
          aria-label="close"
          onClick={handleCancel}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Login Required
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          You need to login to access this page. Please sign in or create a new account.
        </Typography>

        <Stack direction="row" spacing={2}>
          <MyButton fullWidth colorScheme="orange" onClick={handleSignIn} sx={{ borderRadius: 0 }}>
            Sign In
          </MyButton>
          <MyButton fullWidth colorScheme="orange" onClick={handleSignUp} sx={{ borderRadius: 0 }}>
            Sign Up
          </MyButton>
        </Stack>
      </Box>
    </Dialog>
  );
}
