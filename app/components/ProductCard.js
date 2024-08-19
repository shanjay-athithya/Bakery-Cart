"use client";

import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Ensure you have Firestore and Auth exported from firebase.js
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ProductCard = ({ image, name, description, prices, id, onNotify }) => {
  const [selectedSize, setSelectedSize] = useState(Object.keys(prices)[0]);
  const [currentPrice, setCurrentPrice] = useState(prices[selectedSize]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.email : null);
    });
    return () => unsubscribe();
  }, []);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setCurrentPrice(prices[size]);
  };

  const handleAddToCart = async () => {
    if (!userId) {
      onNotify('Please log in to add items to the cart.', 'error');
      return;
    }

    const totalPrice = currentPrice; // Use static price
    const cartCollection = collection(db, 'cart');
    const cartQuery = query(
      cartCollection,
      where('userId', '==', userId),
      where('productId', '==', id),
      where('unit', '==', selectedSize)
    );

    try {
      const existingItemsSnapshot = await getDocs(cartQuery);

      if (existingItemsSnapshot.empty) {
        // If the item doesn't exist, add it to the cart
        await addDoc(cartCollection, {
          userId,
          productId: id,
          unit: selectedSize,
          price: totalPrice
        });
        onNotify('Product added to cart successfully!', 'success');
      } else {
        // If the item exists, show an error message
        onNotify('This product is already in your cart.', 'error');
      }
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      onNotify('Failed to add product to cart. Please try again.', 'error');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden gap-4 hover:scale-105 transition-transform w-80 flex-shrink-0">
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
          <button
            onClick={handleAddToCart}
            className="mt-4 px-4 py-2 bg-pred text-white font-bold rounded-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
