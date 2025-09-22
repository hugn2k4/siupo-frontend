import React from "react";
import { ArrowRight } from "lucide-react";
import CartItem from "./CartItem";

interface OrderSummaryProps {
  items: { name: string; weight: string; price: number; image: string }[];
  subtotal: number;
  shipping: number;
  discount: number; // giả sử là số tiền USD giảm
  tax: number;
  total: number;
  selectedPaymentMethod?: string;
  onProceedToPayment?: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  discount,
  tax,
  total,
  selectedPaymentMethod = "momo",
  onProceedToPayment,
}) => (
  <div className="bg-white p-6 border border-gray-400">
    <h3 className="text-lg font-semibold mb-4">Your Order Detail</h3>

    {/* Danh sách món ăn */}
    <div className="divide-y divide-gray-100">
      {items.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
    </div>

    {/* Tóm tắt chi phí */}
    <div className="mt-6 pt-4 border-t border-gray-400 space-y-2">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Shipping fee</span>
        <span className="text-green-600">{shipping === 0 ? "Free" : `$${shipping.toLocaleString()}`}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Discount</span>
        <span className="text-red-500">{discount > 0 ? `- $${discount.toLocaleString()}` : "- $0"}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Tax</span>
        <span>${tax.toLocaleString()}</span>
      </div>
      <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-400">
        <span>Total</span>
        <span>${total.toLocaleString()}</span>
      </div>
    </div>

    {/* Nút thanh toán */}
    <button
      onClick={onProceedToPayment}
      className="w-full mt-6 bg-primary hover:bg-orange-600 text-white font-medium py-3 px-4 flex items-center justify-center gap-2 transition-colors"
    >
      {selectedPaymentMethod === "cod" ? "Place Order" : "Pay Now"}
      <ArrowRight size={16} />
    </button>

    {/* Thông tin phương thức thanh toán đã chọn */}
    <div className="mt-4 text-center text-sm text-gray-600">
      {selectedPaymentMethod === "momo" && "Payment via MoMo e-wallet"}
      {selectedPaymentMethod === "vnpay" && "Payment via VNPay gateway"}
      {selectedPaymentMethod === "cod" && "Cash on Delivery (COD)"}
    </div>
  </div>
);

export default OrderSummary;
