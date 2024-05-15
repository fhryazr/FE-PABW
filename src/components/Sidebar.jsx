import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="sidebar fixed top-0 left-0 h-screen w-64 bg-gray-200 flex flex-col">
      <div className="sidebar-header p-4 text-center font-bold border-b border-gray-200">
        Dashboard
      </div>
      <div className="sidebar-content flex-1 p-4">
        <ul>
          <li className="sidebar-group-title font-bold">Menu</li>
          {/* <li>
            <Link
              to="/kurir/profil"
              className={`text-gray-600 ${
                activeMenu === 'profil' ? 'font-bold text-gray-800' : 'hover:font-bold hover:text-gray-800'
              } cursor-pointer`}
              onClick={() => handleClick('profil')}
            >
              Profil
            </Link>
          </li> */}
          <li className="sidebar-group-title font-bold mt-4">Pesanan</li>
          <li>
            <Link
              to="/kurir/list-pesanan"
              className={`text-gray-600 ${
                activeMenu === 'list-pesanan' ? 'font-bold text-gray-800' : 'hover:font-bold hover:text-gray-800'
              } cursor-pointer`}
              onClick={() => handleClick('list-pesanan')}
            >
              List Pesanan
            </Link>
          </li>
          {/* <li>
            <Link
              to="/kurir/riwayat-pesanan"
              className={`text-gray-600 ${
                activeMenu === 'riwayat-pesanan' ? 'font-bold text-gray-800' : 'hover:font-bold hover:text-gray-800'
              } cursor-pointer`}
              onClick={() => handleClick('riwayat-pesanan')}
            >
              Riwayat Pesanan
            </Link>
          </li>
          <li>
            <Link
              to="/kurir/detail-pesanan"
              className={`text-gray-600 ${
                activeMenu === 'detail-pesanan' ? 'font-bold text-gray-800' : 'hover:font-bold hover:text-gray-800'
              } cursor-pointer`}
              onClick={() => handleClick('detail-pesanan')}
            >
              Detail Pesanan
            </Link>
          </li> */}
          <li className="sidebar-group-title font-bold mt-4">Pengaturan</li>
          <li>
            <Link
              to="/kurir/ubah-kata-sandi"
              className={`text-gray-600 ${
                activeMenu === 'ubah-kata-sandi' ? 'font-bold text-gray-800' : 'hover:font-bold hover:text-gray-800'
              } cursor-pointer`}
              onClick={() => handleClick('ubah-kata-sandi')}
            >
              Ubah Kata Sandi
            </Link>
          </li>
        </ul>
        {/* <button className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">+ Add Product</button> */}
      </div>
    </div>
  );
}

export default Sidebar;
