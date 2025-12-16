import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Checkbox, Divider, FormControlLabel, IconButton, Link, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import MyButton from "../../components/common/Button";
import { useGlobal } from "../../hooks/useGlobal";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useTranslation } from "../../hooks/useTranslation";
import { authService } from "../../services/authService";
import type { LoginRequest } from "../../types/requests/auth.request";
import AuthFormWrapper from "./components/AuthFormWrapper";
import AuthTextField from "./components/AuthTextField";
import SocialLoginButtons from "./components/SocialLoginButtons";
import type { User } from "../../types/models/user";

type SignInFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};
type ApiUserResponse = User & {
  avatar?: {
    url: string;
  };
};
export default function SignInPage() {
  const { t } = useTranslation("auth");
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
        showSnackbar(t("signIn.loginSuccess"), "success", 3000);
        const apiUser = res.data?.user as ApiUserResponse | undefined;

        const processedUser = apiUser
          ? {
              ...apiUser,
              avatarUrl: apiUser.avatar?.url || undefined,
            }
          : null;

        setGlobal({
          isLogin: true,
          user: processedUser,
          accessToken: res.data?.accessToken || null,
        });

        // Redirect to the page user was trying to access, or home
        navigate(from, { replace: true });
      } else {
        showSnackbar(res.message || t("signIn.loginError"), "error", 4000);
      }
    } catch (error: unknown) {
      console.error("❌ Login error:", error);
      showSnackbar(t("signIn.loginError"), "error", 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthFormWrapper>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 500, textAlign: "start" }}>
          {t("signIn.title")}
        </Typography>
        <Controller
          name="email"
          control={control}
          rules={{
            required: t("signIn.emailRequired"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("signIn.emailInvalid"),
            },
          }}
          render={({ field, fieldState }) => (
            <AuthTextField
              {...field}
              label={t("signIn.email")}
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
            required: t("signIn.passwordRequired"),
            minLength: { value: 6, message: t("signIn.passwordMinLength") },
          }}
          render={({ field, fieldState }) => (
            <AuthTextField
              {...field}
              label={t("signIn.password")}
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
                label={<Typography variant="body2">{t("signIn.rememberMe")}</Typography>}
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
            {t("signIn.forgotPassword")}
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
          {t("signIn.submit")}
        </MyButton>

        <Divider sx={{ mb: 3 }}>{t("signIn.divider")}</Divider>

        <SocialLoginButtons />

        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
          {t("signIn.noAccount")}{" "}
          <Link component={RouterLink} to="/signup" sx={{ color: "var(--color-primary)", fontWeight: 600 }}>
            {t("signIn.signUpLink")}
          </Link>
        </Typography>
      </AuthFormWrapper>
    </form>
  );
}
