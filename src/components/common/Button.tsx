import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import type { ButtonProps, SxProps, Theme } from "@mui/material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface BaseButtonProps extends ButtonProps {
  disableDefaultHover?: boolean;
  colorScheme?: "green" | "lightGreen" | "orange" | "grey";
  hovered?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconOnly?: boolean;
  sx?: SxProps<Theme>;
  isLoading?: boolean;
}

interface WatchButtonProps {
  isWatch: true;
  colorScheme?: "green" | "orange";
  onClick?: () => void;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

interface NormalButtonProps extends BaseButtonProps {
  isWatch?: false;
}

type MyButtonProps = WatchButtonProps | NormalButtonProps;

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
  lightOrange: {
    bg: "white",
    text: "var(--color-primary)",
    hoverBg: "var(--color-primary)",
    hoverText: "white",
    border: "var(--color-primary)",
  },
  grey: {
    bg: "white",
    text: "#333",
    hoverBg: "#f5f5f5",
    hoverText: "#333",
    border: "#e0e0e0",
  },
};

const WatchVideoButton = ({ children, onClick, colorScheme = "green" }: WatchButtonProps) => {
  const colors = colorMap[colorScheme];
  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          borderRadius: 8,
          transition: "all 0.3s ease",
          height: { xs: 36, sm: 42, md: 48 },
          "&:hover::before": {
            width: "100%",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: 0,
            height: "100%",
            bgcolor: "rgba(0,0,0,0.1)",
            transition: "width 0.3s ease",
            borderRadius: 8,
            zIndex: 0,
          },
        }}
      >
        {/* Icon tròn bên ngoài */}
        <Box
          sx={{
            bgcolor: colors.bg,
            borderRadius: "50%",
            height: "100%",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <PlayArrowOutlinedIcon sx={{ color: "white" }} />
        </Box>
        <Typography sx={{ position: "relative", zIndex: 1, fontWeight: 500, pr: 2 }}>
          {children || "Watch video"}
        </Typography>
      </Box>
    </>
  );
};

const DefaultButton = ({
  colorScheme = "green",
  hovered = false,
  startIcon,
  endIcon,
  iconOnly = false,
  disableDefaultHover = false,
  children,
  isLoading = false,
  sx,
  ...props
}: NormalButtonProps) => {
  const colors = colorMap[colorScheme];
  const defaultSx: SxProps<Theme> = {
    bgcolor: hovered ? colors.hoverBg : colors.bg,
    color: hovered ? colors.hoverText : colors.text,
    borderColor: colors.border,
    px: { xs: 2, sm: 3, md: 5 },
    py: { xs: 1, sm: 1.25, md: 1.5 },
    fontWeight: 700,
    transition: "all 0.3s ease",
    "& .MuiButton-startIcon": {
      margin: 0,
      position: "absolute",
      left: 16, // icon sát trái (có chút padding an toàn)
    },
    "& .MuiButton-endIcon": {
      margin: 0,
      position: "absolute",
      right: 16, // nếu có endIcon thì sát phải
    },
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
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={22} sx={{ color: colors.text }} />
        </Box>
      )}

      <Box
        sx={{
          visibility: isLoading ? "hidden" : "visible",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!iconOnly && children}
      </Box>
    </Button>
  );
};

const MyButton = (props: MyButtonProps) => {
  return props.isWatch ? <WatchVideoButton {...props} /> : <DefaultButton {...props} />;
};

export default MyButton;
