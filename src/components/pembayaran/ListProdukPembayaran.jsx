/* eslint-disable react/prop-types */
function ListProdukPembayaran({ products }) {
  const shipping = 40000

  return (
    <div className="bg-nateural w-1/2 mt-7 ml-10 overflow-y-auto max-h-96">
      <div className="">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col p-4 shadow-md mr-4">
            <div className="flex items-center mb-4">
              <img
                src={JSON.parse(product.images)}
                alt="Product"
                className="w-16 h-16 mr-3 rounded-md"
              />
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-black">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-black-400">
                  Harga Produk (${product.price}) - Jumlah: {product.quantity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 rounded-lg p-4 mr-4 shadow-md">
        <div className="flex justify-between items-center">
          <p>Subtotal</p>
          <p className="text-gray-900 dark:text-black">
            {formatPrice(products.reduce(
              (acc, product) => acc + product.price * product.quantity,
              0)
            )}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p>Shipping</p>
          <p className="text-gray-900 dark:text-black">{formatPrice(shipping)}</p>
        </div>
        <hr className="my-2 border-t border-gray-300 dark:border-gray-700" />
        <div className="flex justify-between items-center">
          <p>Total</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-black">
              {formatPrice(products.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
              ) + shipping)}
          </p>
        </div>
      </div>
    </div>
  );
}

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default ListProdukPembayaran;
