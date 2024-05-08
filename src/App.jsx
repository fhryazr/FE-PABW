import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import getDecodedToken from "./api/auth/getDecodedToken.js";
import Dashboard from "./pages/Dashboard.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import Store from "./pages/StorePage.jsx";
import EditProduct from "./components/myproduct/EditMyProduct.jsx";


function App() {
  // const [auth, setAuth] = useState(null);
  const { auth, setAuth } = useContext(AuthContext);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    const authorization = async () => {
      if (token) {
        try {
          const res = await getDecodedToken(token);
          setAuth({
            userId: res.userId,
            fullname: res.fullname,
            role: res.role,
          });
          if (res.role === "ADMIN") {
            setIsUserAdmin(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    authorization();
  }, [setAuth, token]);

  // Pengecekan apakah auth sudah terisi sebelum mengakses propertinya
  // console.log(auth);

  return (
    <>
      <Router>
        <main className="w-screen h-screen">
          {/* <AuthContext.Provider value={{ auth, setAuth }}> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={ !auth ? <Login /> : <Navigate replace to='/'/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={ isUserAdmin ? <Dashboard /> : <Home replace/>} />
              <Route path="/store" element={<Store />} />
              <Route path="/edit-product" element={<EditProduct/>} />
            </Routes>
          {/* </AuthContext.Provider> */}
        </main>
      </Router>
    </>
  );
}

export default App;
