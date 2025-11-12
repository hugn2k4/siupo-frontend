import { Box, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { ChevronDown } from "lucide-react";
import React from "react";

interface CustomSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ id, label, value, onChange, options }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

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
      <Select
        id={id}
        value={value}
        onChange={handleChange}
        displayEmpty
        IconComponent={ChevronDown}
        fullWidth
        sx={{
          border: "var(--color-gray4)",
          borderRadius: 0,
          fontSize: 14,
          color: value ? "var(--color-gray1)" : "var(--color-gray4)",

          "& .MuiSelect-icon": {
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--color-primary)",
          },
        }}
      >
        <MenuItem value="">
          <em>Choose {label}</em>
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default CustomSelect;
