import { create } from "zustand";
import Cookies from "js-cookie";

const useCartStore = create((set) => ({
  cartList: [],
  setCartList: (cartList) => set({ cartList }),
  addToCart: (cartItem) =>
    set((state) => ({ cartList: [...state.cartList, cartItem] })),
  removeItem: (id) =>
    set((state) => ({
      cartList: state.cartList.filter((item) => item.id !== id),
    })),
  updateItemQuantity: (id, newQuantity) =>
    set((state) => ({
      cartList: state.cartList.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ),
    })),
    toggleSelectedItem: (id, isSelected) =>
    set((state) => {
      const updatedCartList = state.cartList.map((item) =>
        item.id === id ? { ...item, isSelected } : item
      );
      Cookies.set("cart", JSON.stringify(updatedCartList), { expires: 7 });
      return { cartList: updatedCartList };
    }),
}));

export default useCartStore;
