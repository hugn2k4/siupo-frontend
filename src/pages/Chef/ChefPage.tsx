import { Box, Card, CardContent, Chip, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";

import chef1 from "../../assets/images/chefs/image_chef_1.png";
import chef2 from "../../assets/images/chefs/image_chef_2.png";
import chef3 from "../../assets/images/chefs/image_chef_3.png";

const chefImages = [chef1, chef2, chef3];

const ChefPage: React.FC = () => {
  const { t } = useTranslation("chef");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const chefs = t("chefs", { returnObjects: true }) as Array<{
    name: string;
    role: string;
    description: string;
    experience: string;
    speciality: string;
  }>;

  return (
    <Box sx={{ bgcolor: "#fffcf6", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ textAlign: "center", mb: 8 }}
        >
          <Typography
            sx={{
              fontFamily: "Miniver",
              color: "var(--color-primary)",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              mb: 1,
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              color: "#333",
              mb: 2,
            }}
          >
            {t("subtitle")}
          </Typography>
        </Box>

        {/* Chef Cards Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          {chefs.map((chef, i) => (
            <Card
              key={i}
              component={motion.div}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: hoveredIndex === i ? "0 20px 40px rgba(0,0,0,0.15)" : "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.4s ease",
                transform: hoveredIndex === i ? "translateY(-8px)" : "translateY(0)",
                cursor: "pointer",
                "&:hover": {
                  "& .chef-image": {
                    transform: "scale(1.05)",
                  },
                  "& .chef-overlay": {
                    opacity: 1,
                  },
                },
              }}
            >
              {/* Chef Image */}
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 350, md: 420 },
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={chefImages[i]}
                  alt={chef.name}
                  className="chef-image"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />

                {/* Overlay on Hover */}
                <Box
                  className="chef-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    display: "flex",
                    alignItems: "flex-end",
                    p: 3,
                  }}
                >
                  <Box>
                    <Chip
                      label={`${t("card.experience", { years: chef.experience })}`}
                      sx={{
                        bgcolor: "var(--color-primary)",
                        color: "white",
                        fontWeight: 600,
                        mb: 1,
                      }}
                    />
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                      }}
                    >
                      {t("card.speciality")}: {chef.speciality}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Chef Info */}
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "1.4rem", md: "1.6rem" },
                    fontWeight: 700,
                    color: "#333",
                    mb: 0.5,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  {chef.name}
                </Typography>

                <Typography
                  sx={{
                    color: "var(--color-primary)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                >
                  {chef.role}
                </Typography>

                <Typography
                  sx={{
                    color: "#666",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}
                >
                  {chef.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ChefPage;
