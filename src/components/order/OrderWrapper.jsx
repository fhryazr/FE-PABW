import OrderList from './OrderList';

function OrderWrapper() {
  return (
    <div className="container flex flex-col items-center">
      <h1 className="text-2xl text-center font-bold mb-8" style={{ marginLeft: '16rem' }}>List Pesanan</h1>
      <OrderList />
    </div>
  );
}

export default OrderWrapper;
