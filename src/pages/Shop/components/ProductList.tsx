import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Skeleton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imageDefault from "../../../assets/gallery/gallery_burger.png";
import productService from "../../../services/productService";
import type { ProductResponse } from "../../../types/responses/product.response";

// Icons MUI
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FirstPageOutlinedIcon from "@mui/icons-material/FirstPageOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LastPageOutlinedIcon from "@mui/icons-material/LastPageOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { wishlistApi } from "../../../api/wishListApi";
import LoginRequiredDialog from "../../../components/common/LoginRequiredDialog";
import { useGlobal } from "../../../hooks/useGlobal";
import { useSnackbar } from "../../../hooks/useSnackbar";
import cartService from "../../../services/cartService";

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
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { isLogin } = useGlobal();
  const [isParentHovered, setIsParentHovered] = useState(false);
  const { showSnackbar } = useSnackbar();
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
        if (searchName || categoryIds.length > 0 || minPrice > 0 || maxPrice < 1000000) {
          result = await productService.searchProducts(
            searchName,
            categoryIds.length > 0 ? categoryIds : null,
            minPrice > 0 ? minPrice : null,
            maxPrice < 1000000 ? maxPrice : null,
            currentPage,
            mapShowCount(showCount),
            mapSortBy(sortBy)
          );
        } else {
          result = await productService.getProducts(currentPage, mapShowCount(showCount), mapSortBy(sortBy));
        }

        // Sử dụng trực tiếp thuộc tính wishlist từ backend
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

  const handleAddToCart = async (productId: number) => {
    if (!isLogin) {
      setShowLoginDialog(true);
      return;
    }
    try {
      await cartService.addToCart({ productId: productId, quantity: 1 });
      showSnackbar("Product added to cart!", "success", 3000);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      showSnackbar("Failed to add product to cart!", "error", 3000);
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();

    if (!isLogin) {
      setShowLoginDialog(true);
      return;
    }

    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) return;

    const currentStatus = products[productIndex].wishlist;

    try {
      if (currentStatus) {
        await wishlistApi.removeFromWishlist(productId);
        showSnackbar("Removed from wishlist!", "info", 2000);
      } else {
        await wishlistApi.addToWishlist(productId);
        showSnackbar("Added to wishlist!", "success", 2000);
      }

      const updatedProducts = [...products];
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        wishlist: !currentStatus,
      };
      setProducts(updatedProducts);
    } catch {
      showSnackbar("Failed to update wishlist!", "error", 3000);
    }
  };

  const renderPagination = () => {
    const pages = [];

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
          "&:hover": { bgcolor: "#f3f4f6", color: "#6b7280" },
          "&.Mui-disabled": { opacity: 0.5, cursor: "not-allowed", color: "#d1d5db" },
        }}
      >
        <FirstPageOutlinedIcon sx={{ fontSize: 20 }} />
      </Button>
    );

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
          "&:hover": { bgcolor: "#f3f4f6", color: "#6b7280" },
          "&.Mui-disabled": { opacity: 0.5, cursor: "not-allowed", color: "#d1d5db" },
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
      sx={{ flex: 1, p: { xs: 2, md: 3 }, minWidth: 0 }}
    >
      {/* Sort and Show controls */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 4, mt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1">Sort By:</Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ display: "none" }}>Sort By</InputLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} disabled={loading} sx={{ height: 35 }}>
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
              sx={{ height: 35 }}
            >
              <MenuItem value={12}>12 per page</MenuItem>
              <MenuItem value={15}>15 per page</MenuItem>
              <MenuItem value={24}>24 per page</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Loading / Error / Empty / Products */}
      {loading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 2,
            mt: 2,
            minHeight: "1000px",
          }}
        >
          {[...Array(15)].map((_, i) => (
            <Box
              key={`skeleton-${i}`}
              sx={{
                width: { xs: "100%", md: 265 },
                height: 265,
                mx: "auto",
                bgcolor: "#fff",
                borderRadius: 0,
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Skeleton variant="rectangular" width="100%" height={210} animation="wave" />
              <Box sx={{ p: 1 }}>
                <Skeleton width="80%" height={24} animation="wave" />
                <Skeleton width="50%" height={28} sx={{ mt: 1 }} animation="wave" />
              </Box>
            </Box>
          ))}
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      ) : products.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 12, minWidth: { xs: "unset", lg: "826px" } }}>
          <Typography variant="h6" color="text.secondary">
            Không tìm thấy sản phẩm nào
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 2,
            mb: 3,
            mt: 2,
          }}
        >
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
                  "& .overlay-icons": { opacity: 1 },
                },
                transition: "all 0.3s ease",
                width: { xs: "100%", md: 265 },
                height: 265,
                cursor: "pointer",
                mx: "auto",
              }}
              onMouseEnter={() => setIsParentHovered(true)}
              onMouseLeave={() => setIsParentHovered(false)}
              onClick={() => handleProductClick(product.id)}
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
                    "& > *": { pointerEvents: "auto" },
                  }}
                >
                  <Box
                    className="overlay-icons-info"
                    sx={{
                      bgcolor: isParentHovered ? "#FF9F0D" : "#fff",
                      "& svg": { color: isParentHovered ? "#fff" : "#FF9F0D" },
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      transition: "all 0.2s ease",
                      "&:hover": { bgcolor: "#FF9F0D", "& svg": { color: "#fff" } },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                  >
                    <InfoOutlinedIcon sx={{ color: "#FF9F0D", fontSize: 20 }} />
                  </Box>

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
                        bgcolor: "#FF9F0D",
                        "& svg": { color: "#fff" },
                        "& .overlay-icons-info": {
                          bgcolor: "#fff",
                          "& svg": { color: "#FF9F0D" },
                        },
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product.id);
                    }}
                    onMouseEnter={() => setIsParentHovered(false)}
                    onMouseLeave={() => setIsParentHovered(true)}
                  >
                    <ShoppingCartOutlinedIcon sx={{ color: "#FF9F0D", fontSize: 20 }} />
                  </Box>

                  <Box
                    onClick={(e) => handleToggleWishlist(e, product.id)}
                    sx={{
                      bgcolor: "#fff",
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      transition: "all 0.2s ease",
                      "&:hover": { bgcolor: "#FF9F0D", "& svg": { color: "#fff" } },
                    }}
                    onMouseEnter={() => setIsParentHovered(false)}
                    onMouseLeave={() => setIsParentHovered(true)}
                  >
                    {product.wishlist ? (
                      <FavoriteIcon sx={{ color: "#FF9F0D", fontSize: 20 }} />
                    ) : (
                      <FavoriteBorderOutlinedIcon sx={{ color: "#FF9F0D", fontSize: 20 }} />
                    )}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ p: 0, textAlign: "left", px: 1, pb: 1 }}>
                <Typography variant="body2" color="#333333" sx={{ mt: 1, mb: 0.5, fontSize: 14, fontWeight: "bold" }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="#FF9F0D" sx={{ fontSize: 12 }}>
                  ${product.price.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {!loading && !error && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, flexWrap: "wrap", gap: 1 }}>
          {renderPagination()}
        </Box>
      )}

      <LoginRequiredDialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
    </Box>
  );
};

export default ProductList;
