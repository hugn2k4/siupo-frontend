// src/contexts/PreOrderContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types/responses/product.response";

interface PreOrderContextType {
  preOrderItems: CartItem[];
  setPreOrderItems: (items: CartItem[]) => void;
  clearPreOrder: () => void;
}

const PreOrderContext = createContext<PreOrderContextType | undefined>(undefined);

export const PreOrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preOrderItems, setPreOrderItems] = useState<CartItem[]>([]);

  const clearPreOrder = () => {
    setPreOrderItems([]);
  };

  return (
    <PreOrderContext.Provider value={{ preOrderItems, setPreOrderItems, clearPreOrder }}>
      {children}
    </PreOrderContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePreOrder = () => {
  const context = useContext(PreOrderContext);
  if (context === undefined) {
    throw new Error("usePreOrder must be used within a PreOrderProvider");
  }
  return context;
};
