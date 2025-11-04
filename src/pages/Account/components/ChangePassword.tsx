// src/Account/components/ChangePassword.tsx
import React, { useState } from "react";
import { changePassword } from "../../../api/accountApi";
import type { ChangePasswordRequest } from "../../../api/accountApi";

export default function ChangePassword() {
  const [formData, setFormData] = useState<ChangePasswordRequest>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Mật khẩu cũ không được để trống";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Mật khẩu mới không được để trống";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Xác nhận mật khẩu không được để trống";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await changePassword(formData);
      alert("Đổi mật khẩu thành công!");
      // Reset form
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setErrors({});
    } catch (error: unknown) {
      console.error("Failed to change password:", error);

      let errorMessage = "Đổi mật khẩu thất bại. Vui lòng thử lại.";
      let isOldPasswordError = false;

      if (error instanceof Error && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
              data?: {
                oldPassword?: string;
              };
            };
          };
        };

        errorMessage = axiosError.response?.data?.message || errorMessage;

        // Check if it's an old password error
        const message = axiosError.response?.data?.message?.toLowerCase() || "";
        isOldPasswordError = message.includes("mật khẩu cũ") || message.includes("old password");
      }

      if (isOldPasswordError) {
        setErrors((prev) => ({ ...prev, oldPassword: "Mật khẩu cũ không đúng" }));
      } else {
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
      {/* TIÊU ĐỀ + ĐƯỜNG VIỀN DƯỚI */}
      <div className="border-b pb-4 mb-6" style={{ borderColor: "#e5e7eb" }}>
        <h3 className="text-lg font-semibold" style={{ color: "#111827" }}>
          Đổi mật khẩu
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password - full width */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
            Mật khẩu cũ *
          </label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
              errors.oldPassword ? "border-red-500" : "border-gray-300"
            }`}
            style={
              {
                "--tw-ring-color": "#FF9F0D",
                outline: "none",
                color: "#666666",
              } as React.CSSProperties
            }
            placeholder="Nhập mật khẩu hiện tại"
          />
          {errors.oldPassword && <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>}
        </div>

        {/* New Password + Confirm Password - cùng 1 hàng */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
              Mật khẩu mới *
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              minLength={6}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
              style={
                {
                  "--tw-ring-color": "#FF9F0D",
                  outline: "none",
                  color: "#666666",
                } as React.CSSProperties
              }
              placeholder="Nhập mật khẩu mới"
            />
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
              Xác nhận mật khẩu *
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
              minLength={6}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                errors.confirmNewPassword ? "border-red-500" : "border-gray-300"
              }`}
              style={
                {
                  "--tw-ring-color": "#FF9F0D",
                  outline: "none",
                  color: "#666666",
                } as React.CSSProperties
              }
              placeholder="Nhập lại mật khẩu mới"
            />
            {errors.confirmNewPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmNewPassword}</p>}
          </div>
        </div>

        {/* Password requirements */}
        <div className="text-xs text-gray-500">
          <p>Mật khẩu phải có ít nhất 6 ký tự.</p>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2.5 text-white text-sm font-medium rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#FF9F0D" }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#e48900")}
          onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "#FF9F0D")}
        >
          {loading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
}
