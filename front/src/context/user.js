import { createContext, useState, useEffect } from "react";
import { getDataByToken } from "../services/authServices";
export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');

    console.log("Loaded token from localStorage:", savedToken); 
    if (savedToken) {
      setToken(savedToken);
      console.log("Token set in state:", savedToken); 
      // Aquí también puedes cargar más datos del usuario si es necesario
    }else{
      setLogged(false)
    }
  }, []);


  useEffect(() =>{
    (async()=>{
      if (token==null) {
        
        return 

      }

      const userStorage = localStorage.getItem('userData')
      if(userStorage){
        try {  
          setUserData(JSON.parse(userStorage))
          setLogged(true)
        } catch (error) {
          
        }
      }
      const response = await getDataByToken(token)

      if(response){
        setUserData(response)
        if(logged !== true){
          setLogged(true)
        }
        localStorage.setItem('userData', JSON.stringify(response))
        
      }
      else{
        setLogged(false)
        setUserData(null)
      }
    })()


  }, [token])

  const login = (newToken, userData) => {
    console.log("Login called"); 
    setToken(newToken);
    setUserData(userData);
    
    localStorage.setItem('token', newToken);
    localStorage.setItem('userData', JSON.stringify(userData));
    // Guarda también otros datos del usuario si es necesario
    console.log("Token set in localStorage:", newToken); // Log para depuración
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    console.log("Token removed from localStorage"); // Log para depuración
    // Elimina también otros datos del usuario si es necesario
  };

  return (
    <userContext.Provider value={{ token, setToken, userData, login, logout, logged }}>
      {children}
    </userContext.Provider>
  );
};
