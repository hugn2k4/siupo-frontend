// src/components/MenuItemCard.tsx
import React from "react";
import type { ProductResponse } from "../../../types/responses/product.response";

interface MenuItemCardProps {
  item: ProductResponse;
  cartQuantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onAddNote: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, cartQuantity, onAdd, onRemove, onAddNote }) => {
  const isAvailable = item.status === "AVAILABLE";
  const thumbnail =
    item.imageUrls && item.imageUrls.length > 0
      ? item.imageUrls[0]
      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      <div className="relative">
        <img src={thumbnail} alt={item.name} className="w-full h-40 object-cover" />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold">Hết món</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-amber-600 font-bold text-lg">{item.price.toLocaleString("vi-VN")}đ</span>
          {cartQuantity > 0 ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={onRemove}
                className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
              >
                −
              </button>
              <span className="font-bold text-lg min-w-[20px] text-center">{cartQuantity}</span>
              <button
                onClick={onAdd}
                className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold hover:bg-amber-700 transition"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={onAdd}
              disabled={!isAvailable}
              className="bg-amber-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-amber-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Thêm
            </button>
          )}
        </div>
        {cartQuantity > 0 && (
          <button onClick={onAddNote} className="w-full mt-2 text-amber-600 text-sm font-semibold hover:text-amber-700">
            📝 Thêm ghi chú
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
