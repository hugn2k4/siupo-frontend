// src/components/FilterSidebar.tsx

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Rating,
  Slider,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState, useRef, memo } from "react";
import categoryService from "../../../services/categoryService";
import productService from "../../../services/productService";
import reviewService from "../../../services/reviewService";
import type { CategoryResponse } from "../../../types/responses/category.response";
import type { ProductResponse } from "../../../types/responses/product.response";
import type { ReviewResponse } from "../../../types/responses/review.response";

// Dùng để mở rộng ProductResponse thêm rating + reviewCount
interface LatestProductWithRating extends ProductResponse {
  rating: number;
  reviewCount: number;
}

interface FilterSidebarProps {
  onFilterChange: (filters: {
    searchName: string | null;
    categoryIds: number[];
    minPrice: number;
    maxPrice: number;
  }) => void;
}

const FilterSidebar = memo(({ onFilterChange }: FilterSidebarProps) => {
  const [searchName, setSearchName] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [latestProducts, setLatestProducts] = useState<LatestProductWithRating[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const prevFilterKey = useRef<string>("");
  const currentFilterKey = `${searchName || ""}|${selectedCategories.join(",")}|${priceRange[0]}|${priceRange[1]}`;

  useEffect(() => {
    if (currentFilterKey !== prevFilterKey.current) {
      prevFilterKey.current = currentFilterKey;
      onFilterChange({
        searchName,
        categoryIds: selectedCategories,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      });
    }
  }, [currentFilterKey, onFilterChange]);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const result = await categoryService.getCategories();
        setCategories(result.categories || []);
      } catch {
        setError("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Load 4 sản phẩm mới nhất + rating thật
  useEffect(() => {
    const fetchLatestWithRating = async () => {
      setLoadingProducts(true);
      try {
        const res = await productService.getProducts(0, 4, "id,desc");
        const products = res.products || [];

        const productsWithRating: LatestProductWithRating[] = await Promise.all(
          products.map(async (product) => {
            try {
              const reviewRes = await reviewService.getProductReviews(product.id);
              const reviews: ReviewResponse[] = reviewRes.data || [];

              const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

              return {
                ...product,
                rating: Number(avgRating.toFixed(1)),
                reviewCount: reviews.length,
              };
            } catch {
              return { ...product, rating: 0, reviewCount: 0 };
            }
          })
        );

        setLatestProducts(productsWithRating);
      } catch (err) {
        console.error("Load latest products failed:", err);
        setLatestProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchLatestWithRating();
  }, []);

  const handleSearch = () => {
    onFilterChange({
      searchName,
      categoryIds: selectedCategories,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      viewport={{ once: true, amount: 0 }}
      sx={{
        mt: "110px",

        // Thay bằng:
        // mt: 0,
        padding: 2.5,
        bgcolor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
      }}
    >
      {/* Search Product */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search Product"
          value={searchName || ""}
          onChange={(e) => setSearchName(e.target.value || null)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  sx={{ backgroundColor: "#FF9F0D", borderRadius: 0, color: "white" }}
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: { fontSize: "0.85rem" },
          }}
          sx={{
            mt: 0,
            backgroundColor: "#FF9F0D1A",
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
        />
      </Box>

      {/* Category */}
      <Box sx={{ mb: 2, p: 0, bgcolor: "#fff" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#202020",
            fontWeight: "bold",
            fontSize: "14pt",
          }}
        >
          Category
        </Typography>
        {loadingCategories && <Typography>Loading categories...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loadingCategories && !error && (
          <FormGroup
            sx={{
              "& .MuiFormControlLabel-root": {
                marginBottom: "4px",
                marginLeft: -1,
                marginRight: 0,
              },
              "& .MuiFormControlLabel-label": {
                fontSize: "0.85rem",
                marginLeft: "2px",
              },
            }}
          >
            {categories.map((category) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    sx={{
                      transform: "scale(0.85)",
                      padding: "4px",
                      "& .MuiSvgIcon-root": { fontSize: 18 },
                      "&.Mui-checked": { color: "#FF9F0D" },
                      "& .MuiTouchRipple-root": { display: "none" },
                      "& .MuiCheckbox-root": {
                        borderRadius: 1,
                        "&:not(.Mui-checked)": { border: "1.5px solid #ccc" },
                        "&.Mui-checked": { border: "1.5px solid #FF9F0D", bgcolor: "transparent" },
                      },
                    }}
                  />
                }
                label={category.name}
              />
            ))}
          </FormGroup>
        )}
      </Box>

      {/* Poster */}
      <Box
        sx={{
          mb: 2,
          borderRadius: 0,
          p: 0,
          bgcolor: "#fff",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="../../src/assets/gallery/gallery_banner.png"
          alt="Poster Quảng Cáo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Filter By Price */}
      <Box sx={{ mb: 2, p: 0, bgcolor: "#fff" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#232323",
            fontWeight: "bold",
            fontSize: "14pt",
          }}
        >
          Filter By Price
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={200}
          sx={{
            color: "#FF9F0D",
            "& .MuiSlider-thumb": {
              width: 12,
              height: 12,
              border: "3.5px solid #fff",
              backgroundColor: "#FF9F0D",
            },
            "& .MuiSlider-rail": { height: 4 },
            "& .MuiSlider-track": { height: 4 },
            "& .MuiSlider-valueLabel": {
              fontSize: "0.75rem",
              top: -2,
              padding: "2px 4px",
            },
            mb: 0,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            color: "#666",
            fontSize: "0.85rem",
          }}
        >
          Price Range: ${priceRange[0]} - ${priceRange[1] === 1000000 ? "Any" : priceRange[1]}
        </Typography>
      </Box>

      <Box sx={{ mb: 2, p: 0, bgcolor: "#fff" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#282828",
            fontSize: "14pt",
            fontWeight: "bold",
            pl: 0,
          }}
        >
          Latest Products
        </Typography>

        {loadingProducts && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress size={20} />
          </Box>
        )}

        {latestProducts.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 0.5,
              pl: 0,
            }}
          >
            <img
              src={
                item.imageUrls[0] ||
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&crop=center"
              }
              alt={item.name}
              style={{
                width: 60,
                height: 60,
                marginRight: 10,
                objectFit: "cover",
              }}
            />
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.85rem",
                  mb: 0.2,
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                color="#f97316"
                sx={{
                  fontSize: "0.85rem",
                  mb: 0.2,
                }}
              >
                ${item.price.toFixed(2)}
              </Typography>
              <Rating
                name={`rating-${item.id}`}
                value={item.rating}
                precision={0.1}
                readOnly
                size="small"
                sx={{
                  fontSize: "0.9rem",
                  color: "#f97316",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Product Tags – giữ nguyên 100% */}
      <Box sx={{ p: 0, bgcolor: "#fff" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#4A4A4A",
            fontSize: "14pt",
            fontWeight: "bold",
          }}
        >
          Product Tags
        </Typography>
        <Box>
          {["Services", "Our Menu", "Pizza", "Burger", "Cupcake", "Cookies", "Tandoori Chicken"].map((tag) => (
            <Typography
              key={tag}
              variant="body2"
              sx={{
                display: "inline-block",
                bgcolor: selectedTag === tag ? "#fff" : "#ffffff",
                color: selectedTag === tag ? "#FF9F0D" : "#4F4F4F",
                mr: 1,
                mb: 0.5,
                borderBottom: selectedTag === tag ? "2px solid #FF9F0D" : "2px solid #F2F2F2",
                borderRadius: 0,
                cursor: "pointer",
                "&:hover": {
                  bgcolor: selectedTag === tag ? "#e06b16" : "#ffffff",
                  color: selectedTag === tag ? "#fff" : "#4A4A4A",
                },
              }}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
});

export default FilterSidebar;
