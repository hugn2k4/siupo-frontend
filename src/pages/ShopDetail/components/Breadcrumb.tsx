import React from 'react';

const Breadcrumb: React.FC = () => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <span className="text-orange-500 hover:underline cursor-pointer">Home</span>
      <span>›</span>
      <span>Shop details</span>
    </nav>
  );
};

export default Breadcrumb;
