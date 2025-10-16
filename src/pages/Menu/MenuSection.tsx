import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";

const MenuItem: React.FC<{ item: { name: string; description: string; price: string; calories?: string } }> = ({
  item,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentItem = itemRef.current;
    if (currentItem) {
      currentItem.style.opacity = "0";
      setTimeout(() => {
        currentItem.style.transition = "opacity 0.5s ease-in";
        currentItem.style.opacity = "1";
      }, 100); // Delay 100ms để tạo hiệu ứng tuần tự
    }
  }, []);

  return (
    <Box sx={{ mb: 2 }} ref={itemRef}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
        <Box sx={{ flex: 1, textAlign: "left" }}>
          <Typography
            variant="body1"
            sx={{
              color: "#000",
              fontSize: "1.2rem",
              fontWeight: "bold",
              mb: 0.5,
              "&:hover": { color: "#FF9F0D" },
              "&:focus": { color: "#FF9F0D" },
              outline: "none",
            }}
          >
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", fontSize: "1rem", mb: 0.5, fontWeight: "light" }}>
            {item.description}
          </Typography>
          {item.calories && (
            <Typography variant="body2" sx={{ color: "#999", fontSize: "0.9rem" }}>
              {item.calories}
            </Typography>
          )}
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: "#FF9F0D",
            fontSize: "1.2rem",
            fontWeight: "bold",
            textAlign: "right",
            minWidth: "60px",
          }}
        >
          {item.price}
        </Typography>
      </Box>
      <Box sx={{ borderBottom: "2px dotted #e8e8e8", width: "100%", mb: 2 }} />
    </Box>
  );
};

const menuData = [
  {
    title: "Starter Menu",
    image: "../../src/assets/images/image_salad.png",
    items: [
      {
        name: "Alder Grilled Chinook Salmon",
        description: "Toasted French bread topped with romano, cheddar",
        price: "$32",
        calories: "560 CAL",
      },
      {
        name: "Berries and creme tart",
        description: "Gorgonzola, ricotta, mozzarella, taleggio",
        price: "$43",
        calories: "700 CAL",
      },
      {
        name: "Tormentoso Bush Pizza Pintoage",
        description: "Ground cumin, avocados, peeled and cubed",
        price: "$14",
        calories: "1000 CAL",
      },
      {
        name: "Spicy Vegan Potato Curry",
        description: "Spreadable cream cheese, crumbled blue cheese",
        price: "$35",
        calories: "560 CAL",
      },
    ],
  },
  {
    title: "Main Course",
    image: "../../src/assets/images/image_burger.png",
    items: [
      {
        name: "Optic Big Breakfast Combo Menu",
        description: "Toasted French bread topped with romano, cheddar",
        price: "$25",
        calories: "560 CAL",
      },
      {
        name: "Cashew Chicken With Stir-Fry",
        description: "Gorgonzola, ricotta, mozzarella, taleggio",
        price: "$43",
        calories: "700 CAL",
      },
      {
        name: "Optic Big Breakfast Combo Menu",
        description: "Toasted French bread topped with romano, cheddar",
        price: "$25",
        calories: "560 CAL",
      },
      {
        name: "Optic Big Breakfast Combo Menu",
        description: "Toasted French bread topped with romano, cheddar",
        price: "$25",
        calories: "560 CAL",
      },
    ],
  },
  {
    title: "Dessert",
    image: "../../src/assets/images/image_cupcake.png",
    items: [
      {
        name: "Optic Big Breakfast Combo Menu",
        description: "Toasted French bread topped with romano, cheddar",
        price: "$25",
        calories: "560 CAL",
      },
      {
        name: "Optic Big Breakfast Combo Menu",
        description: "Toasted French bread topped with romano, cheddar",
        price: "$25",
        calories: "560 CAL",
      },
      {
        name: "Optic Big Breakfast Combo Menu",
        description: "Toasted French bread topped with romano, cheddar",
        price: "$25",
        calories: "560 CAL",
      },
      {
        name: "Optic Big Breakfast Combo Menu",
        description: "Toasted French bread topped with romano, cheddar",
        price: "$25",
        calories: "560 CAL",
      },
    ],
  },
  {
    title: "Drinks",
    image: "../../src/assets/images/image_cocktail.png",
    items: [
      {
        name: "Optic Big Breakfast Combo Menu",
        description: "Toasted French bread topped with romano, cheddar",
        price: "$25",
        calories: "560 CAL",
      },
      {
        name: "Optic Big Breakfast Combo Menu",
        description: "Toasted French bread topped with romano, cheddar",
        price: "$25",
        calories: "560 CAL",
      },
      {
        name: "Optic Big Breakfast Combo Menu",
        description: "Toasted French bread topped with romano, cheddar",
        price: "$25",
        calories: "560 CAL",
      },
      {
        name: "Optic Big Breakfast Combo Menu",
        description: "Toasted French bread topped with romano, cheddar",
        price: "$25",
        calories: "560 CAL",
      },
    ],
  },
];

const MenuSection: React.FC<{ sectionIndex: number }> = ({ sectionIndex }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (currentSection) {
      currentSection.style.opacity = "0";
      setTimeout(() => {
        currentSection.style.transition = "opacity 0.8s ease-in";
        currentSection.style.opacity = "1";
      }, 200);
    }
  }, []);

  const section = menuData[sectionIndex];
  const isImageLeft = sectionIndex % 2 === 0;

  return (
    <Box
      sx={{ mb: 6, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center" }}
      ref={sectionRef}
    >
      {isImageLeft ? (
        <>
          <Box sx={{ flex: 1, pr: { sm: 4 }, mb: { xs: 4, sm: 0 } }}>
            <img
              src={section.image}
              alt={section.title}
              style={{ width: "100%", maxWidth: "350px", borderRadius: 0 }}
            />
          </Box>
          <Box sx={{ flex: 2 }}>
            <Typography
              variant="h4"
              sx={{
                color: "#000",
                mb: 2,
                fontFamily: "Miniver",
                fontSize: "2rem",
                fontWeight: "bold",
                "&:hover": {
                  color: "var(--color-yellow)",
                  transition: "all 0.3s ease",
                },
                transition: "color 0.3s ease",
                position: "relative",
              }}
            >
              {section.title}
              <Box
                sx={{
                  content: '""',
                  position: "absolute",
                  bottom: "-5px",
                  left: 0,
                  width: "30px",
                  height: "2px",
                  backgroundColor: "var(--color-green-primary)",
                }}
              />
            </Typography>
            {section.items.map((item, itemIndex) => (
              <MenuItem key={itemIndex} item={item} />
            ))}
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ flex: 2 }}>
            <Typography
              variant="h4"
              sx={{
                color: "#000",
                mb: 2,
                fontFamily: "Miniver",
                fontSize: "2rem",
                fontWeight: "bold",
                "&:hover": {
                  color: "var(--color-yellow)",
                  transition: "all 0.3s ease",
                },
                transition: "color 0.3s ease",
                position: "relative",
              }}
            >
              {section.title}
              <Box
                sx={{
                  content: '""',
                  position: "absolute",
                  bottom: "-5px",
                  left: 0,
                  width: "30px",
                  height: "2px",
                  backgroundColor: "var(--color-green-primary)",
                }}
              />
            </Typography>
            {section.items.map((item, itemIndex) => (
              <MenuItem key={itemIndex} item={item} />
            ))}
          </Box>
          <Box sx={{ flex: 1, pl: { sm: 4 }, mb: { xs: 4, sm: 0 } }}>
            <img
              src={section.image}
              alt={section.title}
              style={{ width: "100%", maxWidth: "350px", borderRadius: 0 }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default MenuSection;
