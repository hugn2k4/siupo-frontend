// src/components/FilterSidebar.tsx

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Rating,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
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
    viewMode: "all" | "products" | "combos";
  }) => void;
}

const FilterSidebar = memo(({ onFilterChange }: FilterSidebarProps) => {
  const [searchName, setSearchName] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [viewMode, setViewMode] = useState<"all" | "products" | "combos">("all");
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [latestProducts, setLatestProducts] = useState<LatestProductWithRating[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const prevFilterKey = useRef<string>("");
  const currentFilterKey = `${searchName || ""}|${selectedCategories.join(",")}|${priceRange[0]}|${priceRange[1]}|${viewMode}`;

  useEffect(() => {
    if (currentFilterKey !== prevFilterKey.current) {
      prevFilterKey.current = currentFilterKey;
      onFilterChange({
        searchName,
        categoryIds: selectedCategories,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        viewMode,
      });
    }
  }, [currentFilterKey, onFilterChange, searchName, selectedCategories, priceRange, viewMode]);

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
      viewMode,
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
        mt: { md: "75px", xs: 0 },
        mb: 12,
        // Thay bằng:
        // mt: 0,
        padding: 3,
        bgcolor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: 0,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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

      {/* Menu Type Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#333" }}>
          Types
        </Typography>
        <RadioGroup
          value={viewMode}
          onChange={(e) => {
            setViewMode(e.target.value as "all" | "products" | "combos");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <FormControlLabel
            value="all"
            control={<Radio size="small" sx={{ color: "#FF9F0D", "&.Mui-checked": { color: "#FF9F0D" } }} />}
            label={<Typography variant="body2">All</Typography>}
          />
          <FormControlLabel
            value="combos"
            control={<Radio size="small" sx={{ color: "#FF9F0D", "&.Mui-checked": { color: "#FF9F0D" } }} />}
            label={<Typography variant="body2">Combos</Typography>}
          />
          <FormControlLabel
            value="products"
            control={<Radio size="small" sx={{ color: "#FF9F0D", "&.Mui-checked": { color: "#FF9F0D" } }} />}
            label={<Typography variant="body2">Products</Typography>}
          />
        </RadioGroup>
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
      <Box sx={{ mb: 4, p: 0, bgcolor: "#fff" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#1A1A1A",
            fontWeight: 700,
            fontSize: "1.1rem",
            mb: 2,
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
            height: 4,
            "& .MuiSlider-thumb": {
              width: 16,
              height: 16,
              border: "3px solid #fff",
              backgroundColor: "#FF9F0D",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              "&:hover, &.Mui-focusVisible": {
                boxShadow: "0 0 0 8px rgba(255, 159, 13, 0.16)",
              },
            },
            "& .MuiSlider-rail": { opacity: 0.3, backgroundColor: "#FF9F0D" },
            "& .MuiSlider-valueLabel": {
              backgroundColor: "#FF9F0D",
            },
            mb: 1,
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            From: <span style={{ color: "#1A1A1A", fontWeight: 600 }}>${priceRange[0]}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            To:{" "}
            <span style={{ color: "#1A1A1A", fontWeight: 600 }}>
              ${priceRange[1] === 1000000 ? "Any" : priceRange[1]}
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            component="button"
            onClick={() => {}} // Add filter logic if needed
            sx={{
              border: "none",
              bgcolor: "transparent",
              color: "#666",
              fontSize: "0.9rem",
              cursor: "pointer",
              "&:hover": { color: "#FF9F0D" },
            }}
          >
            Filter
          </Typography>
        </Box>
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

      {/* Product Tags */}
      <Box sx={{ p: 0, bgcolor: "#fff" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#1A1A1A",
            fontSize: "1.1rem",
            fontWeight: 700,
            mb: 2,
          }}
        >
          Product Tags
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {["Services", "Our Menu", "Pizza", "Burger", "Cupcake", "Cookies", "Tandoori Chicken"].map((tag) => (
            <Typography
              key={tag}
              variant="body2"
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.5,
                bgcolor: selectedTag === tag ? "#FF9F0D" : "transparent",
                color: selectedTag === tag ? "#fff" : "#4F4F4F",
                borderBottom: selectedTag === tag ? "none" : "1px solid #F2F2F2",
                borderRadius: 0,
                cursor: "pointer",
                fontSize: "0.9rem",
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "#FF9F0D",
                  borderBottomColor: "#FF9F0D",
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
