import React from "react";
import type { OrderItem as OrderItemType } from "../../../types/models/orderItem";
import { formatCurrency } from "../../../utils/format";

interface OrderItemProps {
  item: OrderItemType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => (
  <div className="flex items-center gap-3 py-3">
    <img
      src={item.product.images[0].url}
      alt={item.product.images[0].name}
      className="w-12 h-12 rounded-lg object-cover"
    />
    <div className="flex-1">
      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
    </div>
    <div className="text-right">
      <p className="font-medium text-gray-900"> {formatCurrency(item.product.price * item.quantity, "USD")}</p>
      <p className="text-xs text-gray-500"> {formatCurrency(item.product.price, "USD")}</p>
    </div>
  </div>
);

export default OrderItem;
