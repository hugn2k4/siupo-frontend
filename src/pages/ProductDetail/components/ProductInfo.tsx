import AddIcon from "@mui/icons-material/Add";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Avatar, Box, Button, Divider, Rating, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaVk, FaYoutube } from "react-icons/fa";
import MyButton from "../../../components/common/Button";
import { EProductStatus } from "../../../types/enums/product.enum";
import type { ProductDetailResponse } from "../../../types/responses/product.response";

interface ProductInfoProps {
  product: ProductDetailResponse;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const isAvailable = product?.status === EProductStatus.AVAILABLE;
  // size for quantity cells (increase to match button height visually)
  const qtySize = 48;

  const displayStatus = isAvailable ? "Available" : "Unavailable";
  const displayPrice = new Intl.NumberFormat("vi-VN").format(150000) + " VND";

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ mb: 2 }}>
        <Box
          component="span"
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontSize: 12,
            fontWeight: 300,
            color: "common.white",
            bgcolor: isAvailable ? "var(--color-primary)" : "var(--color-gray3)",
            display: "inline-block",
          }}
        >
          {displayStatus}
        </Box>
      </Box>

      <Typography
        variant="h4"
        color="var(--color-gray1)"
        sx={{
          mb: 2,
          fontFamily: '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: { xs: "100%", sm: "400px", md: "600px" },
        }}
      >
        {product.name || "Unknown Product"}
      </Typography>

      <Typography
        variant="body2"
        color="var(--color-gray2)"
        sx={{
          mt: 3,
          mb: 3,
          whiteSpace: "pre-line",
          wordBreak: "break-word",
        }}
      >
        {product.description || "No product description available."}
      </Typography>

      <Divider sx={{ borderStyle: "solid", borderColor: "divider", my: 2 }} />

      <Box sx={{ mb: 2, mt: 3 }}>
        <Typography
          color="var(--color-gray1)"
          variant="h5"
          sx={{ fontFamily: '"Helvetica Neue", "Helvetica", "Arial", sans-serif' }}
        >
          {displayPrice}
        </Typography>
      </Box>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <Rating name="product-rating" value={product.rating || 0} precision={0.5} readOnly size="small" />
        <Divider orientation="vertical" flexItem />
        <Typography variant="body2" color="text.secondary">
          {(product.rating || 0).toFixed(1)} Rating
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="body2" color="text.secondary">
          {product.reviewCount || 0} Review
        </Typography>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="start" sx={{ mb: 5 }}>
        <Box
          sx={{
            display: "flex",
            border: 1,
            borderColor: "divider",
            borderRadius: 0,
            overflow: "hidden",
            "&:hover .qtyCell": { bgcolor: isAvailable ? "action.hover" : undefined },
          }}
        >
          {/* Left square: decrement */}
          <Box
            className="qtyCell"
            role="button"
            tabIndex={0}
            onClick={() => isAvailable && setQuantity(Math.max(1, quantity - 1))}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && isAvailable) setQuantity(Math.max(1, quantity - 1));
            }}
            sx={{
              width: qtySize,
              height: qtySize,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
              cursor: isAvailable ? "pointer" : "default",
              opacity: isAvailable ? 1 : 0.6,
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            <RemoveIcon fontSize="small" />
          </Box>

          {/* Middle square: quantity */}
          <Box
            className="qtyCell"
            sx={{
              width: 170 - qtySize * 2,
              height: qtySize,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 0,
            }}
          >
            <Typography>{quantity}</Typography>
          </Box>

          {/* Right square: increment */}
          <Box
            className="qtyCell"
            role="button"
            tabIndex={0}
            onClick={() => isAvailable && setQuantity(quantity + 1)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && isAvailable) setQuantity(quantity + 1);
            }}
            sx={{
              width: qtySize,
              height: qtySize,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
              cursor: isAvailable ? "pointer" : "default",
              opacity: isAvailable ? 1 : 0.6,
              borderLeft: 1,
              borderColor: "divider",
            }}
          >
            <AddIcon fontSize="small" />
          </Box>
        </Box>

        <MyButton
          colorScheme="orange"
          startIcon={<ShoppingBagOutlinedIcon />}
          disabled={!isAvailable}
          sx={{ textTransform: "none", borderRadius: 0, minWidth: "170px" }}
        >
          Add to Cart
        </MyButton>
      </Stack>

      <Divider sx={{ borderStyle: "solid", borderColor: "divider", my: 2 }} />

      <Box sx={{ mb: 4, ml: 0.5 }}>
        <Stack direction="row" spacing={0} alignItems="center">
          <Button
            startIcon={<FavoriteBorderOutlinedIcon />}
            variant="text"
            sx={{
              fontWeight: 400,
              textTransform: "none",
              color: "var(--color-gray2)",
              "&:hover": {
                color: "var(--color-primary)",
                backgroundColor: "transparent",
              },
              pl: 0.5,
            }}
          >
            Add to Wishlist
          </Button>
          <Button
            variant="text"
            startIcon={<CompareArrowsIcon />}
            sx={{
              fontWeight: 400,
              textTransform: "none",
              color: "var(--color-gray2)",
              "&:hover": {
                color: "var(--color-primary)",
                backgroundColor: "transparent",
              },
            }}
          >
            Compare
          </Button>
        </Stack>

        <Typography variant="body2" color="var(--color-gray2)">
          Category:{product.categoryName || "Unknown"}
        </Typography>
        <Typography variant="body2" color="var(--color-gray2)" sx={{ mt: 1 }}>
          Tag: {"Our Shop"}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Typography variant="body2" color="var(--color-gray2)">
            Share:
          </Typography>
          <Stack direction="row" spacing={2}>
            <Avatar sx={{ width: 26, height: 26, bgcolor: "var(--color-gray2)" }}>
              <FaYoutube color="white" size={14} />
            </Avatar>
            <Avatar sx={{ width: 26, height: 26, bgcolor: "var(--color-gray2)" }}>
              <FaFacebookF color="white" size={14} />
            </Avatar>
            <Avatar sx={{ width: 26, height: 26, bgcolor: "var(--color-gray2)" }}>
              <FaTwitter color="white" size={14} />
            </Avatar>
            <Avatar sx={{ width: 26, height: 26, bgcolor: "var(--color-gray2)" }}>
              <FaVk color="white" size={14} />
            </Avatar>
            <Avatar sx={{ width: 26, height: 26, bgcolor: "var(--color-gray2)" }}>
              <FaInstagram color="white" size={14} />
            </Avatar>
          </Stack>
        </Stack>
      </Box>
      <Divider sx={{ borderStyle: "solid", borderColor: "divider", my: 2 }} />
    </Box>
  );
};

export default ProductInfo;
