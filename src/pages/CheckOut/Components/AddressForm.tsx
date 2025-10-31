import React from "react";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";

interface AddressFormProps {
  title: string;
  showBillingOption?: boolean;
  onBillingToggle?: () => void;
  isBillingSameAsShipping?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ title }) => {
  const cities = [
    { label: "TP. Hồ Chí Minh", value: "hcm" },
    { label: "Hà Nội", value: "hn" },
    { label: "Đà Nẵng", value: "dn" },
    { label: "Cần Thơ", value: "ct" },
  ];

  const [selectedCity, setSelectedCity] = React.useState("");

  const [fullName, setFullName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [ward, setWard] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [district, setDistrict] = React.useState("");

  return (
    <div className="bg-white p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="space-y-4">
        {/* Họ và tên */}
        <div className="grid grid-cols-2 gap-4">
          <CustomInput id="fullName" label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <CustomInput
            id="phoneNumber"
            label="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Thành phố */}
        <div>
          <CustomSelect id="city" label="City" value={selectedCity} onChange={setSelectedCity} options={cities} />
        </div>

        {/* Quận/Huyện + Mã bưu điện */}
        <div className="grid grid-cols-2 gap-4">
          <CustomInput id="district" label="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
          <CustomInput id="ward" label="Ward" value={ward} onChange={(e) => setWard(e.target.value)} />
        </div>
        {/* Địa chỉ */}
        <div>
          <CustomInput id="address" label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
