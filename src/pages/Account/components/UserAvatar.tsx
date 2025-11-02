// src/Account/components/UserAvatar.tsx

export default function UserAvatar() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col justify-between">
      <div className="text-center">
        <div
          className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4"
          style={{ borderColor: "#ffffff" }}
        >
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Dianne Russell"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold" style={{ color: "#111827" }}>
          Dianne Russell
        </h3>
        <p className="text-sm" style={{ color: "#6B7280" }}>
          Customer
        </p>
      </div>

      <button className="mt-4 text-sm font-medium hover:underline self-center" style={{ color: "#FF9F0D" }}>
        Edit Profile
      </button>
    </div>
  );
}
