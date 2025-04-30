import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize auth state from localStorage or fallback to null
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;  // Fallback to null if not present
  });

  // Login function to update state and localStorage
  const login = (userData) => {
    setAuth(userData);  // Update the auth state
    localStorage.setItem("auth", JSON.stringify(userData));  // Store auth data in localStorage
  };

  // Logout function to clear state and localStorage
  const logout = () => {
    setAuth(null);  // Clear the auth state
    localStorage.removeItem("auth");  // Remove the stored auth data
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}  {/* This will provide the auth state to the entire app */}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context values in any component
export const useAuth = () => useContext(AuthContext);
