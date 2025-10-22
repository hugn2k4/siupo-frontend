import { Box, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import imageDefault from "../../../assets/gallery/gallery_burger.png";

interface ProductImagesProps {
  imageUrls: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ imageUrls }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = imageUrls && imageUrls.length > 0 ? imageUrls : [imageDefault];

  const mainSizePx = 360;
  const thumbSize = Math.floor(mainSizePx / 4);

  // auto-advance every 3s
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      setSelectedImage((prev) => {
        const next = prev + 1;
        if (next > 5 || next >= images.length) return 0;
        return next;
      });
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length]);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems="flex-start"
      sx={{
        maxHeight: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        display: "flex",
        gap: { xs: 1, sm: 0 },
      }}
    >
      {/* Thumbnails: vertical on desktop, horizontal under main on mobile */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          gap: 1,
          maxWidth: "100%",
          minHeight: thumbSize,
          maxHeight: { xs: "auto", sm: (mainSizePx * 4) / 3 },
          overflowY: { xs: "hidden", sm: "hidden" },
          overflowX: "hidden",
          pr: 0.5,
          order: { xs: 2, sm: 1 },
        }}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            onClick={() => setSelectedImage(index)}
            sx={{
              width: thumbSize,
              maxWidth: thumbSize,
              aspectRatio: "1 / 1",
              borderRadius: 1,
              cursor: "pointer",
              border: 2,
              borderColor: selectedImage === index ? "primary.main" : "divider",
              "& img": {
                width: "100%",
                height: "100%",
                objectFit: "cover",
              },
            }}
          >
            <img
              src={img}
              alt={`Product ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </Box>
        ))}
      </Box>

      {/* Main Image (rectangular on desktop) */}
      <Box
        sx={{
          width: { xs: "100%", sm: mainSizePx },
          aspectRatio: "3/4",
          borderRadius: 1,
          overflow: "hidden",
          position: "relative",
          order: { xs: 1, sm: 2 },
        }}
      >
        {/* Main Image with crossfade */}
        {images.map((img, idx) => (
          <Box
            key={idx}
            component="img"
            src={img}
            alt={`Product ${idx + 1}`}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 900ms ease-in-out",
              opacity: selectedImage === idx ? 1 : 0,
              zIndex: selectedImage === idx ? 1 : 0,
              pointerEvents: selectedImage === idx ? "auto" : "none",
            }}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default ProductImages;
