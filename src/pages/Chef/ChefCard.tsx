import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

interface Chef {
  name: string;
  image: string;
  role: "Head Chef" | "Sous Chef";
}

interface ChefCardProps {
  chef: Chef;
  imageWidth?: string;
  fontSizeName?: string;
  fontSizeRole?: string;
  index: number;
}

const ChefCard: React.FC<ChefCardProps> = ({
  chef,
  imageWidth = "100%",
  fontSizeName = "1rem",
  fontSizeRole = "16px",
  index,
}) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      sx={{
        textAlign: "center",
        padding: 0, // Loại bỏ padding bên trong card
        margin: 0, // Loại bỏ margin bên trong card
        "&:hover": {
          transform: "scale(1.05)",
          transition: "transform 0.3s ease",
        },
      }}
    >
      <img
        src={chef.image}
        alt={chef.name}
        style={{
          width: imageWidth,
          height: "auto",
          objectFit: "cover",
          borderRadius: 8,
          margin: "0 auto",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          mt: 1,
          color: "var(--color-gray2)",
          fontWeight: 700,
          fontSize: fontSizeName,
          margin: 0, // Loại bỏ margin của Typography
          padding: 0, // Loại bỏ padding của Typography
        }}
      >
        {chef.name}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "#333333",
          fontSize: fontSizeRole,
          margin: 0, // Loại bỏ margin của Typography
          padding: 0, // Loại bỏ padding của Typography
        }}
      >
        {chef.role}
      </Typography>
    </Box>
  );
};

export default ChefCard;
