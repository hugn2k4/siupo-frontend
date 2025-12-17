import type { ProductResponse } from "../../../types/responses/product.response";
import type { Combo } from "../../../types/models/combo";
import OrderItem from "./OrderItem";

interface OrderedProduct {
  data: ProductResponse;
  quantity: number;
}

interface OrderedCombo {
  data: Combo;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderedProduct[];
  combos: OrderedCombo[];
  onIncItem: (id: number) => void;
  onDecItem: (id: number) => void;
  onRemoveItem: (id: number) => void;
  onIncCombo: (id: number) => void;
  onDecCombo: (id: number) => void;
  onRemoveCombo: (id: number) => void;
  onCheckout: () => void;
  loading?: boolean;
}

export default function OrderSummary({
  items,
  combos,
  onIncItem,
  onDecItem,
  onRemoveItem,
  onIncCombo,
  onDecCombo,
  onRemoveCombo,
  onCheckout,
  loading,
}: OrderSummaryProps) {
  const itemsTotal = items.reduce((s: number, it: OrderedProduct) => s + (it.data.price || 0) * it.quantity, 0);
  const combosTotal = combos.reduce((s: number, c: OrderedCombo) => s + (c.data.basePrice || 0) * c.quantity, 0);
  const total = itemsTotal + combosTotal;
  const disabled = total === 0 || (loading ?? false);

  return (
    <div className="bg-white rounded-lg p-4 shadow-md flex flex-col gap-3 text-slate-900">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
        <div className="font-semibold text-base">Order Summary</div>
      </div>

      <div className="flex flex-col gap-2">
        {items.length === 0 && combos.length === 0 && <div className="text-gray-500">Your cart is empty</div>}
        {items.map((it: OrderedProduct) => (
          <OrderItem
            key={it.data.id}
            data={it.data}
            quantity={it.quantity}
            onIncrease={() => onIncItem(it.data.id)}
            onDecrease={() => onDecItem(it.data.id)}
            onRemove={() => onRemoveItem(it.data.id)}
            thumbnail={it.data.imageUrls?.[0] || ""}
          />
        ))}
        {combos.map((c: OrderedCombo) => (
          <OrderItem
            key={`combo-${c.data.id}`}
            data={c.data}
            quantity={c.quantity}
            onIncrease={() => onIncCombo(c.data.id)}
            onDecrease={() => onDecCombo(c.data.id)}
            onRemove={() => onRemoveCombo(c.data.id)}
            thumbnail={c.data.imageUrls?.[0] || ""}
          />
        ))}
      </div>

      <div className="border-t border-dashed border-gray-200 pt-3">
        <div className="bg-amber-50 p-3 rounded-md">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">Items</div>
            <div className="font-semibold">${itemsTotal.toLocaleString()}</div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="text-sm text-gray-500">Combo</div>
            <div className="font-semibold">${combosTotal.toLocaleString()}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="font-extrabold text-lg">Total</div>
            <div className="font-extrabold text-lg">${total.toLocaleString()}</div>
          </div>
          <button
            onClick={onCheckout}
            disabled={disabled}
            className={`mt-3 w-full py-2 rounded-md font-semibold ${disabled ? "bg-gray-400 text-white" : "bg-amber-500 text-black shadow-md"}`}
          >
            {loading ? "Processing..." : "Pay with MoMo"}
          </button>
        </div>
      </div>
    </div>
  );
}
