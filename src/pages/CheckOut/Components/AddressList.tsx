import AddIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { Address } from "../../../types/models/address";
import AddressForm from "./AddressForm";

const sampleAddresses: Address[] = [
  {
    id: 1,
    receiverName: "Nguyen Van A",
    receiverPhone: "0912345678",
    address: "123 Nguyễn Trãi",
    ward: "Phường 2",
    district: "Quận 5",
    province: "TP. Hồ Chí Minh",
    isDefault: true,
  },
  {
    id: 2,
    receiverName: "Tran Thi B",
    receiverPhone: "0987654321",
    address: "45 Lê Lợi",
    ward: "Phường 1",
    district: "Quận 1",
    province: "TP. Hồ Chí Minh",
    isDefault: false,
  },
];

type AddressItemProps = {
  onSelect?: (addr: Address | null) => void;
};

const AddressList: React.FC<AddressItemProps> = ({ onSelect }) => {
  const [addresses, setAddresses] = useState<Address[]>(sampleAddresses);
  const [selected, setSelected] = useState<string | number>(addresses[0]?.id ?? "");
  // Open the address editor if there's no selected address; otherwise collapse when an address is selected
  const [isOpen, setIsOpen] = useState<boolean>(() => (selected ? false : true));

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  };

  type NewAddressData = {
    fullName: string;
    phoneNumber: string;
    city: string;
    district: string;
    ward: string;
    address: string;
    isDefault?: boolean;
  };

  const handleSaveNew = (data: NewAddressData) => {
    const nextId = Math.max(0, ...addresses.map((a) => a.id)) + 1;
    const provinceLabel = data.city && typeof data.city === "string" ? data.city : data.city || "";

    // Nếu địa chỉ mới được đánh dấu là mặc định, bỏ mặc định của các địa chỉ khác
    const updatedAddresses = data.isDefault ? addresses.map((addr) => ({ ...addr, isDefault: false })) : addresses;

    const newAddr: Address = {
      id: nextId,
      receiverName: data.fullName || "",
      receiverPhone: data.phoneNumber || "",
      address: data.address || "",
      ward: data.ward || "",
      district: data.district || "",
      province: provinceLabel,
      isDefault: data.isDefault || false,
    };
    setAddresses([...updatedAddresses, newAddr]);
    setSelected(nextId);
    // After adding a new address, collapse the address selector to show the selected address
    setIsOpen(false);
    // notify parent about new selected address
    onSelect?.(newAddr);
  };

  const handleUpdateAddress = (id: number) => {
    const addrToUpdate = addresses.find((addr) => addr.id === id);
    console.log("🚀 ~ handleUpdateAddress ~ addrToUpdate:", addrToUpdate);
  };

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  // Tìm địa chỉ đang được chọn để hiển thị preview
  const currentAddress = addresses.find((a) => a.id === selected);

  // Notify parent when selected/address list changes
  useEffect(() => {
    if (!onSelect) return;
    if (selected === "__new") {
      onSelect(null);
      return;
    }

    const addr = addresses.find((a) => a.id === selected) ?? null;
    onSelect(addr);
  }, [selected, addresses, onSelect]);

  return (
    <Box sx={{ bgcolor: "white", p: 3, border: "1px solid", borderColor: "grey.200" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          cursor: !selected || selected === "__new" ? "default" : "pointer",
        }}
        onClick={() => {
          // Prevent closing the panel if nothing is selected or when adding a new address
          if (!selected || selected === "__new") return;
          setIsOpen(!isOpen);
        }}
      >
        <Typography color="var(--color-gray1)" variant="h6" fontWeight={600}>
          Shipping Address
        </Typography>
        <IconButton disabled={!selected || selected === "__new"} size="small">
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Hiển thị địa chỉ đang chọn khi đóng */}
      {!isOpen && currentAddress && (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography variant="body2" fontWeight={600}>
              {currentAddress.receiverName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              - {currentAddress.receiverPhone}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {currentAddress.address}, {currentAddress.ward}, {currentAddress.district}, {currentAddress.province}
          </Typography>
        </Box>
      )}

      <Collapse in={isOpen}>
        <RadioGroup value={selected} onChange={handleRadioChange}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Hiển thị tất cả địa chỉ có sẵn */}
            {addresses.map((addr) => (
              <Card
                key={addr.id}
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  borderRadius: 0,
                  borderColor: selected === addr.id ? "#f97316" : "grey.300",
                  borderWidth: selected === addr.id ? 2 : 1,
                  "&:hover": {
                    borderColor: "#fb923c",
                  },
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "start", gap: 1.5, p: 2, "&:last-child": { pb: 2 } }}>
                  <Radio
                    value={addr.id}
                    checked={selected === addr.id}
                    sx={{ p: 0, mt: 0 }}
                    onClick={() => setSelected(addr.id)}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }} onClick={() => setSelected(addr.id)}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={600} color="var(--color-gray1)" noWrap>
                        {addr.receiverName}
                      </Typography>
                      <Typography variant="body2" color="var(--color-gray3)" sx={{ fontSize: "0.875rem" }}>
                        - {addr.receiverPhone}
                      </Typography>
                      {addr.isDefault && (
                        <Chip
                          label="Default"
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.7rem",
                            bgcolor: "#f97316",
                            color: "white",
                            fontWeight: 600,
                            ml: "auto",
                            borderRadius: 1,
                          }}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.875rem", lineHeight: 1.5, color: "var(--color-gray2)" }}
                    >
                      {addr.address} , {addr.ward}, {addr.district}, {addr.province}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateAddress(addr.id);
                        }}
                        sx={{
                          mt: 1,
                          textTransform: "none",
                          fontSize: "0.75rem",
                          p: 0,
                          minWidth: "auto",
                          color: "#f97316",
                          "&:hover": {
                            bgcolor: "transparent",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Update address
                      </Button>
                      {!addr.isDefault && (
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetDefault(addr.id);
                          }}
                          sx={{
                            mt: 1,
                            textTransform: "none",
                            fontSize: "0.75rem",
                            p: 0,
                            minWidth: "auto",
                            color: "#f97316",
                            "&:hover": {
                              bgcolor: "transparent",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Set as default
                        </Button>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}

            {/* Nút "Thêm địa chỉ mới" - Chỉ hiện khi chưa chọn __new */}
            {selected !== "__new" && (
              <Button
                variant="outlined"
                fullWidth
                startIcon={<AddIcon />}
                onClick={() => setSelected("__new")}
                sx={{
                  borderRadius: 0,
                  borderStyle: "dashed",
                  borderWidth: 2,
                  borderColor: "grey.300",
                  color: "text.secondary",
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    borderStyle: "dashed",
                    borderWidth: 2,
                    borderColor: "#fb923c",
                    bgcolor: "rgba(249, 115, 22, 0.04)",
                  },
                }}
              >
                Add new address
              </Button>
            )}
          </Box>
        </RadioGroup>

        {/* Hiển thị form khi chọn "Add new address" */}
        {selected === "__new" && (
          <Box sx={{ mt: 3 }}>
            <AddressForm
              title="New shipping address"
              showSaveButton
              onSave={handleSaveNew}
              onCancel={() => setSelected(addresses[0]?.id || "")}
            />
          </Box>
        )}
      </Collapse>
    </Box>
  );
};

export default AddressList;
