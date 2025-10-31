import { Box, Input, InputLabel, type InputProps } from "@mui/material";
import React, { type ChangeEvent } from "react";

interface CustomInputProps extends Omit<InputProps, "onChange"> {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ id, label, value, onChange, ...props }) => {
  return (
    <Box>
      <InputLabel
        htmlFor={id}
        sx={{
          fontSize: 14,
          fontWeight: 500,
          mb: 0.5,
          color: "var(--color-gray2)",
          display: "block",
        }}
      >
        {label}
      </InputLabel>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        fullWidth
        disableUnderline
        sx={{
          px: 1.2,
          py: 0.8,
          border: "1px solid var(--color-gray4)",
          borderRadius: 0,
          fontSize: 14,
          color: "var(--color-gray1)",
          "&:hover": {
            borderColor: "var(--color-gray3)",
          },
          "&.Mui-focused": {
            borderColor: "var(--color-primary)",
            boxShadow: "0 0 0 2px rgba(251, 146, 60, 0.2)",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0px 1000px white inset", // đổi nền autofill
            WebkitTextFillColor: "black", // màu chữ autofill
            borderRadius: "0px",
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default CustomInput;
