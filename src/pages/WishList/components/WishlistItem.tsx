// src/Account/components/Wishlist/WishlistItem.tsx

import { X, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { WishlistItemResponse } from "../../../types/models/wishlist";

interface WishlistItemProps {
  item: WishlistItemResponse;
  onRemove: (productId: number) => void;
  onAddToCart: (productId: number) => void;
}

export default function WishlistItem({ item, onRemove, onAddToCart }: WishlistItemProps) {
  const navigate = useNavigate();
  const defaultImage = "https://via.placeholder.com/150";
  const primaryImage = item.productImages?.[0] || defaultImage;

  const handleProductClick = () => {
    // Navigate to product detail page
    navigate(`/shop/${item.productId}`);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking remove
    onRemove(item.productId);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    onAddToCart(item.productId);
  };

  return (
    <div
      onClick={handleProductClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="relative">
        {/* Remove Button */}
        <button
          onClick={handleRemoveClick}
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-red-50 transition-colors z-10"
          aria-label="Remove from wishlist"
        >
          <X size={18} className="text-red-500" />
        </button>

        {/* Product Image */}
        <img
          src={primaryImage}
          alt={item.productName}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
      </div>

      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">{item.productName}</h3>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[40px]">
          {item.productDescription || "No description available"}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold" style={{ color: "#FF9F0D" }}>
            ${item.productPrice?.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCartClick}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#FF9F0D" }}
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
