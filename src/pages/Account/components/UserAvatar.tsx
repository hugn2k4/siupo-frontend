// src/Account/components/UserAvatar.tsx
import { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import { useNavigate } from "react-router-dom";

export default function UserAvatar() {
  const [fullName, setFullName] = useState<string>("Khách hàng");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await userApi.getCurrentUser();
        if (response.data?.fullName) {
          setFullName(response.data.fullName);
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleEditProfile = () => {
    navigate("/account/settings#account-settings");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col justify-between">
      <div className="text-center">
        <div
          className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4"
          style={{ borderColor: "#ffffff" }}
        >
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold" style={{ color: "#111827" }}>
          {loading ? "Đang tải..." : fullName}
        </h3>
        <p className="text-sm" style={{ color: "#6B7280" }}>
          Customer
        </p>
      </div>

      <button
        className="mt-4 text-sm font-medium hover:underline self-center"
        style={{ color: "#FF9F0D" }}
        onClick={handleEditProfile}
      >
        Edit Profile
      </button>
    </div>
  );
}
