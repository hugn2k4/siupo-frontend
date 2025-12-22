import type { CartItem } from "../../../types/responses/product.response";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Props {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, q: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  onClose?: () => void;
  isBookingFlow?: boolean;
}

export default function CartPanel({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onClose,
  isBookingFlow,
}: Props) {
  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="w-full lg:w-96 bg-white border rounded-xl shadow-md flex flex-col max-h-[80vh] lg:sticky lg:top-24 overflow-hidden">
      <div className="px-4 py-3 border-b relative">
        <h3 className="text-lg font-bold text-gray-900 text-center">Shopping Cart</h3>
        {onClose && (
          <button onClick={onClose} className="absolute left-3 top-3 p-1 rounded hover:bg-gray-100">
            <CloseIcon />
          </button>
        )}
      </div>

      <div className="p-4 overflow-y-auto flex-1 space-y-3">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-6">Your cart is empty</div>
        ) : (
          cartItems.map((it) => (
            <div key={it.id} className="bg-white rounded-lg p-3 flex items-start gap-3 border">
              <img
                src={it.imageUrls?.[0] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100"}
                alt={it.name}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-900 truncate">{it.name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {it.quantity} × ${it.price.toLocaleString()}
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => onUpdateQuantity(it.id, Math.max(1, it.quantity - 1))}
                    className="w-8 h-8 rounded bg-gray-100"
                  >
                    −
                  </button>
                  <div className="font-medium">{it.quantity}</div>
                  <button
                    onClick={() => onUpdateQuantity(it.id, it.quantity + 1)}
                    className="w-8 h-8 rounded bg-orange-500 text-white"
                  >
                    +
                  </button>
                  <button onClick={() => onRemoveItem(it.id)} className="ml-auto text-sm text-red-500">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-700">Total</div>
          <div className="text-xl font-bold text-primary">${total.toLocaleString()}</div>
        </div>
        <button
          onClick={onCheckout}
          className="w-full bg-gradient-to-r from-orange-500 to-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <ArrowForwardIcon sx={{ fontSize: 18 }} /> {isBookingFlow ? "Confirm" : "Checkout"}
        </button>
      </div>
    </div>
  );
}
