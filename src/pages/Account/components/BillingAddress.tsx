"use client";

import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, MapPin } from "lucide-react";
import userApi from "../../../api/userApi";
import { useSnackbar } from "../../../hooks/useSnackbar";
import type { AddressDTO } from "../../../types/dto/address.dto";
import type { AddressUpdateRequest } from "../../../types/requests/address-update.request";

export default function BillingAddress() {
  const [addresses, setAddresses] = useState<AddressDTO[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<AddressDTO | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressDTO | null>(null);
  const [formData, setFormData] = useState<Partial<AddressDTO>>({
    addressLine: "",
    ward: "",
    district: "",
    province: "",
    receiverName: "",
    receiverPhone: "",
  });
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  // Load danh sách + địa chỉ mặc định
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [addrRes, defaultRes] = await Promise.all([
          userApi.getAddresses(),
          userApi.getDefaultAddress().catch(() => ({ data: null })),
        ]);

        setAddresses(addrRes.data || []);
        setDefaultAddress(defaultRes.data ?? null);
      } catch {
        showSnackbar("Không tải được dữ liệu địa chỉ", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [showSnackbar]);

  // Reset form
  const resetForm = () => {
    setFormData({
      addressLine: "",
      ward: "",
      district: "",
      province: "",
      receiverName: "",
      receiverPhone: "",
    });
    setIsAdding(false);
    setEditingAddress(null);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // So sánh 2 địa chỉ (không dùng id)
  const isSameAddress = (a1: AddressDTO, a2: AddressDTO) => {
    return (
      a1.addressLine === a2.addressLine &&
      a1.ward === a2.ward &&
      a1.district === a2.district &&
      a1.province === a2.province &&
      a1.receiverName === a2.receiverName &&
      a1.receiverPhone === a2.receiverPhone
    );
  };

  const handleAdd = async () => {
    if (!formData.addressLine || !formData.ward || !formData.district || !formData.province) {
      showSnackbar("Vui lòng nhập đầy đủ thông tin", "error");
      return;
    }

    try {
      const res = await userApi.addAddress(formData as AddressDTO);

      if (!res.data) {
        showSnackbar("Thêm địa chỉ thất bại: không nhận được dữ liệu", "error");
        return;
      }

      const newAddress = res.data; // chắc chắn là AddressDTO

      setAddresses((prev) => [...prev, newAddress]);

      if (!defaultAddress) {
        const defaultRes = await userApi.getDefaultAddress().catch(() => ({ data: null }));
        setDefaultAddress(defaultRes.data ?? null);
      }

      showSnackbar("Thêm địa chỉ thành công", "success");
      resetForm();
    } catch {
      showSnackbar("Thêm địa chỉ thất bại", "error");
    }
  };

  const handleUpdate = async () => {
    if (!editingAddress || !formData.addressLine || !formData.ward || !formData.district || !formData.province) {
      showSnackbar("Vui lòng nhập đầy đủ thông tin", "error");
      return;
    }

    const updateRequest: AddressUpdateRequest = {
      oldAddress: editingAddress,
      newAddress: formData as AddressDTO,
    };

    try {
      const res = await userApi.updateAddress(updateRequest);

      // Kiểm tra res.data trước khi dùng
      if (!res.data) {
        showSnackbar("Cập nhật thất bại: không nhận được dữ liệu", "error");
        return;
      }

      const updatedAddress = res.data; // chắc chắn là AddressDTO

      setAddresses((prev) => prev.map((addr) => (isSameAddress(addr, editingAddress) ? updatedAddress : addr)));

      if (defaultAddress && isSameAddress(defaultAddress, editingAddress)) {
        setDefaultAddress(updatedAddress);
      }

      showSnackbar("Cập nhật địa chỉ thành công", "success");
      resetForm();
    } catch {
      showSnackbar("Cập nhật địa chỉ thất bại", "error");
    }
  };

  // Delete address
  const handleDelete = async (address: AddressDTO) => {
    try {
      await userApi.deleteAddress(address);
      setAddresses((prev) => prev.filter((a) => !isSameAddress(a, address)));

      if (defaultAddress && isSameAddress(defaultAddress, address)) {
        const updatedDefault = await userApi.getDefaultAddress().catch(() => ({ data: null }));
        setDefaultAddress(updatedDefault.data ?? null);
      }

      showSnackbar("Xóa địa chỉ thành công", "success");
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      showSnackbar(err?.response?.data?.message || "Không thể xóa địa chỉ mặc định", "error");
    }
  };

  const setDefault = async (address: AddressDTO) => {
    try {
      const res = await userApi.setDefaultAddress(address);

      if (!res.data) {
        showSnackbar("Đặt mặc định thất bại: không nhận được dữ liệu", "error");
        return;
      }

      const defaultAddr = res.data;

      setDefaultAddress(defaultAddr);
      setAddresses((prev) => {
        const filtered = prev.filter((a) => !isSameAddress(a, address));
        return [defaultAddr, ...filtered];
      });

      showSnackbar("Đặt địa chỉ mặc định thành công", "success");
    } catch {
      showSnackbar("Đặt mặc định thất bại", "error");
    }
  };

  // Start editing
  const startEdit = (addr: AddressDTO) => {
    setEditingAddress(addr);
    setFormData({ ...addr });
  };

  if (loading) {
    return <div className="p-6 text-center">Đang tải...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
      {/* Header */}
      <div className="flex justify-between items-center pb-4 mb-6" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <h3 className="text-lg font-semibold" style={{ color: "#111827" }}>
          Billing Addresses
        </h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: "#FF9F0D" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#eb8d00")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#FF9F0D")}
        >
          <Plus size={16} />
          Add Address
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-4">
        {addresses
          .sort((a, b) => {
            const aIsDefault = defaultAddress && isSameAddress(a, defaultAddress);
            const bIsDefault = defaultAddress && isSameAddress(b, defaultAddress);
            return aIsDefault ? -1 : bIsDefault ? 1 : 0;
          })
          .map((addr) => {
            const isDefault = defaultAddress && isSameAddress(addr, defaultAddress);

            return (
              <div
                key={`${addr.addressLine}-${addr.receiverPhone}`}
                className="p-4 rounded-lg border transition-all"
                style={{
                  borderColor: isDefault ? "#FF9F0D" : "#e5e7eb",
                  backgroundColor: isDefault ? "#fff9f3" : "#ffffff",
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={16} style={{ color: "#6b7280" }} />
                      <p className="font-medium text-sm" style={{ color: "#1f2937" }}>
                        {addr.addressLine}, {addr.ward}
                      </p>
                    </div>
                    <p className="text-sm ml-6" style={{ color: "#4b5563" }}>
                      {addr.district}, {addr.province}
                    </p>
                    <p className="text-sm ml-6" style={{ color: "#4b5563" }}>
                      {addr.receiverName} - {addr.receiverPhone}
                    </p>
                    {isDefault && (
                      <span
                        className="inline-block ml-6 mt-1 px-2 py-0.5 text-xs font-medium rounded-full"
                        style={{ color: "#FF9F0D", backgroundColor: "#fed7aa" }}
                      >
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {!isDefault && (
                      <button
                        onClick={() => setDefault(addr)}
                        className="text-xs font-medium"
                        style={{ color: "#FF9F0D" }}
                        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => startEdit(addr)}
                      className="p-1"
                      style={{ color: "#6b7280" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FF9F0D")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(addr)}
                      className="p-1"
                      style={{ color: "#6b7280" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FF9F0D")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Edit Form */}
                {editingAddress && isSameAddress(editingAddress, addr) && (
                  <div className="mt-4 pt-4 space-y-3" style={{ borderTop: "1px solid #e5e7eb" }}>
                    <input
                      type="text"
                      name="addressLine"
                      value={formData.addressLine}
                      onChange={handleChange}
                      placeholder="Địa chỉ"
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      style={{ borderColor: "#d1d5db", color: "#374151" }}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="ward"
                        value={formData.ward}
                        onChange={handleChange}
                        placeholder="Phường/Xã"
                        className="px-3 py-2 border rounded-md text-sm"
                        style={{ borderColor: "#d1d5db", color: "#374151" }}
                      />
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="Quận/Huyện"
                        className="px-3 py-2 border rounded-md text-sm"
                        style={{ borderColor: "#d1d5db", color: "#374151" }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        placeholder="Tỉnh/Thành phố"
                        className="px-3 py-2 border rounded-md text-sm"
                        style={{ borderColor: "#d1d5db", color: "#374151" }}
                      />
                      <input
                        type="text"
                        name="receiverName"
                        value={formData.receiverName}
                        onChange={handleChange}
                        placeholder="Tên người nhận"
                        className="px-3 py-2 border rounded-md text-sm"
                        style={{ borderColor: "#d1d5db", color: "#374151" }}
                      />
                    </div>
                    <input
                      type="text"
                      name="receiverPhone"
                      value={formData.receiverPhone}
                      onChange={handleChange}
                      placeholder="Số điện thoại"
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      style={{ borderColor: "#d1d5db", color: "#374151" }}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdate}
                        className="px-4 py-2 text-sm font-medium text-white rounded-full"
                        style={{ backgroundColor: "#FF9F0D" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#db8300")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF9F0D")}
                      >
                        Save
                      </button>
                      <button
                        onClick={resetForm}
                        className="px-4 py-2 text-sm font-medium rounded-full"
                        style={{ backgroundColor: "#f3f4f6", color: "#374151" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e7eb")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Add New Address Form */}
      {isAdding && (
        <div className="p-4 rounded-lg space-y-3 mt-6" style={{ border: "2px dashed #d1d5db" }}>
          <input
            type="text"
            name="addressLine"
            value={formData.addressLine}
            onChange={handleChange}
            placeholder="Địa chỉ"
            className="w-full px-3 py-2 border rounded-md text-sm"
            style={{ borderColor: "#d1d5db", color: "#374151" }}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              placeholder="Phường/Xã"
              className="px-3 py-2 border rounded-md text-sm"
              style={{ borderColor: "#d1d5db", color: "#374151" }}
            />
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="Quận/Huyện"
              className="px-3 py-2 border rounded-md text-sm"
              style={{ borderColor: "#d1d5db", color: "#374151" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="Tỉnh/Thành phố"
              className="px-3 py-2 border rounded-md text-sm"
              style={{ borderColor: "#d1d5db", color: "#374151" }}
            />
            <input
              type="text"
              name="receiverName"
              value={formData.receiverName}
              onChange={handleChange}
              placeholder="Tên người nhận"
              className="px-3 py-2 border rounded-md text-sm"
              style={{ borderColor: "#d1d5db", color: "#374151" }}
            />
          </div>
          <input
            type="text"
            name="receiverPhone"
            value={formData.receiverPhone}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="w-full px-3 py-2 border rounded-md text-sm"
            style={{ borderColor: "#d1d5db", color: "#374151" }}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="px-4 py-2 text-sm font-medium text-white rounded-full"
              style={{ backgroundColor: "#FF9F0D" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#db8300")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF9F0D")}
            >
              Add Address
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 text-sm font-medium rounded-full"
              style={{ backgroundColor: "#f3f4f6", color: "#374151" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e7eb")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {addresses.length === 0 && !isAdding && (
        <p className="text-center py-8" style={{ color: "#6b7280" }}>
          No billing addresses yet.
        </p>
      )}
    </div>
  );
}
