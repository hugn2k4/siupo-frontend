import type { Combo } from "../../../types/models/combo";

export default function ComboCard({ combo, onAdd }: { combo: Combo; onAdd: (c: Combo) => void }) {
  const img = (combo.imageUrls && combo.imageUrls[0]) || "";
  return (
    <div className="group bg-amber-50 rounded-lg border border-amber-100 shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 overflow-hidden">
      <div className="w-full h-44 overflow-hidden">
        <img
          src={img}
          alt={combo.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-gray-900">{combo.name}</div>
          <div className="text-sm font-extrabold text-amber-600">${(combo.basePrice || 0).toLocaleString()}</div>
        </div>
        <div className="text-xs text-gray-600 line-clamp-2">{combo.description}</div>
        <div className="mt-2 flex justify-between items-center">
          <div className="text-xs text-amber-700 font-semibold px-2 py-1 bg-amber-100 rounded">Combo</div>
          <button
            onClick={() => onAdd(combo)}
            className="px-4 py-2 bg-amber-500 text-black rounded-md font-semibold shadow-sm hover:opacity-95 transition"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
