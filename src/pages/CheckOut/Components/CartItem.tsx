import React from "react";

interface CartItemProps {
  item: {
    name: string;
    weight: string;
    price: number;
    image: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => (
  <div className="flex items-center gap-3 py-3">
    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
    <div className="flex-1">
      <h4 className="font-medium text-gray-900">{item.name}</h4>
      <p className="text-sm text-gray-500">{item.weight}</p>
    </div>
    <div className="text-right">
      <p className="font-medium">{item.price}$</p>
    </div>
  </div>
);

export default CartItem;
