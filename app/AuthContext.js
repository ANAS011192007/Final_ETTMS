import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already authenticated (e.g., by checking a token in localStorage)
    const token = localStorage.getItem('authToken');

    if (token) {
      // Perform any necessary validation or decoding of the token
      // For simplicity, assuming the token contains user information
      const userData = JSON.parse(atob(token.split('.')[1]));
      console.log(userData)
      setUser(userData);
    }
  }, []);

  const login = (userData) => {
    // Save the user data in localStorage or any other storage mechanism
    console.log(userData)
    localStorage.setItem('authToken', btoa(JSON.stringify(userData)));
    setUser(userData);
  };

  const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}