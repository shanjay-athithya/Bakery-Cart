"use client";

import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Ensure you have Firestore and Auth exported from firebase.js
import { collection, query, where, getDocs, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' }); // Success and error messages

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.email);

        // Fetch cart items and corresponding product details when the user is authenticated
        const fetchCartItems = async () => {
          try {
            const cartCollection = collection(db, 'cart');
            const cartQuery = query(cartCollection, where('userId', '==', user.email));
            const cartSnapshot = await getDocs(cartQuery);

            const items = await Promise.all(
              cartSnapshot.docs.map(async (docSnapshot) => {
                const cartItem = docSnapshot.data();
                const productDoc = await getDoc(doc(db, 'products', cartItem.productId));

                if (productDoc.exists()) {
                  const productData = productDoc.data();
                  return {
                    id: docSnapshot.id,
                    productId: cartItem.productId,
                    name: productData.name,
                    type: productData.type,
                    image: productData.image,
                    quantity: cartItem.quantity || 1,
                    pricePerUnit: productData.price,
                    totalPrice: cartItem.quantity ? cartItem.quantity * productData.price : productData.price,
                  };
                } else {
                  console.error(`Product with ID ${cartItem.productId} does not exist.`);
                  return null;
                }
              })
            );

            setCartItems(items.filter(item => item !== null));
          } catch (error) {
            console.error('Error fetching cart items:', error);
          }
        };

        fetchCartItems();
      } else {
        setUserId(null);
        setCartItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to handle quantity change
  const handleQuantityChange = async (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        item.quantity = newQuantity;
        item.totalPrice = newQuantity * item.pricePerUnit;
      }
      return item;
    });

    setCartItems(updatedItems);

    try {
      const cartDoc = doc(db, 'cart', itemId);
      await updateDoc(cartDoc, {
        quantity: newQuantity,
      });
      setMessage({ text: 'Quantity updated successfully!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error updating quantity:', error);
      setMessage({ text: 'Failed to update quantity. Please try again.', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000); // Clear message after 3 seconds
    }
  };

  // Function to handle removing items from the cart
  const handleRemoveFromCart = async (itemId) => {
    try {
      const cartDoc = doc(db, 'cart', itemId);
      await deleteDoc(cartDoc);
      setCartItems(cartItems.filter(item => item.id !== itemId));
      setMessage({ text: 'Item removed from cart!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setMessage({ text: 'Failed to remove item from cart. Please try again.', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000); // Clear message after 3 seconds
    }
  };

  // Group items by type
  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <div
      className="relative min-h-screen flex flex-col bg-fixed bg-cover bg-center py-16 px-9 mt-6 md:mt-5 lg:mt-5 overflow-y-auto"
      style={{ backgroundImage: "url('/images/pattern.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg">
        <h1 className="text-4xl font-semibold text-center text-pgreen font-script mb-8">Your Cart</h1>

        {message.text && (
          <div
            className={`fixed top-22 right-4 px-4 py-2 rounded-md text-white font-bold ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {message.text}
          </div>
        )}

        {userId ? (
          Object.keys(groupedItems).map(type => (
            <div key={type} className="mb-12">
              <h2 className="text-2xl mt-8 font-script text-pred font-bold mb-4">{type}</h2>
              <div className="flex flex-wrap gap-6">
                {groupedItems[type].map(item => (
                  <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col w-80">
                    <img src={item.image} alt={item.name} className="w-full h-52 object-cover" />
                    <div className="p-4 bg-pgreen text-white flex flex-col flex-grow">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <p className="mt-2 font-bold text-yellow-200">{item.type}</p>
                      <p className="mt-4 font-bold">Total Price: Rs. {Number(item.totalPrice).toFixed(2)}</p>
                      <div className="mt-4 flex flex-col space-y-2">
                        <label htmlFor={`quantity-${item.id}`} className="block font-bold text-sm">Quantity (kg):</label>
                        <select
                          id={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseFloat(e.target.value))}
                          className="block w-full pl-3 pr-10 py-2 text-pred font-bold text-base border-gray-300 focus:outline-none focus:ring-pgreen focus:border-pgreen sm:text-sm rounded-md"
                        >
                          {[0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(q => (
                            <option key={q} value={q}>{q} kg</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      className="px-4 py-2 bg-red-500 text-white font-bold rounded-md mt-2"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Please log in to view your cart.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
