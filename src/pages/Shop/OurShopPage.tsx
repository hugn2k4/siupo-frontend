import { useState, useCallback } from "react";
import { Box } from "@mui/material";
import FilterSidebar from "./components/FilterSidebar";
import ProductList from "./components/ProductList";

interface FilterState {
  searchName: string | null;
  categoryIds: number[];
  minPrice: number;
  maxPrice: number;
}

function OurShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    searchName: null,
    categoryIds: [],
    minPrice: 0,
    maxPrice: 8000,
  });

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
        gap: 0,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <ProductList
          searchName={filters.searchName}
          categoryIds={filters.categoryIds}
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
        />
      </Box>
      <Box sx={{ width: "300px" }}>
        <FilterSidebar onFilterChange={handleFilterChange} />
      </Box>
    </Box>
  );
}

export default OurShopPage;
