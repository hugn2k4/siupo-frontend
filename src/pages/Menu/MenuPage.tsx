import { Box, Container } from "@mui/material";
import React from "react";
import PartnersSection from "../../components/shared/Partners";
import MenuSection from "./MenuSection";
import StatsSection from "./StatsSection";

const MenuPage: React.FC = () => {
  const sectionWrapperSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    px: { xs: 0, sm: 1, md: 8, lg: 30 },
    height: "100%",
  } as const;

  return (
    <section className="w-full min-h-[80vh] flex flex-col relative py-8 md:py-12" style={{ backgroundColor: "#fff" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 0 }, color: "#000" }}>
        <Box sx={sectionWrapperSx}>
          <MenuSection sectionIndex={0} />
          <MenuSection sectionIndex={1} />
        </Box>
        <StatsSection />
        <Box sx={sectionWrapperSx}>
          <MenuSection sectionIndex={2} />
          <MenuSection sectionIndex={3} />
        </Box>
        <PartnersSection />
      </Container>
    </section>
  );
};

export default MenuPage;
