import React, { useState } from 'react';

const ProductTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="mt-12">
      <div className="flex border-b border-gray-200">
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'description'
              ? 'bg-orange-500 text-white rounded-t'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'reviews'
              ? 'bg-orange-500 text-white rounded-t'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews (24)
        </button>
      </div>
      
      <div className="p-6 bg-gray-50">
        {activeTab === 'description' && (
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nam tristique porta ligula, vel viverra sem eleifend nec. Nulla sed purus augue, in molestie mi. Duis cursus tellus 
              volutpat pellentesque hendrerit quis sed ligula, sit amet. Proin vitae adipiscing ipsum, vel consequat eros 
              lacinia a. Sed cursus neque a blandit convallis.
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Suspendisse rhoncus cursus mattis placerat. Mauris sed tortor vel ipsum. Curabitur ligula magna justo vel, ac porttitor 
              elit venenatis vel. Pellentesque adipiscing tellus ligula ut tellus erat. Sed vitae risus quis tellus tellus in 
              blandit eu volutpat lorem.
            </p>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Key Benefits</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Maecenas ullamcorper est et massa mattis condimentum.</li>
                <li>Vestibulum sed massa vel ipsum imperdiet malesuada id tempus nisl.</li>
                <li>Etiam non massa et felis tempor feugiat congue ac vitae.</li>
                <li>Mauris sagittis diam magna, in blandit turpis.</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <p className="text-gray-700">Reviews content would go here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
