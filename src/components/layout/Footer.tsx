import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "black", color: "white", py: 4, mt: 8 }}>
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="body1">
          © 2025 Nhà hàng của bạn. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
