import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import imageDefault from "../../../assets/gallery/gallery_burger.png";
import productService from "../../../services/productService";
import type { ProductResponse } from "../../../types/responses/product.response";
import { useNavigate } from "react-router-dom";

interface ProductListProps {
  searchName: string | null;
  categoryIds: number[];
  minPrice: number;
  maxPrice: number;
}

const isNewProduct = (createdAt: string): boolean => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffInDays = (now.getTime() - createdDate.getTime()) / (1000 * 3600 * 24);
  return diffInDays <= 7;
};

const ProductList = ({ searchName, categoryIds, minPrice, maxPrice }: ProductListProps) => {
  const [sortBy, setSortBy] = useState("id,asc");
  const [showCount, setShowCount] = useState(15);
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const mapSortBy = (uiSort: string): string => {
    switch (uiSort) {
      case "newest":
        return "createdAt,desc";
      case "price-low":
        return "price,asc";
      case "price-high":
        return "price,desc";
      default:
        return "id,asc";
    }
  };

  const mapShowCount = (count: string | number): number => {
    switch (count) {
      case "12":
      case 12:
        return 12;
      case "15":
      case 15:
        return 15;
      case "24":
      case 24:
        return 24;
      default:
        return 15;
    }
  };

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let result;
        if (searchName || categoryIds.length > 0 || minPrice > 0 || maxPrice < 8000) {
          result = await productService.searchProducts(
            searchName,
            categoryIds.length > 0 ? categoryIds : null,
            minPrice > 0 ? minPrice : null,
            maxPrice < 8000 ? maxPrice : null,
            currentPage,
            mapShowCount(showCount),
            mapSortBy(sortBy)
          );
        } else {
          result = await productService.getProducts(currentPage, mapShowCount(showCount), mapSortBy(sortBy));
        }
        setProducts(result.products);
        setTotalPages(result.totalPages);
        if (result.error) {
          setError(result.error);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, sortBy, showCount, searchName, categoryIds, minPrice, maxPrice]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleProductClick = (productId: number) => {
    navigate(`/shop/${productId}`); // Chuyển hướng tới ShopDetailPage
  };
  const renderPagination = () => {
    const pages = [];

    pages.push(
      <Button
        key="prev"
        onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0 || loading}
        sx={{
          minWidth: 0,
          px: 1,
          py: 0.5,
          border: "1px solid #d1d5db",
          color: "#6b7280",
          "&:hover": { bgcolor: "#f9fafb" },
          "&.Mui-disabled": { opacity: 0.5, cursor: "not-allowed" },
        }}
      >
        ‹
      </Button>
    );

    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={loading}
          sx={{
            minWidth: 0,
            px: 1,
            py: 0.5,
            border: "1px solid #d1d5db",
            color: i === currentPage ? "#fff" : "#374151",
            bgcolor: i === currentPage ? "#f97316" : "transparent",
            "&:hover": { bgcolor: i === currentPage ? "#f97316" : "#f9fafb" },
          }}
        >
          {i + 1}
        </Button>
      );
    }

    pages.push(
      <Button
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1 || loading}
        sx={{
          minWidth: 0,
          px: 1,
          py: 0.5,
          border: "1px solid #d1d5db",
          color: "#6b7280",
          "&:hover": { bgcolor: "#f9fafb" },
          "&.Mui-disabled": { opacity: 0.5, cursor: "not-allowed" },
        }}
      >
        ›
      </Button>
    );

    return pages;
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      sx={{
        flex: 1,
        p: 6,
      }}
    >
      {/* Sort and Show controls */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1">Sort By:</Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ display: "none" }}>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              disabled={loading}
              sx={{
                height: 35,
                borderColor: "grey.500",
                color: "grey.700",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "grey.500",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "grey.700",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "grey.700",
                },
                "& .MuiSelect-icon": {
                  color: "grey.700",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiMenuItem-root": {
                      color: "grey.700",
                    },
                  },
                },
              }}
            >
              <MenuItem value="id,asc">Default</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1">Show:</Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ display: "none" }}>Show</InputLabel>
            <Select
              value={showCount}
              onChange={(e) => setShowCount(e.target.value)}
              disabled={loading}
              sx={{
                height: 35,
                borderColor: "grey.500",
                color: "grey.700",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "grey.500",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "grey.700",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "grey.700",
                },
                "& .MuiSelect-icon": {
                  color: "grey.700",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiMenuItem-root": {
                      color: "grey.700",
                    },
                  },
                },
              }}
            >
              <MenuItem value={12}>12 per page</MenuItem>
              <MenuItem value={15}>15 per page</MenuItem>
              <MenuItem value={24}>24 per page</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Loading and Error states */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, mb: 3, mt: 2 }}>
          {products.map((product, index) => (
            <Box
              key={product.id}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              sx={{
                bgcolor: "#fff",
                borderRadius: 0,
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(255, 255, 255, 0.1)",
                "&:hover": { boxShadow: "0 4px 8px rgba(0,0,0,0.2)", transform: "translateY(-4px)" },
                transition: "all 0.3s ease",
                width: 265,
                height: 265,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  height: 210,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#f0f0f0",
                }}
              >
                <Box
                  component="img"
                  src={product.imageUrls[0] || imageDefault}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Phủ hết khung, crop cắt bớt thừa, không lộ viền
                    objectPosition: "center", // Căn giữa khi crop
                    display: "block",
                  }}
                />
                {isNewProduct(product.createdAt) && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 6,
                      left: 6,
                      bgcolor: "#f97316",
                      color: "#fff",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  >
                    NEW!
                  </Box>
                )}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    gap: 1.5,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    // Sửa hover: áp dụng cho Box cha để hover toàn bộ khu vực
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <Box
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.8)", p: 0.5, borderRadius: 1, cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("👇 Button clicked for product:", product.id);
                      handleProductClick(product.id);
                    }}
                  >
                    <span role="img" aria-label="icon1">
                      👇
                    </span>
                  </Box>
                  <Box sx={{ bgcolor: "rgba(255, 255, 255, 0.8)", p: 0.5, borderRadius: 1 }}>
                    <span role="img" aria-label="icon2">
                      🛒
                    </span>
                  </Box>
                  <Box sx={{ bgcolor: "rgba(255, 255, 255, 0.8)", p: 0.5, borderRadius: 1 }}>
                    <span role="img" aria-label="icon3">
                      ❤️
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ p: 0, textAlign: "left" }}>
                <Typography variant="body2" color="#333333" sx={{ mt: 1, mb: 0.5, fontSize: 14, fontWeight: "bold" }}>
                  {product.name}
                </Typography>
                <Box sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="body2" color="#FF9F0D" sx={{ fontSize: 13 }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, pt: 1.5, borderTop: "1px solid #e5e7eb" }}>
          {renderPagination()}
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
