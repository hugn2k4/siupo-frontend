// src/Account/pages/WishlistPage.tsx
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../Account/components/Sidebar";
import WishlistHeader from "../WishList/components/WishlistHeader";
import WishlistItem from "../WishList/components/WishlistItem";
import WishlistEmpty from "../WishList/components/WishlistEmpty";
import WishlistLoading from "../WishList/components/WishlistLoading";
import { wishlistApi } from "../../api/wishListApi";
import type { WishlistResponse } from "../../types/models/wishlist";
import { useSnackbar } from "../../hooks/useSnackbar";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  // Fetch wishlist on mount
  useEffect(() => {
    fetchWishlist();
  }, []);
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      return error.response?.data?.message || error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "An unexpected error occurred";
  };
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const data = await wishlistApi.getWishlist();
      setWishlist(data);
    } catch (error) {
      showSnackbar(getErrorMessage(error) || "Failed to load wishlist", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId: number) => {
    try {
      const updatedWishlist = await wishlistApi.removeFromWishlist(productId);
      setWishlist(updatedWishlist);
      showSnackbar("Item removed from wishlist", "success");
    } catch (error) {
      showSnackbar(getErrorMessage(error) || "Failed to remove item", "error");
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to clear your entire wishlist?")) {
      return;
    }

    try {
      await wishlistApi.clearWishlist();
      setWishlist({
        ...wishlist!,
        items: [],
        totalItems: 0,
      });
      showSnackbar("Wishlist cleared successfully", "success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to clear wishlist";
      showSnackbar(errorMessage, "error");
    }
  };

  const handleAddToCart = async (productId: number) => {
    // TODO: Implement add to cart logic
    showSnackbar("Add to cart feature coming soon", "info");
    console.log("Add to cart:", productId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <Sidebar activeLabel="Wishlist" />

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <WishlistLoading />
            ) : !wishlist || wishlist.totalItems === 0 ? (
              <>
                <WishlistHeader totalItems={0} onClearAll={handleClearAll} />
                <WishlistEmpty />
              </>
            ) : (
              <>
                <WishlistHeader totalItems={wishlist.totalItems} onClearAll={handleClearAll} />

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.items.map((item) => (
                    <WishlistItem key={item.id} item={item} onRemove={handleRemoveItem} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
