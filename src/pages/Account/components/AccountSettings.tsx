// src/Account/components/AccountSettings.tsx
import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { updateUser } from "../../../api/accountApi";
import type { UserRequest } from "../../../api/accountApi";

// Map gender values to match backend enum
type Gender = "MALE" | "FEMALE" | "OTHER"; // Hoặc lấy từ file types chung

// Cập nhật genderMap để khớp với type Gender
const genderMap: Record<string, Gender> = {
  Male: "MALE",
  Female: "FEMALE",
  Other: "OTHER",
} as const;

const reverseGenderMap: Record<Gender, string> = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
} as const;

// Type guard để kiểm tra Gender
const isGender = (value: string): value is Gender => {
  return value === "MALE" || value === "FEMALE" || value === "OTHER";
};

// Helper function để convert gender safely
const convertToGender = (gender: string | undefined): Gender | undefined => {
  if (!gender) return undefined;
  const mappedGender = genderMap[gender];
  return isGender(mappedGender) ? mappedGender : undefined;
};

export default function AccountSettings() {
  const globalContext = useContext(GlobalContext);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState<UserRequest>({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  const [image, setImage] = useState("https://randomuser.me/api/portraits/women/44.jpg");

  // Initialize form data from global context
  useEffect(() => {
    if (globalContext?.user) {
      const { user } = globalContext;

      // Convert backend gender to frontend display value
      const displayGender =
        user.gender && reverseGenderMap[user.gender as keyof typeof reverseGenderMap]
          ? reverseGenderMap[user.gender as keyof typeof reverseGenderMap]
          : "";

      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: displayGender,
      });
    }
  }, [globalContext?.user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (!globalContext?.user) return;

    setSaving(true);
    try {
      // Convert frontend gender to backend enum value
      const backendFormData = {
        ...formData,
        gender: convertToGender(formData.gender),
      };

      const updatedUser = await updateUser(backendFormData);

      // Convert UserResponse sang User type nếu cần
      const userForContext = {
        ...updatedUser,
        gender: updatedUser.gender as Gender | undefined, // Type assertion nếu cần
      };

      // Update global context với user mới
      globalContext.setGlobal({ user: userForContext });
      alert("Profile updated successfully!");
    } catch (error: unknown) {
      console.error("Failed to update user:", error);

      let errorMessage = "Failed to update profile. Please try again.";

      if (error instanceof Error && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      alert(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (!globalContext) {
    return null;
  }

  const { user } = globalContext;

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
        <div className="text-center py-8">
          <p className="text-gray-500">Please log in to view account settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
      {/* TIÊU ĐỀ + ĐƯỜNG VIỀN */}
      <div className="border-b pb-4 mb-6" style={{ borderColor: "#e5e7eb" }}>
        <h3 className="text-lg font-semibold" style={{ color: "#111827" }}>
          Account Settings
        </h3>
      </div>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* FORM BÊN TRÁI */}
        <div className="flex-1 max-w-lg w-full space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
              style={
                {
                  borderColor: "#d1d5db",
                  "--tw-ring-color": "#FF9F0D",
                  outline: "none",
                  color: "#666666",
                } as React.CSSProperties
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
              style={
                {
                  borderColor: "#d1d5db",
                  "--tw-ring-color": "#FF9F0D",
                  outline: "none",
                  color: "#666666",
                } as React.CSSProperties
              }
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
              style={
                {
                  borderColor: "#d1d5db",
                  "--tw-ring-color": "#FF9F0D",
                  outline: "none",
                  color: "#666666",
                } as React.CSSProperties
              }
            />
          </div>

          {/* NGÀY SINH & GIỚI TÍNH – CÙNG HÀNG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                style={
                  {
                    borderColor: "#d1d5db",
                    "--tw-ring-color": "#FF9F0D",
                    outline: "none",
                    color: "#666666",
                  } as React.CSSProperties
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                style={
                  {
                    borderColor: "#d1d5db",
                    "--tw-ring-color": "#FF9F0D",
                    outline: "none",
                    color: "#666666",
                    backgroundColor: "#ffffff",
                  } as React.CSSProperties
                }
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSaveChanges}
            disabled={saving}
            className="mt-6 px-6 py-2.5 text-white text-sm font-medium rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#FF9F0D" }}
            onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#e48900")}
            onMouseLeave={(e) => !saving && (e.currentTarget.style.backgroundColor = "#FF9F0D")}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* AVATAR BÊN PHẢI */}
        <div className="flex justify-center w-full md:w-auto pl-18 pt-10">
          <div className="flex flex-col items-center">
            <div
              className="w-45 h-45 rounded-full overflow-hidden mb-5 shadow-lg"
              style={{ border: "3px solid #FF9F0D" }}
            >
              <img src={image} alt="User avatar" className="w-full h-full object-cover" />
            </div>

            <label className="cursor-pointer">
              <span
                className="inline-block px-5 py-2 text-sm font-medium rounded-full border-2 transition-all"
                style={{
                  color: "#FF9F0D",
                  borderColor: "#FF9F0D",
                  backgroundColor: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF9F0D";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.color = "#FF9F0D";
                }}
              >
                Choose Image
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
