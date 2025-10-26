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

  return (
    <Box sx={{ p: 3, borderRadius: 1 }}>
      <Typography variant="h5" fontWeight={600} color="text.primary" sx={{ mb: 3 }}>
        Coupon Code
      </Typography>
      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Apply your coupon code to get discount on your order. Enter the code below and click Apply.
        </Typography>
        <Box sx={{ display: "flex", gap: 0, maxWidth: 500 }}>
          <TextField
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter Here code"
            size="small"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
                borderTopLeftRadius: 1,
                borderBottomLeftRadius: 1,
              },
            }}
          />
          <MyButton
            onClick={handleApply}
            colorScheme="orange"
            sx={{
              borderRadius: 0,
              borderTopRightRadius: 1,
              borderBottomRightRadius: 1,
              minWidth: 100,
              textTransform: "none",
              height: 40,
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
