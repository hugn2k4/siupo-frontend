const orders = [
  { id: "#735", date: "8 Sep, 2020", total: "$192.00 (3 Products)", status: "Processing" },
  { id: "#702", date: "26 May, 2020", total: "$80.00 (1 Product)", status: "On the way" },
  { id: "#580", date: "22 Oct, 2020", total: "$240.00 (2 Products)", status: "Completed" },
  { id: "#261", date: "1 Feb, 2020", total: "$95.00 (1 Product)", status: "Completed" },
  { id: "#128", date: "31 Sep, 2020", total: "$570.00 (3 Products)", status: "Completed" },
  { id: "#492", date: "22 Oct, 2020", total: "$345.00 (7 Products)", status: "Completed" },
];

export default function OrderHistoryTable() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Order History</h3>
        <a href="#" className="text-orange-600 text-sm font-medium hover:underline">
          View All
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="text-left py-3">Order ID</th>
              <th className="text-left py-3">Date</th>
              <th className="text-left py-3">Total</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium">{order.id}</td>
                <td className="py-3 text-gray-600">{order.date}</td>
                <td className="py-3 text-gray-600">{order.total}</td>
                <td className="py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Processing"
                        ? "bg-orange-100 text-orange-700"
                        : order.status === "On the way"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3">
                  <a href="#" className="text-orange-600 hover:underline text-sm">
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
