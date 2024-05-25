import { useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import OrderWrapper from "../components/order/OrderWrapper";
import MyProductWrapper from "../components/myproduct/MyProductWrapper";

function Store() {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <Navbar auth={auth} />
      <div className="container mx-auto">
        < MyProductWrapper/>
        {/* <OrderWrapper/> */}
      </div>
      <Footer />
    </div>
  );
}

export default Store;