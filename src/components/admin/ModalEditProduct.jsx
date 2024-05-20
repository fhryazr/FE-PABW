import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import axios from "axios";
import Cookies from "js-cookie";

export default function EditProductModal({ product, onSave, onCancel }) {
  const [editedProduct, setEditedProduct] = useState(product);
  const token = Cookies.get("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      onSave(editedProduct); // Panggil callback onSave dengan data produk yang diperbarui
    } catch (error) {
      console.error("Failed to update product: ", error);
    }
  };

  return (
    <Modal show={true} size="md" onClose={onCancel}>
      <Modal.Body>
        <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="namaProduk"
              >
                Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="namaProduk"
                type="text"
                name="namaProduk"
                value={editedProduct.namaProduk}
                onChange={handleInputChange}
                placeholder="Product Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="hargaProduk"
              >
                Price
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="hargaProduk"
                type="text"
                name="hargaProduk"
                value={editedProduct.hargaProduk}
                onChange={handleInputChange}
                placeholder="Price"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="stokProduk"
              >
                Stock
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stokProduk"
                type="text"
                name="stokProduk"
                value={editedProduct.stokProduk}
                onChange={handleInputChange}
                placeholder="Stok"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="statusProduk"
              >
                Status
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="statusProduk"
                name="statusProduk"
                value={editedProduct.statusProduk}
                onChange={handleInputChange}
                placeholder={"Select Status"}
                required
              >
                <option value="stok tersedia">Stok Tersedia</option>
                <option value="stok kosong">Stok Habis</option>
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
