import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Rating,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";

const FilterSidebar = () => {
  const [selectedTag, setSelectedTag] = React.useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTagClick = (tag: any) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const [priceRange, setPriceRange] = React.useState([0, 5000]);

  const handlePriceChange = () => {
    setPriceRange([100, 1000]);
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" sx={{ backgroundColor: "#FF9F0D", borderRadius: 0, color: "white" }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              fontSize: "0.85rem", // Giảm kích thước chữ trong ô nhập liệu
            },
          }}
          sx={{
            mt: 0,
            backgroundColor: "#FF9F0D1A", // 10% opacity (#FF9F0D with 10% alpha)
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />
      </Box>

      {/* Category */}
      <Box
        sx={{
          mb: 2,
          p: 0,
          bgcolor: "#fff",
        }}
      >
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
        <FormGroup
          sx={{
            "& .MuiFormControlLabel-root": {
              marginBottom: "4px", // Giữ khoảng cách dọc nhỏ giữa các checkbox
              marginLeft: -1,
              marginRight: 0,
            },
            "& .MuiFormControlLabel-label": {
              fontSize: "0.85rem",
              marginLeft: "2px", // Đưa nhãn sát lại checkbox
            },
          }}
        >
          <FormControlLabel
            control={<Checkbox sx={{ transform: "scale(0.8)", padding: "2px" }} />} // Giảm padding của checkbox
            label="Sandwiches"
          />
          <FormControlLabel control={<Checkbox sx={{ transform: "scale(0.8)", padding: "2px" }} />} label="Burger" />
          <FormControlLabel
            control={<Checkbox sx={{ transform: "scale(0.8)", padding: "2px" }} />}
            label="Chicken Chup"
          />
          <FormControlLabel control={<Checkbox sx={{ transform: "scale(0.8)", padding: "2px" }} />} label="Drink" />
          <FormControlLabel control={<Checkbox sx={{ transform: "scale(0.8)", padding: "2px" }} />} label="Pizza" />
          <FormControlLabel control={<Checkbox sx={{ transform: "scale(0.8)", padding: "2px" }} />} label="Non Veg" />
          <FormControlLabel
            control={<Checkbox sx={{ transform: "scale(0.8)", padding: "2px" }} />}
            label="Uncategorized"
          />
        </FormGroup>
      </Box>

      {/* Poster Placeholder */}
      <Box
        sx={{
          mb: 2,
          borderRadius: 0,
          p: 0, // Loại bỏ padding để hình chiếm toàn bộ không gian
          bgcolor: "#fff",

          position: "relative", // Để button có thể đè lên hình
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden", // Đảm bảo hình không tràn ra ngoài
        }}
      >
        <img
          src="../../src/assets/gallery/gallery_banner.png"
          alt="Poster Quảng Cáo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Đảm bảo hình lấp đầy Box mà không bị méo
          }}
        />
        {/* <Button
          variant="contained"
          sx={{
            position: "absolute",
            bottom: 10, // Cách đáy 10px
            left: 10, // Cách trái 10px
            bgcolor: "#f97316",
            "&:hover": { bgcolor: "#e06b16" },
            fontSize: "0.85rem", // Giảm kích thước chữ của button cho phù hợp
            padding: "6px 12px", // Điều chỉnh padding để button nhỏ gọn
          }}
          href="#shop-now"
        >
          Shop Now ($)
        </Button> */}
      </Box>

      {/* Filter By Price */}
      <Box
        sx={{
          mb: 2,
          p: 0,
          bgcolor: "#fff",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#232323",
            fontWeight: "bold", // Đồng bộ với các thành phần trước
            fontSize: "14pt", // Đồng bộ kích thước chữ
          }}
        >
          Filter By Price
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={8000}
          sx={{
            color: "#FF9F0D", // Màu của track và thumb
            "& .MuiSlider-thumb": {
              width: 12, // Kích thước nhỏ của nút kéo
              height: 12,
              border: "3.5px solid #fff", // Viền trắng cho nút kéo
              backgroundColor: "#FF9F0D", // Giữ màu tâm như cũ
            },
            "& .MuiSlider-rail": {
              height: 4, // Thu nhỏ thanh trượt
            },
            "& .MuiSlider-track": {
              height: 4,
            },
            "& .MuiSlider-valueLabel": {
              fontSize: "0.75rem", // Giảm kích thước chữ nhãn giá
              top: -2, // Đưa nhãn sát thanh trượt
              padding: "2px 4px", // Thu nhỏ nhãn
            },
            mb: 0, // Giảm khoảng cách giữa Slider và Typography bên dưới
          }}
        />
        <Typography
          variant="body2"
          sx={{
            mt: 0.5, // Giảm khoảng cách giữa Typography và Slider
            color: "#666",
            fontSize: "0.85rem", // Đồng bộ kích thước chữ
          }}
        >
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Typography>
      </Box>

      {/* Latest Products */}
      <Box
        sx={{
          mb: 2,
          p: 0,
          bgcolor: "#fff",
        }}
      >
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
      <Box
        sx={{
          p: 0,
          bgcolor: "#fff",
        }}
      >
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
                bgcolor: selectedTag === tag ? "#fff" : "#ffffff", // Nền trắng cho tag chọn, xám nhạt cho chưa chọn
                color: selectedTag === tag ? "#FF9F0D" : "#4F4F4F", // Chữ trắng cho tag chọn, xám đậm cho chưa chọn
                // px: 1.5,
                // py: 0.3,
                mr: 1,
                mb: 0.5,
                borderBottom: selectedTag === tag ? "2px solid #FF9F0D" : "2px solid #F2F2F2", // Viền dưới cam cho tag chọn, viền mỏng cho chưa chọn
                borderRadius: 0, // Bỏ bo góc cho tất cả tag
                cursor: "pointer",
                "&:hover": {
                  bgcolor: selectedTag === tag ? "#e06b16" : "#ffffff", // Hiệu ứng hover cho tag chọn và chưa chọn
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
