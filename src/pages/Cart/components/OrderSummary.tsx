import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import MyButton from "../../../components/common/Button";
import { formatCurrency } from "../../../utils/format";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  disabled?: boolean;
  selectedCount?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping,
  total,
  onCheckout,
  disabled = false,
  selectedCount = 0,
}) => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 3,
        borderRadius: 0,
        border: "1px solid var(--color-gray5)",
      }}
    >
      <Typography variant="h6" fontWeight={600} color="var(--color-gray1)" sx={{ mb: 2 }}>
        Order Summary
      </Typography>

      {disabled && (
        <Box
          sx={{
            mb: 2,
            p: 1.5,
            bgcolor: "rgba(255, 159, 13, 0.08)",
            borderRadius: 0,
            border: "1px solid rgba(255, 159, 13, 0.2)",
          }}
        >
          <Typography variant="body2" color="var(--color-primary)" fontWeight={500} sx={{ fontSize: "0.875rem" }}>
            Please select at least one item to checkout
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          border: "1px solid var(--color-gray5)",
          borderRadius: 0,
          p: 2,
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="var(--color-gray2)" sx={{ fontSize: "0.875rem" }}>
              Subtotal ({selectedCount} {selectedCount === 1 ? "item" : "items"})
            </Typography>
            <Typography variant="body2" fontWeight={600} color="var(--color-gray1)" sx={{ fontSize: "0.875rem" }}>
              {formatCurrency(subtotal, "USD")}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="var(--color-gray2)" sx={{ fontSize: "0.875rem" }}>
              Shipping
            </Typography>
            <Typography variant="body2" fontWeight={600} color="var(--color-success)" sx={{ fontSize: "0.875rem" }}>
              {shipping === 0 ? "Free" : formatCurrency(shipping, "USD")}
            </Typography>
          </Stack>

          <Divider sx={{ borderColor: "var(--color-gray5)" }} />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" fontWeight={600} color="var(--color-gray1)">
              Total
            </Typography>
            <Typography variant="h6" fontWeight={700} color="var(--color-primary)">
              {formatCurrency(total, "USD")}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <MyButton
        onClick={onCheckout}
        colorScheme="orange"
        fullWidth
        disabled={disabled}
        sx={{
          mt: 3,
          py: 1.2,
          borderRadius: 0,
          textTransform: "none",
          fontSize: "0.9375rem",
          fontWeight: 600,
          "&.Mui-disabled": {
            bgcolor: "var(--color-gray5)",
            color: "var(--color-gray3)",
          },
        }}
      >
        Proceed to Checkout
      </MyButton>
    </Box>
  );
};

export default OrderSummary;
