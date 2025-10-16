import { Box, Typography } from "@mui/material";
import React from "react";

const partners = [
  { image: "../../src/assets/images/image_partner_1.png" },
  { image: "../../src/assets/images/image_partner_2.png" },
  { image: "../../src/assets/images/image_partner_3.png" },
  { image: "../../src/assets/images/image_partner_4.png" },
  { image: "../../src/assets/images/image_partner_5.png" },
  { image: "../../src/assets/images/image_partner_6.png" },
];

const PartnersSection: React.FC = () => {
  return (
    <Box sx={{ mb: 0, textAlign: "center", backgroundColor: "#fff", py: 4, px: { xs: 4, sm: 8 } }}>
      <Typography
        variant="h6"
        sx={{
          color: "#333333",
          mb: 0,
          fontSize: "1.25rem",
          fontWeight: "light",
          "&:hover": { color: "var(--color-yellow)" },
          transition: "color 0.3s ease",
        }}
      >
        Partners & Clients
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: "#333333",
          mb: 4,
          fontSize: "2.5rem",
          fontWeight: "bold",
          "&:hover": { color: "var(--color-yellow)" },
          transition: "color 0.3s ease",
        }}
      >
        We work with the best people
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 7 }}>
        {partners.map((partner, index) => (
          <Box
            key={index}
            sx={{
              width: "125px",
              height: "125px",
              margin: "0px", // Loại bỏ margin để không có khoảng trống giữa các hình
            }}
          >
            <img
              src={partner.image}
              alt={`Partner ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PartnersSection;
