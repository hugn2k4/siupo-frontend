import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Burger from "../../assets/images/image_burger.png";
import CartItemComponent from "./components/CartItemComponent";
import CouponSection from "./components/CouponSection";
import OrderSummary from "./components/OrderSummary";

// Types
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  rating: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Burger", image: Burger, price: 35500, quantity: 1, rating: 4 },
    { id: 2, name: "Fresh Lime", image: Burger, price: 25000, quantity: 1, rating: 4 },
    { id: 3, name: "Pizza", image: Burger, price: 15000, quantity: 1, rating: 4 },
    { id: 4, name: "Chocolate Muffin", image: Burger, price: 45500, quantity: 1, rating: 4 },
    { id: 5, name: "Cheese Butter", image: Burger, price: 15789.2, quantity: 1, rating: 3 },
  ]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
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
    </Container>
  );
};

export default Cart;
