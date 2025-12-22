import SearchIcon from "@mui/icons-material/Search";
import type { CategoryResponse } from "../../../types/responses/product.response";

interface Props {
  value: string;
  onChange: (v: string) => void;
  categories: CategoryResponse[];
  activeCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export default function SearchHeader({ value, onChange, categories, activeCategory, onSelectCategory }: Props) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 lg:px-36 lg:pt-6 lg:pb-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 20 }} />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search for dishes, e.g: Burger, Pizza..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
          />
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onSelectCategory(null)}
              className={`px-3 py-1.5 text-sm rounded-full transition ${
                activeCategory === null ? "bg-primary text-white shadow" : "bg-gray-100 text-gray-700"
              }`}
            >
              All
            </button>

            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.id)}
                className={`px-3 py-1.5 text-sm rounded-full transition ${
                  activeCategory === c.id ? "bg-primary text-white shadow" : "bg-gray-100 text-gray-700"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
