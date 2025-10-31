import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../../types/responses/cart.response";
import { formatVND } from "../../../utils/format";

interface CartItemProps {
  item: CartItem;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  const navigate = useNavigate();
  const goToProductDetail = () => {
    navigate(`/shop/${item.productId}`);
  };

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        flexDirection: { xs: "column", md: "unset" },
        gridTemplateColumns: { md: "5fr 2fr 2fr 2fr 1fr" },
        gap: 2,
        py: 1,
        alignItems: "center",
      }}
    >
      {/* Product */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        onClick={goToProductDetail}
        sx={{ cursor: "pointer", ":hover": { textDecoration: "underline" } }}
      >
        <Box
          component="img"
          src={item.productImage}
          alt={item.productName}
          sx={{
            width: 64,
            height: 64,
            borderRadius: 1,
            objectFit: "cover",
            bgcolor: "grey.200",
            flexShrink: 0,
          }}
        />
        <Box>
          <Typography variant="body1" fontWeight={500} color="text.primary" sx={{ mb: 0.5 }}>
            {item.productName}
          </Typography>
          <Rating name="product-rating" value={item.rating} precision={0.5} readOnly size="small" />
        </Box>
      </Stack>

      {/* Price */}
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ display: { md: "none" }, mb: 0.5 }}>
          Price:
        </Typography>
        <Typography variant="body1" color="text.primary">
          {formatVND(item.price)}
        </Typography>
      </Box>

      {/* Quantity Controls */}
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ display: { md: "none" }, mb: 0.5 }}>
          Qty:
        </Typography>
        <Stack
          direction="row"
          spacing={0}
          alignItems="center"
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: "fit-content",
          }}
        >
          <IconButton
            size="small"
            onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
            disabled={item.quantity === 1}
            sx={{ borderRadius: 0 }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ minWidth: 40, textAlign: "center" }}>{item.quantity}</Typography>
          <IconButton
            size="small"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            sx={{ borderRadius: 0 }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      {/* Total */}
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ display: { md: "none" }, mb: 0.5 }}>
          Total:
        </Typography>
        <Typography>{formatVND(item.price * item.quantity)}</Typography>
      </Box>

      {/* Remove Button */}
      <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "center" } }}>
        <IconButton
          size="small"
          onClick={() => onRemove(item.id)}
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "error.main",
              bgcolor: "error.lighter",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItemComponent;
