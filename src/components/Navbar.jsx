/* eslint-disable react/prop-types */
import { useContext } from "react";
import { FaRegUser } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";

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
        <div className="flex gap-3">
          {/* keranjang */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
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
                  <FaRegUser className="text-lg" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between">Profile</a>
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
