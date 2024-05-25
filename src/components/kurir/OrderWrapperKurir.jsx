import OrderListKurir from './OrderKurirList';

export function OrderWrapperKurir() {
  return (
    <div className="container flex flex-col items-center overflow-auto">
      <h1 className="text-2xl text-center font-bold mb-8">List Pesanan</h1>
      <OrderListKurir />
    </div>
  );
}