import { PropTypes } from "prop-types";
import { BsCartPlus } from "react-icons/bs";

function Product({ name, price }) {
  return (
    <div className="card w-[17rem] bg-base-100 shadow-xl">
      <figure>
        {/* Gambar produk */}
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt={name}
        />
      </figure>
      <div className="card-body">
        {/* Nama produk */}
        <h2 className="truncate font-bold text-lg">{name}</h2>
        {/* Harga produk */}
        <p>{price}</p>
        <p className="truncate">{name}</p>
        <div className="card-actions justify-between">
          <button className="btn btn-primary">Beli Sekarang</button>
          <button className="btn btn-ghost text-xl"><BsCartPlus /></button>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Product;
