import { Fragment, useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { getUsers } from "../../api/auth";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const token = Cookies.get("token");

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/order", {
        headers: { Authorization: "Bearer " + token },
      });
      // Sorting orders based on the orderDate in descending order
      const sortedOrders = response.data.orders.sort((a, b) => {
        return new Date(b.orderDate) - new Date(a.orderDate);
      });
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Failed to fetch orders: ", error);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
    const fetchCouriers = async () => {
      try {
        const response = await getUsers(token);
        // Filter users based on role 'KURIR'
        const courierUsers = response.filter((user) => user.role === "KURIR");
        // Create a new array containing courier user names and IDs
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
  }, [token, fetchOrders]);

  const handleAction = async (detail, newStatus) => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/order/edit",
        {
          orderDetailId: detail.id_detailPesanan, // assuming this is the order detail ID
          newStatus: newStatus,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      // Handle success
      console.log("Order detail status updated successfully", response);
      await fetchOrders();
    } catch (error) {
      console.error("Failed to update order detail status: ", error);
    }
  };

  const isActionDisabled = (orderDetails) => {
    // Check if the detail has a status other than "sampai di tujuan"
    return orderDetails.status !== "sampai di tujuan";
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center w-full mb-2 shadow-md p-2">
        <div>Orders</div>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Order ID</th>
            <th>Buyer ID</th> {/* Added Buyer ID column */}
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Courier Name</th>
            <th>Seller Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          <Fragment>
            {orders.map((order) => (
              <Fragment key={order.id_order}>
                {order?.orderDetails.map((detail, index) => (
                  <tr key={`${index}`}>
                    <td>{new Date(detail.orderDate).toLocaleString()}</td>
                    <td>{detail.id_order}</td>
                    <td>{order.id_user}</td> {/* Display Buyer ID */}
                    <td>
                      <div className="flex items-center">
                        <img
                          src={JSON.parse(detail?.product?.imagesProduct) }
                          alt={detail?.product?.namaProduk}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <span className="ml-2">
                          {detail.product.namaProduk}
                        </span>
                      </div>
                    </td>
                    <td>{detail.jumlahBarang}</td>
                    <td>
                      {couriers.find((courier) => courier.id === order.id_kurir)
                        ?.name || "Unknown"}
                    </td>
                    <td>{detail.product.user?.fullname}</td>
                    <td>{detail.status}</td>
                    <td>
                      <button
                        className="btn btn-xs btn-primary mr-2"
                        onClick={() => {
                          handleAction(detail, "diterima pembeli");
                        }}
                        disabled={isActionDisabled(detail)}
                      >
                        Barang Diterima
                      </button>
                      <button
                        className="btn btn-xs btn-danger"
                        onClick={() => {
                          handleAction(detail, "dikomplain");
                        }}
                        disabled={isActionDisabled(detail)}
                      >
                        Komplain
                      </button>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </Fragment>
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
