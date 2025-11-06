import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Checkbox, CircularProgress, Container, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "../../components/common/Button";
import { useSnackbar } from "../../hooks/useSnackbar";
import cartService from "../../services/cartService";
import type { CartItem } from "../../types/models/cartItem";
import { formatCurrency } from "../../utils/format";
import CartItemComponent from "./components/CartItemComponent";
import CouponSection from "./components/CouponSection";
import OrderSummary from "./components/OrderSummary";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await cartService.getCart();
        if (response.data) {
          setCartItems(response.data.items);

          // If navigation to /cart included selectedIds in location.state, restore those selections
          const state = location.state as unknown as { selectedIds?: number[] } | undefined;
          const selectedIdsFromState = state?.selectedIds;
          if (Array.isArray(selectedIdsFromState) && selectedIdsFromState.length > 0) {
            const ids = response.data.items
              .filter((it: CartItem) => selectedIdsFromState.includes(it.id))
              .map((it: CartItem) => it.id);
            setSelectedItems(new Set(ids));
          } else {
            // default: select all items
            setSelectedItems(new Set(response.data.items.map((item: CartItem) => item.id)));
          }
        }
      } catch {
        showSnackbar("Failed to load cart", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [showSnackbar, location]);

  const handleQuantityChange = async (id: number, newQuantity: number) => {
    const prevItems = [...cartItems];
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    try {
      await cartService.updateItemQuantity(id.toString(), newQuantity);
      // showSnackbar("Quantity updated successfully", "success");
    } catch {
      showSnackbar("Failed to update item quantity", "error");
      setCartItems(prevItems);
    }
  };

  const handleRemoveItem = async (id: number) => {
    const prevItems = [...cartItems];
    const prevSelectedItems = new Set(selectedItems);

    setCartItems((items) => items.filter((item) => item.id !== id));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });

    try {
      await cartService.removeCartItem(id.toString());
      showSnackbar("Item removed from cart", "success");
    } catch {
      showSnackbar("Failed to remove item", "error");
      setCartItems(prevItems);
      setSelectedItems(prevSelectedItems);
    }
  };

  const handleToggleItem = (id: number) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleToggleAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map((item) => item.id)));
    }
  };

  const handleApplyCoupon = (code: string) => {
    console.log("Applying coupon:", code);
    // Implement coupon logic here
  };

  const handleCheckout = () => {
    const selectedCartItems = cartItems.filter((item) => selectedItems.has(item.id));

    navigate("/checkout", {
      state: {
        items: selectedCartItems,
      },
    });
  };

  const selectedCartItems = cartItems.filter((item) => selectedItems.has(item.id));
  const subtotal = selectedCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = selectedItems.size > 0 ? 2 : 0;
  const total = subtotal + shipping;
  const isAllSelected = cartItems.length > 0 && selectedItems.size === cartItems.length;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
          <CircularProgress sx={{ color: "var(--color-primary)" }} />
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
            bgcolor: "white",
            borderRadius: 0,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <ShoppingCartOutlinedIcon
            sx={{
              fontSize: 120,
              color: "var(--color-gray4)",
              mb: 3,
            }}
          />
          <Typography variant="h4" fontWeight={600} color="var(--color-gray1)" sx={{ mb: 1 }}>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="var(--color-gray3)" sx={{ mb: 4, maxWidth: 400 }}>
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <MyButton colorScheme="orange" onClick={() => navigate("/shop")} sx={{ minWidth: 150 }}>
              Go to Shop
            </MyButton>
          </Stack>
        </Box>
      ) : (
        <>
          {/* Title Section */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <ShoppingCartOutlinedIcon sx={{ fontSize: 28, color: "var(--color-primary)" }} />
              <Typography variant="h5" fontWeight={600} color="var(--color-gray1)">
                Shopping Cart
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color="var(--color-gray3)"
              sx={{
                ml: { sm: "auto !important" },
                fontSize: "0.875rem",
              }}
            >
              {selectedItems.size} of {cartItems.length} item{cartItems.length > 1 ? "s" : ""} selected
            </Typography>
          </Stack>

          {/* Table Header - Desktop only */}
          <Box
            sx={{
              display: { xs: "none", md: "grid" },
              gridTemplateColumns: "50px 1fr 140px 160px 140px 60px",
              gap: 2,
              px: 2,
              py: 1.5,
              bgcolor: "#fafafa",
              borderRadius: 0,
              alignItems: "center",
              border: "1px solid var(--color-gray5)",
              borderBottom: "none",
            }}
          >
            <Checkbox
              checked={isAllSelected}
              onChange={handleToggleAll}
              sx={{
                color: "var(--color-gray4)",
                "&.Mui-checked": {
                  color: "var(--color-primary)",
                },
                p: 0,
              }}
            />
            <Typography
              variant="body2"
              fontWeight={600}
              color="var(--color-gray2)"
              sx={{ fontSize: "0.875rem", ml: 1 }}
            >
              Product
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              color="var(--color-gray2)"
              sx={{ fontSize: "0.875rem", textAlign: "center" }}
            >
              Price
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              color="var(--color-gray2)"
              sx={{ fontSize: "0.875rem", textAlign: "center" }}
            >
              Quantity
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              color="var(--color-gray2)"
              sx={{ fontSize: "0.875rem", textAlign: "center" }}
            >
              Total
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              color="var(--color-gray2)"
              sx={{ fontSize: "0.875rem", textAlign: "center" }}
            ></Typography>
          </Box>

          {/* Cart Items */}
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 0,
              border: "1px solid var(--color-gray5)",
            }}
          >
            {cartItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <CartItemComponent
                  item={item}
                  isSelected={selectedItems.has(item.id)}
                  onToggle={handleToggleItem}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
                {index < cartItems.length - 1 && (
                  <Divider
                    sx={{
                      mx: 2,
                      borderColor: "var(--color-gray5)",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Box>

          {/* Mobile Summary Bar */}
          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "white",
              p: 2,
              mt: 2,
              borderRadius: 0,
              border: "1px solid var(--color-gray5)",
            }}
          >
            <Box>
              <Typography variant="body2" color="var(--color-gray3)" sx={{ mb: 0.5, fontSize: "0.875rem" }}>
                Total Amount
              </Typography>
              <Typography variant="h6" fontWeight={600} color="var(--color-primary)">
                {formatCurrency(total, "USD")}
              </Typography>
            </Box>
            <MyButton
              onClick={handleCheckout}
              colorScheme="orange"
              disabled={selectedItems.size === 0}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 0,
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Checkout
            </MyButton>
          </Box>

          {/* Coupon and Summary */}
          <Stack direction={{ xs: "column", lg: "row" }} spacing={3} sx={{ mt: 3 }}>
            <Box sx={{ flex: 1 }}>
              <CouponSection onApplyCoupon={handleApplyCoupon} />
            </Box>
            <Box sx={{ flex: 1, maxWidth: { lg: 420 } }}>
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                onCheckout={handleCheckout}
                disabled={selectedItems.size === 0}
                selectedCount={selectedItems.size}
              />
            </Box>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default Cart;
