// src/pages/OurShopPage.tsx
import FilterListIcon from "@mui/icons-material/FilterList";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Box, Drawer, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import ComboList from "./components/ComboList";
import FilterSidebar from "./components/FilterSidebar";
import ProductList from "./components/ProductList";

interface FilterState {
  searchName: string | null;
  categoryIds: number[];
  minPrice: number;
  maxPrice: number;
  viewMode: "all" | "products" | "combos";
}

function OurShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    searchName: null,
    categoryIds: [],
    minPrice: 0,
    maxPrice: 1000000,
    viewMode: "all",
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const prevFiltersRef = useRef<string>("");

  const productListProps = useMemo(
    () => ({
      searchName: filters.searchName,
      categoryIds: filters.categoryIds,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    }),
    [filters.searchName, filters.categoryIds, filters.minPrice, filters.maxPrice]
  );

  const handleFilterChange = useCallback(
    (newFilters: FilterState) => {
      const newKey = `${newFilters.searchName || ""}|${newFilters.categoryIds.join(",")}|${newFilters.minPrice}|${newFilters.maxPrice}|${newFilters.viewMode}`;
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
            p: 1.5,
            display: "flex",
            justifyContent: "flex-end",
            borderBottom: "1px solid #e0e0e0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              bgcolor: "#FF9F0D",
              color: "white",
              borderRadius: 2,
              "&:hover": { bgcolor: "#e68a00" },
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>
      )}

      {/* Main Layout */}
      <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 2, lg: 4 }, py: { xs: 4, md: 8 } }}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={4} alignItems="flex-start">
          {/* Main Content (Left) */}
          <Box flex={1} width="100%">
            {/* Hot Combos Section */}
            {(filters.viewMode === "all" || filters.viewMode === "combos") && (
              <Box mb={8}>
                <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                  <LocalFireDepartmentIcon sx={{ color: "#FF9F0D", fontSize: 32 }} />
                  <Typography variant="h4" fontWeight={800} color="#1A1A1A">
                    Hot Combos & Specials!
                  </Typography>
                </Stack>
                <ComboList />
              </Box>
            )}

            {/* All Products Section */}
            {(filters.viewMode === "all" || filters.viewMode === "products") && (
              <Box>
                <Typography variant="h4" fontWeight={800} color="#1A1A1A" mb={4}>
                  All Products Menu
                </Typography>
                <ProductList {...productListProps} />
              </Box>
            )}
          </Box>

          {/* Sidebar (Right) */}
          {!isMobile && (
            <Box width={280} flexShrink={0} sx={{ position: "sticky", top: 24 }}>
              <FilterSidebar onFilterChange={handleFilterChange} />
            </Box>
          )}
        </Stack>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: false }}
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
