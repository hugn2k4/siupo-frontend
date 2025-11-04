// src/components/shared/PartnersSection.tsx
// Reusable Partners section component

import { Box, Typography } from "@mui/material";
import partner1 from "../../assets/images/partners/image_partner_1.png";
import partner2 from "../../assets/images/partners/image_partner_2.png";
import partner3 from "../../assets/images/partners/image_partner_3.png";
import partner4 from "../../assets/images/partners/image_partner_4.png";
import partner5 from "../../assets/images/partners/image_partner_5.png";
import partner6 from "../../assets/images/partners/image_partner_6.png";
import { useTranslation } from "../../hooks/useTranslation";

const defaultPartners = [
  { image: partner1, alt: "Partner 1" },
  { image: partner2, alt: "Partner 2" },
  { image: partner3, alt: "Partner 3" },
  { image: partner4, alt: "Partner 4" },
  { image: partner5, alt: "Partner 5" },
  { image: partner6, alt: "Partner 6" },
];

interface PartnersSectionProps {
  partners?: Array<{ image: string; alt: string }>;
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
}

const Partners = ({ partners = defaultPartners, backgroundColor = "#fff" }: PartnersSectionProps) => {
  const { t } = useTranslation("home");

  return (
    <Box
      sx={{
        mb: 3,
        textAlign: "center",
        backgroundColor,
        py: 4,
        px: { xs: 4, sm: 8 },
      }}
    >
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
        {t("partners.heading") as string}
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
        {t("partners.title") as string}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: { xs: 4, md: 7 },
        }}
      >
        {partners.map((partner, index) => (
          <Box
            key={index}
            sx={{
              width: "125px",
              height: "125px",
              margin: "0px",
            }}
          >
            <img
              src={partner.image}
              alt={partner.alt}
              loading="lazy"
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

export default Partners;
