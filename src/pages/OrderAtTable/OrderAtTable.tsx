import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { orderAtTableApi } from "../../api/orderAtTableApi";
import { tableApi } from "../../api/tableApi";
import { useGlobal } from "../../hooks/useGlobal";
import { useSnackbar } from "../../hooks/useSnackbar";
import { usePreOrder } from "../../contexts/PreOrderContext";
import comboService from "../../services/comboService";
import productService from "../../services/productService";
import type { Combo } from "../../types/models/combo";
import type { ProductResponse } from "../../types/responses/product.response";
import ComboCard from "./components/ComboCard";
import FoodItemCard from "./components/FoodItemCard";
import OrderSummary from "./components/OrderSummary";

const CART_STORAGE_KEY = "order_at_table_cart_v1";

const OrderAtTable: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const tableId = searchParams.get("tableId");

  const global = useGlobal();
  const isLogin = global?.isLogin ?? false;
  const { setPreOrderItems } = usePreOrder();
  const { showSnackbar } = useSnackbar(); // ✅ DI CHUYỂN LÊN ĐÂY

  // Kiểm tra xem người dùng vào từ QR code hay từ nút chọn món trước
  // isFromBooking: Đã đăng nhập VÀ vào từ nút "Chọn món trước" (pre-order cho booking)
  // isFromQRCode: Quét QR code (order at table - không quan tâm login)
  const isFromBooking = isLogin && location.state?.fromBooking === true;
  const isFromQRCode = !!tableId && !isFromBooking;

  const [menu, setMenu] = useState<ProductResponse[]>([]);
  const [combos, setCombos] = useState<Combo[]>([]);
  const [tableInfo, setTableInfo] = useState<{ id: number; tableNumber: string } | null>(null);

  const [selectedItems, setSelectedItems] = useState<Record<number, { data: ProductResponse; quantity: number }>>({});
  const [selectedCombos, setSelectedCombos] = useState<Record<number, { data: Combo; quantity: number }>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const addItem = (item: ProductResponse) => {
    setSelectedItems((s) => ({ ...s, [item.id]: { data: item, quantity: (s[item.id]?.quantity || 0) + 1 } }));
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 300);
  };

  // load products and combos from API
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const pRes = await productService.getProducts(0, 100, "id,asc");
        if (mounted && pRes.products) setMenu(pRes.products);
      } catch (err) {
        console.error("Failed to load products", err);
      }

      try {
        const cRes = await comboService.getAvailableCombos();
        // comboApi returns ApiResponse<ComboResponse[]>
        if (mounted && cRes && cRes.success && cRes.data) {
          setCombos(cRes.data || []);
        }
      } catch (err) {
        console.error("Failed to load combos", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Fetch table info when tableId is available
  useEffect(() => {
    if (tableId) {
      const fetchTableInfo = async () => {
        try {
          const response = await tableApi.getTableById(parseInt(tableId));
          if (response.success && response.data) {
            setTableInfo({
              id: response.data.id,
              tableNumber: response.data.tableNumber,
            });
          }
        } catch (err) {
          console.error("Failed to load table info", err);
          showSnackbar("Không tìm thấy thông tin bàn", "error");
        }
      };
      fetchTableInfo();
    }
  }, [tableId, showSnackbar]); // ✅ THÊM showSnackbar VÀO DEPENDENCY

  // persist cart to localStorage and restore on mount
  useEffect(() => {
    // restore
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const obj = JSON.parse(raw);
        if (obj.items) setSelectedItems(obj.items);
        if (obj.combos) setSelectedCombos(obj.combos);
      }
    } catch (err) {
      console.warn("Failed to restore cart", err);
    }
  }, []);

  useEffect(() => {
    try {
      const payload = { items: selectedItems, combos: selectedCombos };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Failed to persist cart", err);
    }
  }, [selectedItems, selectedCombos]);

  // Extract categories from menu
  const categories = useMemo(() => {
    const cats = new Set<string>();
    menu.forEach((item) => {
      if (item.categoryName) cats.add(item.categoryName);
    });
    return ["all", ...Array.from(cats)];
  }, [menu]);

  // Filtered menu
  const filteredMenu = useMemo(() => {
    let filtered = menu;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.categoryName === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [menu, selectedCategory, searchQuery]);

  // Filtered combos
  const filteredCombos = useMemo(() => {
    if (!searchQuery.trim()) return combos;

    const query = searchQuery.toLowerCase();
    return combos.filter(
      (combo) =>
        combo.name.toLowerCase().includes(query) ||
        (combo.description && combo.description.toLowerCase().includes(query))
    );
  }, [combos, searchQuery]);

  const incItem = (id: number) =>
    setSelectedItems((s) => ({ ...s, [id]: { data: s[id].data, quantity: s[id].quantity + 1 } }));
  const decItem = (id: number) =>
    setSelectedItems((s) => {
      const cur = s[id];
      if (!cur) return s;
      if (cur.quantity <= 1) {
        const copy = { ...s };
        delete copy[id];
        return copy;
      }
      return { ...s, [id]: { data: cur.data, quantity: cur.quantity - 1 } };
    });
  const removeItem = (id: number) =>
    setSelectedItems((s) => {
      const copy = { ...s };
      delete copy[id];
      return copy;
    });

  const addCombo = (c: Combo) => {
    setSelectedCombos((s) => ({ ...s, [c.id]: { data: c, quantity: (s[c.id]?.quantity || 0) + 1 } }));
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 300);
  };
  const incCombo = (id: number) =>
    setSelectedCombos((s) => ({ ...s, [id]: { data: s[id].data, quantity: s[id].quantity + 1 } }));
  const decCombo = (id: number) =>
    setSelectedCombos((s) => {
      const cur = s[id];
      if (!cur) return s;
      if (cur.quantity <= 1) {
        const copy = { ...s };
        delete copy[id];
        return copy;
      }
      return { ...s, [id]: { data: cur.data, quantity: cur.quantity - 1 } };
    });
  const removeCombo = (id: number) =>
    setSelectedCombos((s) => {
      const copy = { ...s };
      delete copy[id];
      return copy;
    });

  const itemsArray = Object.values(selectedItems);
  const combosArray = Object.values(selectedCombos);

  const total = useMemo(() => {
    const t1 = itemsArray.reduce((s, it) => s + (it.data.price || 0) * it.quantity, 0);
    const t2 = combosArray.reduce((s, c) => s + (c.data.basePrice || 0) * c.quantity, 0);
    return t1 + t2;
  }, [itemsArray, combosArray]);

  // Handler cho pre-order booking (đã đăng nhập + từ nút chọn món)
  const handleConfirmForBooking = () => {
    if (total === 0) {
      showSnackbar("Giỏ hàng trống", "error");
      return;
    }

    // Chuyển đổi items sang format CartItem cho PreOrderContext
    const cartItems = [
      ...itemsArray.map((it) => ({
        ...it.data, // Giữ nguyên toàn bộ ProductResponse
        quantity: it.quantity,
        note: "",
      })),
      ...combosArray.map((c) => ({
        id: c.data.id,
        name: c.data.name,
        description: c.data.description || "",
        price: c.data.basePrice || 0,
        categoryId: 0, // Combo không có category
        categoryName: "Combo",
        imageUrls: c.data.imageUrls || [],
        status: "AVAILABLE" as const,
        createdAt: "",
        updatedAt: "",
        wishlist: false,
        quantity: c.quantity,
        note: "",
        comboId: c.data.id, // Thêm field để phân biệt combo
      })),
    ];

    // Lưu items vào PreOrderContext
    setPreOrderItems(cartItems);

    // Clear tableId nếu có (không cần cho booking)
    sessionStorage.removeItem("selectedTableId");

    // Clear cart local storage
    localStorage.removeItem(CART_STORAGE_KEY);
    setSelectedItems({});
    setSelectedCombos({});

    // Redirect về PlaceTableForGuest
    navigate("/placetable", {
      state: { hasPreOrder: true },
      replace: true, // Replace history để không back lại được
    });
  };

  // Handler cho Pay Later (QR code)
  const handlePayLater = async () => {
    if (total === 0) {
      showSnackbar("Giỏ hàng trống", "error");
      return;
    }

    if (!tableId) {
      showSnackbar("Vui lòng quét mã QR trên bàn để đặt món", "error");
      return;
    }

    setLoading(true);
    try {
      // Chuẩn bị items data
      const items = [
        ...itemsArray.map((it) => ({
          productId: it.data.id,
          quantity: it.quantity,
          note: "",
        })),
        ...combosArray.map((c) => ({
          comboId: c.data.id,
          quantity: c.quantity,
          note: "",
        })),
      ];

      // Gọi API tạo order at table với payment method COD (Pay Later)
      const response = await orderAtTableApi.createOrder({
        tableId: parseInt(tableId),
        items,
        paymentMethod: "COD",
      });

      if (response.success) {
        showSnackbar("Đặt món thành công! Thanh toán sau khi hoàn thành.", "success");

        // Clear cart
        setSelectedItems({});
        setSelectedCombos({});
        localStorage.removeItem(CART_STORAGE_KEY);
      } else {
        throw new Error(response.message || "Đặt món thất bại");
      }
    } catch (err) {
      console.error("Order failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Đặt món thất bại";
      showSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  // Handler cho Pay with MoMo (QR code)
  const handleCheckout = async () => {
    if (total === 0) {
      showSnackbar("Giỏ hàng trống", "error");
      return;
    }

    if (!tableId) {
      showSnackbar("Vui lòng quét mã QR trên bàn để đặt món", "error");
      return;
    }

    setLoading(true);
    try {
      // Chuẩn bị items data
      const items = [
        ...itemsArray.map((it) => ({
          productId: it.data.id,
          quantity: it.quantity,
          note: "",
        })),
        ...combosArray.map((c) => ({
          comboId: c.data.id,
          quantity: c.quantity,
          note: "",
        })),
      ];

      // Gọi API tạo order at table với payment method MOMO
      const response = await orderAtTableApi.createOrder({
        tableId: parseInt(tableId),
        items,
        paymentMethod: "MOMO",
      });

      if (response.success && response.data?.payUrl) {
        // Clear cart trước khi redirect
        setSelectedItems({});
        setSelectedCombos({});
        localStorage.removeItem(CART_STORAGE_KEY);

        // Redirect to MoMo
        window.location.href = response.data.payUrl;
      } else if (response.success && !response.data?.payUrl) {
        // Order created successfully but no payment URL (COD)
        showSnackbar("Đặt món thành công!", "success");
        setSelectedItems({});
        setSelectedCombos({});
        localStorage.removeItem(CART_STORAGE_KEY);
      } else {
        throw new Error(response.message || "Không nhận được payment URL");
      }
    } catch (err) {
      console.error("Payment failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Tạo thanh toán thất bại";
      showSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-6 md:px-10 bg-gray-50 min-h-screen">
      {/* Table Info Banner - Chỉ hiển thị khi vào từ QR code */}
      {isFromQRCode && tableInfo && (
        <div className="mb-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <div>
              <div className="text-sm font-medium opacity-90">Đang đặt món cho</div>
              <div className="text-2xl font-bold">{tableInfo.tableNumber}</div>
            </div>
          </div>
        </div>
      )}

      {/* Thông báo khi đang chọn món từ booking */}
      {isFromBooking && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-green-700 font-medium">Bạn đang chọn món cho đơn đặt bàn</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6"></div>

      {/* Search and Filter Bar */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        {/* Search Bar */}
        <div className="relative mb-4">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-amber-500 text-black shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mt-3 text-sm text-gray-600">
          Found {filteredMenu.length} dishes {filteredCombos.length > 0 && `and ${filteredCombos.length} combos`}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <main className="lg:col-span-2">
          {filteredCombos.length > 0 && (
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Combo</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredCombos.map((c) => (
                  <ComboCard key={c.id} combo={c} onAdd={addCombo} />
                ))}
              </div>
            </section>
          )}

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Menu</h3>
            {filteredMenu.length === 0 ? (
              <div className="text-center py-12 text-gray-500 bg-white rounded-lg">No matching dishes found</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMenu.map((m) => (
                  <FoodItemCard key={m.id} item={m} onAdd={addItem} />
                ))}
              </div>
            )}
          </section>
        </main>

        <aside className="lg:col-span-1">
          <div className={`sticky top-25 mt-[38px]`}>
            <OrderSummary
              items={itemsArray.map((it) => ({ data: it.data, quantity: it.quantity }))}
              combos={combosArray.map((c) => ({ data: c.data, quantity: c.quantity }))}
              onIncItem={incItem}
              onDecItem={decItem}
              onRemoveItem={removeItem}
              onIncCombo={incCombo}
              onDecCombo={decCombo}
              onRemoveCombo={removeCombo}
              onCheckout={isFromBooking ? handleConfirmForBooking : handleCheckout}
              onPayLater={!isFromBooking ? handlePayLater : undefined}
              loading={loading}
              isPreOrderMode={isFromBooking}
            />
          </div>
        </aside>
      </div>

      {/* Mobile drawer toggle + drawer */}
      <button
        className={`fixed bottom-4 right-4 z-40 md:hidden bg-amber-500 text-black px-4 py-3 rounded-full shadow-lg`}
        aria-label="Open order summary"
        onClick={() => setDrawerOpen(true)}
      >
        <span className="font-semibold">Cart</span>
        <span
          className={`ml-3 inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold ${cartPulse ? "animate-pulse" : ""}`}
        >
          {itemsArray.length + combosArray.length}
        </span>
      </button>

      <div
        className={`fixed inset-x-0 bottom-0 z-50 md:hidden transform ${drawerOpen ? "translate-y-0" : "translate-y-full"} transition-transform duration-300`}
      >
        <div className="mx-4 mb-4 bg-white rounded-t-xl shadow-lg">
          <div className="p-4 flex items-center justify-between">
            <div className="text-lg font-semibold">Order Summary</div>
            <button className="text-sm text-gray-600" onClick={() => setDrawerOpen(false)}>
              Close
            </button>
          </div>
          <div className="px-4 pb-6 max-h-[70vh] overflow-y-auto">
            <OrderSummary
              items={itemsArray.map((it) => ({ data: it.data, quantity: it.quantity }))}
              combos={combosArray.map((c) => ({ data: c.data, quantity: c.quantity }))}
              onIncItem={incItem}
              onDecItem={decItem}
              onRemoveItem={removeItem}
              onIncCombo={incCombo}
              onDecCombo={decCombo}
              onRemoveCombo={removeCombo}
              onCheckout={() => {
                setDrawerOpen(false);
                if (isFromBooking) {
                  handleConfirmForBooking();
                } else {
                  handleCheckout();
                }
              }}
              onPayLater={
                !isFromBooking
                  ? () => {
                      setDrawerOpen(false);
                      handlePayLater();
                    }
                  : undefined
              }
              loading={loading}
              isPreOrderMode={isFromBooking}
            />
          </div>
        </div>
      </div>

      <style>{`.cart-pulse { animation: cartPulse 280ms ease; } @keyframes cartPulse { 0% { transform: scale(1); } 50% { transform: scale(0.98); } 100% { transform: scale(1);} }`}</style>
    </div>
  );
};

export default OrderAtTable;
