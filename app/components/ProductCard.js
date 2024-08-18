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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden gap-40 hover:scale-105  transition-transform w-80 flex-shrink-0">
      <img src={image} alt={name} className="w-full h-52 object-cover" />
      <div className="p-4 bg-pgreen">
        <h3 className="text-xl text-white font-semibold">{name}</h3>
        <p className="mt-2 text-semibold text-pyellow">{description}</p>
        <div className="mt-4 flex flex-col space-y-2">
         
          <div className="flex space-x-2">
            {Object.keys(prices).map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-2 font-bold rounded-md focus:outline-none transition-colors ${selectedSize === size ? 'bg-pred text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {size}
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-white font-bold">Rs. {currentPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
