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
import type { CreateOrderRequest } from "../../types/requests/order.request";
import AddressItem from "./Components/AddressItem";
import OrderSummary from "./Components/OrderSummary";
import PaymentMethod from "./Components/PaymentMethod";
import Voucher from "./Components/Voucher";

const CheckoutPage: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<MethodPayment>(EMethodPayment.COD);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
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
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Các thông số tính toán
  const shipping = selectedPaymentMethod === EMethodPayment.COD ? 2 : 0;
  const discount = 0; // TODO: Tính từ voucher/coupon
  const vatRate = 0.1; // 10% VAT
  const vat = (subtotal - discount) * vatRate;

  // Tính total
  const baseTotal = subtotal + shipping - discount + vat;
  const finalTotal = baseTotal + shipping;

  // Dữ liệu đơn hàng
  const orderData = {
    items: cartItems,
    subtotal,
    shipping,
    discount,
    vat,
    total: finalTotal,
  };

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
      return;
    }
    const request: CreateOrderRequest = {
      items: orderData.items,
      shippingAddress: selectedAddress,
      paymentMethod: selectedPaymentMethod,
    };

    try {
      const res = await orderService.createOrder(request);
      const orderData = res.data;
      if (!orderData) throw new Error("Invalid order response");
      navigate("/order-success", { state: { orderId: orderData.orderId, order: orderData } });
    } catch (err) {
      console.error("Create order failed:", err);
      showSnackbar("Failed to create order", "error", 1000);
      window.scrollTo({ top: 0, behavior: "smooth" });
      await new Promise((res) => setTimeout(res, 1000));
      navigate("/cart");
    }
  };

  const handlePaymentMethodChange = (method: MethodPayment) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột bên trái - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address selector / add-new flow */}
            <AddressItem onSelect={(a) => setSelectedAddress(a)} />
            {/* Form voucher */ <Voucher title="Discount Code" />}

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
                items={orderData.items}
                subtotal={orderData.subtotal}
                shipping={orderData.shipping}
                discount={orderData.discount}
                vat={orderData.vat}
                total={finalTotal}
                selectedPaymentMethod={selectedPaymentMethod}
                onProceedToPayment={handleProceedToPayment}
                loading={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
