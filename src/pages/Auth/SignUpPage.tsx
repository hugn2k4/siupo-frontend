import { Email, Lock, Person, Phone, Visibility, VisibilityOff } from "@mui/icons-material";
import { Divider, IconButton, Link, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import MyButton from "../../components/common/Button";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { authService } from "../../services/authService";
import type { RegisterRequest } from "../../types/requests/auth.request";
import AuthFormWrapper from "./components/AuthFormWrapper";
import AuthTextField from "./components/AuthTextField";
import SocialLoginButtons from "./components/SocialLoginButtons";

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  fullName: string;
};

export default function SignUpPage() {
  const { showSnackbar } = useContext(SnackbarContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { isLoading },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      fullName: "",
    },
  });
  const onSubmit = async (data: SignUpFormData) => {
    const request: RegisterRequest = {
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      fullName: data.fullName,
    };

    try {
      const res = await authService.register(request);
      if (res.success) {
        showSnackbar("Register successful!", "success", 3000);
      } else {
        showSnackbar(res.message || "Register failed. Please try again.", "error", 4000);
      }
    } catch (error: unknown) {
      console.error("❌ Register error:", error);
      showSnackbar("Something went wrong. Please try again later.", "error", 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthFormWrapper>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 500, textAlign: "start" }}>
          Sign Up
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
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Please confirm your password",
            validate: (value) => value === watch("password") || "Passwords do not match",
          }}
          render={({ field, fieldState }) => (
            <AuthTextField
              {...field}
              label="Confirm Password"
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
            required: "Name is required",
          }}
          render={({ field, fieldState }) => (
            <AuthTextField
              {...field}
              label="Name"
              type="text"
              startIcon={<Person sx={{ color: "var(--color-gray3)", fontSize: 20 }} />}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        {/* Phone */}
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Invalid phone number",
            },
          }}
          render={({ field, fieldState }) => (
            <AuthTextField
              {...field}
              label="Phone"
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
          disabled={isLoading}
          isLoading={isLoading}
          sx={{ mt: 3, mb: 3, borderRadius: 0, textTransform: "none" }}
        >
          Sign Up
        </MyButton>

        <Divider sx={{ mb: 3 }}>OR</Divider>

        <SocialLoginButtons />

        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
          Already have an account?{" "}
          <Link component={RouterLink} to="/signin" sx={{ color: "var(--color-primary)", fontWeight: 600 }}>
            Sign in
          </Link>
        </Typography>
      </AuthFormWrapper>
    </form>
  );
}
