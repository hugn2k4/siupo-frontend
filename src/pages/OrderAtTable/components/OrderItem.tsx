import type { ProductResponse } from "../../../types/responses/product.response";
import type { Combo } from "../../../types/models/combo";

interface OrderItemProps {
  data: ProductResponse | Combo;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  thumbnail?: string;
}

const isCombo = (data: ProductResponse | Combo): data is Combo => {
  return "basePrice" in data;
};

export default function OrderItem({ data, quantity, onIncrease, onDecrease, onRemove, thumbnail }: OrderItemProps) {
  const price = isCombo(data) ? data.basePrice : data.price;

  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-md border border-gray-100 bg-white">
      <div className="flex items-center gap-3 flex-1">
        {thumbnail ? (
          <img src={thumbnail} alt={data.name} className="w-12 h-12 object-cover rounded-md" />
        ) : (
          <div className="w-12 h-12 bg-gray-100 rounded-md" />
        )}
        <div>
          <div className="font-semibold text-sm text-gray-900">{data.name}</div>
          <div className="text-xs text-gray-500">{(price || 0).toLocaleString()} đ</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onDecrease} className="px-2 py-1 rounded-md border border-gray-200 bg-white text-sm">
          -
        </button>
        <div className="min-w-[36px] text-center font-semibold">{quantity}</div>
        <button onClick={onIncrease} className="px-2 py-1 rounded-md border border-gray-200 bg-white text-sm">
          +
        </button>
        <button onClick={onRemove} className="ml-2 text-xs text-red-500 hover:underline">
          Xóa
        </button>
      </div>
    </div>
  );
}
