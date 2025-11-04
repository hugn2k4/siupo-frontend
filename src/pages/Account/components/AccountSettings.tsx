// src/Account/components/AccountSettings.tsx

import React, { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import { useSnackbar } from "../../../hooks/useSnackbar";

interface UserRequest {
  fullName: string;
  phoneNumber: string;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
}

export default function AccountSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("FEMALE");
  const [image, setImage] = useState("https://randomuser.me/api/portraits/women/44.jpg");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { showSnackbar } = useSnackbar();

  // Load dữ liệu user khi mở trang
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const res = await userApi.getCurrentUser();
        const user = res.data;
        // KIỂM TRA user CÓ TỒN TẠI
        if (!user) {
          showSnackbar("Không có dữ liệu người dùng", "error");
          setLoading(false);
          return;
        }
        // Tách fullName → firstName + lastName
        const nameParts = user.fullName.trim().split(" ");
        const first = nameParts[0] || "";
        const last = nameParts.slice(1).join(" ") || "";

        setFirstName(first);
        setLastName(last);
        setEmail(user.email);
        setPhone(user.phoneNumber);
        setBirthDate(user.dateOfBirth || "");
        setGender((user.gender as "MALE" | "FEMALE" | "OTHER") || "FEMALE");
        // Avatar: nếu BE có thì dùng, không thì giữ default
      } catch {
        showSnackbar("Không tải được thông tin", "error");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [showSnackbar]);

  // Xử lý upload ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Gộp và gửi về BE
  const handleSave = async () => {
    if (!firstName.trim()) {
      showSnackbar("Vui lòng nhập tên", "error");
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    const payload: UserRequest = {
      fullName,
      phoneNumber: phone,
      dateOfBirth: birthDate || undefined,
      gender: gender,
    };

    try {
      setSaving(true);
      await userApi.updateUser(payload);
      showSnackbar("Cập nhật thành công!", "success");
    } catch {
      showSnackbar("Cập nhật thất bại", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Đang tải...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
      <div className="border-b pb-4 mb-6" style={{ borderColor: "#e5e7eb" }}>
        <h3 className="text-lg font-semibold" style={{ color: "#111827" }}>
          Account Settings
        </h3>
      </div>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* FORM BÊN TRÁI */}
        <div className="flex-1 max-w-lg w-full space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                First name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                style={
                  {
                    borderColor: "#d1d5db",
                    "--tw-ring-color": "#FF9F0D",
                    outline: "none",
                    color: "#666666",
                  } as React.CSSProperties
                }
                disabled={saving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Last name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                style={
                  {
                    borderColor: "#d1d5db",
                    "--tw-ring-color": "#FF9F0D",
                    outline: "none",
                    color: "#666666",
                  } as React.CSSProperties
                }
                disabled={saving}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-3 py-2 border rounded-md text-sm bg-gray-50"
              style={
                {
                  borderColor: "#d1d5db",
                  color: "#9CA3AF",
                } as React.CSSProperties
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
              style={
                {
                  borderColor: "#d1d5db",
                  "--tw-ring-color": "#FF9F0D",
                  outline: "none",
                  color: "#666666",
                } as React.CSSProperties
              }
              disabled={saving}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Date of Birth
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                style={
                  {
                    borderColor: "#d1d5db",
                    "--tw-ring-color": "#FF9F0D",
                    outline: "none",
                    color: "#666666",
                  } as React.CSSProperties
                }
                disabled={saving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE" | "OTHER")}
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
                disabled={saving}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <button
            className="mt-6 px-6 py-2.5 text-white text-sm font-medium rounded-full transition-colors disabled:opacity-50"
            style={{ backgroundColor: "#FF9F0D" }}
            onClick={handleSave}
            disabled={saving}
            onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#e48900")}
            onMouseLeave={(e) => !saving && (e.currentTarget.style.backgroundColor = "#FF9F0D")}
          >
            {saving ? "Đang lưu..." : "Save Changes"}
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
