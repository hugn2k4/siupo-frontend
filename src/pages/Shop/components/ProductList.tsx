import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import imageDefault from "../../../assets/gallery/gallery_burger.png";

const ProductList = () => {
  const [sortBy, setSortBy] = useState("newest"); // Khởi tạo giá trị mặc định
  const [showCount, setShowCount] = useState("default"); // Khởi tạo giá trị mặc định
  const [currentPage, setCurrentPage] = useState(2);

  // Mock data với ít nhất 15 sản phẩm, thêm giá giảm
  const products = [
    {
      name: "Fresh Lime",
      price: "$45.00",
      originalPrice: "$50.00",
      image: imageDefault,
      isNew: false,
    },
    {
      name: "Chocolate Muffin",
      price: "$18.00",
      originalPrice: "$25.00",
      image: imageDefault,
      isNew: true,
    },
    {
      name: "Burger",
      price: "$21.00",
      originalPrice: "$45.00",
      image: imageDefault,
      isNew: false,
    },
    {
      name: "Country Burger",
      price: "$45.00",
      originalPrice: "$60.00",
      image: imageDefault,
      isNew: false,
    },
    {
      name: "Drink",
      price: "$48.00",
      originalPrice: null,
      image: imageDefault,
      isNew: false,
    },
    {
      name: "Pizza",
      price: "$30.00",
      originalPrice: "$40.00",
      image: imageDefault,
      isNew: false,
    },
    {
      name: "Cheese Butter",
      price: "$10.00",
      originalPrice: null,
      image: imageDefault,
      isNew: false,
    },
    {
      name: "Sandwiches",
      price: "$25.00",
      originalPrice: "$35.00",
      image: imageDefault,
      isNew: false,
    },
    {
      name: "Chicken Chup",
      price: "$12.00",
      originalPrice: null,
      image: imageDefault,
      isNew: false,
    },
    {
      name: "Fresh Salad",
      price: "$15.00",
      originalPrice: "$20.00",
      image: imageDefault,
      isNew: false,
    },
    {
      name: "Pasta",
      price: "$20.00",
      originalPrice: null,
      image: imageDefault,
      isNew: false,
    },
    {
      name: "Ice Cream",
      price: "$8.00",
      originalPrice: "$12.00",
      image: imageDefault,
      isNew: true,
    },
    {
      name: "French Fries",
      price: "$10.00",
      originalPrice: null,
      image: imageDefault,
      isNew: false,
    },
    {
      name: "Coffee",
      price: "$5.00",
      originalPrice: "$7.00",
      image: imageDefault,
      isNew: false,
    },
    {
      name: "Donut",
      price: "$6.00",
      originalPrice: null,
      image: imageDefault,
      isNew: false,
    },
  ];

  const totalPages = 5;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];

    // Previous button
    pages.push(
      <Button
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
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

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
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
          {i}
        </Button>
      );
    }

    // Next button
    pages.push(
      <Button
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
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
              onChange={(e) => setSortBy(e.target.value)} // Thêm onChange để cập nhật sortBy
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
              onChange={(e) => setShowCount(e.target.value)} // Thêm onChange để cập nhật showCount
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
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="12">12 per page</MenuItem>
              <MenuItem value="15">15 per page</MenuItem>
              <MenuItem value="24">24 per page</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Product Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, mb: 3, mt: 2 }}>
        {products.map((product, index) => (
          <Box
            key={index}
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
            <Box sx={{ position: "relative", overflow: "hidden", height: 210 }}>
              <Box component="img" src={product.image} alt={product.name} sx={{ objectFit: "cover" }} />
              {product.isNew && (
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
                  "&:hover": { opacity: 1 },
                  transition: "opacity 0.3s ease",
                }}
              >
                <Box sx={{ bgcolor: "rgba(255, 255, 255, 0.8)", p: 0.5, borderRadius: 1 }}>
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
                  {product.price}
                </Typography>
                {product.originalPrice && (
                  <Typography variant="body2" color="#828282" sx={{ fontSize: 13, textDecoration: "line-through" }}>
                    {product.originalPrice}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, pt: 1.5, borderTop: "1px solid #e5e7eb" }}>
        {renderPagination()}
      </Box>
    </Box>
  );
};

export default ProductList;
