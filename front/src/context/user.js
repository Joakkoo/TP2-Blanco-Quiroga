import { createContext, useState, useEffect } from "react";

export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    console.log("Loaded token from localStorage:", savedToken); 
    if (savedToken) {
      setToken(savedToken);
      console.log("Token set in state:", savedToken); 
      // Aquí también puedes cargar más datos del usuario si es necesario
    }
  }, []);

  const login = (newToken, userData) => {
    console.log("Login called"); 
    setToken(newToken);
    setUserData(userData);
    localStorage.setItem('token', newToken);
    // Guarda también otros datos del usuario si es necesario
    console.log("Token set in localStorage:", newToken); // Log para depuración
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('token');
    console.log("Token removed from localStorage"); // Log para depuración
    // Elimina también otros datos del usuario si es necesario
  };

  return (
    <userContext.Provider value={{ token, setToken, userData, login, logout }}>
      {children}
    </userContext.Provider>
  );
};
