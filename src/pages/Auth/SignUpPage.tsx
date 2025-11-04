import { Email, Lock, Person, Phone, Visibility, VisibilityOff } from "@mui/icons-material";
import { Divider, IconButton, Link, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MyButton from "../../components/common/Button";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useTranslation } from "../../hooks/useTranslation";
import { authService } from "../../services/authService";
import type { RegisterRequest } from "../../types/requests/auth.request";
import AuthFormWrapper from "./components/AuthFormWrapper";
import AuthTextField from "./components/AuthTextField";
import OTPPopup from "./components/OTPPopup";
import SocialLoginButtons from "./components/SocialLoginButtons";

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  fullName: string;
};

export default function SignUpPage() {
  const { t } = useTranslation("auth");
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit, watch } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      fullName: "",
    },
  });
  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    const request: RegisterRequest = {
      email: data.email,
      fullName: data.fullName,
      password: data.password,
      phoneNumber: data.phoneNumber,
    };
    try {
      const res = await authService.register(request);
      if (res.success) {
        if (res.code === "200") {
          showSnackbar(res.message, "info", 3000);
          setOpenOTP(true);
        } else if (res.code === "201") {
          showSnackbar(res.message, "success", 4000);
          setOtpAttempts(0);
          setOpenOTP(true);
        } else {
          showSnackbar(res.message || t("signUp.registerError"), "error", 4000);
        }
      } else {
        showSnackbar(res.message || t("signUp.registerError"), "error", 4000);
      }
    } catch (error: unknown) {
      console.error("❌ Register error:", error);
      showSnackbar(t("signUp.registerError"), "error", 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      const res = await authService.confirm({ email: watch("email"), otp: otp });
      if (res.success) {
        showSnackbar(res.message || t("signUp.verifySuccess"), "success", 3000);
        setOtpAttempts(0);
        setOpenOTP(false);
        navigate("/signin");
      } else {
        // Throw error để OTPPopup xử lý attempts
        throw new Error(res.message || "Invalid OTP code");
      }
    } catch (error: unknown) {
      console.error("❌ Confirm OTP error:", error);
      // Throw lại error để OTPPopup catch và xử lý attempts
      throw error;
    }
  };

  const handleResendOTP = async () => {
    try {
      const email = watch("email");
      if (!email) {
        showSnackbar(t("signUp.emailRequired"), "error", 3000);
        return;
      }

      const res = await authService.resendOTP(email);
      if (res.success) {
        showSnackbar(res.message || t("signUp.otpSent"), "success", 3000);
      } else {
        showSnackbar(res.message || t("signUp.otpFailed"), "error", 4000);
      }
    } catch (error: unknown) {
      console.error("❌ Resend OTP error:", error);
      showSnackbar("Failed to resend OTP. Please try again.", "error", 4000);
    }
  };
  return (
    <>
      {/* Popup OTP */}
      <OTPPopup
        open={openOTP}
        onClose={() => {
          setOpenOTP(false);
        }}
        onVerify={handleVerifyOTP}
        onResendOTP={handleResendOTP}
        email={watch("email")}
        title={t("otp.title")}
        description={t("otp.description")}
        maxAttempts={5}
        initialAttempts={otpAttempts}
        onAttemptsChange={setOtpAttempts}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthFormWrapper>
          <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 500, textAlign: "start" }}>
            {t("signUp.title")}
          </Typography>
          <Controller
            name="email"
            control={control}
            rules={{
              required: t("signUp.emailRequired"),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("signUp.emailInvalid"),
              },
            }}
            render={({ field, fieldState }) => (
              <AuthTextField
                {...field}
                label={t("signUp.email")}
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
              required: t("signUp.passwordRequired"),
              minLength: { value: 6, message: t("signUp.passwordMinLength") },
            }}
            render={({ field, fieldState }) => (
              <AuthTextField
                {...field}
                label={t("signUp.password")}
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
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: t("signUp.confirmPasswordRequired"),
              validate: (value) => value === watch("password") || t("signUp.passwordMismatch"),
            }}
            render={({ field, fieldState }) => (
              <AuthTextField
                {...field}
                label={t("signUp.confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                startIcon={<Lock sx={{ color: "var(--color-gray3)", fontSize: 20 }} />}
                endIcon={
                  <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)} size="small" edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="fullName"
            control={control}
            rules={{
              required: t("signUp.fullNameRequired"),
            }}
            render={({ field, fieldState }) => (
              <AuthTextField
                {...field}
                label={t("signUp.fullName")}
                type="text"
                startIcon={<Person sx={{ color: "var(--color-gray3)", fontSize: 20 }} />}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: t("signUp.phoneRequired"),
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: t("signUp.phoneInvalid"),
              },
            }}
            render={({ field, fieldState }) => (
              <AuthTextField
                {...field}
                label={t("signUp.phone")}
                type="tel"
                startIcon={<Phone sx={{ color: "var(--color-gray3)", fontSize: 20 }} />}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <MyButton
            type="submit"
            colorScheme="orange"
            fullWidth
            disabled={isSubmitting}
            isLoading={isSubmitting}
            sx={{ mt: 3, mb: 3, borderRadius: 0, textTransform: "none" }}
          >
            {t("signUp.submit")}
          </MyButton>

          <Divider sx={{ mb: 3 }}>{t("signUp.divider")}</Divider>

          <SocialLoginButtons />

          <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
            {t("signUp.haveAccount")}{" "}
            <Link component={RouterLink} to="/signin" sx={{ color: "var(--color-primary)", fontWeight: 600 }}>
              {t("signUp.signinLink")}
            </Link>
          </Typography>
        </AuthFormWrapper>
      </form>
    </>
  );
}
