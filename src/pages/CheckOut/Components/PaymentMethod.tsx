import React from "react";
import iconCod from "../../../assets/icons/icon_cod.png";
import iconMomo from "../../../assets/icons/icon_momo.png";
import iconVnpay from "../../../assets/icons/icon_vnpay.png";
import { EMethodPayment, type MethodPayment } from "../../../types/enums/methodPayment.enum";

interface PaymentMethodProps {
  selectedMethod: MethodPayment;
  onMethodChange: (method: MethodPayment) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selectedMethod, onMethodChange }) => {
  const paymentMethods = [
    {
      id: EMethodPayment.COD,
      name: "Cash on Delivery (COD)",
      icon: iconCod,
    },
    {
      id: EMethodPayment.MOMO,
      name: "Online payment via MoMo e-wallet",
      icon: iconMomo,
    },
    {
      id: EMethodPayment.VNPAY,
      name: "Online payment via VNPay gateway",
      icon: iconVnpay,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Phương thức thanh toán */}
      <div className="bg-white p-6  border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="space-y-0 border border-gray-200 overflow-hidden">
          {paymentMethods.map((method, index) => (
            <label
              key={method.id}
              className={`block cursor-pointer transition-colors hover:bg-gray-50 ${
                index !== paymentMethods.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div className="p-4 flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={(e) => onMethodChange(e.target.value as MethodPayment)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                />
                <img src={method.icon} alt={method.name} className="w-8 h-8 object-contain" />
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
