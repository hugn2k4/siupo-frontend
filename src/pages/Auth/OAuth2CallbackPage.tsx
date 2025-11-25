import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGlobal } from "../../hooks/useGlobal";
import { useSnackbar } from "../../hooks/useSnackbar";
import { authService } from "../../services/authService";
import type { Gender } from "../../types/enums/gender.enum";

export default function OAuth2CallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showSnackbar } = useSnackbar();
  const { setGlobal } = useGlobal();

  useEffect(() => {
    const processOAuth2Callback = async () => {
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      const email = searchParams.get("email");
      const error = searchParams.get("error");
      const errorMessage = searchParams.get("message");

      // Handle error case
      if (error) {
        console.error("OAuth2 authentication error:", error, errorMessage);
        showSnackbar(errorMessage || "Google login failed. Please try again.", "error", 4000);
        navigate("/signin", { replace: true });
        return;
      }

      // Handle success case
      if (accessToken && refreshToken && email) {
        try {
          // Save tokens first
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Get user info
          const userInfo = await authService.getCurrentUser();

          if (userInfo) {
            // Convert UserResponse to User type
            const user = {
              id: userInfo.id,
              email: userInfo.email,
              fullName: userInfo.fullName,
              phoneNumber: userInfo.phoneNumber,
              role: userInfo.role,
              dateOfBirth: userInfo.dateOfBirth,
              gender: userInfo.gender as Gender | undefined,
            };

            // Update global state
            setGlobal({
              isLogin: true,
              user: user,
              accessToken: accessToken,
            });

            showSnackbar("Login with Google successful!", "success", 3000);
            navigate("/", { replace: true });
          } else {
            throw new Error("Failed to fetch user information");
          }
        } catch (err) {
          console.error("Error processing OAuth2 login:", err);
          showSnackbar("Failed to complete login. Please try again.", "error", 4000);
          navigate("/signin", { replace: true });
        }
      } else {
        // Missing required parameters
        showSnackbar("Invalid OAuth2 callback. Please try again.", "error", 4000);
        navigate("/signin", { replace: true });
      }
    };

    processOAuth2Callback();
  }, [searchParams, navigate, showSnackbar, setGlobal]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 3,
      }}
    >
      <CircularProgress size={48} />
      <Typography variant="h6" color="text.secondary">
        Processing Google login...
      </Typography>
    </Box>
  );
}
