// src/components/PaymentPage.tsx
import React, { useState } from "react";
import type { CartItem } from "../../../types/responses/product.response";

interface PaymentPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onConfirm: () => void;
  isBookingFlow?: boolean; // Để biết có phải từ booking flow không
}

const PaymentPage: React.FC<PaymentPageProps> = ({ cartItems, onBack, onConfirm, isBookingFlow = false }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b shadow-sm z-10">
        <div className="flex items-center px-4 py-4">
          <button onClick={onBack} className="text-2xl mr-3">
            ←
          </button>
          <h2 className="text-xl font-bold text-gray-800">
            {isBookingFlow ? "Xác nhận món đã chọn" : "Xác nhận đơn hàng"}
          </h2>
        </div>
      </div>

      <div className="p-4 pb-32">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-gray-800 mb-3">Chi tiết món ăn</h3>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-2 pb-2 border-b border-amber-200 last:border-0"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">x{item.quantity}</p>
                {item.note && <p className="text-xs text-amber-700 mt-1">📝 {item.note}</p>}
              </div>
              <span className="font-bold text-amber-700">{(item.price * item.quantity).toLocaleString("vi-VN")}đ</span>
            </div>
          ))}
        </div>

        {/* Chỉ hiển thị payment method nếu KHÔNG phải booking flow */}
        {!isBookingFlow && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
            <h3 className="font-bold text-gray-800 mb-3">Phương thức thanh toán</h3>
            <div className="space-y-2">
              {[
                { id: "cash", name: "Tiền mặt", icon: "💵" },
                { id: "momo", name: "MoMo", icon: "🔴" },
                { id: "zalopay", name: "ZaloPay", icon: "🔵" },
                { id: "banking", name: "Chuyển khoản", icon: "🏦" },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition ${
                    paymentMethod === method.id
                      ? "border-amber-600 bg-amber-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="flex items-center">
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <span className="font-semibold text-gray-800">{method.name}</span>
                  </span>
                  {paymentMethod === method.id && <span className="text-amber-600 text-xl">✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Info note cho booking flow */}
        {isBookingFlow && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <h4 className="font-bold text-blue-900 mb-1">Chọn món trước - Tiết kiệm thời gian</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Món ăn sẽ được chuẩn bị sẵn khi bạn đến</li>
                  <li>• Thanh toán tại nhà hàng khi dùng bữa</li>
                  <li>• Bạn vẫn có thể gọi thêm món khác khi đến</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tạm tính:</span>
            <span className="font-semibold">{subtotal.toLocaleString("vi-VN")}đ</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
            <span>Tổng cộng:</span>
            <span className="text-amber-600">{subtotal.toLocaleString("vi-VN")}đ</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl p-4">
        <button
          onClick={onConfirm}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-full font-bold text-lg shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
        >
          {isBookingFlow ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Xác nhận và tiếp tục đặt bàn
            </>
          ) : (
            "Xác nhận gọi món"
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
