// src/components/CartSummary.tsx
import React from "react";
import type { CartItem } from "../../../types/responses/product.response";

interface CartSummaryProps {
  cartItems: CartItem[];
  onCheckout: () => void;
  isBookingFlow?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, onCheckout, isBookingFlow = false }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-amber-600 shadow-2xl p-4 z-40">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-gray-600 text-sm">Total ({totalItems} dish)</p>
          <p className="text-2xl font-bold text-gray-800">{totalPrice.toLocaleString("vi-VN")}đ</p>
        </div>
        <button
          onClick={onCheckout}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2"
        >
          {isBookingFlow ? (
            <>
              Confirm
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          ) : (
            <>
              Order
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
