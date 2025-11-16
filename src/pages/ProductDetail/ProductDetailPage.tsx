import { Alert, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../../services/productService";
import type { ProductDetailResponse } from "../../types/responses/product.response";
import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import SimilarProducts from "./components/SimilarProducts";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("Không tìm thấy ID sản phẩm.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await productService.getProductById(Number(productId));
        console.log("ShopDetailPage response:", response); // Debug
        if (response.product) {
          setProduct(response.product);
        } else {
          setError(response.error || "Không tìm thấy sản phẩm.");
        }
      } catch (err: unknown) {
        // dùng unknown
        console.error("Lỗi khi lấy chi tiết sản phẩm:", err);
        // Check type an toàn trước khi truy cập message
        if (err instanceof Error) {
          setError(err.message || "Không thể tải sản phẩm. Vui lòng thử lại.");
        } else {
          setError("Không thể tải sản phẩm. Vui lòng thử lại.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: 2, py: 4 }}>
        <Alert severity="error">{error || "Không tìm thấy sản phẩm."}</Alert>
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      sx={{ maxWidth: "1280px", mx: "auto", px: 2, py: 4, pt: 10 }}
    >
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 5, mb: 3 }}>
        <ProductImages imageUrls={product.imageUrls} />
        <ProductInfo product={product} />
      </Box>
      <ProductTabs productId={product.id} description={product.description} reviewCount={product.reviewCount} />
      <SimilarProducts />
    </Box>
  );
};

export default ProductDetailPage;
