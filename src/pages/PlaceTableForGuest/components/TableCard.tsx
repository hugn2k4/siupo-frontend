import React from "react";

interface TableCardProps {
  image: string;
  title: string;
  subtitle: string;
}

const TableCard: React.FC<TableCardProps> = ({ image, title, subtitle }) => {
  // Chức năng chọn bàn không được triển khai - chỉ hiển thị giao diện
  const handleSelectTable = () => {
    // Không thực hiện gì - theo yêu cầu bỏ qua chức năng này
    console.log("Chức năng chọn bàn chưa được triển khai");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600 mb-4">{subtitle}</p>
        <button
          onClick={handleSelectTable}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-md transition"
        >
          Chọn bàn này
        </button>
      </div>
    </div>
  );
};

export default TableCard;
