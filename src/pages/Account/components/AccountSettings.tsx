// src/Account/components/AccountSettings.tsx
import React, { useState } from "react";

export default function AccountSettings() {
  const [firstName, setFirstName] = useState("Dianne");
  const [lastName, setLastName] = useState("Russell");
  const [email, setEmail] = useState("dianne.russell@gmail.com");
  const [phone, setPhone] = useState("(603) 555-0123");
  const [birthDate, setBirthDate] = useState("1990-05-15"); // ví dụ
  const [gender, setGender] = useState("Female");
  const [image, setImage] = useState("https://randomuser.me/api/portraits/women/44.jpg");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

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
          {/* First & Last Name */}
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
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button
            className="mt-6 px-6 py-2.5 text-white text-sm font-medium rounded-full transition-colors"
            style={{ backgroundColor: "#FF9F0D" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e48900")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF9F0D")}
          >
            Save Changes
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
