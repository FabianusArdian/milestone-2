import axios from 'axios';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    const { access_token, refresh_token } = response.data;

    // Store the tokens in localStorage or any secure storage
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async ({ name, email, password, avatar }: { name: string; email: string; password: string; avatar: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      name,
      email,
      password,
      avatar,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.map((product: any) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0]?.replace(/^\[\"|\"\]$/g, '') || 'fallback_image_url',
      description: product.description,
      images: product.images.map((img: string) => img.replace(/^\[\"|\"\]$/g, '')),
      category: product.category?.id || 0,  // Ensure category ID is included and correctly mapped
    }));
  } catch (error) {
    throw error;
  }
};


export const fetchProductById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}/products`);
    return response.data.map((product: any) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0]?.replace(/^\[\"|\"\]$/g, '') || 'fallback_image_url',
      description: product.description,
      images: product.images.map((img: string) => img.replace(/^\[\"|\"\]$/g, '')),
      category: product.category?.id || 0,  // Ensure category ID is included and correctly mapped
    }));
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};