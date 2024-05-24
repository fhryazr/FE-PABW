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
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
