/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import userService from "../../../services/userService";
import { useSnackbar } from "../../../hooks/useSnackbar";
import type { UserRequest } from "../../../types/requests/user.request";
import { useGlobal } from "../../../hooks/useGlobal";
import type { UserResponse } from "../../../types/responses/user.response";
import type { User } from "../../../types/models/user";
const DEFAULT_AVATAR = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

type ApiUserCleaned = Omit<UserResponse, "avatar" | "dateOfBirth" | "gender" | "role">;
type UserForGlobalState = ApiUserCleaned & {
  avatarUrl?: string;
  gender?: User["gender"];
  dateOfBirth?: string;
  role?: string;
};

export default function AccountSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("FEMALE");

  const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR);
  const [avatarName, setAvatarName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { showSnackbar } = useSnackbar();
  const { setGlobal } = useGlobal();
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const res = await userService.getCurrentUser();
        const user = res.data;

        if (!user) {
          showSnackbar("Không có dữ liệu người dùng", "error");
          setLoading(false);
          return;
        }

        const nameParts = user.fullName.trim().split(" ");
        const first = nameParts[0] || "";
        const last = nameParts.slice(1).join(" ") || "";

        setFirstName(first);
        setLastName(last);
        setEmail(user.email);
        setPhone(user.phoneNumber);
        setBirthDate(user.dateOfBirth || "");
        setGender((user.gender as "MALE" | "FEMALE" | "OTHER") || "FEMALE");

        if (user.avatar?.url) {
          setAvatarUrl(user.avatar.url);
          setAvatarName(user.avatar.name || null);
        } else {
          setAvatarUrl(DEFAULT_AVATAR);
          setAvatarName(null);
        }
      } catch {
        showSnackbar("Không tải được thông tin", "error");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [showSnackbar]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!firstName.trim()) {
      showSnackbar("Vui lòng nhập tên", "error");
      return;
    }

    setSaving(true);
    let finalAvatarUrl = avatarUrl === DEFAULT_AVATAR ? null : avatarUrl;
    let finalAvatarName = avatarName;

    if (selectedFile) {
      setUploading(true);
      try {
        const uploadedData = await userService.uploadAvatar(selectedFile);

        if (uploadedData?.avatarUrl) {
          finalAvatarUrl = uploadedData.avatarUrl;
          finalAvatarName = uploadedData.avatarName;
        } else {
          showSnackbar("Lỗi upload: Server không trả về URL", "error");
          setSaving(false);
          setUploading(false);
          return;
        }
      } catch (error) {
        showSnackbar("Upload hình ảnh thất bại", "error");
        setSaving(false);
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    const payload: UserRequest = {
      fullName,
      phoneNumber: phone,
      dateOfBirth: birthDate || undefined,
      gender: gender,
      avatarUrl: finalAvatarUrl,
      avatarName: finalAvatarName,
    };

    try {
      const response = await userService.updateUser(payload);
      const updatedUser = response.data;
      if (updatedUser) {
        const userForGlobal: UserForGlobalState = {
          ...(updatedUser as ApiUserCleaned),
          avatarUrl: updatedUser.avatar?.url || undefined,
          gender: updatedUser.gender as UserForGlobalState["gender"],
          dateOfBirth: updatedUser.dateOfBirth,
          role: updatedUser.role,
        };
        setGlobal({ user: userForGlobal as unknown as User });
      }

      setAvatarUrl(finalAvatarUrl || DEFAULT_AVATAR);
      setAvatarName(finalAvatarName);
      setSelectedFile(null);

      showSnackbar("Cập nhật thành công!", "success");
    } catch {
      showSnackbar("Cập nhật thất bại", "error");
    } finally {
      setSaving(false);
    }
  };

  const isFormDirty = firstName || lastName || phone || birthDate || gender || selectedFile;
  const isButtonDisabled = saving || uploading || !isFormDirty;

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
                disabled={saving || uploading}
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
                disabled={saving || uploading}
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
              disabled={saving || uploading}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Date of Birth
              </label>
              <input
                type="date"
                value={birthDate || ""}
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
                disabled={saving || uploading}
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
                disabled={saving || uploading}
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
            disabled={isButtonDisabled}
            onMouseEnter={(e) => !isButtonDisabled && (e.currentTarget.style.backgroundColor = "#e48900")}
            onMouseLeave={(e) => !isButtonDisabled && (e.currentTarget.style.backgroundColor = "#FF9F0D")}
          >
            {saving || uploading ? "Đang xử lý..." : "Save Changes"}
          </button>
        </div>

        <div className="flex justify-center w-full md:w-auto pl-18 pt-10">
          <div className="flex flex-col items-center">
            <div
              className="w-45 h-45 rounded-full overflow-hidden mb-5 shadow-lg"
              style={{ border: "3px solid #FF9F0D" }}
            >
              <img src={avatarUrl} alt="User avatar" className="w-full h-full object-cover" />
            </div>

            <label className="cursor-pointer" style={{ opacity: saving || uploading ? 0.5 : 1 }}>
              <span
                className="inline-block px-5 py-2 text-sm font-medium rounded-full border-2 transition-all"
                style={{
                  color: "#FF9F0D",
                  borderColor: "#FF9F0D",
                  backgroundColor: "#ffffff",
                  pointerEvents: saving || uploading ? "none" : "auto",
                }}
                onMouseEnter={(e) => !(saving || uploading) && (e.currentTarget.style.backgroundColor = "#FF9F0D")}
                onMouseLeave={(e) => !(saving || uploading) && (e.currentTarget.style.backgroundColor = "#ffffff")}
              >
                Choose Image
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={saving || uploading}
              />
            </label>
            {uploading && <p className="text-xs text-gray-500 mt-2">Đang upload...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
