import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import productApi from "../../../api/productApi";
import type { ProductResponse } from "../../../types/responses/product.response";
import { CircularProgress, Box } from "@mui/material";

const SimilarProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Lấy 4 sản phẩm đầu tiên
        const response = await productApi.getProducts(0, 4, "createdAt,desc");

        if (response && response.data && response.data.content) {
          setProducts(response.data.content);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching similar products:", err);
        setError("Failed to load similar products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, []);

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Products</h2>
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: "var(--color-primary)" }} />
        </Box>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Products</h2>
        <div className="text-center py-8 text-gray-500">{error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Products</h2>
        <div className="text-center py-8 text-gray-500">No similar products found</div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Similar Products</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.name}
            price={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.price)}
            image={product.imageUrls?.[0] || ""}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
