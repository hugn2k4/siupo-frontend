export default function UserAddressInfo() {
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

          {/* Tên người nhận - in đậm */}
          <p
            style={{
              color: "#111827",
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "4px",
            }}
          >
            Dianne Russell
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
            4140 Parker Rd. Allentown, New Mexico
          </p>

          {/* Mã bưu điện */}
          <p
            style={{
              color: "#111827",
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            31134
          </p>

          {/* Email */}
          <p
            style={{
              color: "#111827",
              fontSize: "14px",
              marginBottom: "4px",
            }}
          >
            dianne.russell@gmail.com
          </p>

          {/* Số điện thoại */}
          <p
            style={{
              color: "#111827",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            (671) 555-0110
          </p>
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
        Edit Address
      </button>
    </div>
  );
}
