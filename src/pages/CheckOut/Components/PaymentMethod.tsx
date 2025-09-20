import React from "react";

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selectedMethod, onMethodChange }) => {
  const paymentMethods = [
    {
      id: "vnpay",
      name: "Online payment via VNPay gateway",
      icon: (
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 ">
          <span className="text-blue-600 font-bold text-xs">VN</span>
        </div>
      ),
    },
    {
      id: "momo",
      name: "Online payment via MoMo e-wallet",
      icon: (
        <div className="flex items-center justify-center w-8 h-8 bg-pink-500 ">
          <span className="text-white font-bold text-xs">mo</span>
        </div>
      ),
    },
    {
      id: "cod",
      name: "Cash on Delivery (COD)",
      icon: (
        <div className="flex items-center justify-center w-8 h-8 bg-green-100 ">
          <span className="text-green-600 text-lg">💵</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Phương thức thanh toán */}
      <div className="bg-white p-6 shadow-sm border border-gray-400">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="space-y-0 border border-gray-400 overflow-hidden">
          {paymentMethods.map((method, index) => (
            <label
              key={method.id}
              className={`block cursor-pointer transition-colors hover:bg-gray-50 ${
                index !== paymentMethods.length - 1 ? "border-b border-gray-400" : ""
              }`}
            >
              <div className="p-4 flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={(e) => onMethodChange(e.target.value)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                />
                {method.icon}
                <span className="text-gray-700 flex-1">{method.name}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
