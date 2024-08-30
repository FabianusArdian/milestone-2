import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Category {
  id: number;
  name: string;
}

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const { isAuthenticated, logout } = useAuth();


  useEffect(() => {
    fetchCategories()
    .then((categories) => setCategories(categories.slice(0, 5)))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cartItems.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0));
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-xl font-black">HaHa Store</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center" >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={toggleDarkMode} className="text-gray-800 dark:text-gray-300 mr-4">
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            {isAuthenticated ? (
              <button onClick={logout} className="text-gray-800 dark:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-800 dark:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
            )}
            <Link to="/cart" className="ml-4 text-gray-800 dark:text-gray-300 relative">
              🛒
              {cartCount > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMobileMenu} className="sm:hidden text-gray-800 dark:text-gray-300 ml-4">
              ☰
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
