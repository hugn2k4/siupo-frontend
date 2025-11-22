// src/pages/OurShopPage.tsx
import { useState, useCallback, useMemo, useRef } from "react";
import { Box, IconButton, Drawer, useMediaQuery, useTheme } from "@mui/material";
import FilterSidebar from "./components/FilterSidebar";
import ProductList from "./components/ProductList";
import FilterListIcon from "@mui/icons-material/FilterList";

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
    maxPrice: 200,
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const prevFiltersRef = useRef<string>("");
  const filterKey = `${filters.searchName || ""}|${filters.categoryIds.join(",")}|${filters.minPrice}|${filters.maxPrice}`;

  const productListProps = useMemo(
    () => ({
      searchName: filters.searchName,
      categoryIds: filters.categoryIds,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    }),
    [filterKey]
  );

  const handleFilterChange = useCallback(
    (newFilters: FilterState) => {
      const newKey = `${newFilters.searchName || ""}|${newFilters.categoryIds.join(",")}|${newFilters.minPrice}|${newFilters.maxPrice}`;
      if (newKey === prevFiltersRef.current) return;
      prevFiltersRef.current = newKey;
      setFilters(newFilters);
      if (isMobile) setMobileOpen(false);
    },
    [isMobile]
  );

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Mobile Filter Button */}
      {isMobile && (
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1100,
            bgcolor: "background.paper",
            p: 1,
            textAlign: "right",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ bgcolor: "#FF9F0D", color: "white", "&:hover": { bgcolor: "#e68a00" } }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>
      )}

      {/* LAYOUT CHÍNH – DÙNG GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 320px" },
          gap: { xs: 0, lg: 4 },
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 2, lg: 4 },
          minHeight: "100vh",
          alignItems: "start",
          pt: { xs: 7, sm: 8, lg: 1 },
        }}
      >
        {/* Product List – luôn giữ chỗ */}
        <Box sx={{ minHeight: "800px" }}>
          <ProductList {...productListProps} />
        </Box>

        {/* Desktop Sidebar – cố định tuyệt đối */}
        {!isMobile && (
          <Box
            sx={{
              position: "sticky",
              top: 24,
              alignSelf: "start",
              width: "100%",
              maxWidth: 250,
            }}
          >
            <FilterSidebar onFilterChange={handleFilterChange} />
          </Box>
        )}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: 320, boxSizing: "border-box" } }}
      >
        <Box sx={{ width: 320, p: 3, pt: 6 }}>
          <FilterSidebar onFilterChange={handleFilterChange} />
        </Box>
      </Drawer>
    </>
  );
}

export default OurShopPage;
