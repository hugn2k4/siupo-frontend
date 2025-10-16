import { Box, Typography } from "@mui/material";
import React from "react";

interface MenuItemProps {
  item: {
    name: string;
    description: string;
    price: string;
    calories?: string;
  };
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="body1"
        sx={{
          color: "#000",
          fontWeight: 500,
          "&:hover": { color: "var(--color-yellow)" },
          transition: "color 0.3s ease",
        }}
      >
        • {item.name} <span style={{ fontWeight: "bold", color: "var(--color-yellow)" }}>{item.price}</span>
        {item.calories && <span style={{ color: "#666", marginLeft: 2 }}>{item.calories}</span>}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#666",
          ml: 2,
          "&:hover": { color: "var(--color-yellow)" },
          transition: "color 0.3s ease",
        }}
      >
        {item.description}
      </Typography>
    </Box>
  );
};

export default MenuItem;
