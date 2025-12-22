import { Box } from "@mui/material";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "../../components/common/Button";
import { useSnackbar } from "../../hooks/useSnackbar";
import orderService from "../../services/orderService";
import { EMethodPayment, type MethodPayment } from "../../types/enums/methodPayment.enum";
import type { Address } from "../../types/models/address";
import type { CartItem } from "../../types/models/cartItem";
import type { OrderItem } from "../../types/models/orderItem";
import type { CreateOrderRequest } from "../../types/requests/order.request";
import AddressList from "./Components/AddressList";
import OrderSummary from "./Components/OrderSummary";
import PaymentMethod from "./Components/PaymentMethod";
import Voucher from "./Components/Voucher";

const CheckoutPage: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<MethodPayment>(EMethodPayment.COD);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [appliedVoucher, setAppliedVoucher] = useState<string>("");
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const { items } = location.state || { items: [] };

    if (!items || items.length === 0) {
      navigate("/cart", { replace: true });
    } else {
      setCartItems(items);
    }
  }, [location.state, navigate]);

  // Tính toán subtotal từ cart items
  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.product ? item.product.price : item.combo ? item.combo.basePrice : 0;
    return sum + itemPrice * item.quantity;
  }, 0);

  // Các thông số tính toán
  const shipping = selectedPaymentMethod === EMethodPayment.COD ? 2 : 0;
  const discount = voucherDiscount; // Discount từ voucher
  const vatRate = 0.1; // 10% VAT
  const vat = (subtotal - discount) * vatRate;

  // Tính total
  const finalTotal = subtotal - discount + vat + shipping;

  // Convert CartItem to OrderItem format for display
  const orderItems: OrderItem[] = cartItems.map((item) => ({
    id: item.id,
    product: item.product,
    combo: item.combo,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
  }));

  const handleBackToCart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/cart", {
      state: {
        selectedIds: cartItems.map((it) => it.id),
      },
    });
  };

  const handleGoToShop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/shop");
  };

  const handleProceedToPayment = async () => {
    if (!selectedAddress) {
      showSnackbar("Please select a shipping address", "error");
      return;
    }

    setLoading(true);

    // Convert CartItem to request format with proper product/combo structure
    const requestItems: OrderItem[] = cartItems.map((item) => ({
      id: item.id,
      product: item.product,
      combo: item.combo,
      quantity: item.quantity,
    }));

    const request: CreateOrderRequest = {
      items: requestItems,
      shippingAddress: selectedAddress,
      paymentMethod: selectedPaymentMethod,
      voucherCode: appliedVoucher || undefined, // Gửi voucher code nếu có
    };

    try {
      const res = await orderService.createOrder(request);
      const orderResponse = res.data;
      if (!orderResponse) throw new Error("Invalid order response");

      // If payment method is COD, go directly to success page
      if (selectedPaymentMethod === EMethodPayment.COD) {
        navigate("/order-success", { state: { orderId: orderResponse.orderId, order: orderResponse } });
        return;
      }

      // For online payments (MOMO/VNPAY), redirect to payment URL
      if (orderResponse.payUrl) {
        // Redirect to payment URL (MoMo payment page) in the same tab
        window.location.href = orderResponse.payUrl;
      } else {
        showSnackbar("Failed to get payment URL", "error", 1000);
        window.scrollTo({ top: 0, behavior: "smooth" });
        await new Promise((res) => setTimeout(res, 1000));
        navigate("/cart");
      }
    } catch (err) {
      console.error("Create order failed:", err);
      showSnackbar("Failed to create order", "error", 1000);
      window.scrollTo({ top: 0, behavior: "smooth" });
      await new Promise((res) => setTimeout(res, 1000));
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentMethodChange = (method: MethodPayment) => {
    setSelectedPaymentMethod(method);
  };

  const handleVoucherApply = (voucherCode: string, discountAmount: number) => {
    setAppliedVoucher(voucherCode);
    setVoucherDiscount(discountAmount);
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher("");
    setVoucherDiscount(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột bên trái - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address selector / add-new flow */}
            <AddressList onSelect={(a) => setSelectedAddress(a)} />
            {/* Form voucher */}
            <Voucher
              title="Discount Code"
              orderAmount={subtotal}
              appliedVoucher={appliedVoucher}
              onVoucherApply={handleVoucherApply}
              onRemoveVoucher={handleRemoveVoucher}
            />

            {/* Phương thức thanh toán */}
            <PaymentMethod selectedMethod={selectedPaymentMethod} onMethodChange={handlePaymentMethodChange} />

            {/* Navigation buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
              <MyButton
                fullWidth
                sx={{ borderRadius: 0 }}
                colorScheme="grey"
                onClick={handleBackToCart}
                startIcon={<ArrowLeft size={16} />}
              >
                Back to Cart
              </MyButton>

              <MyButton
                fullWidth
                sx={{ borderRadius: 0 }}
                colorScheme="orange"
                onClick={handleGoToShop}
                endIcon={<ArrowRight size={16} />}
              >
                Go to Shop
              </MyButton>
            </Box>
          </div>

          {/* Cột bên phải - Tóm tắt đơn hàng */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Sử dụng component OrderSummary */}
              <OrderSummary
                items={orderItems}
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                vat={vat}
                total={finalTotal}
                selectedPaymentMethod={selectedPaymentMethod}
                onProceedToPayment={handleProceedToPayment}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
