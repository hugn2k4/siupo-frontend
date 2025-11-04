// src/Account/components/Wishlist/WishlistHeader.tsx

import { Trash2 } from "lucide-react";

interface WishlistHeaderProps {
  totalItems: number;
  onClearAll: () => void;
}

export default function WishlistHeader({ totalItems, onClearAll }: WishlistHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Wishlist</h1>
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? "item" : "items"} saved
          </p>
        </div>

        {totalItems > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-red-600 border-2 border-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={18} />
            <span>Clear All</span>
          </button>
        )}
      </div>
    </div>
  );
}
