import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// API
import categoryApi from "../../../api/categoryApi";
import productApi from "../../../api/productApi";

// Types
import type { CategoryResponse } from "../../../types/responses/category.response";
import type { ProductResponse } from "../../../types/responses/product.response";

// Hooks
import { useTranslation } from "../../../hooks/useTranslation";

const MenuSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("about");

  // State
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true); // Để hiển thị 8 skeleton như cũ

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await categoryApi.getCategories();
        if (response.success && response.data) {
          setCategories(response.data);
          if (response.data.length > 0) {
            setActiveCategoryId(response.data[0].id);
          }
        }
      } catch (err) {
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
        const response = await productApi.searchProducts(
          null, // name
          [activeCategoryId], // categoryIds
          null,
          null, // minPrice
          null, // maxPrice
          0, // page
          8, // size: 8 món
          "id,asc" // sortBy
        );

        if (response.success && response.data?.content) {
          setProducts(response.data.content);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProductsByCategory();
  }, [activeCategoryId]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t("menu.title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("menu.description")}</p>
        </div>

        {/* Categories - giữ nguyên giao diện cũ */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 border-b border-gray-200">
          {loadingCategories
            ? // Skeleton cho categories nếu đang load
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="pb-2">
                  <div className="h-6 bg-gray-300 rounded w-20"></div>
                </div>
              ))
            : categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`pb-2 font-medium transition-colors ${
                    category.id === activeCategoryId
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-2 hover:text-primary"
                  }`}
                >
                  {category.name}
                </button>
              ))}
        </div>

        {/* Menu Items - giữ nguyên giao diện cũ hoàn toàn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loadingProducts
            ? // 8 skeleton giống hệt code cũ (không dùng MUI Skeleton)
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex justify-between items-start border-b border-gray-200 pb-6">
                  <div className="flex-1">
                    <div className="h-7 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-5 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                  </div>
                  <div className="w-16 h-8 bg-gray-300 rounded ml-4"></div>
                </div>
              ))
            : products.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start border-b border-gray-200 pb-6 cursor-pointer "
                  onClick={() => navigate(`/shop/${item.id}`)}
                >
                  <div className="flex-1">
                    <button className="text-xl font-semibold text-gray-800 mb-2 hover:text-primary cursor-pointer">
                      {item.name}
                    </button>
                    <p className="text-gray-600 mb-2">{item.description || t("menu.noDescription")}</p>
                  </div>
                  <div className="text-2xl font-bold text-primary ml-4">${item.price.toFixed(2)}</div>
                </div>
              ))}
        </div>

        {/* View More Button - giống hệt cũ */}
        <div className="text-center mt-12">
          <button
            className="bg-white text-primary border border-primary px-8 py-3 font-semibold transition-colors hover:bg-primary hover:text-white"
            onClick={() => navigate("/menu")}
          >
            {t("menu.viewMore")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
