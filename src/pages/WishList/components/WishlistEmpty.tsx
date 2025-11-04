// src/Account/components/Wishlist/WishlistEmpty.tsx

import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WishlistEmpty() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
      <div className="flex justify-center mb-6">
        <div className="rounded-full p-6" style={{ backgroundColor: "#FFF8ED" }}>
          <Heart size={64} style={{ color: "#FF9F0D" }} strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Wishlist is Empty</h2>

      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Save your favorite items here so you can easily find them later. Start exploring our menu!
      </p>

      <button
        onClick={() => navigate("/menu")}
        className="px-8 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
        style={{ backgroundColor: "#FF9F0D" }}
      >
        Browse Menu
      </button>
    </div>
  );
}
