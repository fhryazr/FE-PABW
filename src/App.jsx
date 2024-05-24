import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import getDecodedToken from "./api/auth/getDecodedToken.js";
import Dashboard from "./pages/Dashboard.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import CartPage from "./pages/CartPage.jsx";
import DetailProductPage from "./pages/DetailProductPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Pembayaran from "./pages/Pembayaran.jsx";
import TransaksiPage from "./pages/TransaksiPembeli.jsx";
import MyProfile from "./pages/MyProfile.jsx";// import Store from "./pages/StorePage.jsx";
import Kurir from "./pages/Kurir.jsx";
import ProfilPage from "./components/kurir/ProfilPage";
import ListPesananPage from "./components/kurir/ListPesananPage";

function App() {
  // const [auth, setAuth] = useState(null);
  const { auth, setAuth } = useContext(AuthContext);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const token = Cookies.get("token");
  // const navigate = useNavigate()

  useEffect(() => {
    const authorization = async () => {
      if (token) {
        try {
          const res = await getDecodedToken(token);
          console.log(res);
          setAuth({
            userId: res.userId,
            fullname: res.fullname,
            role: res.role,
          });
          if (res.role === "ADMIN") {
            setIsUserAdmin(true);
            // navigate('/dashboard')
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
        <main className="w-full h-screen">
          {/* <AuthContext.Provider value={{ auth, setAuth }}> */}
          <Routes>
            <Route path="/" element={!isUserAdmin ? <Home /> : <Navigate to={"/dashboard"}/>} />
            <Route path="/profile" element={<MyProfile />} />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate replace to="/" />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard/*"
              element={isUserAdmin ? <Dashboard /> : <Home replace />}
            />
            <Route path="/pembayaran" element={<Pembayaran />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/product/:id_product"
              element={<DetailProductPage />}
            />
            <Route
              path="/my-orders"
              element={<TransaksiPage />}
            />
            <Route
              path="/my-store"
              element={<TransaksiPage />}
            />
            <Route path="*" element={<NotFound />} />
              {/* <Route path="/store" element={<Store />} /> */}
              <Route path="/kurir" element={<Kurir/>} />
              <Route path="/kurir/profil" element={<ProfilPage />} />
              <Route path="/kurir/list-pesanan" element={<ListPesananPage />} />
          </Routes>
          {/* </AuthContext.Provider> */}
        </main>
      </Router>
    </>
  );
}

export default App;
