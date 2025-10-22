// src/components/data/menuData.ts
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  available: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  note?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Phở Bò Đặc Biệt",
    price: 65000,
    category: "Món Chính",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400",
    description: "Phở bò truyền thống với thịt bò tươi",
    available: true,
  },
  {
    id: "2",
    name: "Bún Chả Hà Nội",
    price: 55000,
    category: "Món Chính",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
    description: "Bún chả nướng thơm phức",
    available: true,
  },
  // ... các món khác
];

export const CATEGORIES = ["Tất Cả", "Món Chính", "Khai Vị", "Đồ Uống", "Tráng Miệng"];
