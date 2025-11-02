// src/Account/components/ChangePassword.tsx
import React, { useState } from "react";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
      {/* TIÊU ĐỀ + ĐƯỜNG VIỀN DƯỚI */}
      <div className="border-b pb-4 mb-6" style={{ borderColor: "#e5e7eb" }}>
        <h3 className="text-lg font-semibold" style={{ color: "#111827" }}>
          Change Password
        </h3>
      </div>

      <div className="space-y-4">
        {/* Current Password - full width */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
            style={
              {
                borderColor: "#d1d5db",
                "--tw-ring-color": "#f97316",
                outline: "none",
                color: "#666666",
              } as React.CSSProperties
            }
            placeholder="Password"
          />
        </div>

        {/* New Password + Confirm Password - cùng 1 hàng */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
              style={
                {
                  borderColor: "#d1d5db",
                  "--tw-ring-color": "#FF9F0D",
                  outline: "none",
                  color: "#666666",
                } as React.CSSProperties
              }
              placeholder="Password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
              style={
                {
                  borderColor: "#d1d5db",
                  "--tw-ring-color": "#FF9F0D",
                  outline: "none",
                  color: "#666666",
                } as React.CSSProperties
              }
              placeholder="Password"
            />
          </div>
        </div>

        {/* NÚT CHANGE PASSWORD – BO TRÒN, MÀU ORANGE */}
        <button
          className="mt-6 px-6 py-2.5 text-white text-sm font-medium rounded-full transition-colors"
          style={{ backgroundColor: "#FF9F0D" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ec8e00")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF9F0D")}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
