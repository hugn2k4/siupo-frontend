import React from "react";
import type { OrderItem as OrderItemType } from "../../../types/models/orderItem";
import { formatCurrency } from "../../../utils/format";

interface OrderItemProps {
  item: OrderItemType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  // Check if item is a combo or product
  const isCombo = !!item.combo;
  const isProduct = !!item.product;

  const itemPrice = isCombo && item.combo ? item.combo.basePrice : isProduct && item.product ? item.product.price : 0;

  const itemImage =
    isCombo && item.combo
      ? item.combo.imageUrls?.[0] || "/assets/images/placeholder.png"
      : isProduct && item.product
        ? item.product.images?.[0]?.url || "/assets/images/placeholder.png"
        : "/assets/images/placeholder.png";

  const itemName = isCombo && item.combo ? item.combo.name : isProduct && item.product ? item.product.name : "Unknown";

  return (
    <div className="flex items-center gap-3 py-3">
      <img src={itemImage} alt={itemName} className="w-12 h-12 rounded-lg object-cover" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-gray-900">{itemName}</h4>
          {isCombo && <span className="bg-orange-500 text-white px-1.5 py-0.5 text-xs font-bold">COMBO</span>}
        </div>
        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-gray-900">{formatCurrency(itemPrice * item.quantity, "USD")}</p>
        <p className="text-xs text-gray-500">{formatCurrency(itemPrice, "USD")}</p>
      </div>
    </div>
  );
};

export default OrderItem;
