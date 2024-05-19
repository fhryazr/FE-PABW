import React from 'react';
import { useParams } from 'react-router-dom';
import { orders } from './OrderList'; // Adjust the path as necessary

function OrderDetails() {
  const [order, setProduct] = useState({
    id: 1, // Ganti dengan ID produk yang sebenarnya
    name: 'Shoes',
    description: 'If a dog chews shoes whose shoes does he choose?',
    price: 'Rp. 100.000',
    imageSrc: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  });

  const handleChange = (event) => {
    setProduct({ ...order, [event.target.name]: event.target.value });
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">{order.name}</h1>
      <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt={order.name} className="mb-4" style={{ width: 200, height: 150 }} />
      <p className="text-gray-700">{order.description}</p>
      <p className="text-lg font-semibold mt-2">{order.price}</p>
    </div>
  );
}

export default OrderDetails;
