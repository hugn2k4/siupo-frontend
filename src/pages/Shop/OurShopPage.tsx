import { useState } from "react";
import { Box } from "@mui/material";
import FilterSidebar from "./components/FilterSidebar";
import ProductList from "./components/ProductList";

function OurShopPage() {
  const [filters, setFilters] = useState<{
    searchName: string | null;
    categoryIds: number[];
    minPrice: number;
    maxPrice: number;
  }>({
    searchName: null,
    categoryIds: [],
    minPrice: 0,
    maxPrice: 8000,
  });

  const handleFilterChange = (newFilters: {
    searchName: string | null;
    categoryIds: number[];
    minPrice: number;
    maxPrice: number;
  }) => {
    setFilters(newFilters);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center", // Căn giữa các thành phần theo chiều ngang
        alignItems: "flex-start", // Đảm bảo các thành phần căn đầu trên cùng
        width: "100%",
        maxWidth: "1200px", // Giới hạn chiều rộng tối đa
        margin: "0 auto", // Căn giữa container
        padding: "0 20px", // Thêm padding hai bên
        gap: 0, // Loại bỏ khoảng trống giữa các thành phần con
      }}
    >
      <Box sx={{ flex: 1, margin: 0, padding: 0 }}>
        <ProductList
          searchName={filters.searchName}
          categoryIds={filters.categoryIds}
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
        />
      </Box>
      <Box sx={{ width: "300px", margin: 0, padding: 0 }}>
        <FilterSidebar onFilterChange={handleFilterChange} />
      </Box>
    </Box>
  );
}

export default OurShopPage;
