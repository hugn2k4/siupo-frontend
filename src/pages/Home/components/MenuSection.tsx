import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../../hooks/useTranslation";

// API
import categoryApi from "../../../api/categoryApi"; // Điều chỉnh đường dẫn nếu cần
import productApi from "../../../api/productApi"; // Điều chỉnh đường dẫn nếu cần

// Types
import type { CategoryResponse } from "../../../types/responses/category.response";
import type { ProductResponse } from "../../../types/responses/product.response";

const MenuSection: React.FC = () => {
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  // State
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

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
          setLoadingCategories(false); // Only stop loading on success
        }
        // Keep loading = true on error to show skeleton
      } catch (err) {
        console.error(err);
        // Keep loading = true to show skeleton
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
          setLoadingProducts(false); // Only stop loading on success
        }
        // Keep loading = true on error to show skeleton
      } catch (err) {
        console.error(err);
        // Keep loading = true to show skeleton
      }
    };

    fetchProductsByCategory();
  }, [activeCategoryId]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title & Description */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t("menuSection.title") as string}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("menuSection.description") as string}</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12 border-b border-gray-200 pb-4">
          {loadingCategories || categories.length === 0 ? (
            <Box sx={{ display: "flex", gap: 3, py: 2 }}>
              <Skeleton width={80} height={32} />
              <Skeleton width={80} height={32} />
              <Skeleton width={80} height={32} />
              <Skeleton width={80} height={32} />
            </Box>
          ) : (
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
          )}
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loadingProducts || products.length === 0
            ? Array.from({ length: 8 }).map((_, i) => (
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
            : products.map((item) => (
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
              ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button
            className="bg-white text-green-primary border border-green-primary px-8 py-3 font-semibold transition-all hover:bg-green-primary hover:text-white"
            onClick={() => navigate("/menu")}
          >
            {t("menuSection.viewAllMenu") as string}
          </button>
        </div>
      </div>
    </section>
  );
};
export default MenuSection;
