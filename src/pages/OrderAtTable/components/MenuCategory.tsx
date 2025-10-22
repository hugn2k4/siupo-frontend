// src/components/MenuCategory.tsx
import React from "react";

interface Props {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const MenuCategory: React.FC<Props> = ({ categories, activeCategory, onSelectCategory }) => (
  <div className="px-4 py-3 bg-white overflow-x-auto">
    <div className="flex space-x-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition ${
            activeCategory === category
              ? "bg-amber-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

export default MenuCategory;
