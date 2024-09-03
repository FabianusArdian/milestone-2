import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define a type for the AuthContext state
interface AuthContextType {
  isAuthenticated: boolean;
  loginUser: () => void;
  logout: () => void;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loginUser: () => {},
  logout: () => {},
});

// Define the AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const loginUser = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
