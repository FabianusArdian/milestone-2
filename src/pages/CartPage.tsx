import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAuth(); // Import and use isAuthenticated from AuthContext

  useEffect(() => {
    if (isAuthenticated) {  // Only fetch cart items if user is authenticated
      const storedCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(storedCartItems);
    }
  }, [isAuthenticated]);

  const handleRemoveItem = (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleIncreaseQuantity = (id: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleDecreaseQuantity = (id: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    alert('Items will be shipped shortly!');
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-grow bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <p className="text-red-500">You must be logged in to view your cart.</p>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td><img src={item.image} alt={item.title} className="w-16 h-16 object-cover" /></td>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => handleDecreaseQuantity(item.id)} className="px-2">-</button>
                  {item.quantity}
                  <button onClick={() => handleIncreaseQuantity(item.id)} className="px-2">+</button>
                </td>
                <td>
                  <button onClick={() => handleRemoveItem(item.id)} className="text-red-500">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cartItems.length > 0 && (
        <>
          <p className="text-xl font-bold mt-4">Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
          <button onClick={handleCheckout} className="bg-green-500 text-white p-2 rounded mt-4">Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
