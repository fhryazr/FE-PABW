import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { getMe, getUsers } from "../api/auth";
import Cookies from "js-cookie";
import ListProdukPembayaran from "../components/pembayaran/ListProdukPembayaran";
import useCartStore from "../store/cartStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Pembayaran() {
  const { auth } = useContext(AuthContext);
  const token = Cookies.get("token");
  const selectedProduct = JSON.parse(Cookies.get("cart"));

  const [dataUser, setDataUser] = useState();
  const [couriers, setCouriers] = useState([]);
  const { selectedItems } = useCartStore();
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const fetchData = await getMe(token);
      setDataUser(fetchData);
    };
    getData();

    // Panggil API untuk mendapatkan daftar kurir
    const fetchCouriers = async () => {
      try {
        const response = await getUsers(token);
        // Filter pengguna berdasarkan peran 'KURIR'
        const courierUsers = response.filter((user) => user.role === 'KURIR');
        // console.log(courierUsers)
        // Buat array baru yang berisi nama dan ID pengguna kurir
        const couriers = courierUsers.map((user) => ({
          id: user.id_user,
          name: user.fullname,
        }));
        setCouriers(couriers);
      } catch (error) {
        console.error("Failed to fetch couriers: ", error);
      }
    };
    fetchCouriers();
  }, [token]);

  console.log(selectedItems);

  function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }

  const createNewOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/order",
        {
          selectedItems: selectedItems.map((item) => item.id),
          kurirId: document.getElementById("courier").value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      navigate('/my-orders')
    } catch (error) {
      alert("Failed to create order: ", error);
      console.log(response.data.message)
    }
  };

  return (
    <div>
      <Navbar auth={auth} />
      <div className="flex justify-between">
        <div className="w-1/2 ml-4">
          <div className="bg-gray-100 rounded-lg p-4 mt-7 shadow-md">
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="text-gray-500 dark:text-gray-400 mr-2"
              >
                Nomor Telepon
              </label>
              <input
                type="text"
                id="phone"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={dataUser?.nomorTelepon}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="address"
                className="text-gray-500 dark:text-gray-400 mr-2"
              >
                Alamat
              </label>
              <textarea
                id="address"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={dataUser?.alamat}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="courier"
                className="text-gray-500 dark:text-gray-400 mr-2"
              >
                Kurir
              </label>
              <select
                id="courier"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {couriers.map((courier) => (
                  <option key={courier.id} value={courier.id}>
                    {courier.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <span className="text-gray-500 dark:text-gray-400 mr-2">
                Metode Pembayaran
              </span>
              <div>
                <input
                  type="radio"
                  id="saldoElektronik"
                  name="paymentMethod"
                  value="saldoElektronik"
                  className="mr-2"
                  checked
                  readOnly
                />
                <label htmlFor="saldoElektronik">
                  Saldo Elektronik ({formatPrice(dataUser?.saldoElektronik)})
                </label>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                Back
              </button>
              <button
                onClick={createNewOrder}
                className="bg-green-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
        <ListProdukPembayaran products={selectedProduct} />
      </div>
    </div>
  );
}

export default Pembayaran;
