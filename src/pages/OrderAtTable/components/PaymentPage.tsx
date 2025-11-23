// src/components/PaymentPage.tsx
import React, { useState } from "react";
import type { CartItem } from "../../../types/responses/product.response";
import iconCOD from "../../../assets/icons/icon_cod.png";
import iconMomo from "../../../assets/icons/icon_momo.png";
import iconVNPay from "../../../assets/icons/icon_vnpay.png";

interface PaymentPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onConfirm: () => void;
  isBookingFlow?: boolean;
  requiresPayment?: boolean;
}

const PaymentPage: React.FC<PaymentPageProps> = ({
  cartItems,
  onBack,
  onConfirm,
  isBookingFlow = false,
  requiresPayment = false,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const paymentMethods = [
    {
      id: "cash",
      name: "Tiền mặt",
      nameEn: "Cash on Delivery (COD)",
      bgColor: "bg-white",
      borderColor: "border-gray-300",
      hoverColor: "hover:border-gray-400",
      activeColor: "border-green-500 bg-green-50",
      icon: iconCOD,
    },
    {
      id: "momo",
      name: "Ví MoMo",
      nameEn: "MoMo E-Wallet",
      bgColor: "bg-white",
      borderColor: "border-gray-300",
      hoverColor: "hover:border-pink-300",
      activeColor: "border-pink-500 bg-pink-50",
      icon: iconMomo,
    },
    {
      id: "vnpay",
      name: "Ví VNPay",
      nameEn: "VNPay E-Wallet",
      bgColor: "bg-white",
      borderColor: "border-gray-300",
      hoverColor: "hover:border-blue-300",
      activeColor: "border-blue-500 bg-blue-50",
      icon: iconVNPay,
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b shadow-sm z-10">
        <div className="flex items-center px-4 py-4 max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="text-2xl mr-3 hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            ←
          </button>
          <h2 className="text-xl font-bold text-gray-800">
            {isBookingFlow ? "Xác nhận món đã chọn" : "Xác nhận đơn hàng"}
          </h2>
        </div>
      </div>

      <div className="p-4 pb-32 max-w-7xl mx-auto">
        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Chi tiết món ăn
              </h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-200 last:border-0">
                    <img
                      src={
                        item.imageUrls && item.imageUrls.length > 0
                          ? item.imageUrls[0]
                          : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200"
                      }
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 mb-1">{item.name}</p>
                      <p className="text-sm text-gray-600 mb-1">
                        {item.price.toLocaleString("vi-VN")}$ × {item.quantity}
                      </p>
                      {item.note && (
                        <p className="text-xs text-amber-700 mt-1 bg-amber-50 rounded px-2 py-1 inline-block border border-amber-200">
                          📝 {item.note}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end justify-start">
                      <span className="font-bold text-amber-700 text-lg whitespace-nowrap">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}$
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Note */}
            {requiresPayment ? (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-lg">
                      💳 Thanh toán trước - An tâm đặt bàn
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5 font-bold">✓</span>
                        <span>Món ăn sẽ được chuẩn bị sẵn khi bạn đến</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5 font-bold">✓</span>
                        <span>Không cần thanh toán lại tại nhà hàng</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5 font-bold">✓</span>
                        <span>Bạn vẫn có thể gọi thêm món khác khi đến</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2 text-lg">
                      ✨ Gọi món tại bàn
                    </h4>
                    <ul className="text-sm text-green-800 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5 font-bold">✓</span>
                        <span>Món ăn sẽ được phục vụ ngay cho bạn</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5 font-bold">✓</span>
                        <span>Thanh toán khi kết thúc bữa ăn</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5 font-bold">✓</span>
                        <span>Có thể gọi thêm món bất cứ lúc nào</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Payment Method - Only show if payment required */}
            {requiresPayment && (
              <div className="bg-white border-2 border-gray-200 rounded-lg p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Phương thức thanh toán
                </h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200 ${
                        paymentMethod === method.id
                          ? `${method.activeColor} shadow-md scale-[1.02]`
                          : `${method.bgColor} ${method.borderColor} ${method.hoverColor} hover:shadow-sm`
                      }`}
                    >
                      <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                        <img src={method.icon} alt={method.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-800">{method.name}</p>
                        <p className="text-xs text-gray-500">{method.nameEn}</p>
                      </div>
                      {paymentMethod === method.id && (
                        <svg className="w-6 h-6 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-5 shadow-sm sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Chi phí
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="text-gray-900 font-semibold">{subtotal.toLocaleString("vi-VN")}$</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Phí phục vụ:</span>
                  <span className="text-gray-900 font-semibold">0$</span>
                </div>
                <div className="flex justify-between text-base pb-3 border-b-2 border-gray-300">
                  <span className="text-gray-600">VAT (10%):</span>
                  <span className="text-gray-900 font-semibold">{(subtotal * 0.1).toLocaleString("vi-VN")}$</span>
                </div>
                <div className="flex justify-between items-center pt-3 bg-gradient-to-r from-amber-50 to-orange-50 -mx-5 px-5 py-4 -mb-5 rounded-b-lg">
                  <span className="text-gray-900 font-bold text-xl">Tổng cộng:</span>
                  <span className="text-primary font-bold text-3xl">{(subtotal * 1.1).toLocaleString("vi-VN")}$</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 shadow-2xl p-4 z-10">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onConfirm}
            className="w-full bg-gradient-to-r from-primary to-amber-600 hover:from-amber-700 hover:to-primary text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
          >
            {requiresPayment ? (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Thanh toán và tiếp tục đặt bàn
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Xác nhận gọi món
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
