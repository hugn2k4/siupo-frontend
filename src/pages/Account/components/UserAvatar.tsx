import { useEffect, useState } from "react";
import userService from "../../../services/userService";
import { useNavigate } from "react-router-dom";

const DEFAULT_AVATAR = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

export default function UserAvatar() {
  const [fullName, setFullName] = useState<string>("Khách hàng");
  const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await userService.getCurrentUser();

        const userData = response.data;

        if (userData?.fullName) {
          setFullName(userData.fullName);
        }

        if (userData?.avatar?.url) {
          setAvatarUrl(userData.avatar.url);
        } else {
          setAvatarUrl(DEFAULT_AVATAR);
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
          <img src={avatarUrl} alt="User avatar" className="w-full h-full object-cover" />
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
