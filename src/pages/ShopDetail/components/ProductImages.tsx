import React, { useState } from 'react';
import food1 from "../../../assets/images/food5.png";
import food2 from "../../../assets/images/food5.png";
import food3 from "../../../assets/images/food5.png";
import food4 from "../../../assets/images/food5.png";
const ProductImages: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const images = [food1, food2, food3, food4];


  return (
    <div className="flex space-x-4">
      {/* Thumbnail Images */}
      <div className="flex flex-col space-y-4">
        {images.map((img, index) => (
          <div 
            key={index}
            className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
              selectedImage === index ? 'border-orange-500' : 'border-gray-200'
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img 
              src={img} 
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Main Image */}
      <div className="w-96 h-96 rounded-lg overflow-hidden">
        <img 
          src={images[selectedImage]} 
          alt="Main product"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProductImages;
