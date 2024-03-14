// import { Link } from "react-router-dom";
import { useContext } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ProductWrapper from "../components/product/ProdukWrapper";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const {auth} = useContext(AuthContext)
  
  return (
    <div>
      <Navbar auth={auth}/>
      <Hero />
      <ProductWrapper />
      <Footer />
    </div>
  );
}

export default Home;
