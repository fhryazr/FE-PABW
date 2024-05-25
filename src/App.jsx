import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import MyProfile from "./pages/MyProfile.jsx";
import EditProduct from "./components/myproduct/EditMyProduct.jsx";
import OrderDetail from "./components/order/OrderDetail.jsx";
import AddProduct from "./components/myproduct/AddMyProduct.jsx";
import PesananMasuk from "./pages/PesananMasuk.jsx";
// import { ProductProvider } from './context/ProductContext';
// import MyProductList from './components/myproduct/MyProductList';
import Kurir from "./pages/Kurir.jsx";
import ProfilPage from "./components/kurir/ProfilPage";
import ListPesananPage from "./components/kurir/ListPesananPage";
import Store from "./pages/StorePage.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Verify from "./pages/Verify.jsx";
import { ToastContainer, toast } from "react-toastify";
import { getMe } from "./api/auth/index.js";


function App() {
  // const [auth, setAuth] = useState(null);
  const { auth, setAuth, isVerified, setIsVerified } = useContext(AuthContext);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isUserKurir, setIsUserKurir] = useState(false);
  const token = Cookies.get("token");
  console.log(isVerified);

  useEffect(() => {
    const authorization = async () => {
      if (token) {
        try {
          const token = Cookies.get("token");
          const status = await getMe(token);
          setIsVerified(status.isVerified);

          const res = await getDecodedToken(token);
          console.log(res);
          setAuth({
            userId: res.userId,
            fullname: res.fullname,
            role: res.role,
          });
          if (res.role === "ADMIN") {
            setIsUserAdmin(true);
          } else if (res.role === "KURIR") {
            // Menambahkan kondisi untuk menandai apakah pengguna adalah kurir
            setIsUserKurir(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    authorization();
  }, [setAuth, token, setIsVerified]);

  // Pengecekan apakah auth sudah terisi sebelum mengakses propertinya
  // console.log(auth);

  return (
    <>
      <Router>
        <main className="w-full h-screen">
          {/* <AuthContext.Provider value={{ auth, setAuth }}> */}
          <Routes>
            {isUserKurir && (
              <Route path="/" element={<Navigate to="/kurir" />} />
            )}
            <Route
              path="/"
              element={
                !isUserAdmin ? (
                  <Home auth={auth} token={token} isVerified={isVerified} />
                ) : (
                  <Navigate to={"/dashboard"} />
                )
              }
            />
            <Route path="/profile" element={<MyProfile />} />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate replace to="/" />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/product/:id_product"
              element={<DetailProductPage />}
            />
            <Route
              path="/dashboard/*"
              element={isUserAdmin ? <Dashboard /> : <Home replace />}
            />
            <Route path="/pembayaran" element={<Pembayaran />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/my-orders" element={<TransaksiPage />} />
            <Route path="/incoming-order" element={<PesananMasuk />} />

            <Route path="*" element={<NotFound />} />
            <Route path="/store" element={<Store />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/order-detail" element={<OrderDetail />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/kurir" element={<Kurir />} />
            <Route path="/kurir/profil" element={<ProfilPage />} />
            <Route path="/kurir/list-pesanan" element={<ListPesananPage />} />
            <Route path="/auth/verify-email" element={<Verify />} />
          </Routes>
          {/* </AuthContext.Provider> */}
        </main>
      </Router>
      {/* 
      <ProductProvider>
        <MyProductList />
    </ProductProvider> */}
    </>
  );
}

export default App;
