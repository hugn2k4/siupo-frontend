import React from "react";
import MyButton from "../../../components/common/Button";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";

interface AddressFormProps {
  title: string;
  showBillingOption?: boolean;
  onBillingToggle?: () => void;
  isBillingSameAsShipping?: boolean;
  // optional callback when user saves the form
  onSave?: (data: {
    fullName: string;
    phoneNumber: string;
    city: string;
    district: string;
    ward: string;
    address: string;
    isDefault?: boolean;
  }) => void;
  onCancel?: () => void;
  showSaveButton?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ title, onSave, onCancel, showSaveButton }) => {
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
  const [isDefault, setIsDefault] = React.useState(false);

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

        {/* Checkbox Set as default */}
        {typeof onSave === "function" && showSaveButton && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="ml-0.5 w-4 h-4 text-orange-500  border-gray-300  focus:ring-orange-500"
            />
            <label htmlFor="isDefault" className="text-sm text-gray-700 cursor-pointer">
              Set as default address
            </label>
          </div>
        )}

        {/** Save and Cancel buttons */}
        {typeof onSave === "function" && showSaveButton && (
          <div className="pt-1 grid grid-cols-2 gap-3">
            {onCancel && (
              <MyButton colorScheme="grey" onClick={onCancel} sx={{ borderRadius: 0 }}>
                Cancel
              </MyButton>
            )}
            <MyButton
              colorScheme="orange"
              onClick={() => onSave({ fullName, phoneNumber, city: selectedCity, district, ward, address, isDefault })}
              sx={{ gridColumn: onCancel ? "auto" : "span 2", borderRadius: 0 }}
            >
              Save address
            </MyButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressForm;
