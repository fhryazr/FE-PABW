import { Fragment, useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { getUsers } from "../../api/auth";
import EditOrderStatusModal from "./EditOrderStatusModal";


function IncomingOrders() {
    const [orders, setOrders] = useState([]);
    const [couriers, setCouriers] = useState([]);
    const [buyers, setBuyers] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
    const [currentStatus, setCurrentStatus] = useState();

    const token = Cookies.get("token");

    const fetchOrders = useCallback(async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/order/me",
                {
                    headers: { Authorization: "Bearer " + token },
                }
            );
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
                const courierUsers = response.filter((user) => user.role === "KURIR");
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

    useEffect(() => {
        const fetchBuyers = async () => {
            try {
                const response = await getUsers(token);
                const buyersData = response.reduce((acc, curr) => {
                    acc[curr.id_user] = {
                        name: curr.fullname,
                        address: curr.alamat,
                        phoneNumber: curr.nomorTelepon
                    };
                    return acc;
                }, {});
                setBuyers(buyersData);
            } catch (error) {
                console.error("Failed to fetch buyers: ", error);
            }
        };
        fetchBuyers();
    }, [token]);

    const handleEdit = (detail, status) => {
        setSelectedOrderDetail(detail);
        setShowEditModal(true);
        setCurrentStatus(status);
    };
    // console.log(selectedOrderDetail);

    const handleSaveStatus = async (newStatus) => {
        // console.log(newStatus);
        try {
            const response = await axios.patch(
                "http://localhost:3000/order/edit",
                {
                    orderDetailId: selectedOrderDetail,
                    newStatus: newStatus,
                },
                {
                    headers: { Authorization: "Bearer " + token },
                }
            );
            console.log("Order detail status updated successfully", response);
            await fetchOrders();
            setShowEditModal(false);
        } catch (error) {
            console.error("Failed to update order detail status: ", error);
        }
    };

    const handleCancelEdit = () => {
        setShowEditModal(false);
    };

    const handleAction = async (detail, newStatus) => {
        try {
            const response = await axios.patch(
                "http://localhost:3000/order/edit",
                {
                    orderDetailId: detail.id_detailPesanan,
                    newStatus: newStatus,
                },
                {
                    headers: { Authorization: "Bearer " + token },
                },
            );
            console.log("Order detail status updated successfully", response);
            await fetchOrders()
        } catch (error) {
            console.error("Failed to update order detail status: ", error);
        }
    };

    const isActionDisabled = (orderDetails) => {
        return orderDetails.status == "transaksi gagal" || orderDetails.status == "diterima pembeli";
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Order Date</th>
                        <th>Order ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Courier Name</th>
                        <th>Buyer Name</th>
                        <th>Buyer Address</th>
                        <th>Buyer Phone Number</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <Fragment>
                        {orders.map((order) => (
                            <Fragment key={order.id_order}>
                                {order.orderDetails.map((detail, index) => (
                                    <tr key={`${index}`}>
                                        <td>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </td>
                                        <td>{new Date(detail.orderDate).toLocaleString()}</td>
                                        <td>{detail.id_order}</td>
                                        {console.log(detail)}

                                        <td>
                                            <div className="flex items-center">
                                                <img
                                                    src={detail.product.imagesProduct[0]}
                                                    alt={detail.product.namaProduk}
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
                                        <td>{buyers[order.id_user]?.name}</td>
                                        <td>{buyers[order.id_user]?.address}</td>
                                        <td>{buyers[order.id_user]?.phoneNumber}</td>
                                        <td>{detail.status}</td>
                                            {showEditModal && (
                                                <EditOrderStatusModal
                                                    currentStatus={currentStatus}
                                                    onSave={handleSaveStatus}
                                                    onCancel={handleCancelEdit}
                                                />
                                            )}
                                        <td>
                                            <button
                                                className="btn btn-xs btn-primary mr-2"
                                                onClick={() => handleEdit(detail.id_detailPesanan, detail.status)}
                                                disabled={isActionDisabled(detail)}
                                            >
                                                Edit
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

export default IncomingOrders;
