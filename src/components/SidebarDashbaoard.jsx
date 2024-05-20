
"use client";

import { Sidebar } from "flowbite-react";
import { useContext } from "react";
import { HiOutlineLogout, HiShoppingBag, HiUser } from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";

export function SidebarDashboard() {
  const {logout} = useContext(AuthContext)

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <Sidebar className="w-fit" aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Logo>Dashboard</Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse> */}
          <Sidebar.Item href="/dashboard/users" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="/dashboard/products" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="/dashboard/orders" icon={HiShoppingBag}>
            Order
          </Sidebar.Item>
          <Sidebar.Item href="/dashboard/logs" icon={HiShoppingBag}>
            Logs
          </Sidebar.Item>
          <Sidebar.Item className="cursor-pointer" onClick={()=>handleLogout()} icon={HiOutlineLogout}>
            Logout
          </Sidebar.Item>
          {/* <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
