import { useState, useCallback } from "react";
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
    maxPrice: 1000000,
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // < 900px

  const handleFilterChange = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);
      if (isMobile) setMobileOpen(false); // Đóng drawer sau khi lọc
    },
    [isMobile]
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 280, p: 2 }}>
      <FilterSidebar onFilterChange={handleFilterChange} />
    </Box>
  );

  return (
    <>
      {/* Nút Filter chỉ hiện trên Mobile */}
      {isMobile && (
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1100,
            bgcolor: "background.paper",
            p: 1,
            borderBottom: "1px solid #e0e0e0",
            textAlign: "right",
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              bgcolor: "#FF9F0D",
              color: "white",
              "&:hover": { bgcolor: "#e68a00" },
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>
      )}

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
          gap: 3,
          flexWrap: "nowrap",
        }}
      >
        {/* Product List */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <ProductList
            searchName={filters.searchName}
            categoryIds={filters.categoryIds}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
          />
        </Box>

        {/* Desktop: Sidebar luôn hiển thị */}
        {!isMobile && (
          <Box
            sx={{
              width: "250px",
              flexShrink: 0,
              position: "sticky",
              top: 20,
              alignSelf: "flex-start",
            }}
          >
            <FilterSidebar onFilterChange={handleFilterChange} />
          </Box>
        )}
      </Box>

      {/* Mobile: Drawer từ bên phải */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default OurShopPage;
