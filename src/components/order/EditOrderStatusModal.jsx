import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import axios from "axios";
import Cookies from "js-cookie";

export default function EditOrderStatusModal({ currentStatus, onSave, onCancel }) {
  const [newStatus, setNewStatus] = useState();
  const token = Cookies.get("token");

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      onSave(newStatus); // Panggil callback onSave dengan status pesanan yang diperbarui
    } catch (error) {
      console.error("Failed to update order status: ", error);
    }
  };

  return (
    <Modal show={true} size="md" onClose={onCancel}>
      <Modal.Body>
        <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Edit Order Status</h2>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="currentStatus"
              >
                Current Status
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="currentStatus"
                type="text"
                name="currentStatus"
                value={currentStatus}
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="newStatus"
              >
                New Status
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="newStatus"
                name="newStatus"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                required
              >
                <option value="">Pilih Status...</option>
                <option value="diproses penjual">Diproses Penjual</option>
                <option value="menunggu kurir">Menunggu Kurir</option>
                <option value="transaksi gagal">Transaksi Gagal</option>
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
