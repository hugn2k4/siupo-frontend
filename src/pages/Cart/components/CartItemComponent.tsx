import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Checkbox, IconButton, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import type { CartItem } from "../../../types/models/cartItem";
import { formatCurrency } from "../../../utils/format";

interface CartItemProps {
  item: CartItem;
  isSelected: boolean;
  onToggle: (id: number) => void;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
  isUpdating?: boolean;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  isSelected,
  onToggle,
  onQuantityChange,
  onRemove,
  isUpdating = false,
}) => {
  const navigate = useNavigate();
  const goToProductDetail = () => {
    navigate(`/shop/${item.product.id}`);
  };

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        flexDirection: { xs: "column", md: "unset" },
        gridTemplateColumns: { md: "50px 1fr 140px 160px 140px 60px" },
        gap: { xs: 2, md: 2 },
        p: { xs: 2, md: 2 },
        alignItems: "center",
        transition: "background-color 0.2s ease",
        "&:hover": {
          bgcolor: { md: "#fafafa" },
        },
      }}
    >
      {/* Checkbox - Desktop */}
      <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
        <Checkbox
          checked={isSelected}
          onChange={() => onToggle(item.id)}
          sx={{
            p: 0,
            color: "var(--color-gray4)",
            "&.Mui-checked": {
              color: "var(--color-primary)",
            },
          }}
        />
      </Box>

      {/* Product */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        {/* Checkbox for mobile */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Checkbox
            checked={isSelected}
            onChange={() => onToggle(item.id)}
            sx={{
              color: "var(--color-gray4)",
              "&.Mui-checked": {
                color: "var(--color-primary)",
              },
            }}
          />
        </Box>
        <Box
          component="img"
          src={item.product.images[0].url}
          alt={item.product.name}
          sx={{
            width: { xs: 70, md: 80 },
            height: { xs: 70, md: 80 },
            borderRadius: 0,
            objectFit: "cover",
            bgcolor: "var(--color-gray5)",
            flexShrink: 0,
          }}
        />
        <Box
          onClick={goToProductDetail}
          sx={{
            cursor: "pointer",
            flex: 1,
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Typography
            variant="body1"
            fontWeight={500}
            color="var(--color-gray1)"
            sx={{
              mb: 0.5,
              fontSize: "0.95rem",
            }}
          >
            {item.product.name}
          </Typography>
          <Rating
            name="product-rating"
            value={item.rating}
            precision={0.5}
            readOnly
            size="small"
            sx={{
              "& .MuiRating-iconFilled": {
                color: "var(--color-primary)",
              },
            }}
          />
        </Box>
      </Stack>

      {/* Mobile Price & Total */}
      <Stack direction="row" spacing={2} sx={{ display: { xs: "flex", md: "none" }, justifyContent: "space-between" }}>
        <Box>
          <Typography variant="body2" color="var(--color-gray3)" sx={{ mb: 0.5, fontSize: "0.75rem" }}>
            Price
          </Typography>
          <Typography variant="body1" fontWeight={500} color="var(--color-gray1)" sx={{ fontSize: "0.875rem" }}>
            {formatCurrency(item.product.price, "USD")}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="var(--color-gray3)" sx={{ mb: 0.5, fontSize: "0.75rem" }}>
            Total
          </Typography>
          <Typography variant="body1" fontWeight={600} color="var(--color-primary)" sx={{ fontSize: "0.875rem" }}>
            {formatCurrency(item.product.price * item.quantity, "USD")}
          </Typography>
        </Box>
      </Stack>

      {/* Mobile Quantity & Remove */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: { xs: "flex", md: "none" }, justifyContent: "space-between", alignItems: "center" }}
      >
        <Stack
          direction="row"
          spacing={0}
          alignItems="center"
          sx={{
            border: "1px solid var(--color-gray5)",
            borderRadius: 0,
            opacity: isUpdating ? 0.6 : 1,
            pointerEvents: isUpdating ? "none" : "auto",
          }}
        >
          <IconButton
            size="small"
            onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
            disabled={item.quantity === 1 || isUpdating}
            sx={{ borderRadius: 0, px: 1, "&.Mui-disabled": { color: "var(--color-gray4)" } }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ minWidth: 36, textAlign: "center", fontWeight: 500, fontSize: "0.875rem" }}>
            {item.quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            disabled={isUpdating}
            sx={{ borderRadius: 0, px: 1 }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>
        <IconButton
          size="small"
          onClick={() => onRemove(item.id)}
          sx={{ color: "var(--color-gray3)", "&:hover": { color: "var(--color-error)" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>

      {/* Desktop Price */}
      <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "center" }}>
        <Typography variant="body1" fontWeight={500} color="var(--color-gray1)" sx={{ fontSize: "0.875rem" }}>
          {formatCurrency(item.product.price, "USD")}
        </Typography>
      </Box>

      {/* Desktop Quantity */}
      <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
        <Stack
          direction="row"
          spacing={0}
          alignItems="center"
          sx={{
            border: "1px solid var(--color-gray5)",
            borderRadius: 0,
            opacity: isUpdating ? 0.6 : 1,
            pointerEvents: isUpdating ? "none" : "auto",
          }}
        >
          <IconButton
            size="small"
            onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
            disabled={item.quantity === 1 || isUpdating}
            sx={{ borderRadius: 0, px: 1, "&.Mui-disabled": { color: "var(--color-gray4)" } }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ minWidth: 40, textAlign: "center", fontWeight: 500, px: 1, fontSize: "0.875rem" }}>
            {item.quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            disabled={isUpdating}
            sx={{ borderRadius: 0, px: 1 }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      {/* Desktop Total */}
      <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "center" }}>
        <Typography variant="body1" fontWeight={600} color="var(--color-primary)" sx={{ fontSize: "0.875rem" }}>
          {formatCurrency(item.product.price * item.quantity, "USD")}
        </Typography>
      </Box>

      {/* Desktop Remove */}
      <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
        <IconButton
          size="small"
          onClick={() => onRemove(item.id)}
          sx={{
            color: "var(--color-gray3)",
            "&:hover": {
              color: "var(--color-error)",
              bgcolor: "rgba(235, 87, 87, 0.05)",
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
