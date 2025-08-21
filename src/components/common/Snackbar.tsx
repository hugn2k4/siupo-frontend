import { Snackbar, Alert, AlertTitle } from "@mui/material";
import type { AlertColor } from "@mui/material";
import Slide from "@mui/material/Slide";
import type { SlideProps } from "@mui/material/Slide";
import React from "react";

export interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
  onClose: (_event?: React.SyntheticEvent | Event, reason?: string) => void;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

const AppSnackbar: React.FC<AppSnackbarProps> = ({
  open,
  message,
  severity = "info",
  autoHideDuration = 3000,
  onClose,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    TransitionComponent={SlideTransition}
  >
    <Alert
      onClose={onClose}
      variant="filled"
      severity={severity}
      sx={{ width: "100%" }}
    >
      <AlertTitle>{severity.toUpperCase()}</AlertTitle>
      {message}
    </Alert>
  </Snackbar>
);

export default AppSnackbar;
