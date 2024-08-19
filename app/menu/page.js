"use client";

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { db } from '../firebase'; // Ensure you have this export from your firebase.js
import { collection, getDocs } from 'firebase/firestore';

export default function MenuPage() {
  const [categories, setCategories] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products'); // Adjust to your collection name
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id, // Include the document ID
          ...doc.data()
        }));
        
        // Organize products by category
        const categoryMap = productList.reduce((acc, product) => {
          const { type } = product;
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(product);
          return acc;
        }, {});

        setCategories(categoryMap);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleNotification = (message, type) => {
    console.log(`Notification - Message: ${message}, Type: ${type}`); // Debugging
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000); // Clear after 3 seconds
  };

  return (
    <div
      className="relative min-h-screen flex flex-col bg-cover py-16 px-9 mt-6 md:mt-5 lg:mt-5 overflow-y-auto"
      style={{
        backgroundImage: `url('/images/pattern.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <h1 className="text-4xl font-semibold text-center text-pgreen font-script mb-8">Our Menu</h1>
      {Object.entries(categories).map(([category, products]) => (
        <div key={category} className="mb-14 text-bold">
          <h2 className="text-3xl font-bold font-script text-pred mb-6">{category}</h2>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hidden">
              <div className="flex space-x-8">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id} // Pass the product ID
                    image={product.image}
                    name={product.name}
                    description={product.description}
                    prices={{ [product.unit]: product.price }} // Adjust if multiple sizes/units
                    onNotify={handleNotification} // Pass notification handler
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {notification.message && (
        <div className={`fixed top-22 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white shadow-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}
