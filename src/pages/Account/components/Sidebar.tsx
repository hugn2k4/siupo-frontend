// src/Account/components/Sidebar.tsx
import { useState } from "react";
import { LayoutDashboard, History, Heart, ShoppingBag, Settings, LogOut } from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: History, label: "Order History" },
  { icon: Heart, label: "Wishlist" },
  { icon: ShoppingBag, label: "Shopping Cart" },
  { icon: Settings, label: "Settings" },
  { icon: LogOut, label: "Log out" },
];

export default function Sidebar() {
  const [activeLabel, setActiveLabel] = useState("Dashboard");

  return (
    <div
      className="w-64 bg-white rounded-lg shadow-sm"
      style={{
        border: "1px solid #e5e7eb",
        minHeight: "fit-content",
      }}
    >
      {/* Header: Navigation - căn đều trên/dưới + thụt vào */}
      <div className="px-5 pt-3 pb-3">
        <h2
          className="text-xl font-semibold"
          style={{
            color: "#1A1A1A",
            margin: 0,
            paddingLeft: "0px", // thụt vào 1 chút
          }}
        >
          Navigation
        </h2>
      </div>

      {/* Menu */}
      <nav className="space-y-1 ">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeLabel === item.label;

          return (
            <a
              key={item.label}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveLabel(item.label);
              }}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group relative cursor-pointer"
              style={{
                backgroundColor: isActive ? "#FFF8ED" : "transparent",
                color: isActive ? "#000000" : "#CCCCCC",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.color = "#929292";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#CCCCCC";
                }
              }}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 " style={{ backgroundColor: "#FF9F0D" }}></div>
              )}

              <Icon
                size={20}
                style={{
                  color: isActive ? "#000000" : "#CCCCCC",
                  transition: "color 0.2s",
                }}
              />
              <span style={{ fontSize: "14px", fontWeight: 500 }}>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
