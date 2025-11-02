// SettingsPage.tsx
import { useState } from "react";
import Sidebar from "../Account/components/Sidebar";
import AccountSettings from "../Account/components/AccountSettings";
import BillingAddress from "../Account/components/BillingAddress";
import ChangePassword from "../Account/components/ChangePassword";

export default function SettingsPage() {
  const [activeLabel, setActiveLabel] = useState("Settings");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Truyền activeLabel */}
          <div className="flex-shrink-0">
            <Sidebar activeLabel={activeLabel} onItemClick={setActiveLabel} />
          </div>

          {/* Nội dung chính */}
          <div className="flex-1 space-y-8">
            <AccountSettings />
            <BillingAddress />
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
}
