import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          background: "url('/hero-bg.jpg') center/cover no-repeat",
          borderRadius: 3,
          color: "white",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Chào mừng đến với Nhà hàng 🍽️
        </Typography>
        <Typography variant="h6" gutterBottom>
          Thưởng thức ẩm thực tuyệt hảo cùng không gian sang trọng
        </Typography>
        <Button
          component={Link}
          to="/menu"
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 3 }}
        >
          Xem Thực Đơn
        </Button>
      </Box>

      {/* Intro Section */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Vì sao chọn chúng tôi?
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: "auto" }}>
          Nhà hàng của chúng tôi tự hào mang đến cho bạn trải nghiệm ẩm thực độc
          đáo, nguyên liệu tươi ngon, không gian ấm cúng và dịch vụ tận tâm.
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
