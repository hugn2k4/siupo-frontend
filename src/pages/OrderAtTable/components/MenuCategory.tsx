// src/components/MenuCategory.tsx
import React from "react";
import type { CategoryResponse } from "../../../types/responses/product.response";

interface MenuCategoryProps {
  categories: CategoryResponse[];
  activeCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ categories, activeCategory, onSelectCategory }) => (
  <div className="px-4 lg:px-[100px] py-3 bg-white overflow-x-auto">
    <div className="flex space-x-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-5 py-2 font-semibold text-sm whitespace-nowrap transition ${
          activeCategory === null ? "bg-primary text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        ALL
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-5 py-2 font-semibold text-sm whitespace-nowrap transition ${
            activeCategory === category.id
              ? "bg-primary text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  </div>
);

export default MenuCategory;
