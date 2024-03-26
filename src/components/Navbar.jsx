/* eslint-disable react/prop-types */
import { useContext } from "react";
import { FaRegUser } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";

function Navbar({ auth }) {
  const { logout } = useContext(AuthContext);
  // console.log(auth);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="sticky top-0 mx-auto md:px-8 navbar justify-center bg-white shadow-lg z-10">
      {/* Logo */}
      <div className="flex-1">
        <a className="pl-2 text-xl">E-Commerce</a>
      </div>
      <div className="navbar-end gap-3">
        <div className="flex">
          {/* keranjang */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle">
              <div className="indicator">
                <BsCart className="text-xl md:text-2xl"/>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
          </div>
          {/* auth dropdown */}
          {auth && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle">
                <div className="avatar placeholder">
                  <FaRegUser className="text-lg md:text-2xl" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <Link to={"/store"}>
                  <a className="justify-between">My Store</a>
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}

          {/* Login button */}
          {!auth && (
            <a className="btn bg-green-400 text-white w-[6rem]" href="/login">
              Login
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
