import { useEffect, useState } from "react";
import useCartStore from "../../store/cartStore";
// import Cookies from "js-cookie";

function CartSummary() {
  const { cartList } = useCartStore(); // Menggunakan store untuk mendapatkan cartList
  const [subTotal, setSubTotal] = useState(0);
  const deliveryCost = 40000;

  useEffect(() => {
    let total = 0;
    cartList.forEach((item) => { // Menggunakan cartList dari store
      if (item.isSelected) { // Memeriksa apakah item dipilih
        total += item.price * item.quantity;
      }
    });
    setSubTotal(total);
  }, [cartList]); // Menggunakan cartList dari store

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>{formatPrice(subTotal)}</p>
      </div>
      <div className="flex justify-between">
        <p>Delivery Cost</p>
        <p>{formatPrice(deliveryCost)}</p>
      </div>
      <div className="divider"></div>
      <div className="flex justify-between">
        <p>Total</p>
        <p>{formatPrice(subTotal + deliveryCost)}</p>
      </div>
      <button className="btn bg-black text-white hover:bg-white hover:text-black border-3 rounded-md mt-5">Checkout</button>
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

export default CartSummary;
