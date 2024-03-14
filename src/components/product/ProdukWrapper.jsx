import ProductList from './ProductList'; // Pastikan path sesuai dengan struktur proyek Anda

function ProductWrapper() {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl text-center font-bold mb-8">Our Products</h1>
      <ProductList />
    </div>
  );
}

export default ProductWrapper;
