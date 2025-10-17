import { Alert, Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "../../../components/common/Button";
import { authService } from "../../../services/authService";
import type { ForgotPasswordRequest } from "../../../types/requests/auth.request";

export default function SetNewPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    if (!email) navigate("/forgot-password");
  }, [email, navigate]);

  const handleResend = async () => {
    try {
      setLoading(true);
      const res = await authService.resendOTP(email);
      if (res.success) {
        setMessage({ type: "success", text: res.message || "OTP resent successfully." });
      } else {
        setMessage({ type: "error", text: res.message || "Failed to resend OTP." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Something went wrong while resending OTP." });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setMessage(null);

    if (!otp || !password || !confirmPassword) {
      setMessage({ type: "error", text: "All fields are required." });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    try {
      setLoading(true);
      const request: ForgotPasswordRequest = { email, otp, newPassword: password };
      const res = await authService.setNewPassword(request);
      if (!res.success) {
        setMessage({ type: "error", text: res.message || "Invalid OTP." });
        return;
      }
      setMessage({ type: "success", text: res.message || "Password updated successfully. Redirecting to sign in..." });
      setLoading(true);
      setTimeout(() => navigate("/signin"), 1200);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ width: "100%", maxWidth: 520, mx: "auto" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Reset Password
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <TextField
          fullWidth
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderRadius: 0 },
              "&:hover fieldset": { borderColor: "var(--color-primary)", borderRadius: 0 },
              "&.Mui-focused fieldset": { borderColor: "var(--color-primary)", borderRadius: 0 },
            },
          }}
        />

        <TextField
          fullWidth
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderRadius: 0 },
              "&:hover fieldset": { borderColor: "var(--color-primary)", borderRadius: 0 },
              "&.Mui-focused fieldset": { borderColor: "var(--color-primary)", borderRadius: 0 },
            },
          }}
        />
        <Box sx={{ display: "flex", gap: 1, mb: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <TextField
            placeholder="OTP code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{
              flex: 1,
              minWidth: 0,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderRadius: 0 },
                "&:hover fieldset": { borderColor: "var(--color-primary)", borderRadius: 0 },
                "&.Mui-focused fieldset": { borderColor: "var(--color-primary)", borderRadius: 0 },
              },
            }}
          />

          <MyButton
            colorScheme="grey"
            onClick={handleResend}
            isLoading={loading}
            sx={{ whiteSpace: "nowrap", borderRadius: 0 }}
          >
            Resend OTP
          </MyButton>
        </Box>

        <Box sx={{ display: "flex", gap: 1, mt: 1, flexDirection: { xs: "column", sm: "row" } }}>
          <MyButton colorScheme="grey" onClick={() => navigate("/signin")} sx={{ flex: 1, borderRadius: 0 }}>
            Cancel
          </MyButton>

          <MyButton colorScheme="orange" onClick={handleConfirm} sx={{ flex: 1, borderRadius: 0 }} isLoading={loading}>
            Confirm
          </MyButton>
        </Box>
      </Box>
    </Box>
  );
}
