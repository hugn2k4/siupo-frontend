import { Email, Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { Checkbox, Divider, FormControlLabel, IconButton, Link, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import MyButton from "../../components/common/Button";
import AuthFormWrapper from "./components/AuthFormWrapper";
import AuthTextField from "./components/AuthTextField";
import SocialLoginButtons from "./components/SocialLoginButtons";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", rememberMe: false });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [field]: field === "rememberMe" ? e.target.checked : e.target.value }));

  return (
    <AuthFormWrapper>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 500, textAlign: "start" }}>
        Sign Up
      </Typography>

      <AuthTextField
        label="Name"
        value={formData.name}
        onChange={handleChange("name")}
        startIcon={<Person sx={{ color: "var(--color-gray3)", fontSize: 20 }} />}
      />
      <AuthTextField
        label="Email"
        value={formData.email}
        onChange={handleChange("email")}
        startIcon={<Email sx={{ color: "var(--color-gray3)", fontSize: 20 }} />}
      />
      <AuthTextField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange("password")}
        startIcon={<Lock sx={{ color: "var(--color-gray3)", fontSize: 20 }} />}
        endIcon={
          <IconButton onClick={() => setShowPassword((prev) => !prev)} size="small" edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        }
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.rememberMe}
            onChange={handleChange("rememberMe")}
            sx={{ color: "var(--color-primary)", "&.Mui-checked": { color: "var(--color-primary)" } }}
            size="small"
          />
        }
        label={<Typography variant="body2">Remember me?</Typography>}
        sx={{ mb: 3 }}
      />

      <MyButton type="submit" colorScheme="orange" fullWidth sx={{ mb: 3, borderRadius: 0, textTransform: "none" }}>
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
  );
}
