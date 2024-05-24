import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProductDetail from "../components/product/ProductDetail";

function DetailProductPage() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar auth={auth} />
      <div className="flex flex-grow py-5 items-center">
        <ProductDetail />
      </div>
      <Footer />
    </div>
  );
}

export default DetailProductPage;
