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
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import categoryService from "../../../services/categoryService";
import type { CategoryResponse } from "../../../types/responses/category.response";

interface FilterSidebarProps {
  onFilterChange: (filters: {
    searchName: string | null;
    categoryIds: number[];
    minPrice: number;
    maxPrice: number;
  }) => void;
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [searchName, setSearchName] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]); //hiện tại đang gán cứng giá min max
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Fetch categories using categoryService
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      const result = await categoryService.getCategories();
      setCategories(result.categories);
      if (result.error) {
        setError(result.error);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  // Notify parent of filter changes
  useEffect(() => {
    onFilterChange({
      searchName,
      categoryIds: selectedCategories,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  }, [searchName, selectedCategories, priceRange, onFilterChange]);

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

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    // Note: Tags are not currently mapped to backend filters
  };

  const latestList = [
    {
      id: 1,
      name: "Fresh Lime",
      price: "$30.00",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&crop=center",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Chocolate Muffin",
      price: "$20.00",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&crop=center",
      rating: 4.0,
    },
    {
      id: 3,
      name: "Country Burger",
      price: "$40.00",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&crop=center",
      rating: 3.8,
    },
    {
      id: 4,
      name: "Cheese Butter",
      price: "$10.00",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&crop=center",
      rating: 4.2,
    },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      viewport={{ once: true, amount: 0 }}
      sx={{
        flex: "0 0 25%",
        padding: 2.5,
        bgcolor: "#fff",
        mt: "100px",
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
            sx: {
              fontSize: "0.85rem",
            },
          }}
          sx={{
            mt: 0,
            backgroundColor: "#FF9F0D1A",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
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
        {loading && <Typography>Loading categories...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && (
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
                      transform: "scale(0.85)", // Nhỏ hơn một chút
                      padding: "4px", // Tăng nhẹ để dễ click
                      "& .MuiSvgIcon-root": {
                        // Icon bên trong
                        fontSize: 18,
                      },
                      "&.Mui-checked": {
                        color: "#FF9F0D", // Màu khi được chọn
                      },
                      // Làm mỏng viền (outline) của checkbox
                      "& .MuiTouchRipple-root": {
                        display: "none", // Tắt ripple nếu muốn gọn
                      },
                      // Tùy chỉnh viền (border) của checkbox
                      "& .MuiButtonBase-root": {
                        padding: 0,
                      },
                      // Dùng border thay vì outline mặc định
                      "& .MuiCheckbox-root": {
                        borderRadius: 1,
                        "&:not(.Mui-checked)": {
                          border: "1.5px solid #ccc", // Viền mỏng khi chưa chọn
                        },
                        "&.Mui-checked": {
                          border: "1.5px solid #FF9F0D", // Viền mỏng khi chọn
                          bgcolor: "transparent",
                        },
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

      {/* Poster Placeholder */}
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
          max={1000000}
          sx={{
            color: "#FF9F0D",
            "& .MuiSlider-thumb": {
              width: 12,
              height: 12,
              border: "3.5px solid #fff",
              backgroundColor: "#FF9F0D",
            },
            "& .MuiSlider-rail": {
              height: 4,
            },
            "& .MuiSlider-track": {
              height: 4,
            },
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
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Typography>
      </Box>

      {/* Latest Products */}
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
        {latestList.map((item) => (
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
              src={item.image}
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
                {item.price}
              </Typography>
              <Rating
                name={`rating-${item.id}`}
                value={item.rating}
                max={5}
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
};

export default FilterSidebar;
