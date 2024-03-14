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

      const result = await response.json();
  
      if (response.ok) {
        Cookies.set("token", result.token, { expires: 3 / 24 });
        setAuth(result)
      } else {
        setError(result.msg);
        console.error("Error during login:", result.msg);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  console.log(auth)
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