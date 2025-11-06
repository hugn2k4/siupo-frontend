// src/pages/DashboardPage.tsx
import Sidebar from "../Account/components/Sidebar";
import UserAvatar from "../Account/components/UserAvatar";
import UserAddressInfo from "../Account/components/UserAddressInfo";
import OrderHistoryTable from "../Account/components/OrderHistoryTable";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Container chính có lề 2 bên */}
      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - cố định chiều rộng, tự co nội dung */}
          <div className="flex-shrink-0">
            <Sidebar />
          </div>

          {/* Nội dung chính */}
          <div className="flex-1 space-y-8">
            {/* 2 thẻ trên: Avatar + Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UserAvatar />
              <UserAddressInfo />
            </div>

            {/* Bảng Order History */}
            <div>
              <OrderHistoryTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
