import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory, fetchCategories } from '../services/api';
import ProductDetail from '../components/ProductDetail';
import { useAuth } from '../context/AuthContext';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  images: string[];
  category: number;
}

interface Category {
  id: number;
  name: string;
}

const ProductCategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<{ [key: number]: string }>({});
  const { isAuthenticated } = useAuth(); // Use isAuthenticated from AuthContext

  useEffect(() => {
    if (id) {
      fetchProductsByCategory(id)
        .then((products) => {
          setProducts(products);
          return fetchCategories();
        })
        .then((categories: Category[]) => {
          const categoryMap: { [key: number]: string } = {};
          categories.forEach((category: Category) => {
            categoryMap[category.id] = category.name; 
          });
          setCategories(categoryMap);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white border p-4 rounded dark:bg-gray-700 dark:border-gray-600">
          <div className="overflow-hidden">
            <img
              src={product.image || product.images[0]}
              alt={product.title}
              className="w-full h-56 object-cover mb-4 transform hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 className="text-blue-500 text-lg font-bold">{product.title}</h3>
          <p className="text-gray-500 text-sm">{categories[product.category]}</p> {/* Display the category name */}
          <p className="text-green-500">${product.price}</p>
          <button
            onClick={() => handleProductClick(product)}
            className="bg-blue-500 text-white mt-2 p-2 rounded flex items-center justify-center"
          >
            <span className="mr-2">View Details</span>
          </button>
        </div>
      ))}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductCategoryPage;
