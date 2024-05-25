"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ModalUser({ fetch }) {
  const [openModal, setOpenModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    fullname: "",
    email: "",
    alamat: "",
    password: "",
    nomorTelepon: "",
    role: "",
  });
  const token = Cookies.get("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/users",
        newUserData,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log("User created successfully:", response.data);
      // Reset form setelah submit
      setNewUserData({
        fullname: "",
        email: "",
        alamat: "",
        password: "",
        nomorTelepon: "",
        role: "",
      });

      //   console.log(newUserData)
      // Tutup modal setelah submit
      setOpenModal(false);
      // Panggil fetchUsers untuk memperbarui daftar pengguna setelah membuat pengguna baru
      fetch();
    } catch (error) {
      console.error("Failed to create user: ", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center w-full mb-2 shadow-md p-2">
        <div>Users</div>
        <Button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add New User
        </Button>
      </div>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <form onSubmit={handleCreateUser}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fullname"
                >
                  Full Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fullname"
                  type="text"
                  name="fullname"
                  value={newUserData.fullname}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={newUserData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  value={newUserData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="alamat"
                >
                  Address
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="alamat"
                  type="text"
                  name="alamat"
                  value={newUserData.alamat}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nomorTelepon"
                >
                  Phone Number
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nomorTelepon"
                  type="text"
                  name="nomorTelepon"
                  value={newUserData.nomorTelepon}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  Role
                </label>
                <select
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="role"
                  name="role"
                  value={newUserData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="KURIR">Kurir</option>
                  <option value="PENGGUNA">User</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  type="submit"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
