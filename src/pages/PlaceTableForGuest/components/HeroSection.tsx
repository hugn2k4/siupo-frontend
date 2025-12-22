// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import defaultPlacetable from "../../../assets/images/image_place_table.png";
import { useBanners } from "../../../hooks/useBanners";
const HeroSection: React.FC = () => {
  // const [guests, setGuests] = useState("2");
  // const [branch, setBranch] = useState("");
  // const [date, setDate] = useState<Date | null>(new Date());

  // Chức năng tìm bàn không được triển khai - chỉ hiển thị giao diện
  // const handleFindTable = () => {
  //   // Không thực hiện gì - theo yêu cầu bỏ qua chức năng này
  //   console.log("Chức năng tìm bàn chưa được triển khai");
  // };
  const { banners, loading } = useBanners("Place table");
  const backgroundImage = banners[0]?.url || defaultPlacetable;

  return (
    <section
      className="relative h-96 bg-cover bg-center"
      style={{
        backgroundImage: loading
          ? "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))"
          : backgroundImage
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${backgroundImage}')`
            : `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200')`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">Book Your Table Today</h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">Experience Culinary Excellence!</h2>
        {/* <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white">
              <span className="mr-2 text-gray-500">📅</span>
              <DatePicker
                selected={date}
                onChange={(newDate) => setDate(newDate)}
                dateFormat="dd/MM/yyyy"
                className="w-full outline-none text-gray-700"
                placeholderText="Chọn ngày"
                minDate={new Date()}
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
              <span className="mr-2 text-gray-500">👤</span>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full outline-none text-gray-700"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
              <span className="mr-2 text-gray-500">📍</span>
              <input
                type="text"
                placeholder="Chi nhánh"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <button
            onClick={handleFindTable}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-md transition"
          >
            Tìm bàn trống
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
