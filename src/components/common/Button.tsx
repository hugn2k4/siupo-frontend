import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import type { ButtonProps, SxProps, Theme } from "@mui/material";
import { Box, Button, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface BaseButtonProps extends ButtonProps {
  disableDefaultHover?: boolean;
  colorScheme?: "green" | "lightGreen" | "orange";
  hovered?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconOnly?: boolean;
  sx?: SxProps<Theme>;
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
  sx,
  ...props
}: NormalButtonProps) => {
  const colors = colorMap[colorScheme];
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

const MyButton = (props: MyButtonProps) => {
  return props.isWatch ? <WatchVideoButton {...props} /> : <DefaultButton {...props} />;
};

export default MyButton;
