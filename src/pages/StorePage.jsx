import { useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import OrderWrapper from "../components/order/OrderWrapper";
// import MyProductWrapper from "../components/myproduct/myProdukWrapper";
import ProductWrapper from "../components/product/ProdukWrapper";
// import MyProductWrapper from "../components/myproduct/myProdukWrapper";

function Store() {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <Navbar auth={auth} />
      <div className="container mx-auto">
        <ProductWrapper />
        <OrderWrapper/>
      </div>
      <Footer />
    </div>
  );
}

export default Store;