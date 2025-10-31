import { Check, Gift, Percent, Tag, X } from "lucide-react";
import React, { useState } from "react";

interface VoucherItem {
  code: string;
  discount: number;
  type: "percent" | "fixed";
  title: string;
  description: string;
  minOrder: number;
  maxDiscount?: number;
  expiry: string;
}

interface VoucherProps {
  onVoucherApply?: (voucherCode: string, discount: number) => void;
  appliedVoucher?: string;
  onRemoveVoucher?: () => void;
  title?: string; // ✅ cho phép truyền title từ ngoài
}

const Voucher: React.FC<VoucherProps> = ({
  onVoucherApply,
  appliedVoucher,
  onRemoveVoucher,
  title = "Discount Code", // ✅ mặc định
}) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAvailableVouchers, setShowAvailableVouchers] = useState(false);

  // Danh sách voucher có sẵn (demo)
  const availableVouchers: VoucherItem[] = [
    {
      code: "SAVE20",
      discount: 20,
      type: "percent",
      title: "20% Off",
      description: "20% discount for orders over $200",
      minOrder: 200000,
      maxDiscount: 50000,
      expiry: "31/12/2024",
    },
    {
      code: "FREESHIP",
      discount: 30000,
      type: "fixed",
      title: "Free Shipping",
      description: "Free shipping for orders over $150",
      minOrder: 150000,
      expiry: "25/12/2024",
    },
    {
      code: "NEWUSER",
      discount: 15,
      type: "percent",
      title: "15% Off for New Users",
      description: "For first-time registered customers",
      minOrder: 100000,
      maxDiscount: 30000,
      expiry: "30/12/2024",
    },
  ];

  const handleApplyVoucher = () => {
    if (!voucherCode.trim()) {
      setError("Please enter discount code");
      return;
    }

    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const voucher = availableVouchers.find((v) => v.code === voucherCode.toUpperCase());

      if (voucher) {
        onVoucherApply?.(voucher.code, voucher.discount);
        setVoucherCode("");
      } else {
        setError("Invalid or expired voucher code");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSelectVoucher = (voucher: VoucherItem) => {
    onVoucherApply?.(voucher.code, voucher.discount);
    setShowAvailableVouchers(false);
  };

  const handleRemoveVoucher = () => {
    onRemoveVoucher?.();
    setError("");
  };

  return (
    <div className="bg-white p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="text-orange-500" size={20} />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {/* Voucher đã áp dụng */}
      {appliedVoucher && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="text-green-600" size={16} />
            <span className="text-green-700 font-medium">{appliedVoucher}</span>
            <span className="text-green-600 text-sm">applied</span>
          </div>
          <button onClick={handleRemoveVoucher} className="text-green-600 hover:text-green-800 p-1">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Form nhập voucher */}
      {!appliedVoucher && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                placeholder="Enter discount code"
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={isLoading}
              />
              {error && <p className="absolute -bottom-6 left-0 text-red-500 text-sm">{error}</p>}
            </div>
            <button
              onClick={handleApplyVoucher}
              disabled={isLoading || !voucherCode.trim()}
              className="px-6 py-3 bg-primary hover:bg-orange-600 disabled:bg-gray-300 text-white font-mediumtransition-colors"
            >
              {isLoading ? "Applying..." : "Apply"}
            </button>
          </div>

          {/* Toggle danh sách voucher */}
          <button
            onClick={() => setShowAvailableVouchers(!showAvailableVouchers)}
            className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1"
          >
            <Gift size={16} />
            {showAvailableVouchers ? "Hide available vouchers" : "View available vouchers"}
          </button>
        </div>
      )}

      {/* Danh sách voucher có sẵn */}
      {showAvailableVouchers && !appliedVoucher && (
        <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
          <h4 className="font-medium text-gray-700 text-sm">Available vouchers:</h4>
          {availableVouchers.map((voucher) => (
            <div
              key={voucher.code}
              className="border border-gray-200 rounded-lg p-3 hover:border-orange-300 transition-colors cursor-pointer group"
              onClick={() => handleSelectVoucher(voucher)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-bold">
                      {voucher.code}
                    </div>
                    <div className="flex items-center gap-1 text-orange-600">
                      <Percent size={12} />
                      <span className="text-sm font-medium">{voucher.title}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs mb-1">{voucher.description}</p>
                  <p className="text-gray-500 text-xs">Exp: {voucher.expiry}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 bg-orange-500 text-white px-3 py-1 rounded text-xs transition-opacity">
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ghi chú */}
      <div className="mt-4 p-3 bg-blue-50 borde border-blue-200 rounded-none">
        <div className="flex items-start gap-2">
          <Gift className="text-blue-600 mt-0.5" size={16} />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Voucher usage notes:</p>
            <ul className="text-xs space-y-1">
              <li>• Only one voucher can be applied per order</li>
              <li>• Vouchers cannot be converted to cash</li>
              <li>• Check usage conditions before applying</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voucher;
