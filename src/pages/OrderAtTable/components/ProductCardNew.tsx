import type { ProductResponse } from "../../../types/responses/product.response";

interface Props {
  item: ProductResponse;
  quantity: number;
  onAdd: (p: ProductResponse) => void;
  onRemove: (id: number) => void;
  onOpenNote: (p: ProductResponse) => void;
}

export default function ProductCardNew({ item, quantity, onAdd, onRemove, onOpenNote }: Props) {
  const thumb =
    item.imageUrls && item.imageUrls.length
      ? item.imageUrls[0]
      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600";

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="h-44 w-full overflow-hidden rounded-t-xl">
        <img src={thumb} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</h4>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-500">USD</div>
            <div className="text-lg font-bold text-primary">${item.price.toLocaleString()}</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          {quantity > 0 ? (
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button onClick={() => onRemove(item.id)} className="w-8 h-8 rounded-md bg-white">
                −
              </button>
              <div className="font-medium">{quantity}</div>
              <button onClick={() => onAdd(item)} className="w-8 h-8 rounded-md bg-orange-500 text-white">
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAdd(item)}
              className="bg-gradient-to-r from-orange-500 to-primary text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          )}

          <button onClick={() => onOpenNote(item)} className="ml-auto text-sm text-gray-600">
            Add note
          </button>
        </div>
      </div>
    </article>
  );
}
