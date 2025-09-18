import { Box } from "@mui/material";
import FilterSidebar from "./components/FilterSidebar";
import ProductList from "./components/ProductList";

function OurShopPage() {
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
      <Box sx={{ margin: 0, padding: 0 }}>
        <ProductList />
      </Box>
      <Box sx={{ width: "300px", margin: 0, padding: 0 }}>
        <FilterSidebar />
      </Box>
    </Box>
  );
}

export default OurShopPage;
