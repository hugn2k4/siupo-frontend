import React from "react";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shipping, total, onCheckout }) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Total Bill</h3>

      <div className="space-y-4 mb-6 border border-gray-300 rounded-lg p-4 bg-gray-50">
        <div className="flex justify-between text-gray-600">
          <span>Cart Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping Charge</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        {/* Sử dụng margin âm để mở rộng hr */}
        <hr className="border-0 border-t border-gray-400 -mx-4" />
        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Total Amount</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full py-3 bg-primary text-white font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
