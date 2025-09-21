import AddressForm from "./Components/AddressForm";
import CheckoutNavigation from "./Components/CheckoutNavigation";
import OrderSummary from "./Components/OrderSummary";
import PaymentMethod from "./Components/PaymentMethod";
import Voucher from "./Components/Voucher";
import { useState } from "react";

const CheckoutPage: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("momo");

  // Dữ liệu mẫu cho đơn hàng
  const orderData = {
    items: [
      {
        name: "Chicken Tikka Kabab",
        weight: "150 gm net",
        price: 50,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=150&h=150&fit=crop&crop=center",
      },
      {
        name: "Chicken Tikka Kabab",
        weight: "150 gm net",
        price: 50,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=150&h=150&fit=crop&crop=center",
      },
      {
        name: "Chicken Tikka Kabab",
        weight: "150 gm net",
        price: 50,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=150&h=150&fit=crop&crop=center",
      },
    ],
    subtotal: 150,
    shipping: 0,
    discount: 25,
    tax: 54.76,
    total: 432.65,
  };

  // Thêm phí COD nếu chọn COD
  const finalTotal = selectedPaymentMethod === "cod" ? orderData.total + 15 : orderData.total;

  const handleBackToCart = () => {
    console.log("Quay lại giỏ hàng");
  };

  const handleProceedToPayment = () => {
    console.log("Tiến hành thanh toán với phương thức:", selectedPaymentMethod);
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột bên trái - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form địa chỉ giao hàng */}
            <AddressForm title="Address Details" />
            {/* Form voucher */ <Voucher title="Discount Code" />}

            {/* Phương thức thanh toán */}
            <PaymentMethod selectedMethod={selectedPaymentMethod} onMethodChange={handlePaymentMethodChange} />

            {/* Điều hướng - Sử dụng component CheckoutNavigation */}
            <CheckoutNavigation onBackToCart={handleBackToCart} onProceedToShipping={handleProceedToPayment} />
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
                tax={orderData.tax}
                total={finalTotal}
                selectedPaymentMethod={selectedPaymentMethod}
                onProceedToPayment={handleProceedToPayment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
