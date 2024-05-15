import Order from './Order';

function OrderList() {
  const orders = [
    { id: 1, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000', address: 'Jl. Merdeka', phone: '089898989898', status: 'Menunggu' },
    { id: 2, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000', address: 'Jl. Merdeka', phone: '089898989898', status: 'Dikirim' },
    { id: 3, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000', address: 'Jl. Merdeka', phone: '089898989898', status: 'Diterima' },
    { id: 4, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000', address: 'Jl. Merdeka', phone: '089898989898', status: 'Menunggu' },
    { id: 5, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000', address: 'Jl. Merdeka', phone: '089898989898', status: 'Dikirim' },
  ];

  return (
    <div className="flex flex-col space-y-4 px-2">
      {orders.map((order) => (
        <Order
          key={order.id}
          name={order.name}
          description={order.description}
          price={order.price}
          address={order.address}
          phone={order.phone}
          status={order.status}
        />
      ))}
    </div>
  );
}

export default OrderList;