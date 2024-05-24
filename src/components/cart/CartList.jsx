import Cookies from "js-cookie";
import { getCart } from "../../api/cart";
import { useEffect, useCallback } from "react";
import CartItem from "./CartItem";
import useCartStore from "../../store/cartStore";

function CartList() {
  const token = Cookies.get("token");
  // const [cartList, setCartList] = useState([]);
  const { cartList, setCartList } = useCartStore();

  const fetchCart = useCallback(async () => {
    const cartData = await getCart(token);
    
    // Mengambil data yang dibutuhkan untuk disimpan dalam cookie
    const simplifiedCart = cartData?.data?.detail_carts.map(cart => ({
      id: cart?.id_product,
      name: cart?.product?.namaProduk,
      price: cart?.product?.hargaProduk,
      images: cart?.product?.imagesProduct,
      quantity: cart?.jumlah_barang,
      isSelected: false,
    }));
    
    // Mengkonversi data keranjang ke dalam JSON
    const cartJson = JSON.stringify(simplifiedCart);
    setCartList(simplifiedCart);

    // Simpan data keranjang ke dalam cookies
    Cookies.set("cart", cartJson, { expires: 7 }); // Simpan selama 7 hari
  }, [token, setCartList]);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token, fetchCart]);

  // console.log(cartList);

  return (
    <div className="h-[32rem] overflow-y-auto">
      {cartList && cartList.length > 0 ? (
        cartList.map((cart) => (
          <CartItem
            key={cart?.id}
            id={cart?.id}
            name={cart?.name}
            price={parseFloat(cart?.price)}
            images={cart?.images}
            quantity={parseInt(cart?.quantity)}
          />
        ))
      ) : (
        <p>Tidak ada produk</p>
      )}
    </div>
  );
}

export default CartList;
