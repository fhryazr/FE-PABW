import OrderList from './OrderList';// Pastikan path sesuai dengan struktur proyek Anda

function OrderWrapper() {
  return (
    <div className="container list flex-row items-center my-8">
      <h1 className="text-2xl text-center font-bold mb-8">Order</h1>
      <ul className="list ml-6"> {/* Added class for list-style */}
        <OrderList />
      </ul>
    </div>
  );
}

export default OrderWrapper;
