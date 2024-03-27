import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Pembayaran() {
  const [amount, setAmount] = useState("");
  const [eWallet, setEwallet] = useState(""); // Change from description to eWallet
  const { isAuthenticated } = useContext(AuthContext); // Assuming this context provides an isAuthenticated flag
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      console.error("User must be logged in to proceed with the payment.");
      navigate("/login");
      return;
    }

    // Payment processing logic would go here
    try {
      console.log("Processing payment:", amount, eWallet);
      // Redirect to success page or display success message
      navigate("/payment-success");
    } catch (error) {
      console.error("Error during payment:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[50vw] lg:w-[20vw] gap-4 shadow-lg p-4">
        <h1 className="text-lg font-bold">Pembayaran</h1>
        <form className="flex flex-col gap-4" onSubmit={handlePayment}>
          <input
            required
            className="border rounded p-2"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            required
            className="border rounded p-2"
            value={eWallet}
            onChange={(e) => setEwallet(e.target.value)}
          >
            <option value="">Select Electronic Money Service</option>
            <option value="Dompet">Dompet</option>
            <option value="GoPay">GoPay</option>
            <option value="OVO">OVO</option>
            <option value="DANA">DANA</option>
            <option value="LinkAja">LinkAja</option>
            {/* Add more electronic money services here */}
          </select>
          <button
            type="submit"
            className="h-[43px] w-full bg-green-400 rounded-[5px] text-white font-medium"
          >
            Proceed to Pay
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pembayaran;
