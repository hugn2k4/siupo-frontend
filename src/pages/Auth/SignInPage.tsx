import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Checkbox, Divider, FormControlLabel, IconButton, Link, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import MyButton from "../../components/common/Button";
import { useGlobal } from "../../hooks/useGlobal";
import { useSnackbar } from "../../hooks/useSnackbar";
import { authService } from "../../services/authService";
import type { LoginRequest } from "../../types/requests/auth.request";
import AuthFormWrapper from "./components/AuthFormWrapper";
import AuthTextField from "./components/AuthTextField";
import SocialLoginButtons from "./components/SocialLoginButtons";

type SignInFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { showSnackbar } = useSnackbar();
  const { setGlobal } = useGlobal();

  // Get return URL from location state (set by PrivateRoute)
  const from = (location.state as { from?: string })?.from || "/";

  const onSubmit = async (data: SignInFormData) => {
    const request: LoginRequest = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await authService.login(request);
      if (res.success) {
        showSnackbar("Login successful!", "success", 3000);
        setGlobal({ isLogin: true, user: res.data?.user || null, accessToken: res.data?.accessToken || null });

        // Redirect to the page user was trying to access, or home
        navigate(from, { replace: true });
      } else {
        showSnackbar(res.message || "Login failed. Please try again.", "error", 4000);
      }
    } catch (error: unknown) {
      console.error("❌ Login error:", error);
      showSnackbar("Something went wrong. Please try again later.", "error", 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthFormWrapper>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 500, textAlign: "start" }}>
          Sign In
        </Typography>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          }}
          render={({ field, fieldState }) => (
            <AuthTextField
              {...field}
              label="Email"
              type="email"
              startIcon={<Email sx={{ color: "var(--color-gray3)", fontSize: 20 }} />}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          }}
          render={({ field, fieldState }) => (
            <AuthTextField
              {...field}
              label="Password"
              type={showPassword ? "text" : "password"}
              startIcon={<Lock sx={{ color: "var(--color-gray3)", fontSize: 20 }} />}
              endIcon={
                <IconButton onClick={() => setShowPassword((prev) => !prev)} size="small" edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    sx={{
                      color: "var(--color-primary)",
                      "&.Mui-checked": { color: "var(--color-primary)" },
                    }}
                    size="small"
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
            )}
          />
          <Typography
            variant="body2"
            onClick={() => navigate("/forgot-password")}
            sx={{
              color: "var(--color-primary)",
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": { textDecorationThickness: "2px" },
            }}
          >
            Forgotten password?
          </Typography>
        </Box>
        <MyButton
          type="submit"
          colorScheme="orange"
          fullWidth
          disabled={isLoading}
          isLoading={isLoading}
          sx={{
            mb: 3,
            borderRadius: 0,
            textTransform: "none",
          }}
        >
          Sign In
        </MyButton>

        <Divider sx={{ mb: 3 }}>OR</Divider>

        <SocialLoginButtons />

        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
          Don&apos;t have an account?{" "}
          <Link component={RouterLink} to="/signup" sx={{ color: "var(--color-primary)", fontWeight: 600 }}>
            Sign up
          </Link>
        </Typography>
      </AuthFormWrapper>
    </form>
  );
}
