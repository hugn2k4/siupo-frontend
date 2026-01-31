// src/components/FilterSidebar.tsx

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Checkbox,
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
import type { TagResponse } from "../../../api/tagApi";
import { useCurrency } from "../../../hooks/useCurrency";
import useTranslation from "../../../hooks/useTranslation";
import type { CategoryResponse } from "../../../types/responses/category.response";
import type { ProductWithRatingResponse } from "../../../types/responses/product.response";
import { EXCHANGE_RATE_USD_TO_VND } from "../../../utils/format";
interface FilterSidebarProps {
  onFilterChange: (filters: {
    searchName: string | null;
    categoryIds: number[];
    tagIds: number[];
    minPrice: number;
    maxPrice: number;
    viewMode: "all" | "products" | "combos";
  }) => void;
  categories: CategoryResponse[];
  tags: TagResponse[];
  latestProducts: ProductWithRatingResponse[];
}

const FilterSidebar = memo(({ onFilterChange, categories, tags, latestProducts }: FilterSidebarProps) => {
  const { t, i18n } = useTranslation("shop");
  const { format } = useCurrency();
  const isVi = i18n.language.startsWith("vi");

  const [searchName, setSearchName] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const maxSlider = isVi ? 5000000 : 200;
  const [priceRange, setPriceRange] = useState<number[]>([0, maxSlider]);
  const [viewMode, setViewMode] = useState<"all" | "products" | "combos">("all");
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const prevFilterKey = useRef<string>("");
  const currentFilterKey = `${searchName || ""}|${selectedCategories.join(",")}|${selectedTagIds.join(",")}|${priceRange[0]}|${priceRange[1]}|${viewMode}`;
  const EXCHANGE_RATE = EXCHANGE_RATE_USD_TO_VND;

  useEffect(() => {
    setPriceRange([0, isVi ? 5000000 : 200]);
  }, [isVi]);

  useEffect(() => {
    if (currentFilterKey !== prevFilterKey.current) {
      prevFilterKey.current = currentFilterKey;

      const finalMinPrice = isVi ? priceRange[0] / EXCHANGE_RATE : priceRange[0];
      const finalMaxPrice = isVi ? priceRange[1] / EXCHANGE_RATE : priceRange[1];

      onFilterChange({
        searchName,
        categoryIds: selectedCategories,
        tagIds: selectedTagIds,
        minPrice: finalMinPrice,
        maxPrice: finalMaxPrice,
        viewMode,
      });
    }
  }, [
    currentFilterKey,
    onFilterChange,
    searchName,
    selectedCategories,
    selectedTagIds,
    priceRange,
    viewMode,
    isVi,
    EXCHANGE_RATE,
  ]);

  const handleSearch = () => {
    onFilterChange({
      searchName,
      categoryIds: selectedCategories,
      tagIds: selectedTagIds,
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

  const handleTagClick = (tagId: number) => {
    setSelectedTagIds((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]));
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
          placeholder={t("filter.searchPlaceholder")}
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
          {t("filter.types")}
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
            label={<Typography variant="body2">{t("filter.all")}</Typography>}
          />
          <FormControlLabel
            value="combos"
            control={<Radio size="small" sx={{ color: "#FF9F0D", "&.Mui-checked": { color: "#FF9F0D" } }} />}
            label={<Typography variant="body2">{t("filter.combos")}</Typography>}
          />
          <FormControlLabel
            value="products"
            control={<Radio size="small" sx={{ color: "#FF9F0D", "&.Mui-checked": { color: "#FF9F0D" } }} />}
            label={<Typography variant="body2">{t("filter.products")}</Typography>}
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
          {t("filter.category")}
        </Typography>
        {categories.length === 0 ? (
          <Box sx={{ py: 1 }}>
            <Box sx={{ height: 24, bgcolor: "grey.200", mb: 1, borderRadius: 1 }} className="animate-pulse" />
            <Box sx={{ height: 24, bgcolor: "grey.200", mb: 1, borderRadius: 1 }} className="animate-pulse" />
            <Box sx={{ height: 24, bgcolor: "grey.200", borderRadius: 1 }} className="animate-pulse" />
          </Box>
        ) : (
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
          {t("filter.price")}
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={isVi ? 5000000 : 200}
          step={isVi ? 50000 : 1}
          valueLabelFormat={(value) => (isVi ? `${(value / 1000000).toFixed(1)}M` : `$${value}`)}
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
            {t("filter.from")}:{" "}
            <span style={{ color: "#1A1A1A", fontWeight: 600 }}>
              {format(isVi ? priceRange[0] / 25400 : priceRange[0])}
            </span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("filter.to")}:{" "}
            <span style={{ color: "#1A1A1A", fontWeight: 600 }}>
              {format(isVi ? priceRange[1] / 25400 : priceRange[1])}
            </span>
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
          {t("filter.latest")}
        </Typography>

        {latestProducts.length === 0 ? (
          <Box sx={{ py: 1 }}>
            {[1, 2, 3].map((i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Box
                  sx={{ width: 60, height: 60, bgcolor: "grey.200", mr: 1.5, borderRadius: 1 }}
                  className="animate-pulse"
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ height: 16, bgcolor: "grey.200", mb: 0.5, borderRadius: 1 }} className="animate-pulse" />
                  <Box
                    sx={{ height: 14, bgcolor: "grey.200", width: "60%", borderRadius: 1 }}
                    className="animate-pulse"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          latestProducts.map((item) => (
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
                  {format(item.price)}
                </Typography>
                <Rating
                  name={`rating-${item.id}`}
                  value={item.averageRating}
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
          ))
        )}
      </Box>

      {/* Product Tags – giữ nguyên 100% */}
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
          {t("filter.tags")}
        </Typography>
        {tags.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
            {t("filter.noTags")}
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tags.map((tag) => (
              <Typography
                key={tag.id}
                variant="body2"
                sx={{
                  display: "inline-block",
                  px: 2,
                  py: 0.5,
                  bgcolor: selectedTagIds.includes(tag.id) ? "#FF9F0D" : "transparent",
                  color: selectedTagIds.includes(tag.id) ? "#fff" : "#4F4F4F",
                  borderBottom: selectedTagIds.includes(tag.id) ? "none" : "1px solid #F2F2F2",
                  borderRadius: 0,
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "#FF9F0D",
                    borderBottomColor: "#FF9F0D",
                  },
                }}
                onClick={() => handleTagClick(tag.id)}
              >
                {tag.name}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default FilterSidebar;
