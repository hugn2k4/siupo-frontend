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

// Icons MUI
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FirstPageOutlinedIcon from "@mui/icons-material/FirstPageOutlined";
import LastPageOutlinedIcon from "@mui/icons-material/LastPageOutlined";

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
      } catch {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, sortBy, showCount, searchName, categoryIds, minPrice, maxPrice]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleProductClick = (productId: number) => {
    navigate(`/shop/${productId}`);
  };

  const renderPagination = () => {
    const pages = [];

    // Nút Previous (First Page)
    pages.push(
      <Button
        key="prev"
        onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0 || loading}
        sx={{
          minWidth: 40,
          width: 40,
          height: 40,
          p: 0,
          border: "1px solid #d1d5db",
          bgcolor: "#fff",
          color: "#FF9F0D",
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            bgcolor: "#f3f4f6",
            color: "#6b7280",
          },
          "&.Mui-disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
            color: "#d1d5db",
          },
        }}
      >
        <FirstPageOutlinedIcon sx={{ fontSize: 20 }} />
      </Button>
    );

    // Các trang số
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={loading}
          sx={{
            minWidth: 40,
            width: 40,
            height: 40,
            p: 0,
            border: i === currentPage ? "none" : "1px solid #d1d5db",
            bgcolor: i === currentPage ? "#FF9F0D" : "#fff",
            color: i === currentPage ? "#fff" : "#FF9F0D",
            borderRadius: 0,
            fontWeight: "bold",
            fontSize: 14,
            "&:hover": {
              bgcolor: i === currentPage ? "#e68a00" : "#f3f4f6",
              color: i === currentPage ? "#fff" : "#e68a00",
            },
          }}
        >
          {i + 1}
        </Button>
      );
    }

    // Nút Next (Last Page)
    pages.push(
      <Button
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1 || loading}
        sx={{
          minWidth: 40,
          width: 40,
          height: 40,
          p: 0,
          border: "1px solid #d1d5db",
          bgcolor: "#fff",
          color: "#FF9F0D",
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            bgcolor: "#f3f4f6",
            color: "#6b7280",
          },
          "&.Mui-disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
            color: "#d1d5db",
          },
        }}
      >
        <LastPageOutlinedIcon sx={{ fontSize: 20 }} />
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
              transition={{ duration: 0, delay: index * 0 }}
              viewport={{ once: true }}
              sx={{
                bgcolor: "#fff",
                borderRadius: 0,
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  transform: "translateY(-4px)",
                  "& .overlay-icons": {
                    opacity: 1,
                  },
                },
                transition: "all 0.3s ease",
                width: 265,
                height: 265,
                cursor: "pointer",
              }}
              onClick={() => handleProductClick(product.id)}
            >
              {/* Image Container */}
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
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    transition: "transform 0.4s ease",
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

                {/* Overlay Icons - Vuông, 1&3: nền trắng + icon cam, 2: nền cam + icon trắng */}
                <Box
                  className="overlay-icons"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    gap: 1.5,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                    "& > *": {
                      pointerEvents: "auto",
                    },
                  }}
                >
                  {/* 1. View Details - nền trắng, icon cam */}
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                  >
                    <InfoOutlinedIcon sx={{ color: "#FF9F0D", fontSize: 20 }} />
                  </Box>

                  {/* 2. Add to Cart - nền cam, icon trắng */}
                  <Box
                    sx={{
                      bgcolor: "#FF9F0D",
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#e68a00",
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Add to cart:", product.id);
                      // TODO: Thêm vào giỏ hàng
                    }}
                  >
                    <ShoppingCartOutlinedIcon sx={{ color: "#fff", fontSize: 20 }} />
                  </Box>

                  {/* 3. Favorite - nền trắng, icon cam */}
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Favorite:", product.id);
                      // TODO: Yêu thích sản phẩm
                    }}
                  >
                    <FavoriteBorderOutlinedIcon sx={{ color: "#FF9F0D", fontSize: 20 }} />
                  </Box>
                </Box>
              </Box>

              {/* Product Info */}
              <Box sx={{ p: 0, textAlign: "left", px: 1, pb: 1 }}>
                <Typography variant="body2" color="#333333" sx={{ mt: 1, mb: 0.5, fontSize: 14, fontWeight: "bold" }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="#FF9F0D" sx={{ fontSize: 13 }}>
                  ${product.price.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, pt: 1.5, gap: 1, borderTop: "1px solid #e5e7eb" }}>
          {renderPagination()}
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
