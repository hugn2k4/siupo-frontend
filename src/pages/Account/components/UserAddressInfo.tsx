// src/Account/components/UserAddressInfo.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/userService";
import type { Address } from "../../../types/models/address";

interface UserInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export default function UserAddressInfo() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, addrRes] = await Promise.all([
          userService.getCurrentUser(),
          userService.getDefaultAddress().catch(() => ({ data: null })),
        ]);

        if (userRes.data) {
          setUser({
            fullName: userRes.data.fullName,
            phoneNumber: userRes.data.phoneNumber,
            email: userRes.data.email,
          });
        }

        if (addrRes.data) {
          const addr = addrRes.data;
          setAddress({
            address: addr.address,
            ward: addr.ward,
            district: addr.district,
            province: addr.province,
            receiverName: addr.receiverName,
            receiverPhone: addr.receiverPhone,
          });
        }
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
        setUser(null);
        setAddress(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatFullAddress = (addr: Address) => {
    const parts = [addr.address, addr.ward, addr.district, addr.province];
    return parts.filter(Boolean).join(", ");
  };

  const handleEditAddress = () => {
    navigate("/account/settings#billing-address");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col justify-between">
      <div className="space-y-6 text-sm">
        <div>
          <p
            style={{
              color: "#6B7280",
              fontSize: "12px",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontWeight: "600",
            }}
          >
            BILLING ADDRESS
          </p>

          {loading ? (
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          ) : user ? (
            <>
              <p style={{ color: "#111827", fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
                {address?.receiverName || user.fullName}
              </p>
              <p style={{ color: "#111827", fontSize: "14px", lineHeight: "1.5", marginBottom: "2px" }}>
                {address ? formatFullAddress(address) : "Chưa có địa chỉ giao hàng"}
              </p>
              <p style={{ color: "#111827", fontSize: "14px", marginBottom: "4px" }}>{user.email}</p>
              <p style={{ color: "#111827", fontSize: "14px", fontWeight: "500" }}>
                {address?.receiverPhone || user.phoneNumber}
              </p>
            </>
          ) : (
            <p style={{ color: "#9CA3AF", fontSize: "14px", fontStyle: "italic" }}>Không tải được thông tin</p>
          )}
        </div>
      </div>

      <button
        className="font-medium hover:underline self-start"
        style={{ color: "#FF9F0D", fontSize: "14px", marginTop: "24px", fontWeight: "600" }}
        onClick={handleEditAddress}
      >
        {address ? "Edit Address" : "Add Address"}
      </button>
    </div>
  );
}
