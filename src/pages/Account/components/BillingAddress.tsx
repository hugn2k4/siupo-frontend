"use client";

import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, MapPin } from "lucide-react";
import { getUserAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } from "../../../api/accountApi";
import type { AddressDTO, AddressResponse } from "../../../api/accountApi";

// Constants
const INITIAL_FORM_DATA: AddressDTO = {
  receiverName: "",
  receiverPhone: "",
  province: "",
  district: "",
  ward: "",
  addressLine: "",
};

const FIELD_LABELS: Record<string, string> = {
  receiverName: "tên người nhận",
  receiverPhone: "số điện thoại",
  province: "tỉnh/thành phố",
  district: "quận/huyện",
  ward: "phường/xã",
  addressLine: "địa chỉ chi tiết",
};

// Utility functions
const validatePhone = (phone: string) => /^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(phone);

const validateForm = (formData: AddressDTO): string | null => {
  const requiredFields = Object.keys(FIELD_LABELS);

  for (const field of requiredFields) {
    if (!formData[field as keyof typeof formData]) {
      return `Vui lòng điền đầy đủ thông tin ${FIELD_LABELS[field]}`;
    }
  }

  if (!validatePhone(formData.receiverPhone)) {
    return "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam.";
  }

  return null;
};

const handleApiError = (error: unknown, defaultMessage: string): string => {
  if (error instanceof Error && "response" in error) {
    const axiosError = error as {
      response?: {
        data?: {
          message?: string;
          data?: Record<string, string>;
        };
      };
    };

    const message = axiosError.response?.data?.message;
    const validationErrors = axiosError.response?.data?.data;

    if (validationErrors) {
      return `Lỗi xác thực: ${Object.values(validationErrors).join(", ")}`;
    }

    return message || defaultMessage;
  }

  return defaultMessage;
};

// Sub-components
const AddressItem = ({
  addr,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  addr: AddressResponse;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}) => {
  return (
    <div
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
            <ActionButton onClick={onSetDefault} variant="outline" size="sm">
              Đặt mặc định
            </ActionButton>
          )}
          <IconButton onClick={onEdit} icon={Edit2} hoverColor="#FF9F0D" />
          <IconButton onClick={onDelete} icon={Trash2} hoverColor="#ef4444" hoverBg="#fef2f2" />
        </div>
      </div>
    </div>
  );
};

const AddressForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  formData: AddressDTO;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel: string;
}) => (
  <div className="space-y-3">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <FormInput
        label="Tên người nhận *"
        name="receiverName"
        value={formData.receiverName}
        onChange={onChange}
        placeholder="Nhập tên người nhận"
      />
      <FormInput
        label="Số điện thoại *"
        name="receiverPhone"
        type="tel"
        value={formData.receiverPhone}
        onChange={onChange}
        placeholder="Nhập số điện thoại"
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <FormInput
        label="Tỉnh/Thành phố *"
        name="province"
        value={formData.province}
        onChange={onChange}
        placeholder="Ví dụ: Hà Nội"
      />
      <FormInput
        label="Quận/Huyện *"
        name="district"
        value={formData.district}
        onChange={onChange}
        placeholder="Ví dụ: Cầu Giấy"
      />
      <FormInput
        label="Phường/Xã *"
        name="ward"
        value={formData.ward}
        onChange={onChange}
        placeholder="Ví dụ: Dịch Vọng"
      />
    </div>

    <FormInput
      label="Địa chỉ chi tiết *"
      name="addressLine"
      value={formData.addressLine}
      onChange={onChange}
      placeholder="Ví dụ: Số 123, Đường ABC"
    />

    <div className="flex gap-2">
      <ActionButton onClick={onSubmit} variant="primary">
        {submitLabel}
      </ActionButton>
      <ActionButton onClick={onCancel} variant="secondary">
        Hủy
      </ActionButton>
    </div>
  </div>
);

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
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
);

const ActionButton = ({
  onClick,
  variant,
  size = "md",
  children,
}: {
  onClick: () => void;
  variant: "primary" | "secondary" | "outline";
  size?: "sm" | "md";
  children: React.ReactNode;
}) => {
  const styles = {
    primary: { bg: "#FF9F0D", color: "#ffffff", hoverBg: "#db8300" },
    secondary: { bg: "#f3f4f6", color: "#374151", hoverBg: "#e5e7eb" },
    outline: { bg: "transparent", color: "#FF9F0D", hoverBg: "#FF9F0D", border: "1px solid #FF9F0D" },
  };

  const style = styles[variant];
  const padding = size === "sm" ? "px-2 py-1" : "px-4 py-2";

  return (
    <button
      onClick={onClick}
      className={`${padding} text-${size === "sm" ? "xs" : "sm"} font-medium rounded-full transition-colors`}
      style={{
        backgroundColor: style.bg,
        color: style.color,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = style.hoverBg;
        if (variant === "outline") e.currentTarget.style.color = "#ffffff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = style.bg;
        if (variant === "outline") e.currentTarget.style.color = style.color;
      }}
    >
      {children}
    </button>
  );
};

const IconButton = ({
  onClick,
  icon: Icon,
  hoverColor,
  hoverBg = "#f3f4f6",
}: {
  onClick: () => void;
  icon: React.ElementType;
  hoverColor: string;
  hoverBg?: string;
}) => (
  <button
    onClick={onClick}
    className="p-2 rounded transition-colors"
    style={{
      color: "#6b7280",
      border: "1px solid #e5e7eb",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = hoverBg;
      e.currentTarget.style.color = hoverColor;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = "#6b7280";
    }}
  >
    <Icon size={16} />
  </button>
);

const LoadingSkeleton = () => (
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

// Main Component
export default function BillingAddress() {
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<AddressDTO>(INITIAL_FORM_DATA);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const data = await getUserAddresses();
      console.log("Fetched addresses:", data);
      setAddresses(data);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      alert("Không thể tải danh sách địa chỉ");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setIsAdding(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    const error = validateForm(formData);
    if (error) {
      alert(error);
      return;
    }

    try {
      const newAddr = await addAddress(formData);
      setAddresses((prev) => [...prev, newAddr]);
      resetForm();
      alert("Đã thêm địa chỉ thành công!");
    } catch (error) {
      alert(handleApiError(error, "Không thể thêm địa chỉ. Vui lòng thử lại."));
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    const error = validateForm(formData);
    if (error) {
      alert(error);
      return;
    }

    try {
      const updatedAddr = await updateAddress(editingId, formData);
      setAddresses((prev) => prev.map((addr) => (addr.id === editingId ? updatedAddr : addr)));
      resetForm();
      alert("Đã cập nhật địa chỉ thành công!");
    } catch (error) {
      alert(handleApiError(error, "Không thể cập nhật địa chỉ. Vui lòng thử lại."));
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await setDefaultAddress(id);
      setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: addr.id === id })));
      alert("Đã đặt địa chỉ mặc định thành công!");
    } catch (error) {
      alert(handleApiError(error, "Không thể đặt địa chỉ mặc định. Vui lòng thử lại."));
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) return;

    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      alert("Đã xóa địa chỉ thành công!");
    } catch (error) {
      alert(handleApiError(error, "Không thể xóa địa chỉ. Vui lòng thử lại."));
    }
  };

  const startEdit = (addr: AddressResponse) => {
    setEditingId(addr.id);
    setFormData({
      receiverName: addr.receiverName,
      receiverPhone: addr.receiverPhone,
      province: addr.province,
      district: addr.district,
      ward: addr.ward,
      addressLine: addr.addressLine,
    });
  };

  const startAdd = () => {
    setIsAdding(true);
    setFormData(INITIAL_FORM_DATA);
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
      <div className="flex justify-between items-center pb-4 mb-6" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <h3 className="text-lg font-semibold" style={{ color: "#111827" }}>
          Địa chỉ giao hàng
        </h3>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-colors"
          style={{ color: "#FF9F0D", border: "1px solid #FF9F0D", backgroundColor: "transparent" }}
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

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div key={addr.id}>
            <AddressItem
              addr={addr}
              onEdit={() => startEdit(addr)}
              onDelete={() => handleDelete(addr.id)}
              onSetDefault={() => handleSetDefault(addr.id)}
            />
            {editingId === addr.id && (
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid #e5e7eb" }}>
                <AddressForm
                  formData={formData}
                  onChange={handleChange}
                  onSubmit={handleUpdate}
                  onCancel={resetForm}
                  submitLabel="Lưu thay đổi"
                />
              </div>
            )}
          </div>
        ))}

        {isAdding && (
          <div className="p-4 rounded-lg space-y-3" style={{ border: "2px dashed #d1d5db" }}>
            <h4 className="font-medium" style={{ color: "#374151" }}>
              Thêm địa chỉ mới
            </h4>
            <AddressForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleAdd}
              onCancel={resetForm}
              submitLabel="Thêm địa chỉ"
            />
          </div>
        )}

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
