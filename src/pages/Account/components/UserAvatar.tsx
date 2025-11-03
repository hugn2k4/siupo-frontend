// src/Account/components/UserAvatar.tsx
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";

export default function UserAvatar() {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    return null;
  }

  const { user } = globalContext;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col justify-between">
      <div className="text-center">
        <div
          className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4"
          style={{ borderColor: "#ffffff" }}
        >
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt={user?.fullName || "User"}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold" style={{ color: "#111827" }}>
          {user?.fullName || "Unknown User"}
        </h3>
        <p className="text-sm" style={{ color: "#6B7280" }}>
          {user?.role || "Customer"}
        </p>
      </div>

      <button className="mt-4 text-sm font-medium hover:underline self-center" style={{ color: "#FF9F0D" }}>
        Edit Profile
      </button>
    </div>
  );
}
