import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import {
  BsPencilSquare,
  BsTruck,
  BsCheckCircle,
  BsArrowReturnLeft,
  BsSave,
} from "react-icons/bs";

function OrderListKurir() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState({});
  const [buyers, setBuyers] = useState({});
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/order/kurir", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const sortedOrders = data.orders.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
        setOrders(sortedOrders);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  useEffect(() => {
    const fetchBuyersData = async () => {
      const userIds = orders.map((order) => order.id_user);

      try {
        const responses = await Promise.all(
          userIds.map((userId) =>
            fetch(`http://localhost:3000/admin/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        const buyersData = await Promise.all(
          responses.map((response) => response.json())
        );

        const buyersMap = buyersData.map((buyer) => buyer.data);

        // const buyersMap = buyersData.reduce((acc, buyer, index) => {
        //     acc[userIds[index]] = buyer.user;
        //     return acc;
        // }, {});
        // console.log(buyersMap)
        setBuyers(buyersMap);
      } catch (error) {
        console.error("There was an error fetching the buyers!", error);
      }
    };

    fetchBuyersData();
  }, [orders, token]);

  const [status, setStatus] = useState()
  const handleStatusChange = (orderId, newStatus) => {
    setStatus({ orderId : orderId, newStatus: newStatus});
  };

  console.log(status)

  const handleSave = () => {
    // const orderToUpdate = orders.find((order) => order.id_order === orderId);
    fetch("http://localhost:3000/order/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderDetailId: status.orderId,
        newStatus: status.newStatus.toLowerCase(),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setIsEditing({ ...isEditing, [status.orderId]: false });
        console.log("Status updated successfully");
      })
      .catch((error) => {
        console.error("There was an error updating the status!", error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  return (
    <div className="overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order Date
            </th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jumlah Barang
            </th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Harga
            </th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product Details
            </th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Buyer Details
            </th>{" "}
            {/* Tambah kolom untuk menampilkan informasi pembeli */}
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {orders.map((order, index) =>
            order.orderDetails.map((orderDetail, rowIndex) => (
              <tr
                key={orderDetail.id_detailPesanan}
                className={`${index % 2 !== 0 ? "bg-gray-200" : "bg-white"} `}
              >
                <td className="whitespace-nowrap py-[2rem] px-3">
                  {formatDate(orderDetail.orderDate)}
                  {/* {index} */}
                </td>
                <td className="whitespace-nowrap px-3">
                  {orderDetail.jumlahBarang}
                </td>
                <td className="whitespace-nowrap px-3">
                  {orderDetail.total_harga}
                </td>
                <td className="whitespace-nowrap px-3">{orderDetail.status}</td>
                <td className="whitespace-nowrap px-3">
                  <div className="">
                    <h4 className="font-bold">Product Details:</h4>
                    <p>Nama Produk: {orderDetail.product.namaProduk}</p>
                    <p>Harga Produk: {orderDetail.product.hargaProduk}</p>
                  </div>
                </td>
                <td className="px-3">
                  {buyers[index] && (
                    <div>
                      <p>Nama: {buyers[index].fullname}</p>
                      <p>Alamat: {buyers[index].alamat}</p>
                      <p>Nomor Telepon: {buyers[index].nomorTelepon}</p>
                    </div>
                  )}
                </td>
                <td className="text-sm text-gray-500 px-3">
                  {isEditing[orderDetail.id_detailPesanan] ? (
                    <>
                      <button
                        className={`btn btn-outline text-xs md:text-sm ${
                          orderDetail.status === "Sedang Dikirim"
                            ? "bg-green-400 text-white"
                            : ""
                        }`}
                        onClick={() =>
                          handleStatusChange(
                            orderDetail.id_detailPesanan,
                            "Sedang Dikirim"
                          )
                        }
                      >
                        <BsTruck /> Sedang Dikirim
                      </button>
                      <button
                        className={`btn btn-outline text-xs md:text-sm ${
                          orderDetail.status === "Sampai Di Tujuan"
                            ? "bg-blue-400 text-white"
                            : ""
                        }`}
                        onClick={() =>
                          handleStatusChange(
                            orderDetail.id_detailPesanan,
                            "Sampai di Tujuan"
                          )
                        }
                      >
                        <BsCheckCircle /> Sampai di Tujuan
                      </button>
                      <button
                        className={`btn btn-outline text-xs md:text-sm ${
                          orderDetail.status === "Dikirim Balik"
                            ? "bg-red-400 text-white"
                            : ""
                        }`}
                        onClick={() =>
                          handleStatusChange(
                            orderDetail.id_detailPesanan,
                            "Dikirim Balik"
                          )
                        }
                      >
                        <BsArrowReturnLeft /> Dikirim Balik
                      </button>
                      <button
                        className="btn btn-outline text-xs md:text-sm"
                        onClick={() => handleSave(orderDetail.id_detailPesanan)}
                      >
                        <BsSave /> Simpan
                      </button>
                    </>
                  ) : (
                    <button
                      className="h-10 w-10 flex items-center justify-center rounded-md text-xs bg-green-400 text-white hover:text-black"
                      onClick={() =>
                        setIsEditing({
                          ...isEditing,
                          [orderDetail.id_detailPesanan]: true,
                        })
                      }
                    >   
                    {/* <p>Edit Status</p> */}
                      <BsPencilSquare />
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

OrderListKurir.propTypes = {
  orderDate: PropTypes.string.isRequired,
  jumlahBarang: PropTypes.number.isRequired,
  total_harga: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  product: PropTypes.shape({
    namaProduk: PropTypes.string.isRequired,
    hargaProduk: PropTypes.number.isRequired,
    stokProduk: PropTypes.number.isRequired,
    statusProduk: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  id_detailPesanan: PropTypes.number.isRequired,
};

export default OrderListKurir;
