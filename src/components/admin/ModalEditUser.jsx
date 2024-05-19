import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import axios from "axios";
import Cookies from "js-cookie";

export default function EditUserModal({ user, onSave, onCancel }) {
  const [editedUser, setEditedUser] = useState(user);
  const token = Cookies.get("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      onSave(editedUser); // Panggil callback onSave dengan data pengguna yang diperbarui
    } catch (error) {
      console.error("Failed to update user: ", error);
    }
  };

  return (
    <Modal show={true} size="md" onClose={onCancel}>
      <Modal.Body>
        <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Edit User</h2>
          <form onSubmit={handleSave}>
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
                value={editedUser.fullname}
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
                value={editedUser.email}
                onChange={handleInputChange}
                placeholder="Email"
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
                value={editedUser.alamat}
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
                value={editedUser.nomorTelepon}
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
                value={editedUser.role}
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
              <Button onClick={onCancel} color="gray">
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
