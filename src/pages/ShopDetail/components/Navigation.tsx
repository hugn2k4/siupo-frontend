import React from 'react';

const Navigation: React.FC = () => {
  return (
    <div className="flex items-center gap-2.5 mb-6 justify-end">
      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
        <span>←</span>
        <span>Prev</span>
      </button>
      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
        <span>Next</span>
        <span>→</span>
      </button>
    </div>
  );
};

export default Navigation;
