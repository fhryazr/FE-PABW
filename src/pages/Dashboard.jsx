import DashboardLayout from "./DashboardLayout";
import { Routes, Route } from "react-router-dom";
import UserList from "../components/admin/UserList";
import ProductListAdmin from "../components/admin/ProductListAdmin";
import OrderList from "../components/admin/OrderList";
import LogList from "../components/admin/LogList";

function Dashboard() {
  return (
    <div>
      <DashboardLayout>
        <Routes>
          <Route path="" element={<div className="font-bold text-xl">SELAMAT DATANG DI DASHBOARD ADMIN</div>} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<ProductListAdmin />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/logs" element={<LogList />} />
        </Routes>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
