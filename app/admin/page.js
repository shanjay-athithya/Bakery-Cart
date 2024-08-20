"use client";

import { useState, useEffect } from 'react';
import { db } from '../firebase'; // Ensure you have Firestore exported from firebase.js
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: 'Sweets',
    description: '',
    image: '',
    price: '',
    unit: ''
  });
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
      setFilteredProducts(productList);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedType === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.type === selectedType));
    }
  }, [selectedType, products]);

  const handleAddProduct = async () => {
    try {
      await addDoc(collection(db, 'products'), newProduct);
      setNewProduct({ name: '', type: 'Savouries', description: '', image: '', price: '', unit: '' });
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
      showNotification('Product added successfully!', 'success');
    } catch (error) {
      console.error('Error adding product:', error);
      showNotification('Error adding product!', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
      showNotification('Product deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      showNotification('Error deleting product!', 'error');
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const productRef = doc(db, 'products', editProductId);
      await updateDoc(productRef, editProductData);
      setEditProductId(null);
      setEditProductData({});
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
      showNotification('Product updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating product:', error);
      showNotification('Error updating product!', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  return (
    <div className="relative min-h-screen bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/images/pattern.jpg')" }}>
      <div className="p-8 bg-white bg-opacity-80">
        <h1 className="text-4xl font-bold mb-6 text-center text-pgreen">Welcome Admin</h1>

        {notification.message && (
          <div
            className={`fixed top-22 right-4 px-4 py-2 rounded-lg shadow-lg text-white ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {notification.message}
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-3xl font-semibold mb-4 text-pgreen">Add New Product</h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="block w-full mb-2 p-2 border rounded"
            />
            <select
              value={newProduct.type}
              onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
              className="block w-full mb-2 p-2 border rounded"
            >
              <option value="Savouries">Savouries</option>
              <option value="Drinks">Drinks</option>
              <option value="Cakes">Cakes</option>
              <option value="Sweets">Sweets</option>
            </select>
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Unit"
              value={newProduct.unit}
              onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
              className="block w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleAddProduct}
              className="bg-pgreen text-white px-4 py-2 rounded-lg font-bold hover:bg-pgreen-dark"
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-semibold mb-4 text-pgreen">Filter Products by Type</h2>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="block w-full p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Savouries">Savouries</option>
            <option value="Drinks">Drinks</option>
            <option value="Cakes">Cakes</option>
            <option value="Sweets">Sweets</option>
          </select>
        </div>

        <h2 className="text-3xl font-semibold mb-4 text-pgreen">Products List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-pgreen  text-byellow font-bold shadow-lg rounded-lg p-4">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
              <h3 className="text-2xl font-semibold text-white mb-2">{product.name}</h3>
              <p>Type: {product.type}</p>
              <p>Description: {product.description}</p>
              <p>Price: Rs. {product.price}</p>
              <p>Unit: {product.unit}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="px-4 py-2 bg-red-500 text-white font-bold rounded-md"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditProductId(product.id);
                    setEditProductData({
                      name: product.name,
                      type: product.type,
                      description: product.description,
                      image: product.image,
                      price: product.price,
                      unit: product.unit
                    });
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-md"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {editProductId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4 text-pgreen">Edit Product</h2>
              <input
                type="text"
                placeholder="Name"
                value={editProductData.name}
                onChange={(e) => setEditProductData({ ...editProductData, name: e.target.value })}
                className="block w-full mb-2 p-2 border rounded"
              />
              <select
                value={editProductData.type}
                onChange={(e) => setEditProductData({ ...editProductData, type: e.target.value })}
                className="block w-full mb-2 p-2 border rounded"
              >
                <option value="Savouries">Savouries</option>
                <option value="Drinks">Drinks</option>
                <option value="Cakes">Cakes</option>
                <option value="Sweets">Sweets</option>
              </select>
              <input
                type="text"
                placeholder="Description"
                value={editProductData.description}
                onChange={(e) => setEditProductData({ ...editProductData, description: e.target.value })}
                className="block w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={editProductData.image}
                onChange={(e) => setEditProductData({ ...editProductData, image: e.target.value })}
                className="block w-full mb-2 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={editProductData.price}
                onChange={(e) => setEditProductData({ ...editProductData, price: e.target.value })}
                className="block w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Unit"
                value={editProductData.unit}
                onChange={(e) => setEditProductData({ ...editProductData, unit: e.target.value })}
                className="block w-full mb-4 p-2 border rounded"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleUpdateProduct}
                  className="px-4 py-2 bg-green-500 text-white font-bold rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditProductId(null)}
                  className="px-4 py-2 bg-gray-500 text-white font-bold rounded-md ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
