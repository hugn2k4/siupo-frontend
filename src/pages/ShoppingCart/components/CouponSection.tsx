import React, { useState } from "react";

interface CouponSectionProps {
  onApplyCoupon: (code: string) => void;
}

const CouponSection: React.FC<CouponSectionProps> = ({ onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState("");

  const handleApply = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode.trim());
      setCouponCode("");
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Coupon Code</h3>
      <div className="border border-gray-300 p-4 rounded-lg bg-white">
        <p className="text-gray-600 text-sm mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum feugiat molestie bibendum non.
        </p>
        <div className="flex max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter Here code"
              className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={handleApply}
              className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponSection;
