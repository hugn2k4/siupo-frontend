// src/components/Header.tsx
import React from "react";

interface HeaderProps {
  tableName: string;
}

const Header: React.FC<HeaderProps> = ({ tableName }) => (
  <header className="bg-gradient-to-r from-amber-700 to-amber-600 text-white px-4 py-4 shadow-lg sticky top-0 z-50">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-white p-2 rounded-lg">
          <span className="text-2xl">🍽️</span>
        </div>
        <div>
          <h1 className="text-xl font-bold">Golden Restaurant</h1>
          <p className="text-amber-100 text-sm">{tableName}</p>
        </div>
      </div>
      <button className="bg-white text-amber-700 px-4 py-2 rounded-full font-semibold text-sm hover:bg-amber-50 transition">
        🔔 Gọi NV
      </button>
    </div>
  </header>
);

export default Header;
