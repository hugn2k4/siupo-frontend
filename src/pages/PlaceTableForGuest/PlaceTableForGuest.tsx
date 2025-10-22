import React from "react";
import HeroSection from "./components/HeroSection";
import TableList from "./components/TableList";
import BookingForm from "./components/BookingForm";

const PlaceTableForGuest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - hiển thị form tìm bàn nhưng không có chức năng */}
      <HeroSection />

      {/* Table List - hiển thị danh sách bàn mẫu nhưng không có chức năng chọn */}
      <TableList />

      {/* Booking Form - Form đặt bàn chính với đầy đủ chức năng */}
      <BookingForm />
    </div>
  );
};

export default PlaceTableForGuest;
