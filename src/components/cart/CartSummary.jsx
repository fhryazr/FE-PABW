import { useEffect, useState } from "react";
import useCartStore from "../../store/cartStore";
import { useNavigate } from "react-router-dom";

function CartSummary() {
  const { cartList } = useCartStore();
  const [subTotal, setSubTotal] = useState(0);
  const deliveryCost = cartList.length > 0 ? 40000 : 0;
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    cartList.forEach((item) => {
      if (item.isSelected) {
        total += item.price * item.quantity;
      }
    });
    setSubTotal(total);
  }, [cartList]);

  const handleCheckout = () => {
    const isSelectedItemsExist = cartList.some((item) => item.isSelected);
    if (!isSelectedItemsExist) {
      alert("Please select at least one item to proceed to checkout.");
    } else {
      navigate("/pembayaran");
    }
  };

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
      <button
        onClick={handleCheckout}
        className="btn bg-black text-white hover:bg-white hover:text-black border-3 rounded-md mt-5"
      >
        Checkout
      </button>
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
