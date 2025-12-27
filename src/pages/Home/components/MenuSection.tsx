import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, Skeleton } from "@mui/material";

// API
import categoryApi from "../../../api/categoryApi"; // Điều chỉnh đường dẫn nếu cần
import productApi from "../../../api/productApi"; // Điều chỉnh đường dẫn nếu cần

// Types
import type { CategoryResponse } from "../../../types/responses/category.response";
import type { ProductResponse } from "../../../types/responses/product.response";

const MenuSection: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await categoryApi.getCategories();
        if (response.success && response.data) {
          setCategories(response.data);
          // Tự động chọn category đầu tiên
          if (response.data.length > 0) {
            setActiveCategoryId(response.data[0].id);
          }
        } else {
          setError("Failed to load categories");
        }
      } catch (err) {
        setError("Error loading categories");
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products khi activeCategoryId thay đổi
  useEffect(() => {
    if (!activeCategoryId) return;

    const fetchProductsByCategory = async () => {
      try {
        setLoadingProducts(true);
        setError(null);

        const response = await productApi.searchProducts(
          null, // name
          [activeCategoryId], // categoryIds
          null,
          null, // minPrice
          null, // maxPrice
          0, // page (0-based)
          8, // size: chỉ lấy 8 món
          "id,asc" // sortBy (có thể thay đổi)
        );

        if (response.success && response.data) {
          setProducts(response.data.content || []);
        } else {
          setProducts([]);
          setError("No products found for this category");
        }
      } catch (err) {
        setProducts([]);
        setError("Error loading products");
        console.error(err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProductsByCategory();
  }, [activeCategoryId]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title & Description */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Food Menu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our selection of wholesome, flavorful meals crafted with the freshest organic ingredients. From
            vibrant salads to nourishing bowls and protein-packed options, every dish is designed to fuel your body and
            delight your taste buds—perfect for a healthy lifestyle.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12 border-b border-gray-200 pb-4">
          {loadingCategories ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={28} />
            </Box>
          ) : error && categories.length === 0 ? (
            <Typography color="error">{error}</Typography>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategoryId(category.id)}
                className={`pb-2 font-medium text-lg transition-all duration-300 border-b-2 ${
                  activeCategoryId === category.id
                    ? "text-green-primary border-green-primary"
                    : "text-gray-600 border-transparent hover:text-green-primary"
                }`}
              >
                {category.name}
              </button>
            ))
          ) : (
            <Typography color="text.secondary">No categories available</Typography>
          )}
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loadingProducts ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Box key={i} sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">
                    <Skeleton width="80%" />
                  </Typography>
                  <Typography variant="body2">
                    <Skeleton width="60%" />
                  </Typography>
                  <Typography variant="body2">
                    <Skeleton width="40%" />
                  </Typography>
                </Box>
                <Skeleton width="60px" />
              </Box>
            ))
          ) : error ? (
            <Typography color="error" className="col-span-2 text-center py-8">
              {error}
            </Typography>
          ) : products.length > 0 ? (
            products.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start border-b border-gray-200 pb-6 cursor-pointer"
                onClick={() => navigate(`/shop/${item.id}`)}
              >
                <div className="flex-1">
                  <button className="text-xl font-semibold text-gray-800 mb-2 hover:text-green-primary text-left transition-colors cursor-pointer">
                    {item.name}
                  </button>
                  <p className="text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                </div>
                <div className="text-2xl font-bold text-green-primary ml-4 whitespace-nowrap">
                  ${item.price.toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <Typography className="col-span-2 text-center py-8 text-gray-500">
              No items available in this category.
            </Typography>
          )}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button
            className="bg-white text-green-primary border border-green-primary px-8 py-3 font-semibold transition-all hover:bg-green-primary hover:text-white"
            onClick={() => navigate("/menu")}
          >
            View More Menu
          </button>
        </div>
      </div>
    </section>
  );
};
export default MenuSection;
