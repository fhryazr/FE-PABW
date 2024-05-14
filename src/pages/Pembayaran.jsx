import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Pembayaran() {
  const [amount, setAmount] = useState("");
  const [eWallet, setEwallet] = useState(""); // Change from description to eWallet
  const [phoneNumber, setPhoneNumber] = useState(""); // Added phoneNumber state
  const [shippingAddress, setShippingAddress] = useState(""); // Added shippingAddress state
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
    <div>
      <Navbar />
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li class="inline-flex items-center">
            <a
              href="#"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-black-400 dark:hover:text-grey"
            >
              <svg
                class="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                {" "}
              </svg>
              Cart
            </a>
          </li>
          <li>
            <div class="flex items-center">
              <svg
                class="rtl:rotate-180 w-3 h-3 text-black-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 8 3-3-3-3"
                />
              </svg>
              <a
                href="#"
                class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-black-400 dark:hover:text-grey"
              >
                Details
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                class="rtl:rotate-180 w-3 h-3 text-black-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 8 3-3-3-3"
                />
              </svg>
              <a
                href="#"
                class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-black-400 dark:hover:text-grey"
              >
                Shipping
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                class="rtl:rotate-180 w-3 h-3 text-black-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 8 3-3-3-3"
                />
              </svg>
              <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-black-400">
                Payment
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex justify-between">
        <div className="w-1/2 ml-4">
          <div className="bg-gray-100 rounded-lg p-4 mt-7 shadow-md">
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <span className="w-20 text-gray-500 dark:text-gray-400 mr-2">
                  Contact
                </span>
              </div>
              <select
                id="contact-select"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-28 py-2.5 pr-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="name@flowbite.com">name@flowbite.com</option>
                <option value="another_email@example.com">
                  another_email@example.com
                </option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <span className="w-20 text-gray-500 dark:text-gray-400 mr-2">
                  Ship to
                </span>
              </div>
              <select
                id="ship-to-select"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-28 py-2.5 pr-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="address1">Address 1</option>
                <option value="address2">Address 2</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <span className="w-20 text-gray-500 dark:text-gray-400 mr-2">
                  Method
                </span>
              </div>
              <select
                id="method-select"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-28 py-2.5 pr-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="method1">Method 1</option>
                <option value="method2">Method 2</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Payment Method */}
            <div className="relative mb-6">
              <label
                htmlFor="credit-card"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Credit Card
              </label>
              <input
                type="text"
                id="credit-card"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 py-2.5 pr-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Card Number"
              />
            </div>
            <div className="relative mb-6">
              <input
                type="text"
                id="holder-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 py-2.5 pr-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Holder Name"
              />
            </div>
            <div className="flex justify-between mb-6">
              <div className="relative w-1/2 mr-2">
                <input
                  type="text"
                  id="expiry-date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 py-2.5 pr-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="MM/YY"
                />
              </div>
              <div className="relative w-1/2 ml-2">
                <input
                  type="text"
                  id="cvv"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 py-2.5 pr-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="CVV"
                />
              </div>
            </div>
            {/* Tax Information */}
            <div className="relative mb-6">
              <label
                htmlFor="vat-number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Tax Information
              </label>
              <input
                type="text"
                id="vat-number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 py-2.5 pr-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="VAT Number (optional)"
              />
              <input
                type="text"
                id="pec"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mt-2 pl-3 py-2.5 pr-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="PEC (optional)"
              />
            </div>

            {/* Billing Address */}
            <div className="relative mb-6">
              <label
                htmlFor="billing-address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Billing Address
              </label>
              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-black-300"
                >
                  Same as the shipping address
                </label>
              </div>
              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-black-300"
                >
                  Use a different address for billing
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                Back to Shipping
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
                Pay Now
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 mt-7 ml-10">
          <div className="bg-gray-100 rounded-lg p-4 mr-4 shadow-md">
            <div className="flex items-center mb-4">
              <img
                src="rice-field-bali.jpg"
                alt="Product"
                className="w-16 h-16 mr-3 rounded-md"
              />
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-black">
                  Nama Produk
                </h2>
                <p className="text-sm text-gray-500 dark:text-black-400">
                  Harga Produk ($)
                </p>
              </div>
            </div>
            <hr className="my-4 border-t border-gray-300 dark:border-black-700" />
            <div className="flex justify-between items-center">
              <p>Subtotal</p>
              <p className="text-gray-900 dark:text-black">$9</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Shipping</p>
              <p className="text-gray-900 dark:text-black">$1</p>
            </div>
            <hr className="my-2 border-t border-gray-300 dark:border-gray-700" />
            <div className="flex justify-between items-center">
              <p>Total</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-black">
                $10
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pembayaran;
