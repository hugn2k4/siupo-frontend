import { Box, Typography } from "@mui/material";
import React from "react";

const statsData = [
  { image: "../../src/assets/images/image_chef.png", number: "420", description: "Professional Chefs" },
  { image: "../../src/assets/images/image_food.png", number: "320", description: "Items Of Food" },
  { image: "../../src/assets/images/image_experience.png", number: "30+", description: "Years of Experience" },
  { image: "../../src/assets/images/image_happy.png", number: "420", description: "Happy Customers" },
];

const StatsSection: React.FC = () => {
  return (
    <Box
      sx={{
        mb: 8,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        py: 4,
        minHeight: "50vh",
        position: "relative",
        px: { xs: 6, sm: 8 },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(../../src/assets/images/image_stats_background.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#000000be",
          zIndex: 2,
        },
        "& > *": {
          position: "relative",
          zIndex: 3,
        },
      }}
    >
      {statsData.map((stat, index) => (
        <Box key={index} sx={{ textAlign: "center", mx: 2, mb: { xs: 4, sm: 0 } }}>
          <Box sx={{ width: "120px", height: "120px", margin: "0 auto" }}>
            <img
              src={stat.image}
              alt={`${stat.number} ${stat.description}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { color: "var(--color-yellow)" },
                transition: "color 0.3s ease",
              }}
            >
              {stat.number}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                "&:hover": { color: "var(--color-yellow)" },
                transition: "color 0.3s ease",
              }}
            >
              {stat.description}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default StatsSection;
