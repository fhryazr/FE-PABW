import React, { useContext } from 'react';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { AuthContext } from "../../context/AuthContext";
import { OrderWrapperKurir } from './OrderWrapperKurir';

function ListPesananPage() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="grid grid-cols-12 h-screen overflow-auto">
      {/* Sidebar */}
      <div className="col-span-2">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="col-span-9 flex flex-col">
        {/* Navbar */}
        {/* <Navbar auth={auth} /> */}

        {/* Wrapper */}
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          <OrderWrapperKurir />
        </div>
      </div>
    </div>
  );
}

export default ListPesananPage;
