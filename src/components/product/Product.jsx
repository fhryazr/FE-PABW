/* eslint-disable react/prop-types */
import { BsCartPlus } from "react-icons/bs";
import { addToCart } from "../../api/cart";
import Cookies from "js-cookie";
import useCartStore from "../../store/cartStore";
import { useNavigate } from "react-router-dom";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function Product({ id, name, price, images }) {
  const token = Cookies.get('token')
  const { setCartList } = useCartStore()

  const addProductToCart = async () => {
    try {
      await addToCart(id, 1, token); // Mengirim id produk, quantity (dalam contoh ini, 1), dan token
      const simplifiedCart = {
        id: id,
        name: name,
        price: price,
        images: images,
        quantity: 1,
        isSelected: false,
      };
      setCartList(simplifiedCart)
      console.log('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const navigate = useNavigate()

  const navigateDetail = () => {
    navigate(`/product/${id}`)
  }

  return (
    <div className="card rounded-xl p-2 md:w-[15rem] bg-base-100 shadow-lg md:shadow-xl hover:bg-base-200 transition ease-in-out" onClick={navigateDetail}>
      <figure className="rounded-xl">
        {/* Gambar produk */}
        <img
          src={
            images ||
            "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          }
          className="w-full h-[225px] object-cover"
          alt={name}
        />
      </figure>
      <div className="flex flex-col h-[9rem] justify-around p-2">
        {/* Nama produk */}
        <h2 className="text-sm text-pretty overflow-hidden truncate line-clamp-1">
          {name}
        </h2>
        {/* Harga produk */}
        <p className="font-semibold text-[1.2rem]">{formatPrice(price)}</p>
        <div className="card-actions w-full justify-between">
          {/* Tombol Tambah ke Keranjang */}
          <button
            className="w-full btn btn-outline text-sm font-normal"
            onClick={addProductToCart}
          >
            <BsCartPlus size={"1.2rem"} /> Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
