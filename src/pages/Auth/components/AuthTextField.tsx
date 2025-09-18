import { InputAdornment, TextField } from "@mui/material";
import { type ReactNode } from "react";

interface AuthTextFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const AuthTextField: React.FC<AuthTextFieldProps> = ({ label, type = "text", value, onChange, startIcon, endIcon }) => {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      variant="outlined"
      sx={{
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: 0,
          backgroundColor: "transparent",
          "& fieldset": { borderRadius: 0 },
          "&.Mui-focused fieldset": { borderColor: "var(--color-primary)", borderWidth: 2 },
          "&:hover fieldset": { borderColor: "grey.400" },
        },
        "& .MuiInputLabel-root.Mui-focused": { color: "var(--color-primary)" },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px white inset",
          WebkitTextFillColor: "#000",
        },
      }}
      InputProps={{
        startAdornment: startIcon ? <InputAdornment position="start">{startIcon}</InputAdornment> : undefined,
        endAdornment: endIcon ? <InputAdornment position="end">{endIcon}</InputAdornment> : undefined,
      }}
    />
  );
};

export default AuthTextField;
