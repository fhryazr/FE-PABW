import React, { useEffect, useState } from 'react';
import Order from './Order';
import Cookies from 'js-cookie';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token')

    fetch('http://localhost:3000/order/kurir', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setOrders(data.orders);
      setLoading(false);
    })
    .catch(error => {
      console.error('There was an error fetching the orders!', error);
      setError(error);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  return (
    <div className="flex flex-col space-y-4 px-2">
      {orders.map(order => (
        <div key={order.id_order}>
          {order.orderDetails.map(detail => (
            <Order
              key={detail.id_detailPesanan}
              orderDate={detail.orderDate}
              jumlahBarang={detail.jumlahBarang}
              total_harga={detail.total_harga}
              status={detail.status}
              product={detail.product}
              id_detailPesanan={detail.id_detailPesanan}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default OrderList;
