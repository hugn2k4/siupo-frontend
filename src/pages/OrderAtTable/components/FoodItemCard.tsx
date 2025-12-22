import type { ProductResponse } from "../../../types/responses/product.response";

export default function FoodItemCard({
  item,
  onAdd,
}: {
  item: ProductResponse;
  onAdd: (item: ProductResponse) => void;
}) {
  const img = (item.imageUrls && item.imageUrls[0]) || "";
  return (
    <div className="group bg-white border border-gray-100 shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 overflow-hidden">
      <div className="w-full h-44 overflow-hidden">
        <img
          src={img}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="text-sm font-semibold text-gray-900">{item.name}</div>
          <div className="text-sm font-extrabold text-amber-500">${(item.price || 0).toLocaleString()}</div>
        </div>
        <div className="text-xs text-gray-500 line-clamp-2">{item.description}</div>
        <div className="mt-2 flex justify-end">
          <button
            onClick={() => onAdd(item)}
            className="px-4 py-2 bg-primary text-black font-semibold shadow-sm hover:opacity-95 transition"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
