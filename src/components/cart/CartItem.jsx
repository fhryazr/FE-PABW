/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import useCartStore from "../../store/cartStore";
import { removeFromCart, updateCartItemQuantity } from "../../api/cart";
import Cookies from "js-cookie";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function CartItem({ id, name, price, images, quantity }) {
  const [counter, setCounter] = useState(quantity);
  const { removeItem, toggleSelectedItem, updateItemQuantity } = useCartStore();
  const token = Cookies.get("token");
  const isSelected = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")).find(item => item.id === id)?.isSelected || false : false;

  useEffect(() => {
    toggleSelectedItem(id, isSelected);
    console.log(useCartStore.getState().cartList);
  }, [isSelected, id, toggleSelectedItem]);

  const updateCartQuantityInCookies = (productId, newQuantity) => {
    const cartData = Cookies.get("cart");
    if (cartData) {
      const cartItems = JSON.parse(cartData);
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      Cookies.set("cart", JSON.stringify(updatedCartItems), { expires: 7 });
      updateItemQuantity(productId, newQuantity);
    }
  };

  const handleCheckboxChange = () => {
    toggleSelectedItem(id, !isSelected);
    // console.log(cartList)
  };

  const incrementCounter = async () => {
    setCounter((prevCounter) => prevCounter + 1);
    updateCartQuantityInCookies(id, counter + 1);
    await updateCartItemQuantity(id, counter + 1, token);
  };

  const decrementCounter = async () => {
    if (counter > 1) {
      setCounter((prevCounter) => prevCounter - 1);
      updateCartQuantityInCookies(id, counter - 1);
      await updateCartItemQuantity(id, counter - 1, token);
    }
  };

  const handleRemove = async () => {
    removeItem(id);
    await removeFromCart(id, token);
  };

  return (
    <>
      <div className="flex items-center p-2 transition ease-in-out">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          className="checkbox mr-2"
        />
        <img
          src={
            images ||
            "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          }
          className="h-[100px] w-[100px] object-cover rounded-lg"
          alt={name}
        />
        <div className="flex w-[80%] flex-col p-2">
          <div className="flex justify-between">
            <h2 className="text-[0.9rem] text-pretty overflow-hidden truncate line-clamp-1">
              {name}
            </h2>
            <p className="font-medium text-[1rem]">{formatPrice(price)}</p>
          </div>
          <p className="text-xs mb-2">Quantity</p>
          <div className="flex w-[8rem] items-center">
            <button
              className="border border-black rounded-lg px-2 hover:bg-black hover:text-white transition-all ease-in-out"
              onClick={decrementCounter}
            >
              -
            </button>
            <div className="w-full border-1 text-sm text-center">{counter}</div>
            <button
              className="border border-black rounded-lg px-2 hover:bg-black hover:text-white transition-all ease-in-out"
              onClick={incrementCounter}
            >
              +
            </button>
          </div>
          <div className="text-sm mt-2">
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemove()}
            >
              Remove Item
            </button>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
}

export default CartItem;
