import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import MyButton from "../../../components/common/Button";

interface CouponSectionProps {
  onApplyCoupon: (code: string) => void;
}

const CouponSection: React.FC<CouponSectionProps> = ({ onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState("");

  const handleApply = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode.trim());
      setCouponCode("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  return (
    <Box sx={{ bgcolor: "white", p: 3, borderRadius: 0, border: "1px solid var(--color-gray5)" }}>
      <Typography variant="h6" fontWeight={600} color="var(--color-gray1)" sx={{ mb: 2 }}>
        Coupon Code
      </Typography>
      <Box sx={{ border: "1px solid var(--color-gray5)", borderRadius: 0, p: 2 }}>
        <Typography variant="body2" color="var(--color-gray2)" sx={{ mb: 2, fontSize: "0.875rem" }}>
          Enter your coupon code to get discount on your order.
        </Typography>
        <Box sx={{ display: "flex", gap: 0 }}>
          <TextField
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter coupon code"
            size="small"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
                "& fieldset": {
                  borderColor: "var(--color-gray5)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--color-primary)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--color-primary)",
                },
              },
            }}
          />
          <MyButton
            onClick={handleApply}
            colorScheme="orange"
            disabled={!couponCode.trim()}
            sx={{
              borderRadius: 0,
              minWidth: 90,
              textTransform: "none",
              height: 40,
              fontWeight: 600,
              fontSize: "0.875rem",
              "&.Mui-disabled": {
                bgcolor: "var(--color-gray5)",
                color: "var(--color-gray3)",
              },
            }}
          >
            Apply
          </MyButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CouponSection;
