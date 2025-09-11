import React from 'react';
import Breadcrumb from './components/Breadcrumb';
import Navigation from './components/Navigation';
import ProductImages from './components/ProductImages';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import SimilarProducts from './components/SimilarProducts';
const ShopDetail: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb />
      <Navigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <ProductImages />
        <ProductInfo />
      </div>
      
      <ProductTabs />
      <SimilarProducts />
    </div>
  );
};

export default ShopDetail;
