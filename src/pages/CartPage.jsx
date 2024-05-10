import { useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import { HiArrowSmLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar auth={auth} />
      <div className="mx-auto py-10 w-[60vw] flex flex-col flex-grow">
        <div className="flex justify-around">
          <div className="w-[60%]">
            <h1 className="text-xl font-semibold mb-4">Your Cart</h1>
            <CartList />
          </div>
          <div className="w-[35%]">
            <h1 className="text-xl font-semibold mb-4">Summary</h1>
            <CartSummary />
          </div>
        </div>
        <div className="w-fit items-center gap-2 mt-10">
      <button onClick={handleGoBack} className="flex">
        <span>
          <HiArrowSmLeft className="text-[1.5rem]" />
        </span>
        back to shopping
      </button>
    </div>
      </div>
      <Footer />
    </div>
  );
}

export default CartPage;
