"use client";

import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, MapPin } from "lucide-react";
import { getUserAddresses, addAddress, updateAddress, deleteAddress } from "../../../api/accountApi";
import type { AddressDTO } from "../../../api/accountApi";

export default function BillingAddress() {
  const [addresses, setAddresses] = useState<AddressDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<AddressDTO, "id">>({
    receiverName: "",
    receiverPhone: "",
    province: "",
    district: "",
    ward: "",
    addressLine: "",
    isDefault: false,
  });

  // Load addresses từ API
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const addressesData = await getUserAddresses();
      setAddresses(addressesData);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      receiverName: "",
      receiverPhone: "",
      province: "",
      district: "",
      ward: "",
      addressLine: "",
      isDefault: false,
    });
    setIsAdding(false);
    setEditingId(null);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new address
  // Add new address
  const handleAdd = async () => {
    if (!validateForm()) return;

    try {
      const newAddr = await addAddress({
        ...formData,
        isDefault: addresses.length === 0,
      });
      setAddresses((prev) => [...prev, newAddr]);
      resetForm();
      alert("Đã thêm địa chỉ thành công!");
    } catch (error: unknown) {
      console.error("Failed to add address:", error);

      let errorMessage = "Không thể thêm địa chỉ. Vui lòng thử lại.";

      if (error instanceof Error && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
              data?: Record<string, string>;
            };
          };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;

        // Nếu có validation errors từ backend, hiển thị chi tiết
        if (axiosError.response?.data?.data) {
          const validationErrors = Object.values(axiosError.response.data.data).join(", ");
          errorMessage = `Lỗi xác thực: ${validationErrors}`;
        }
      }

      alert(errorMessage);
    }
  };

  // Update address
  // Update address
  const handleUpdate = async () => {
    if (!editingId || !validateForm()) return;

    try {
      const updatedAddr = await updateAddress(editingId, {
        ...formData,
        id: editingId,
      });
      setAddresses((prev) => prev.map((addr) => (addr.id === editingId ? updatedAddr : addr)));
      resetForm();
      alert("Đã cập nhật địa chỉ thành công!");
    } catch (error: unknown) {
      console.error("Failed to update address:", error);

      let errorMessage = "Không thể cập nhật địa chỉ. Vui lòng thử lại.";

      if (error instanceof Error && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
              data?: Record<string, string>;
            };
          };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;

        // Nếu có validation errors từ backend, hiển thị chi tiết
        if (axiosError.response?.data?.data) {
          const validationErrors = Object.values(axiosError.response.data.data).join(", ");
          errorMessage = `Lỗi xác thực: ${validationErrors}`;
        }
      }

      alert(errorMessage);
    }
  };
  // Set default
  const handleSetDefault = async (id: number) => {
    try {
      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        }))
      );
      alert("Đã đặt địa chỉ mặc định thành công!");
    } catch (error: unknown) {
      console.error("Failed to set default address:", error);

      let errorMessage = "Không thể đặt địa chỉ mặc định. Vui lòng thử lại.";

      if (error instanceof Error && "response" in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      alert(errorMessage);
    }
  };
  // Delete address
  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) return;

    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      alert("Đã xóa địa chỉ thành công!");
    } catch (error: unknown) {
      console.error("Failed to delete address:", error);

      let errorMessage = "Không thể xóa địa chỉ. Vui lòng thử lại.";

      if (error instanceof Error && "response" in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      alert(errorMessage);
    }
  };

  // Start editing
  const startEdit = (addr: AddressDTO) => {
    setEditingId(addr.id!);
    setFormData({
      receiverName: addr.receiverName,
      receiverPhone: addr.receiverPhone,
      province: addr.province,
      district: addr.district,
      ward: addr.ward,
      addressLine: addr.addressLine,
      isDefault: addr.isDefault,
    });
  };

  // Start adding new address
  const startAdd = () => {
    setIsAdding(true);
    setFormData({
      receiverName: "",
      receiverPhone: "",
      province: "",
      district: "",
      ward: "",
      addressLine: "",
      isDefault: addresses.length === 0,
    });
  };

  // Validate form
  const validateForm = () => {
    const requiredFields = ["receiverName", "receiverPhone", "province", "district", "ward", "addressLine"];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Vui lòng điền đầy đủ thông tin ${getFieldLabel(field)}`);
        return false;
      }
    }

    // Validate phone number
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(formData.receiverPhone)) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam.");
      return false;
    }

    return true;
  };

  // Get field label for validation messages
  const getFieldLabel = (field: string) => {
    const labels: { [key: string]: string } = {
      receiverName: "tên người nhận",
      receiverPhone: "số điện thoại",
      province: "tỉnh/thành phố",
      district: "quận/huyện",
      ward: "phường/xã",
      addressLine: "địa chỉ chi tiết",
    };
    return labels[field] || field;
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
        <div className="flex justify-between items-center pb-4 mb-6" style={{ borderBottom: "1px solid #e5e7eb" }}>
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-9 bg-gray-200 rounded w-28 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg border bg-gray-100 animate-pulse h-24"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
      {/* Header */}
      <div className="flex justify-between items-center pb-4 mb-6" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <h3 className="text-lg font-semibold" style={{ color: "#111827" }}>
          Địa chỉ giao hàng
        </h3>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-colors"
          style={{
            color: "#FF9F0D",
            border: "1px solid #FF9F0D",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#FF9F0D";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#FF9F0D";
          }}
        >
          <Plus size={16} />
          Thêm địa chỉ
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="p-4 rounded-lg border transition-all"
            style={{
              borderColor: addr.isDefault ? "#FF9F0D" : "#e5e7eb",
              backgroundColor: addr.isDefault ? "#fff9f3" : "#ffffff",
            }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} style={{ color: "#6b7280" }} />
                  <p className="font-medium text-sm" style={{ color: "#1f2937" }}>
                    {addr.receiverName} - {addr.receiverPhone}
                  </p>
                </div>
                <p className="text-sm ml-6 mb-1" style={{ color: "#4b5563" }}>
                  {addr.addressLine}
                </p>
                <p className="text-sm ml-6" style={{ color: "#4b5563" }}>
                  {addr.ward}, {addr.district}, {addr.province}
                </p>
                {addr.isDefault && (
                  <span
                    className="inline-block ml-6 mt-2 px-2 py-0.5 text-xs font-medium rounded-full"
                    style={{ color: "#FF9F0D", backgroundColor: "#fed7aa" }}
                  >
                    Mặc định
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id!)}
                    className="text-xs font-medium px-2 py-1 rounded transition-colors"
                    style={{
                      color: "#FF9F0D",
                      border: "1px solid #FF9F0D",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#FF9F0D";
                      e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#FF9F0D";
                    }}
                  >
                    Đặt mặc định
                  </button>
                )}
                <button
                  onClick={() => startEdit(addr)}
                  className="p-2 rounded transition-colors"
                  style={{
                    color: "#6b7280",
                    border: "1px solid #e5e7eb",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.color = "#FF9F0D";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#6b7280";
                  }}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(addr.id!)}
                  className="p-2 rounded transition-colors"
                  style={{
                    color: "#6b7280",
                    border: "1px solid #e5e7eb",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#fef2f2";
                    e.currentTarget.style.color = "#ef4444";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#6b7280";
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Edit Form (inline) */}
            {editingId === addr.id && (
              <div className="mt-4 pt-4 space-y-3" style={{ borderTop: "1px solid #e5e7eb" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                      Tên người nhận *
                    </label>
                    <input
                      type="text"
                      name="receiverName"
                      value={formData.receiverName}
                      onChange={handleChange}
                      placeholder="Nhập tên người nhận"
                      className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                      style={
                        {
                          borderColor: "#d1d5db",
                          color: "#374151",
                          "--tw-ring-color": "#FF9F0D",
                        } as React.CSSProperties
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="receiverPhone"
                      value={formData.receiverPhone}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                      className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                      style={
                        {
                          borderColor: "#d1d5db",
                          color: "#374151",
                          "--tw-ring-color": "#FF9F0D",
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                      Tỉnh/Thành phố *
                    </label>
                    <input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      placeholder="Ví dụ: Hà Nội"
                      className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                      style={
                        {
                          borderColor: "#d1d5db",
                          color: "#374151",
                          "--tw-ring-color": "#FF9F0D",
                        } as React.CSSProperties
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                      Quận/Huyện *
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="Ví dụ: Cầu Giấy"
                      className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                      style={
                        {
                          borderColor: "#d1d5db",
                          color: "#374151",
                          "--tw-ring-color": "#FF9F0D",
                        } as React.CSSProperties
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                      Phường/Xã *
                    </label>
                    <input
                      type="text"
                      name="ward"
                      value={formData.ward}
                      onChange={handleChange}
                      placeholder="Ví dụ: Dịch Vọng"
                      className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                      style={
                        {
                          borderColor: "#d1d5db",
                          color: "#374151",
                          "--tw-ring-color": "#FF9F0D",
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                    Địa chỉ chi tiết *
                  </label>
                  <input
                    type="text"
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleChange}
                    placeholder="Ví dụ: Số 123, Đường ABC"
                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                    style={
                      {
                        borderColor: "#d1d5db",
                        color: "#374151",
                        "--tw-ring-color": "#FF9F0D",
                      } as React.CSSProperties
                    }
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 text-sm font-medium text-white rounded-full transition-colors"
                    style={{
                      backgroundColor: "#FF9F0D",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#db8300")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF9F0D")}
                  >
                    Lưu thay đổi
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 text-sm font-medium rounded-full transition-colors"
                    style={{
                      backgroundColor: "#f3f4f6",
                      color: "#374151",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e7eb")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add New Address Form */}
        {isAdding && (
          <div className="p-4 rounded-lg space-y-3" style={{ border: "2px dashed #d1d5db" }}>
            <h4 className="font-medium" style={{ color: "#374151" }}>
              Thêm địa chỉ mới
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                  Tên người nhận *
                </label>
                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  placeholder="Nhập tên người nhận"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                  style={
                    {
                      borderColor: "#d1d5db",
                      color: "#374151",
                      "--tw-ring-color": "#FF9F0D",
                    } as React.CSSProperties
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  name="receiverPhone"
                  value={formData.receiverPhone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                  style={
                    {
                      borderColor: "#d1d5db",
                      color: "#374151",
                      "--tw-ring-color": "#FF9F0D",
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                  Tỉnh/Thành phố *
                </label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  placeholder="Ví dụ: Hà Nội"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                  style={
                    {
                      borderColor: "#d1d5db",
                      color: "#374151",
                      "--tw-ring-color": "#FF9F0D",
                    } as React.CSSProperties
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                  Quận/Huyện *
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Ví dụ: Cầu Giấy"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                  style={
                    {
                      borderColor: "#d1d5db",
                      color: "#374151",
                      "--tw-ring-color": "#FF9F0D",
                    } as React.CSSProperties
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                  Phường/Xã *
                </label>
                <input
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  placeholder="Ví dụ: Dịch Vọng"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                  style={
                    {
                      borderColor: "#d1d5db",
                      color: "#374151",
                      "--tw-ring-color": "#FF9F0D",
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Địa chỉ chi tiết *
              </label>
              <input
                type="text"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                placeholder="Ví dụ: Số 123, Đường ABC"
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                style={
                  {
                    borderColor: "#d1d5db",
                    color: "#374151",
                    "--tw-ring-color": "#FF9F0D",
                  } as React.CSSProperties
                }
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="px-4 py-2 text-sm font-medium text-white rounded-full transition-colors"
                style={{ backgroundColor: "#FF9F0D" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#db8300")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF9F0D")}
              >
                Thêm địa chỉ
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 text-sm font-medium rounded-full transition-colors"
                style={{ backgroundColor: "#f3f4f6", color: "#374151" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e7eb")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {addresses.length === 0 && !isAdding && (
          <div className="text-center py-8" style={{ color: "#6b7280" }}>
            <MapPin size={48} className="mx-auto mb-4 opacity-50" />
            <p className="mb-2">Chưa có địa chỉ nào</p>
            <button onClick={startAdd} className="text-sm font-medium" style={{ color: "#FF9F0D" }}>
              Thêm địa chỉ đầu tiên
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
