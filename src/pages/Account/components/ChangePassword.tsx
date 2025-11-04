// src/Account/components/ChangePassword.tsx

import React, { useState, useEffect } from "react";
import userApi from "../../../api/userApi";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lỗi cho từng field - kiểu rõ ràng
  const [errors, setErrors] = useState<{
    current: string;
    new: string;
    confirm: string;
  }>({
    current: "",
    new: "",
    confirm: "",
  });

  const { showSnackbar } = useSnackbar();

  // Validate realtime
  useEffect(() => {
    const err: typeof errors = {
      current: "",
      new: "",
      confirm: "",
    };

    // Current password
    if (currentPassword && currentPassword.length < 1) {
      err.current = "Vui lòng nhập mật khẩu hiện tại";
    }

    // New password
    if (newPassword) {
      if (newPassword.length < 6) {
        err.new = "Mật khẩu phải ít nhất 6 ký tự";
      } else if (newPassword === currentPassword) {
        err.new = "Mật khẩu mới phải khác mật khẩu cũ";
      }
    }

    // Confirm password
    if (confirmPassword && confirmPassword !== newPassword) {
      err.confirm = "Mật khẩu xác nhận không khớp";
    }

    setErrors(err);
  }, [currentPassword, newPassword, confirmPassword]);

  // Ép kiểu boolean rõ ràng
  const hasError = Boolean(errors.current || errors.new || errors.confirm);
  const isDisabled = !currentPassword || !newPassword || !confirmPassword || hasError || loading;

  const handleSubmit = async () => {
    if (hasError || loading) return;

    const payload: ChangePasswordRequest = {
      oldPassword: currentPassword,
      newPassword,
      confirmNewPassword: confirmPassword,
    };

    try {
      setLoading(true);
      await userApi.changePassword(payload);
      showSnackbar("Đổi mật khẩu thành công!", "success");

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);
      setErrors({ current: "", new: "", confirm: "" });
    } catch (error: unknown) {
      let msg = "Đổi mật khẩu thất bại";

      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        msg = err.response?.data?.message || msg;
      }
      showSnackbar(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
      <div className="border-b pb-4 mb-6" style={{ borderColor: "#e5e7eb" }}>
        <h3 className="text-lg font-semibold" style={{ color: "#111827" }}>
          Change Password
        </h3>
      </div>

      <div className="space-y-4">
        {/* Current Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
            Current Password
          </label>
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-1 ${
              errors.current ? "border-red-500" : ""
            }`}
            style={
              {
                borderColor: errors.current ? "#ef4444" : "#d1d5db",
                "--tw-ring-color": errors.current ? "#ef4444" : "#FF9F0D",
                outline: "none",
                color: "#666666",
              } as React.CSSProperties
            }
            placeholder="Nhập mật khẩu hiện tại"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.current && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.current}
            </p>
          )}
        </div>

        {/* New + Confirm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
              New Password
            </label>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                errors.new ? "border-red-500" : ""
              }`}
              style={
                {
                  borderColor: errors.new ? "#ef4444" : "#d1d5db",
                  "--tw-ring-color": errors.new ? "#ef4444" : "#FF9F0D",
                  outline: "none",
                  color: "#666666",
                } as React.CSSProperties
              }
              placeholder="Mật khẩu mới"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.new && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.new}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                errors.confirm ? "border-red-500" : ""
              }`}
              style={
                {
                  borderColor: errors.confirm ? "#ef4444" : "#d1d5db",
                  "--tw-ring-color": errors.confirm ? "#ef4444" : "#FF9F0D",
                  outline: "none",
                  color: "#666666",
                } as React.CSSProperties
              }
              placeholder="Xác nhận mật khẩu"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirm && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.confirm}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="mt-6 px-6 py-2.5 text-white text-sm font-medium rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#FF9F0D" }}
          onClick={handleSubmit}
          disabled={isDisabled}
          onMouseEnter={(e) => !isDisabled && (e.currentTarget.style.backgroundColor = "#ec8e00")}
          onMouseLeave={(e) => !isDisabled && (e.currentTarget.style.backgroundColor = "#FF9F0D")}
        >
          {loading ? "Đang xử lý..." : "Change Password"}
        </button>
      </div>
    </div>
  );
}
