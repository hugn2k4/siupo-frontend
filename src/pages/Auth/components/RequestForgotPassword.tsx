import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../../../components/common/Button";
import { authService } from "../../../services/authService";

export default function RequestForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const res = await authService.requestForgotPassword(email);
      if (res.success) {
        navigate("set-new-password", { state: { email } });
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("❌ Forgot password request error:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ width: "100%", maxWidth: 520, mx: "auto" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Find Your Account
        </Typography>

        {error && (
          <Box
            sx={{
              mb: 1,
              p: 2,
              background: "linear-gradient(135deg, #fff5f5 0%, #ffeaea 100%)",
              border: "1px solid rgba(255, 0, 0, 0.2)",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#d32f2f", mb: 0.5 }}>
              Please identify this account another way
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Please identify your account using your email.
            </Typography>
          </Box>
        )}

        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Please enter your email address or mobile number to search for your account.
        </Typography>

        <TextField
          fullWidth
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (!isLoading) handleSearch();
            }
          }}
          disabled={isLoading}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderRadius: 0 },
              "&:hover fieldset": { borderColor: "var(--color-primary)", borderRadius: 0 },
              "&.Mui-focused fieldset": { borderColor: "var(--color-primary)", borderRadius: 0 },
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 1,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <MyButton
            colorScheme="grey"
            onClick={() => navigate("/signin")}
            sx={{ flex: 1, borderRadius: 0 }}
            disabled={isLoading}
          >
            Cancel
          </MyButton>

          <MyButton colorScheme="orange" onClick={handleSearch} sx={{ flex: 1, borderRadius: 0 }} isLoading={isLoading}>
            Search
          </MyButton>
        </Box>
      </Box>
    </Box>
  );
}
