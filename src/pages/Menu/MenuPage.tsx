import { Box, Container } from "@mui/material";
import React from "react";
import MenuSection from "./MenuSection";
import StatsSection from "./StatsSection";
import PartnersSection from "./PartnersSection";

const MenuPage: React.FC = () => {
  return (
    <section className="w-full min-h-[80vh] flex flex-col relative py-12" style={{ backgroundColor: "#fff" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 0 }, color: "#000" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", px: 30, height: "100%" }}>
          <MenuSection sectionIndex={0} />
          <MenuSection sectionIndex={1} />
        </Box>
        <StatsSection />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", px: 30, height: "100%" }}>
          <MenuSection sectionIndex={2} />
          <MenuSection sectionIndex={3} />
        </Box>
        <PartnersSection />
      </Container>
    </section>
  );
};

export default MenuPage;
