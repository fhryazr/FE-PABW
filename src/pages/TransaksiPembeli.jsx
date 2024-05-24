import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MyOrders from "../components/myOrder/MyOrderPembeli";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function TransaksiPage() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Navbar auth={auth}/>
      <div className="flex-grow flex flex-col w-[70%] pt-5">
        <h1 className="text-2xl font-bold mb-4 text-center">My Order</h1>
        <MyOrders />
      </div>
      <Footer />
    </div>
  );
}

export default TransaksiPage;
