import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import chef1 from "../../assets/images/image_chef_1.png";
import chef2 from "../../assets/images/image_chef_2.png";
import chef3 from "../../assets/images/image_chef_3.png";
import chef4 from "../../assets/images/image_chef_4.png";
import chef5 from "../../assets/images/image_chef_5.png";
import chef6 from "../../assets/images/image_chef_1.png";
import chef7 from "../../assets/images/image_chef_1.png";
import chef8 from "../../assets/images/image_chef_1.png";
import chef9 from "../../assets/images/image_chef_1.png";
import chef10 from "../../assets/images/image_chef_1.png";
import chef11 from "../../assets/images/image_chef_1.png";
import chef12 from "../../assets/images/image_chef_1.png";
import ChefCard from "./ChefCard";

interface Chef {
  name: string;
  image: string;
  role: "Head Chef" | "Sous Chef";
}

const ChefPage: React.FC = () => {
  const chefs: Chef[] = [
    { name: "Tahmina Rumi", image: chef1, role: "Head Chef" },
    { name: "Jorina Begum", image: chef2, role: "Sous Chef" },
    { name: "M. Mohammad", image: chef3, role: "Head Chef" },
    { name: "Munna Kathy", image: chef4, role: "Sous Chef" },
    { name: "Bisnu Devgon", image: chef5, role: "Head Chef" },
    { name: "William Rum", image: chef6, role: "Sous Chef" },
    { name: "Motin Mollafs", image: chef7, role: "Head Chef" },
    { name: "Kets William Roy", image: chef8, role: "Sous Chef" },
    { name: "Mahmu Khodli", image: chef9, role: "Head Chef" },
    { name: "Ataur Rahman", image: chef10, role: "Sous Chef" },
    { name: "Monalisa Holly", image: chef11, role: "Head Chef" },
    { name: "John Doe", image: chef12, role: "Sous Chef" },
  ];

  return (
    <section className="w-full min-h-[80vh] flex flex-col relative py-12" style={{}}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
        {" "}
        {/* Padding trái/phải */}
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
          }}
        >
          <Typography
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            variant="h3"
            fontWeight="700"
            sx={{
              fontFamily: "Miniver",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
              lineHeight: { xs: 1.3, md: 1.2 },
            }}
          >
            Meet Our Talented Chefs
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // 1 cột trên mobile
              sm: "repeat(2, 1fr)", // 2 cột trên tablet
              md: "repeat(4, 1fr)", // 4 cột trên desktop
            },
            gap: 0, //khoảng cách giữa các thẻ
            justifyContent: "center", // Căn giữa theo chiều ngang
            margin: "0 auto", // Căn giữa toàn bộ grid
            maxWidth: "100%", // Giới hạn chiều rộng tối đa
            width: "fit-content", // Chiều rộng tự động dựa trên nội dung
          }}
        >
          {chefs.map((chef, index) => (
            <ChefCard
              key={index}
              chef={chef}
              imageWidth="80%" // Tùy chỉnh độ rộng hình ảnh
              fontSizeName="1rem" // Tùy chỉnh kích thước chữ tên
              fontSizeRole="16px" // Tùy chỉnh kích thước chữ vai trò
              index={index}
            />
          ))}
        </Box>
      </Container>
    </section>
  );
};

export default ChefPage;
