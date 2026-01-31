import { Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import productApi from "../../api/productApi";
import DefaultBurger from "../../assets/images/products/image_burger.png";
import DefaultCocktail from "../../assets/images/products/image_cocktail.png";
import DefaultCupcake from "../../assets/images/products/image_cupcake.png";
import DefaultSalad from "../../assets/images/products/image_salad.png";
import type { ProductResponse } from "../../types/responses/product.response";

const MenuItem: React.FC<{ item: ProductResponse }> = ({ item }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentItem = itemRef.current;
    if (currentItem) {
      currentItem.style.opacity = "0";
      setTimeout(() => {
        currentItem.style.transition = "opacity 0.5s ease-in";
        currentItem.style.opacity = "1";
      }, 100);
    }
  }, []);

  const handleProductClick = () => {
    navigate(`/shop/${item.id}`);
  };

  return (
    <Box sx={{ mb: 2 }} ref={itemRef}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
        <Box sx={{ flex: 1, textAlign: "left" }}>
          <Typography
            variant="body1"
            onClick={handleProductClick}
            sx={{
              color: "#000",
              fontSize: "1.2rem",
              fontWeight: "bold",
              mb: 0.5,
              "&:hover": { color: "#FF9F0D" },
              "&:focus": { color: "#FF9F0D" },
              outline: "none",
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
          >
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", fontSize: "1rem", mb: 0.5, fontWeight: "light" }}>
            {item.description}
          </Typography>
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
          ${item.price.toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ borderBottom: "2px dotted #e8e8e8", width: "100%", mb: 2 }} />
    </Box>
  );
};

const menuSections = [
  { title: "Starter Menu", categoryId: 9 },
  { title: "Main Course", categoryId: 2 },
  { title: "Dessert", categoryId: 3 },
  { title: "Drinks", categoryId: 10 },
];

const defaultBanners = [DefaultSalad, DefaultBurger, DefaultCupcake, DefaultCocktail];

const MenuSection: React.FC<{ sectionIndex: number }> = ({ sectionIndex }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bannersLoading = false;
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const section = menuSections[sectionIndex];
  const isImageLeft = sectionIndex % 2 === 0;

  // Fetch products by category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productApi.searchProducts(
          null, // name
          [section.categoryId], // categoryIds
          null,
          null, // minPrice
          null, // maxPrice
          0, // page
          4, // size - lấy 4 sản phẩm
          "id,asc" // sortBy
        );

        if (response.success && response.data) {
          setProducts(response.data.content);
        }
      } catch (error) {
        console.error(`Error fetching products for ${section.title}:`, error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [section.categoryId, section.title]);

  // Animation effect
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

  // Image mapping for banners
  // banners[0] = image_salad (Starter Menu)
  // banners[1] = image_cupcake (Dessert)
  // banners[2] = image_cocktail (Drinks)
  // banners[3] = image_burger (Main Course)

  const menuImage = defaultBanners[sectionIndex];

  // Component cho phần hình ảnh
  const ImageSection = () => (
    <Box
      sx={{
        flex: 1,
        pr: isImageLeft ? { sm: 4 } : 0,
        pl: !isImageLeft ? { sm: 4 } : 0,
        mb: { xs: 4, sm: 0 },
      }}
    >
      {bannersLoading ? (
        <Skeleton variant="rectangular" width={350} height={350} sx={{ borderRadius: 0 }} />
      ) : menuImage ? (
        <img src={menuImage} alt={section.title} style={{ width: "100%", maxWidth: "350px", borderRadius: 0 }} />
      ) : null}
    </Box>
  );

  // Component cho phần nội dung menu
  const ContentSection = () => (
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
      {loading ? (
        <>
          {[1, 2, 3, 4].map((i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="100%" height={2} sx={{ mt: 1 }} />
            </Box>
          ))}
        </>
      ) : products.length > 0 ? (
        products.map((product) => <MenuItem key={product.id} item={product} />)
      ) : (
        <Typography variant="body2" sx={{ color: "#999" }}>
          No items available in this category.
        </Typography>
      )}
    </Box>
  );

  return (
    <Box
      sx={{ mb: 6, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center" }}
      ref={sectionRef}
    >
      {isImageLeft ? (
        <>
          <ImageSection />
          <ContentSection />
        </>
      ) : (
        <>
          <ContentSection />
          <ImageSection />
        </>
      )}
    </Box>
  );
};

export default MenuSection;
