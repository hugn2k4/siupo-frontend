import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MyButton from "./Button";

interface LoginRequiredDialogProps {
  open: boolean;
  onClose: () => void;
  message?: string;
  returnUrl?: string;
}

const LoginRequiredDialog: React.FC<LoginRequiredDialogProps> = ({
  open,
  onClose,
  message = "You need to login to perform this action. Please sign in or create a new account.",
  returnUrl,
}) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin", {
      state: { from: returnUrl || window.location.pathname + window.location.search },
    });
    onClose();
  };

  const handleSignUp = () => {
    navigate("/signup", {
      state: { from: returnUrl || window.location.pathname + window.location.search },
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ position: "relative", p: 3 }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          {message}
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
};

export default LoginRequiredDialog;
