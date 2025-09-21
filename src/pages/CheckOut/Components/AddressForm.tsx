import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AddressFormProps {
  title: string;
  showBillingOption?: boolean;
  onBillingToggle?: () => void;
  isBillingSameAsShipping?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ title }) => {
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <div className="bg-white p-6 border border-gray-400">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="space-y-4">
        {/* Họ và tên */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>

        {/* Email + SĐT */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
            <input type="tel" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>

        {/* Địa chỉ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-orange-500" />
        </div>

        {/* Thành phố */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-orange-500 appearance-none bg-white text-gray-400"
            >
              <option value="">Choose City</option>
              <option value="hcm">TP. Hồ Chí Minh</option>
              <option value="hn">Hà Nội</option>
              <option value="dn">Đà Nẵng</option>
              <option value="ct">Cần Thơ</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Quận/Huyện + Mã bưu điện */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mã bưu điện</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
