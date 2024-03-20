import Product from './Product'; // Pastikan path sesuai dengan struktur proyek Anda

function ProductList() {
  // Data produk dapat diambil dari API, disimpan dalam state, atau langsung didefinisikan di sini
  const products = [
    { id: 1, name: 'Vintage Leather Messenger Bag Flap Over Crossbody Bag Lorem10alksjd aksjd akjsd laksjdlakjsd ', description: 'If a dog chews shoes whos Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto reiciendis necessitatibus nostrum odio assumenda sed ipsum eligendi cum quae maiores? asdfasdfsadf shoes does he choose?', price: 'Rp. 100.000'},
    { id: 2, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000'},
    { id: 3, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000'},
    { id: 4, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000'},
    { id: 5, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 6, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 7, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 8, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 9, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 10, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 11, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 12, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 13, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 14, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 15, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 16, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 17, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 18, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 19, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 20, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
  ];

  return (
    <div className="grid px-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {products.map((product) => (
        <Product key={product.id} name={product.name} description={product.description} price={product.price} />
      ))}
    </div>
  );
}

export default ProductList;
