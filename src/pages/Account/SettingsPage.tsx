// src/Account/pages/SettingsPage.tsx (hoặc components)

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Account/components/Sidebar";
import AccountSettings from "../Account/components/AccountSettings";
import BillingAddress from "../Account/components/BillingAddress";
import ChangePassword from "../Account/components/ChangePassword";

export default function SettingsPage() {
  const [activeLabel, setActiveLabel] = useState("Settings");
  const location = useLocation();

  // Cuộn tự động khi có hash trong URL: #account-settings, #billing-address
  useEffect(() => {
    const hash = location.hash; // ví dụ: "#billing-address"
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-shrink-0">
            <Sidebar activeLabel={activeLabel} onItemClick={setActiveLabel} />
          </div>

          <div className="flex-1 space-y-8">
            <section id="account-settings">
              <AccountSettings />
            </section>

            <section id="billing-address">
              <BillingAddress />
            </section>

            <section id="change-password">
              <ChangePassword />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
