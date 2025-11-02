// src/Account/components/Sidebar.tsx

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, History, Heart, ShoppingBag, Settings, LogOut } from "lucide-react";
import { useGlobal } from "../../../hooks/useGlobal";
import { useSnackbar } from "../../../hooks/useSnackbar";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path?: string;
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/account/dashboard" },
  { icon: History, label: "Order History", path: "/account/orders" },
  { icon: Heart, label: "Wishlist", path: "/account/wishlist" },
  { icon: ShoppingBag, label: "Shopping Cart", path: "/cart" },
  { icon: Settings, label: "Settings", path: "/account/settings" },
];

interface SidebarProps {
  activeLabel?: string;
  onItemClick?: (label: string) => void;
}

export default function Sidebar({ activeLabel: externalActiveLabel, onItemClick }: SidebarProps) {
  const [internalActiveLabel, setInternalActiveLabel] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useGlobal();
  const { showSnackbar } = useSnackbar();

  // Đồng bộ activeLabel: ưu tiên external > URL > internal
  const activeLabel = externalActiveLabel ?? internalActiveLabel;

  // Cập nhật active khi URL thay đổi
  useEffect(() => {
    const current = menuItems.find((item) => item.path === location.pathname);
    if (current) {
      setInternalActiveLabel(current.label);
      onItemClick?.(current.label);
    }
  }, [location.pathname, onItemClick]);

  const handleMenuClick = (item: MenuItem) => {
    setInternalActiveLabel(item.label);
    onItemClick?.(item.label);

    if (item.path) {
      navigate(item.path);
    }

    if (item.label === "Log out") {
      logout();
      showSnackbar("Logout successful", "success");
      setTimeout(() => navigate("/"), 300);
    }
  };

  return (
    <div
      className="w-64 bg-white rounded-lg shadow-sm"
      style={{
        border: "1px solid #e5e7eb",
        minHeight: "fit-content",
      }}
    >
      <div className="px-5 pt-3 pb-3">
        <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A", margin: 0 }}>
          Navigation
        </h2>
      </div>

      <nav className="space-y-1">
        {[...menuItems, { icon: LogOut, label: "Log out" } as MenuItem].map((item) => {
          const Icon = item.icon;
          const isActive = activeLabel === item.label;

          return (
            <div
              key={item.label}
              onClick={() => handleMenuClick(item)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group relative cursor-pointer select-none"
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
                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: "#FF9F0D" }} />
              )}

              <Icon
                size={20}
                style={{
                  color: isActive ? "#000000" : "#CCCCCC",
                  transition: "color 0.2s",
                }}
              />
              <span style={{ fontSize: "14px", fontWeight: 500 }}>{item.label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
