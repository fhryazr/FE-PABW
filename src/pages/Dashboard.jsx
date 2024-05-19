import DashboardLayout from "./DashboardLayout";
import { Routes, Route } from "react-router-dom";
import UserList from "../components/admin/UserList";
import ProductListAdmin from "../components/admin/ProductListAdmin";

function Dashboard() {
  return (
    <div>
      <DashboardLayout>
        <Routes>
          <Route path="" element={<div className="font-bold text-xl">SELAMAT DATANG DI DASHBOARD ADMIN</div>} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<ProductListAdmin />} />
        </Routes>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
