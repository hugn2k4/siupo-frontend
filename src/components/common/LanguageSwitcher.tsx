import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import iconFlagEn from "../../assets/icons/icon_flag_en.png";
import iconFlagVn from "../../assets/icons/icon_flag_vn.png";

const languages = [
  { code: "vi", name: "Tiếng Việt", icon: iconFlagVn },
  { code: "en", name: "English", icon: iconFlagEn },
] as const;

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    handleClose();
  };

  const iconButtonSx = {
    color: "white",
    "&:hover": {
      color: "var(--color-primary)",
    },
    "&:not(:hover)": {
      color: "white",
    },
    transition: "all 0.2s ease",
    p: { xs: 1, md: 1.5 },
  };

  return (
    <>
      <Tooltip title={currentLanguage.name} arrow>
        <IconButton aria-label="Change language" onClick={handleClick} sx={iconButtonSx}>
          <Box
            component="img"
            src={currentLanguage.icon}
            alt={currentLanguage.name}
            sx={{
              width: { xs: 24, md: 28 },
              height: { xs: 24, md: 28 },
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(255, 255, 255, 0.3)",
            }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          mt: 1.5,
          "& .MuiPaper-root": {
            minWidth: 200,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={language.code === currentLanguage.code}
            sx={{
              py: 1.5,
              minHeight: 48,
              "&.Mui-selected": {
                bgcolor: "rgba(255, 107, 0, 0.08)",
                "&:hover": {
                  bgcolor: "rgba(255, 107, 0, 0.12)",
                },
              },
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 44 }}>
              <Box
                component="img"
                src={language.icon}
                alt={language.name}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid rgba(0, 0, 0, 0.1)",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={language.name}
              primaryTypographyProps={{
                fontWeight: language.code === currentLanguage.code ? 600 : 400,
                fontSize: "0.95rem",
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default LanguageSwitcher;
