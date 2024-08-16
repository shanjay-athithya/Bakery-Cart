"use client";

import React, { useState } from 'react';

const ProductCard = ({ image, name, description, prices }) => {
  const [selectedSize, setSelectedSize] = useState(Object.keys(prices)[0]);
  const [currentPrice, setCurrentPrice] = useState(prices[selectedSize]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setCurrentPrice(prices[size]);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex flex-col space-y-2">
          {/* Size Selection Buttons */}
          <div className="flex space-x-2">
            {Object.keys(prices).map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-2 border rounded-md focus:outline-none transition-colors ${selectedSize === size ? 'bg-pastelPink text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {size}
              </button>
            ))}
          </div>
          {/* Display Selected Price */}
          <div className="mt-4 text-pastelPink font-bold">Rs. {currentPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
