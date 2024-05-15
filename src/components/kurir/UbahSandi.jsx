import React, { useContext } from 'react';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { AuthContext } from "../../context/AuthContext";

function UbahSandi() {
    const { auth } = useContext(AuthContext);

return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar auth={auth} />
        </div>
      </div>
  );
}
export default UbahSandi;