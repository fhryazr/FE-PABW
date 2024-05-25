import OrderList from './OrderList';// Pastikan path sesuai dengan struktur proyek Anda

function OrderWrapper() {
  return (
    <div className="container flex flex-col items-center my-8">
      <h1 className="text-2xl text-center font-bold mb-8">Order</h1>
        <OrderList />
    </div>
  )}
export default OrderWrapper;
