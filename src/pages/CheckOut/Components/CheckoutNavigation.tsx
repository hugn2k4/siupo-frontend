import React from "react";
import { ArrowLeft } from "lucide-react";

interface CheckoutNavigationProps {
  onBackToCart: () => void;
  onProceedToShipping: () => void;
}

const CheckoutNavigation: React.FC<CheckoutNavigationProps> = ({ onBackToCart }) => (
  <div className="flex justify-between items-center pt-6">
    <button
      onClick={onBackToCart}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
    >
      <ArrowLeft size={16} />
      Back to Cart
    </button>
  </div>
);

export default CheckoutNavigation;
