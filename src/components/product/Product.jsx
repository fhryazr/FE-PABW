import { PropTypes } from "prop-types";
import { BsCartPlus } from "react-icons/bs";

function Product({ name, price, description}) {
  return (
    <div className="card rounded-xl p-2 md:w-[15rem] bg-base-100 shadow-lg md:shadow-2xl">
      <figure>
        {/* Gambar produk */}
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt={name}
        />
      </figure>
      <div className="md:h-[14rem] flex flex-col justify-between pt-2">
        {/* Nama produk */}
        <h2 className="font-bold h-12 text-[16px] text-pretty overflow-hidden truncate line-clamp-2">{name}</h2>
        {/* Harga produk */}
        <p className="font-[700] text-[18px]">{price}</p>
        <p className="text-[12px] text-gray-500 text-pretty overflow-hidden truncate line-clamp-2">{description}</p>
        <div className="card-actions w-full justify-between">
          <button className="w-[65%] lg:w-[70%] btn rounded-xl text-[10px] md:text-[14px] bg-green-400 text-white hover:text-black">Beli Sekarang</button>
          <button className="btn btn-outline text-[10px] md:text-lg"><BsCartPlus /></button>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Product;
