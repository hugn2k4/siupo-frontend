import type { ButtonProps, SxProps, Theme } from "@mui/material";
import { Button } from "@mui/material";
import type { ReactNode } from "react";

interface MyButtonProps extends ButtonProps {
  disableDefaultHover?: boolean;
  colorScheme?: "green" | "lightGreen" | "orange";
  hovered?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconOnly?: boolean;
  to?: string;
  sx?: SxProps<Theme>;
}

const colorMap = {
  green: {
    bg: "var(--color-green-primary)",
    text: "white",
    hoverBg: "white",
    hoverText: "var(--color-green-primary)",
    border: "var(--color-green-primary)",
  },
  lightGreen: {
    bg: "white",
    text: "var(--color-green-primary)",
    hoverBg: "var(--color-green-primary)",
    hoverText: "white",
    border: "var(--color-green-primary)",
  },
  orange: {
    bg: "var(--color-primary)",
    text: "white",
    hoverBg: "white",
    hoverText: "var(--color-primary)",
    border: "var(--color-primary)",
  },
};

const MyButton = ({
  colorScheme = "green",
  hovered = false,
  startIcon,
  endIcon,
  iconOnly = false,
  disableDefaultHover = false,
  children,
  sx,
  ...props
}: MyButtonProps) => {
  const colors = colorMap[colorScheme];

  // default style
  const defaultSx: SxProps<Theme> = {
    bgcolor: hovered ? colors.hoverBg : colors.bg,
    color: hovered ? colors.hoverText : colors.text,
    borderColor: colors.border,
    px: 5,
    py: 1.5,
    fontWeight: 700,
    transition: "all 0.3s ease",
    ...(iconOnly && {
      minWidth: "auto",
      px: 1.5,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
    }),
    ...(!disableDefaultHover && {
      "&:hover": {
        bgcolor: colors.hoverBg,
        color: colors.hoverText,
      },
    }),
  };

  return (
    <Button variant="outlined" startIcon={startIcon} endIcon={endIcon} sx={{ ...defaultSx, ...sx }} {...props}>
      {!iconOnly && children}
    </Button>
  );
};

export default MyButton;
