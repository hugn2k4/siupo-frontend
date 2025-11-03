// src/Account/components/UserAddressInfo.tsx
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { getDefaultAddress } from "../../../api/accountApi";
import type { AddressDTO } from "../../../api/accountApi";

export default function UserAddressInfo() {
  const globalContext = useContext(GlobalContext);
  const [defaultAddress, setDefaultAddress] = useState<AddressDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDefaultAddress = async () => {
      try {
        const addressData = await getDefaultAddress();
        setDefaultAddress(addressData);
        setError(null);
      } catch (error: unknown) {
        console.error("Failed to fetch default address:", error);

        // Check if it's a 404 error (address not found)
        let isNotFoundError = false;

        if (error instanceof Error && "response" in error) {
          const axiosError = error as { response?: { status?: number } };
          isNotFoundError = axiosError.response?.status === 404;
        }

        // Nếu lỗi 404 (không tìm thấy địa chỉ mặc định), coi như không có địa chỉ
        if (isNotFoundError) {
          setDefaultAddress(null);
          setError(null);
        } else {
          setError("Không thể tải địa chỉ");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultAddress();
  }, []);

  if (!globalContext) {
    return null;
  }

  const { user } = globalContext;

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col justify-between">
        <div className="space-y-6 text-sm">
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
          </div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-20 mt-6 animate-pulse"></div>
      </div>
    );
  }

  if (error) {
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
              ĐỊA CHỈ GIAO HÀNG
            </p>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </div>
        <button
          className="font-medium hover:underline self-start"
          style={{
            color: "#FF9F0D",
            fontSize: "14px",
            marginTop: "24px",
            fontWeight: "600",
          }}
          onClick={() => window.location.reload()}
        >
          Thử lại
        </button>
      </div>
    );
  }

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
            ĐỊA CHỈ GIAO HÀNG
          </p>

          {/* Tên người nhận - in đậm */}
          {defaultAddress ? (
            <>
              <p
                style={{
                  color: "#111827",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                {defaultAddress.receiverName}
              </p>

              {/* Địa chỉ chi tiết */}
              <p
                style={{
                  color: "#111827",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  marginBottom: "2px",
                }}
              >
                {defaultAddress.addressLine}
              </p>

              {/* Địa chỉ khu vực */}
              <p
                style={{
                  color: "#111827",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                {defaultAddress.ward}, {defaultAddress.district}, {defaultAddress.province}
              </p>

              {/* Số điện thoại */}
              <p
                style={{
                  color: "#111827",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {defaultAddress.receiverPhone}
              </p>
            </>
          ) : (
            <>
              <p
                style={{
                  color: "#111827",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                {user?.fullName || "Unknown User"}
              </p>
              <p
                style={{
                  color: "#6B7280",
                  fontSize: "14px",
                  fontStyle: "italic",
                  marginBottom: "12px",
                }}
              >
                Chưa có địa chỉ mặc định
              </p>
              {/* Email */}
              <p
                style={{
                  color: "#111827",
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                {user?.email || "No email provided"}
              </p>

              {/* Số điện thoại */}
              <p
                style={{
                  color: "#111827",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {user?.phoneNumber || "No phone number"}
              </p>
            </>
          )}
        </div>
      </div>

      <button
        className="font-medium hover:underline self-start"
        style={{
          color: "#FF9F0D",
          fontSize: "14px",
          marginTop: "24px",
          fontWeight: "600",
        }}
      >
        Chỉnh sửa địa chỉ
      </button>
    </div>
  );
}
