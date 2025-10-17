import React, { useState } from "react";
import imageDefault from "../../../assets/gallery/gallery_burger.png";

interface ProductImagesProps {
  imageUrls: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ imageUrls }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = imageUrls.length > 0 ? imageUrls : [imageDefault];

  return (
    <div className="flex space-x-4">
      {/* Thumbnail Images */}
      <div className="flex flex-col space-y-4">
        {images.map((img, index) => (
          <div
            key={index}
            className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
              selectedImage === index ? "border-orange-500" : "border-gray-200"
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="rounded-lg overflow-hidden">
        <img src={images[selectedImage]} alt="Main product" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ProductImages;
