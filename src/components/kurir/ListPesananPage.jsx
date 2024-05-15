import React, { useContext } from 'react';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import OrderWrapper from '../order/OrderWrapper';
import { AuthContext } from "../../context/AuthContext";

function ListPesananPage() {
    const { auth } = useContext(AuthContext);

return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar auth={auth} />
        <div className="p-4">
          <OrderWrapper />
        </div>
        </div>
      </div>
  );
}
export default ListPesananPage;