// src/components/SearchBar.tsx
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => (
  <div className="px-4 lg:px-[100px] py-3 bg-white shadow-sm">
    <div className="relative">
      <input
        type="text"
        placeholder="Tìm kiếm món ăn..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
      />
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" sx={{ fontSize: 24 }} />
    </div>
  </div>
);

export default SearchBar;
