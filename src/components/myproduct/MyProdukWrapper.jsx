// import MyProductList from "./myProductList"; // Pastikan path sesuai dengan struktur proyek Anda
import ProductList from "../product/ProductList";

function MyProductWrapper() {
  return (
    <div className="container flex flex-col items-center my-8">
      <h1 className="text-2xl text-center font-bold mb-8">My Product</h1>
      <ul className="list ml-6"> {/* Added class for list-style */}
        <ProductList />
      </ul>
    </div>
  );
}

export default MyProductWrapper;
