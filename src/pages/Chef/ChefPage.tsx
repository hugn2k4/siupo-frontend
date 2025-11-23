import { Container, Typography, Box } from "@mui/material";
import React from "react";

import chef1 from "../../assets/images/image_chef_1.png";
import chef2 from "../../assets/images/image_chef_2.png";
import chef3 from "../../assets/images/image_chef_3.png";

const chefs = [
  {
    name: "LE CONG HUNG",
    role: "EXECUTIVE HEAD CHEF",
    desc: "Leading our kitchen with 15 years of mastery and creativity.",
    image: chef1,
  },
  {
    name: "VO THI KIM ANH",
    role: "MASTER PASTRY CHEF",
    desc: "The artist behind every exquisite dessert.",
    image: chef2,
  },
  {
    name: "TRAN NHAT MINH",
    role: "GRILL MASTER",
    desc: "King of fire and smoke — perfection in every sear.",
    image: chef3,
  },
];

const ChefPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#fffcf6", py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        {/* 3 ảnh sát nhau, cao hơn, KHÔNG hover */}
        <Box
          sx={{
            display: "flex",
            gap: 0, // sát nhau 100%
            flexWrap: { xs: "wrap", md: "nowrap" },
            justifyContent: "center",
            mb: 8,
          }}
        >
          {chefs.map((chef, i) => (
            <Box key={i} sx={{ flex: "1", minWidth: 260 }}>
              <img
                src={chef.image}
                alt={chef.name}
                style={{
                  width: "100%",
                  height: "540px", // dài hơn, hiển thị đầy đủ
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Tên + chức danh + mô tả */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 3, md: 4 },
            flexWrap: { xs: "wrap", md: "nowrap" },
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {chefs.map((chef, i) => (
            <Box key={i} sx={{ flex: "1", minWidth: 260, px: 2 }}>
              <Typography
                sx={{
                  fontSize: { xs: "1.6rem", md: "1.8rem" },
                  fontWeight: 600,
                  color: "#333",
                  mb: 0.5,
                  letterSpacing: "1px",
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                {chef.name}
              </Typography>

              <Typography
                sx={{
                  color: "#b8975c",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  mb: 1.5,
                }}
              >
                {chef.role}
              </Typography>

              <Typography sx={{ color: "#666", fontSize: "0.92rem", lineHeight: 1.7 }}>{chef.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ChefPage;
