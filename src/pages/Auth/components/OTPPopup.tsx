import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MyButton from "../../../components/common/Button";

interface OTPPopupProps {
  open: boolean;
  onClose: () => void;
  onVerify: (otp: string) => Promise<void> | void;
  loading?: boolean;
  email?: string;
  length?: number;
  title?: string;
  description?: string;
  onResendOTP?: () => void;
  maxAttempts?: number;
  initialAttempts?: number;
  onAttemptsChange?: (attempts: number) => void; // Callback để update attempts
}

const OTPPopup: React.FC<OTPPopupProps> = ({
  open,
  onClose,
  onVerify,
  loading = false,
  email = "",
  length = 6,
  title = "Enter OTP Code",
  description = "We've sent a verification code to your email.",
  onResendOTP,
  maxAttempts = 5,
  initialAttempts = 0,
  onAttemptsChange,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Reset OTP khi dialog mở, nhưng giữ lại attempts nếu có
  useEffect(() => {
    if (open) {
      setOtp(Array(length).fill(""));
      setIsVerifying(false);
      // Không tự động set countdown khi mở dialog
      // Chỉ set countdown khi người dùng thực sự resend
      setAttempts(initialAttempts); // Sử dụng attempts từ parent
      setErrorMessage("");
      setSuccessMessage("");
      // Auto focus vào ô đầu tiên
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    }
  }, [open, length, initialAttempts]);

  // Countdown timer cho resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Xử lý paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pastedData.length === length) {
      const newOtp = pastedData.split("").slice(0, length);
      setOtp(newOtp);
      // Focus vào ô cuối cùng
      inputsRef.current[length - 1]?.focus();
    }
  };

  // Xử lý khi nhập số
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const value = (e.target as HTMLInputElement).value;
    if (!/^\d?$/.test(value)) return;

    // Clear messages khi người dùng bắt đầu nhập
    if (errorMessage || successMessage) {
      setErrorMessage("");
      setSuccessMessage("");
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Xử lý backspace
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Xử lý resend OTP với countdown
  const handleResendOTP = () => {
    if (onResendOTP) {
      onResendOTP();
      setCountdown(60); // Bắt đầu đếm ngược 60 giây

      // Reset số lần thử về 0 khi resend thành công
      setAttempts(0);
      setErrorMessage(""); // Clear error message
      setSuccessMessage("New OTP code has been sent to your email!");

      // Thông báo parent về việc reset attempts
      if (onAttemptsChange) {
        onAttemptsChange(0);
      }

      // Clear success message sau 3 giây
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  // Xác nhận OTP
  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < length) {
      setErrorMessage(`Please enter all ${length} digits`);
      return;
    }

    setIsVerifying(true);
    setErrorMessage(""); // Clear error trước khi verify

    try {
      await onVerify(otpValue);
      // Thành công - chỉ hiển thị thông báo, để parent tự đóng dialog
      setErrorMessage("");
      setSuccessMessage("OTP verified successfully!");

      // Reset state nhưng không tự động đóng dialog
      setOtp(Array(length).fill(""));
      setAttempts(0);

      // Clear success message sau 2 giây (trước khi parent đóng)
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("OTP verification error:", error);

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      // Thông báo parent về số attempts mới
      if (onAttemptsChange) {
        onAttemptsChange(newAttempts);
      }

      const remainingAttempts = maxAttempts - newAttempts;

      if (remainingAttempts > 0) {
        // Còn lượt thử - hiển thị lỗi và số lần còn lại
        setErrorMessage(`Invalid OTP code. ${remainingAttempts} attempt${remainingAttempts > 1 ? "s" : ""} remaining.`);

        // Clear OTP để nhập lại
        setOtp(Array(length).fill(""));
        setTimeout(() => inputsRef.current[0]?.focus(), 100);
      } else {
        // Hết lượt thử - tự động đóng
        setErrorMessage("Too many failed attempts. Please try again later.");

        // Đóng dialog sau 3 giây
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", pb: 1 }}>{title}</DialogTitle>
      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Typography variant="body2" sx={{ mb: 2, textAlign: "center", color: "text.secondary" }}>
          {description}
          {email && (
            <>
              <br />
              <strong>{email}</strong>
            </>
          )}
        </Typography>

        <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 }, justifyContent: "center", mb: 3 }}>
          {otp.map((value, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputsRef.current[index] = el)}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={isVerifying || loading}
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center" },
              }}
              variant="outlined"
              size="medium"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: { xs: 48, sm: 56 },
                  width: { xs: 48, sm: 56 },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#c4c4c4",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--color-primary)",
                    borderWidth: 2,
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e0e0e0",
                  borderWidth: 1,
                },
                "& input": {
                  fontSize: { xs: 20, sm: 24 },
                  fontWeight: 600,
                  color: "#333",
                  "&:focus": {
                    color: "var(--color-primary)",
                  },
                },
              }}
            />
          ))}
        </Box>

        {/* Error Message */}
        {errorMessage && (
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              textAlign: "center",
              color: "error.main",
              backgroundColor: "rgba(244, 67, 54, 0.1)",
              padding: 1,
              borderRadius: 1,
              fontSize: { xs: 12, sm: 14 },
            }}
          >
            {errorMessage}
          </Typography>
        )}

        {/* Success Message */}
        {successMessage && (
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              textAlign: "center",
              color: "success.main",
              backgroundColor: "rgba(76, 175, 80, 0.1)",
              padding: 1,
              borderRadius: 1,
              fontSize: { xs: 12, sm: 14 },
            }}
          >
            {successMessage}
          </Typography>
        )}

        {/* Attempts Counter */}
        {attempts > 0 && attempts < maxAttempts && (
          <Typography
            variant="caption"
            sx={{
              mb: 2,
              textAlign: "center",
              color: "text.secondary",
              display: "block",
              fontSize: { xs: 11, sm: 12 },
            }}
          >
            Attempt {attempts} of {maxAttempts}
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 }, justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={handleResendOTP}
            disabled={!onResendOTP || isVerifying || loading || countdown > 0}
            sx={{
              flex: 1,
              maxWidth: {
                xs: `${(48 + 4) * 3 - 2}px`,
                sm: `${(56 + 8) * 3 - 4}px`,
              },
              py: { xs: 1.2, sm: 1.5 },
              fontSize: { xs: 14, sm: 16 },
              textTransform: "none",
              borderColor: "var(--color-primary)",
              color: countdown > 0 || !onResendOTP ? "text.disabled" : "var(--color-primary)",
              "&:hover": {
                borderColor: countdown > 0 || !onResendOTP ? "text.disabled" : "var(--color-primary)",
                bgcolor: countdown > 0 || !onResendOTP ? "transparent" : "rgba(255, 111, 97, 0.04)",
              },
            }}
          >
            {countdown > 0 ? `Resend (${countdown}s)` : "Resend Code"}
          </Button>
          <MyButton
            colorScheme="orange"
            onClick={handleVerify}
            disabled={isVerifying || loading || otp.some((digit) => !digit)}
            isLoading={isVerifying || loading}
            sx={{
              flex: 1,
              maxWidth: {
                xs: `${(48 + 4) * 3 - 2}px`, // mobile: 3 ô * (48px + 4px gap) - 2px
                sm: `${(56 + 8) * 3 - 4}px`, // desktop: 3 ô * (56px + 8px gap) - 4px
              },
              py: { xs: 1.2, sm: 1.5 },
              fontSize: { xs: 14, sm: 16 },
            }}
          >
            {isVerifying || loading ? "Verifying..." : "Verify"}
          </MyButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OTPPopup;
