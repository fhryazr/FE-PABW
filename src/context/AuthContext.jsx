/* eslint-disable react/prop-types */
import Cookies from 'js-cookie';
import { createContext } from 'react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState(null);
  // const navigate = useNavigate()
  
  const login = async (email, password) => {
    // Implementasi login API
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        Cookies.set("token", result.token, { expires: 3 / 24 });
        
      } else {
        const errorResult = await response.json();
        setError(errorResult.msg);
        console.error("Error during login:", errorResult.msg);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const logout = () => {
    // Implementasi logout API
    Cookies.remove("token");
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, login, logout, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };