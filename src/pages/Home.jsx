import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ProductWrapper from "../components/product/ProdukWrapper";
import { AuthContext } from "../context/AuthContext";
import { getMe } from "../api/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

function Home({auth, token, isVerified}) {

  useEffect(() => {
    if (token && isVerified == false) {
      toast.error(
        "Email Anda belum terverifikasi. Harap verifikasi di bagian profil."
      );
      // setIsToastShown(true); // Setelah ditampilkan, tandai bahwa toast sudah ditampilkan
    }
  }, [token, isVerified]);

  return (
    <div>
      <Navbar auth={auth} />
      <Hero />
      <div className="container mx-auto">
        <ProductWrapper />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Home;
