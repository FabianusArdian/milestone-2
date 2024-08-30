import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchCategories } from '../services/api';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: number; 
}

interface ProductDetailProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    fetchCategories()
      .then((categories) => {
        const category = categories.find((cat: any) => cat.id === product.category);
        if (category) {
          setCategoryName(category.name);
        }
      })
      .catch((error) => console.error(error));
  }, [product.category]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('You must be logged in to add items to the cart.');
      return;
    }
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cartItems.find((item: Product) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if already in cart
    } else {
      cartItems.push({ ...product, quantity: 1 }); // Add new item with quantity 1
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert('Item added to cart');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md w-full max-w-lg">
        <button onClick={onClose} className="text-red-500 float-right">Close</button>
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-auto max-h-64 object-contain mb-4"
        />
        <h1 className="text-2xl font-bold text-blue-500">{product.title}</h1>
        <p className="text-gray-500 text-sm mb-4">{categoryName}</p> {/* Display category name */}
        <p className="text-gray-700">{product.description}</p>
        <p className="text-green-500 mt-4 text-xl">${product.price}</p>
        <button onClick={handleAddToCart} className="bg-green-500 text-white mt-4 p-2 rounded">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
