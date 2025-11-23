import { Apple as AppleIcon } from "@mui/icons-material";
import { Box } from "@mui/material";
import GoogleColorIcon from "../../../assets/icons/GoogleColorIcon";
import MyButton from "../../../components/common/Button";
import { BACKEND_BASE_URL } from "../../../config";

const SocialLoginButtons = () => {
  const handleGoogleLogin = () => {
    // Redirect to backend OAuth2 Google authorization endpoint
    window.location.href = `${BACKEND_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
      <MyButton
        fullWidth
        colorScheme="grey"
        startIcon={<GoogleColorIcon sx={{ fontSize: 20 }} />}
        sx={{ px: 0, py: 1.5, borderRadius: 0, textTransform: "none", fontWeight: "regular" }}
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </MyButton>
      <MyButton
        fullWidth
        colorScheme="grey"
        startIcon={<AppleIcon />}
        sx={{ py: 1.5, borderRadius: 0, textTransform: "none", fontWeight: "regular" }}
        disabled
      >
        Sign in with Apple
      </MyButton>
    </Box>
  );
};

export default SocialLoginButtons;
