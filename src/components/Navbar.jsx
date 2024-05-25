/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { BsCart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { getCart } from "../api/cart";
import Cookies from "js-cookie";
import MyBalance from "./MyBalance";
import TransactionHistoryModal from "./TransactionHistoryModal";
import { Link } from "react-router-dom";
import { getMe } from "../api/auth";

function Navbar({ auth }) {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const { logout } = useContext(AuthContext);
  const { cartList, setCartList } = useCartStore();
  const [cartLen, setCartLen] = useState(cartList.length || 0);
  const [showModal, setShowModal] = useState(false);
  const [isVerified, setIsVerified] = useState(true); // Asumsikan pengguna terverifikasi secara default

  const handleLogout = async () => {
    await logout();
    navigateTo("/");
    window.location.reload();
  };

  const navigateCart = () => {
    navigate("/cart");
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userData = await getMe(token); // Misalnya, fungsi untuk mendapatkan detail pengguna
      if (userData) {
        setIsVerified(userData.isVerified); // Atur status verifikasi pengguna
      }
    };

    const fetchCart = async () => {
      const cartData = await getCart(token);

      const simplifiedCart = cartData?.data?.detail_carts.map((cart) => ({
        id: cart?.id_product,
        name: cart?.product?.namaProduk,
        price: cart?.product?.hargaProduk,
        images: cart?.product?.imagesProduct,
        quantity: cart?.jumlah_barang,
      }));

      setCartList(simplifiedCart);
      setCartLen(simplifiedCart.length);
    };

    if (auth) {
      fetchCart();
      fetchUserDetails(); // Panggil fungsi untuk mendapatkan detail pengguna
    }
  }, [token, cartList.length, setCartList, auth]);

  return (
    <div className="sticky top-0 mx-auto md:px-8 navbar justify-center bg-white shadow-lg z-10 mb-4">
      <div className="flex-1">
        <Link to="/">
          <a className="pl-2 text-xl">E-Commerce</a>
        </Link>
      </div>
      <div className="navbar-end gap-3">
        <div className="flex">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={navigateCart}
            >
              <div className="indicator">
                <BsCart className="text-xl md:text-2xl" />
                {
                  <span className="badge badge-sm indicator-item">
                    {cartLen}
                  </span>
                }
              </div>
            </div>
          </div>
          {auth && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                {!isVerified && (
                  <span className="badge badge-xs bg-warning indicator-item absolute right-2 top-2"></span>
                )}{" "}
                <div className="avatar placeholder">
                  <FaRegUser className="text-lg md:text-2xl" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 flex gap-1 shadow bg-base-100 rounded-md w-52"
              >
                <li>
                  <a
                    onClick={() => navigateTo("/profile")}
                    className="justify-between"
                  >
                    Profile{" "}
                    {!isVerified && (
                      <RiErrorWarningFill className="text-warning" />
                    )}{" "}
                    {/* Ikon peringatan */}
                  </a>
                </li>
                <li>
                  <a className="justify-between">
                    <MyBalance />
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigateTo("/my-orders")}
                    className="justify-between"
                  >
                    My Orders
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setShowModal(true)}
                    className="justify-between"
                  >
                    Transactions History
                  </a>
                </li>
                <li>
                  <Link to={"/store"}>
                    <a className="justify-between">My Store</a>
                  </Link>
                </li>
                <li>
                  <Link to={"/incoming-order"}>
                    <a className="justify-between">Incoming Order</a>
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}

          {!auth && (
            <a className="btn bg-green-400 text-white w-[6rem]" href="/login">
              Login
            </a>
          )}
        </div>
      </div>
      <TransactionHistoryModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default Navbar;
