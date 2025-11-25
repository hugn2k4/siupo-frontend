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
import { useSnackbar } from "../../../hooks/useSnackbar";
import addressService from "../../../services/addressService";
import type { Address } from "../../../types/models/address";
import AddressForm from "./AddressForm";

type AddressItemProps = {
  onSelect?: (addr: Address | null) => void;
};

const AddressList: React.FC<AddressItemProps> = ({ onSelect }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  // store selected as string: numeric id as string, or special "__new"
  const [selected, setSelected] = useState<string>("");
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await addressService.getAddresses();
        if (res.success && res.data) {
          let fetched = res.data as Address[];

          // mark default if backend returns a separate default endpoint
          try {
            const defaultRes = await addressService.getDefaultAddress().catch(() => ({ data: null }));
            if (defaultRes?.data) {
              const defaultId = defaultRes.data.id;
              fetched = fetched.map((addr) => ({ ...addr, isDefault: addr.id === defaultId }));
            }
          } catch {
            // ignore - best effort
          }

          setAddresses(fetched);
          // auto-select default if exists, otherwise first address
          const defaultAddr = fetched.find((a) => a.isDefault) ?? fetched[0];
          setSelected(defaultAddr ? String(defaultAddr.id) : "");
          setIsOpen(!defaultAddr);
          console.log("✅ Addresses with default marked:", fetched);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  // Open the address editor if there's no selected address; otherwise collapse when an address is selected
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  };

  const handleSaveNew = async (data: Address) => {
    try {
      const res = await addressService.addAddress(data);
      if (!res || !res.success) {
        showSnackbar("Thêm địa chỉ thất bại", "error");
        return;
      }

      const created = res.data as Address;

      // If marked as default, inform backend and update local list
      if (data.isDefault) {
        try {
          await addressService.setDefaultAddress(created);
          // update local copy: unset other defaults
          const createdWithFlag = { ...created, isDefault: true } as Address;
          setAddresses((prev) => [...prev.map((a) => ({ ...a, isDefault: false })), createdWithFlag]);
        } catch {
          // fallback: still append created (ensure boolean flag)
          const createdWithFlag = { ...created, isDefault: !!created.isDefault } as Address;
          setAddresses((prev) => [...prev, createdWithFlag]);
        }
      } else {
        const createdWithFlag = { ...created, isDefault: !!created.isDefault } as Address;
        setAddresses((prev) => [...prev, createdWithFlag]);
      }

      setSelected(String(created.id));
      setIsOpen(false);
      onSelect?.(created);
      showSnackbar("Thêm địa chỉ thành công", "success");
    } catch (err) {
      console.error(err);
      showSnackbar("Thêm địa chỉ thất bại", "error");
    }
  };

  const handleUpdateAddress = (id: number) => {
    // start editing flow
    const addrToUpdate = addresses.find((addr) => addr.id === id) ?? null;
    if (!addrToUpdate) return;
    setEditingId(id);
    setIsOpen(true);
    setSelected(String(id));
  };

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSaveUpdate = async (data: Address) => {
    if (editingId == null) return;
    try {
      const payload = { addressId: editingId, updateAddress: data };
      const res = await addressService.updateAddress(payload);
      if (!res || !res.success) {
        showSnackbar("Cập nhật địa chỉ thất bại", "error");
        return;
      }

      const updated = res.data as Address;

      // If updated marked default, call setDefaultAddress
      if (data.isDefault) {
        try {
          await addressService.setDefaultAddress(updated);
        } catch {
          // ignore
        }
      }

      // update local list
      setAddresses((prev) =>
        prev.map((a) => (a.id === updated.id ? { ...updated, isDefault: !!updated.isDefault } : a))
      );
      setEditingId(null);
      setSelected(String(updated.id));
      setIsOpen(false);
      onSelect?.(updated);
      showSnackbar("Cập nhật địa chỉ thành công", "success");
    } catch (err) {
      console.error(err);
      showSnackbar("Cập nhật địa chỉ thất bại", "error");
    }
  };

  const handleSetDefault = (id: number) => {
    // optimistically update UI and call API
    setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: addr.id === id })));
    const addr = addresses.find((a) => a.id === id);
    if (addr) {
      addressService
        .setDefaultAddress(addr)
        .then(() => {
          showSnackbar("Set default address", "success");
        })
        .catch(() => {
          showSnackbar("Failed to set default address", "error");
        });
    }
  };

  // Tìm địa chỉ đang được chọn để hiển thị preview
  const currentAddress = addresses.find((a) => String(a.id) === selected) ?? null;

  // Notify parent when selected/address list changes
  useEffect(() => {
    if (!onSelect) return;
    if (selected === "__new") {
      onSelect(null);
      return;
    }

    const addr = addresses.find((a) => String(a.id) === selected) ?? null;
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
                  borderColor: selected === String(addr.id) ? "#f97316" : "grey.300",
                  borderWidth: selected === String(addr.id) ? 2 : 1,
                  "&:hover": {
                    borderColor: "#fb923c",
                  },
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "start", gap: 1.5, p: 2, "&:last-child": { pb: 2 } }}>
                  <Radio
                    value={String(addr.id)}
                    checked={selected === String(addr.id)}
                    sx={{ p: 0, mt: 0 }}
                    onClick={() => setSelected(String(addr.id))}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }} onClick={() => setSelected(String(addr.id!))}>
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
                          handleUpdateAddress(addr.id!);
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
                            handleSetDefault(addr.id!);
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
              onCancel={() => setSelected(addresses[0]?.id ? String(addresses[0].id) : "")}
            />
          </Box>
        )}

        {/* Hiển thị form khi đang edit */}
        {editingId != null && (
          <Box sx={{ mt: 3 }}>
            <AddressForm
              title="Edit shipping address"
              showSaveButton
              initial={addresses.find((a) => a.id === editingId) ?? null}
              onSave={handleSaveUpdate}
              onCancel={() => {
                setEditingId(null);
                setSelected(addresses[0]?.id ? String(addresses[0].id) : "");
                setIsOpen(false);
              }}
            />
          </Box>
        )}
      </Collapse>
    </Box>
  );
};

export default AddressList;
