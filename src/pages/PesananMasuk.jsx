import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import MyOrders from "../components/myOrder/MyOrderPembeli";
import IncomingOrders from "../components/order/IncomingOrder";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function PesananMasuk() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Navbar auth={auth}/>
      <div className="flex-grow flex flex-col w-[90%] pt-5">
        <h1 className="text-2xl font-bold mb-4 text-center">Incoming Order</h1>
        <IncomingOrders />
      </div>
      <Footer />
    </div>
  );
}

export default PesananMasuk;
