import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, CircularProgress, Container, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/common/Button";
import { useSnackbar } from "../../hooks/useSnackbar";
import cartService from "../../services/cartService";
import type { CartItem } from "../../types/responses/cart.response";
import CartItemComponent from "./components/CartItemComponent";
import CouponSection from "./components/CouponSection";
import OrderSummary from "./components/OrderSummary";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await cartService.getCart();
        if (response.data) {
          setCartItems(response.data.items);
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        showSnackbar("Failed to load cart", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [showSnackbar]);

  const handleQuantityChange = async (id: number, newQuantity: number) => {
    const prevItems = [...cartItems];
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    try {
      await cartService.updateItemQuantity(id.toString(), newQuantity);
      // showSnackbar("Quantity updated successfully", "success");
    } catch (error) {
      console.error("Failed to update item quantity:", error);
      showSnackbar("Failed to update item quantity", "error");
      setCartItems(prevItems);
    }
  };

  const handleRemoveItem = async (id: number) => {
    const prevItems = [...cartItems];
    setCartItems((items) => items.filter((item) => item.id !== id));

    try {
      await cartService.removeCartItem(id.toString());
      showSnackbar("Item removed from cart", "success");
    } catch (error) {
      console.error("Failed to remove item:", error);
      showSnackbar("Failed to remove item", "error");
      setCartItems(prevItems);
    }
  };

  const handleApplyCoupon = (code: string) => {
    console.log("Applying coupon:", code);
    // Implement coupon logic here
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
    // Implement checkout logic here
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 20.0;
  const total = subtotal + shipping;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
          <CircularProgress />
        </Box>
      ) : cartItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "500px",
            textAlign: "center",
            py: 8,
          }}
        >
          <ShoppingCartOutlinedIcon
            sx={{
              fontSize: 120,
              color: "text.disabled",
              mb: 3,
            }}
          />
          <Typography variant="h4" fontWeight={600} color="text.primary" sx={{ mb: 1 }}>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400 }}>
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <MyButton colorScheme="orange" onClick={() => navigate("/shop")} sx={{ minWidth: 150 }}>
              Go to Shop
            </MyButton>
          </Stack>
        </Box>
      ) : (
        <Box>
          {/* Table Header - Desktop only */}
          <Box
            sx={{
              display: { xs: "none", md: "grid" },
              gridTemplateColumns: "5fr 2fr 2fr 2fr 1fr",
              gap: 2,
              p: 1.5,
              borderBottom: 1,
              borderColor: "divider",
              mb: 2,
            }}
          >
            <Typography variant="body1" fontWeight={700} color="var(--color-gray1)">
              Product
            </Typography>
            <Typography variant="body1" fontWeight={700} color="var(--color-gray1)">
              Price
            </Typography>
            <Typography variant="body1" fontWeight={700} color="var(--color-gray1)">
              Quantity
            </Typography>
            <Typography variant="body1" fontWeight={700} color="var(--color-gray1)">
              Total
            </Typography>
            <Typography variant="body1" fontWeight={700} color="var(--color-gray1)">
              Remove
            </Typography>
          </Box>

          {/* Cart Items */}
          <Box sx={{ bgcolor: "background.paper", borderRadius: 1, p: 2 }}>
            {cartItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <CartItemComponent item={item} onQuantityChange={handleQuantityChange} onRemove={handleRemoveItem} />
                {index < cartItems.length - 1 && <Divider sx={{ my: 2 }} />}
              </React.Fragment>
            ))}
          </Box>

          {/* Coupon and Summary */}
          <Stack direction={{ xs: "column", lg: "row" }} spacing={3} sx={{ mt: 3 }}>
            <Box sx={{ flex: 1 }}>
              <CouponSection onApplyCoupon={handleApplyCoupon} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <OrderSummary subtotal={subtotal} shipping={shipping} total={total} onCheckout={handleCheckout} />
            </Box>
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
