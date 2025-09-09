const MenuSection: React.FC = () => {
  const menuCategories = ["Breakfast", "Launch", "Dinner", "Dessert", "Drink", "Snack"];

  const menuItems = [
    {
      name: "Alder Grilled Chinook Salmon",
      description: "Toasted French bread topped with romano, cheddar",
      price: "$25",
      calories: "560 CAL",
    },
    {
      name: "Alder Grilled Chinook Salmon",
      description: "Toasted French bread topped with romano, cheddar",
      price: "$32",
      calories: "560 CAL",
    },
    {
      name: "Alder Grilled Chinook Salmon",
      description: "Toasted French bread topped with romano, cheddar",
      price: "$43",
      calories: "560 CAL",
    },
    {
      name: "Alder Grilled Chinook Salmon",
      description: "Toasted French bread topped with romano, cheddar",
      price: "$16",
      calories: "560 CAL",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Food Menu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-12 border-b border-gray-200">
          {menuCategories.map((category, index) => (
            <button
              key={index}
              className={`pb-2 font-medium transition-colors ${
                index === 0 ? "text-primary border-b-2 border-primary" : "text-gray-2 hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="flex justify-between items-start border-b border-gray-200 pb-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <span className="text-orange-500 font-semibold">{item.calories}</span>
              </div>
              <div className="text-2xl font-bold text-orange-500 ml-4">{item.price}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            View More Menu
          </button>
        </div>
      </div>
    </section>
  );
};
export default MenuSection;
