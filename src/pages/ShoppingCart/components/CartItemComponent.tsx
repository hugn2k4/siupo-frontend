import React from "react";
import { Plus, Minus, X } from "lucide-react";
import StarRating from "./StarRating";

// Types
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  rating: number;
}

interface CartItemProps {
  item: CartItem;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center">
      {/* Product - spans 5 columns on desktop */}
      <div className="col-span-1 md:col-span-5 flex items-center">
        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden mr-4 flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
          <StarRating rating={item.rating} />
        </div>
      </div>

      {/* Price - spans 2 columns on desktop */}
      <div className="col-span-1 md:col-span-2 text-gray-800 font-medium">
        <span className="md:hidden text-sm text-gray-600 mr-2">Price:</span>${item.price.toFixed(2)}
      </div>

      {/* Quantity Controls - spans 2 columns on desktop */}
      <div className="col-span-1 md:col-span-2">
        <div className=" items-center border border-gray-300 rounded-lg max-w-[84px]">
          <span className="md:hidden text-sm text-gray-600 mr-2">Qty:</span>
          <button
            onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
            disabled={item.quantity === 1}
            className={`p-1 rounded-full hover:bg-gray-100 ${
              item.quantity === 1 ? "opacity-50 cursor-not-allowed hover:bg-transparent" : ""
            }`}
          >
            <Minus size={16} />
          </button>
          <span className="mx-3 min-w-[30px] text-center">{item.quantity}</span>
          <button
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Total - spans 2 columns on desktop */}
      <div className="col-span-1 md:col-span-2 text-gray-800 font-medium">
        <span className="md:hidden text-sm text-gray-600 mr-2">Total:</span>${(item.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove Button - spans 1 column on desktop */}
      <div className="col-span-1 md:col-span-1 flex justify-start md:justify-center">
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;
