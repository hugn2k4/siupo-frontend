// src/components/PreOrderSummary.tsx
import React from "react";
import type { CartItem } from "../../../types/responses/product.response";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteIcon from "@mui/icons-material/Note";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

interface PreOrderSummaryProps {
  items: CartItem[];
  onEdit: () => void;
  onClear: () => void;
}

const PreOrderSummary: React.FC<PreOrderSummaryProps> = ({ items, onEdit, onClear }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) return null;

  return (
    <section className="py-8 px-4 from-amber-50 to-orange-50">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white shadow-lg overflow-hidden border-2 border-amber-200">
          {/* Header */}
          <div className="bg-primary from-amber-600 to-orange-600 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RestaurantIcon sx={{ fontSize: 32 }} />
                <div>
                  <h3 className="text-xl font-bold">Món ăn đã chọn</h3>
                  <p className="text-amber-100 text-sm">
                    {totalItems} món • {totalPrice.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onEdit}
                  className="bg-white text-amber-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-amber-50 transition flex items-center gap-1"
                >
                  <EditIcon sx={{ fontSize: 16 }} />
                  Sửa
                </button>
                <button
                  onClick={onClear}
                  className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-red-600 transition flex items-center gap-1"
                >
                  <DeleteIcon sx={{ fontSize: 16 }} />
                  Xóa
                </button>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                {/* Image */}
                <img
                  src={
                    item.imageUrls && item.imageUrls.length > 0
                      ? item.imageUrls[0]
                      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
                  }
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.price.toLocaleString("vi-VN")}đ × {item.quantity}
                  </p>
                  {item.note && (
                    <div className="flex items-start gap-1 mt-2 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
                      <NoteIcon sx={{ fontSize: 14 }} />
                      <span className="flex-1">{item.note}</span>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="font-bold text-lg text-amber-600">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="bg-blue-50 border-t-2 border-blue-200 px-6 py-4">
            <div className="flex items-start gap-3">
              <LightbulbIcon sx={{ fontSize: 28 }} className="text-blue-600" />
              <div className="flex-1">
                <h4 className="font-bold text-blue-900 mb-1">Lưu ý</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Món ăn sẽ được chuẩn bị sẵn khi bạn đến</li>
                  <li>• Bạn vẫn có thể gọi thêm món khác khi dùng bữa</li>
                  <li>• Thanh toán tại nhà hàng sau khi hoàn tất</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreOrderSummary;
