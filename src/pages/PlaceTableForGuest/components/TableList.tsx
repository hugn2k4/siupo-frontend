import React from "react";
import TableCard from "./TableCard";

const TableList: React.FC = () => {
  const tables = [
    {
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400",
      title: "Tối đa 4 người",
      subtitle: "Gần cửa sổ",
    },
    {
      image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400",
      title: "Tối đa 2 người",
      subtitle: "Khu yên tĩnh",
    },
    {
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400",
      title: "Tối đa 4 người",
      subtitle: "Ngoài trời",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Danh sách bàn khả dụng</h2>

        {/* Bộ lọc hiển thị nhưng không có chức năng */}
        <div className="flex justify-center gap-4 mb-8">
          <select className="border border-gray-300 rounded-md px-4 py-2 text-gray-700">
            <option>Khu vực</option>
            <option>Trong nhà</option>
            <option>Ngoài trời</option>
          </select>
          <select className="border border-gray-300 rounded-md px-4 py-2 text-gray-700">
            <option>Kích thước bàn</option>
            <option>2 người</option>
            <option>4 người</option>
            <option>6+ người</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tables.map((table, index) => (
            <TableCard key={index} {...table} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TableList;
