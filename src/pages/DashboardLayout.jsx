/* eslint-disable react/prop-types */
import { SidebarDashboard } from "../components/SidebarDashbaoard";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <SidebarDashboard className=""/>
      <main className="w-full p-5">{children}</main>
    </div>
  );
}

export default DashboardLayout;
