import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import MyButton from "../../../components/common/Button";
import { formatVND } from "../../../utils/format";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shipping, total, onCheckout }) => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 3, borderRadius: 1 }}>
      <Typography variant="h5" fontWeight={600} color="text.primary" sx={{ mb: 3 }}>
        Total Bill
      </Typography>

      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" fontWeight={600} color="var(--color-gray1)">
              Cart Subtotal
            </Typography>
            <Typography variant="body2" fontWeight={600} color="var(--color-gray1)">
              {formatVND(subtotal)}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="var(--color-gray1)">
              Shipping Charge
            </Typography>
            <Typography variant="body2" color="var(--color-gray1)">
              {formatVND(shipping)}
            </Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" fontWeight={600} color="var(--color-gray1)">
              Total Amount
            </Typography>
            <Typography variant="body1" fontWeight={600} color="var(--color-gray1)">
              {formatVND(total)}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <MyButton
        onClick={onCheckout}
        colorScheme="orange"
        fullWidth
        sx={{
          mt: 3,
          borderRadius: 0,
          textTransform: "none",
        }}
      >
        Proceed to Checkout
      </MyButton>
    </Box>
  );
};

export default OrderSummary;
