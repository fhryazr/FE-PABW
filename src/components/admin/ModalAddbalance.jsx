import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ModalAddBalance({ userId, onAddBalance, onCancel }) {
  const [amount, setAmount] = useState();

  const handleInputChange = (e) => {
    const { value } = e.target;
    setAmount(parseFloat(value));
  };

  const handleAddBalance = async () => {
    try {
      // Panggil callback onAddBalance dengan jumlah saldo yang ditambahkan
      onAddBalance(amount);
    } catch (error) {
      console.error("Failed to add balance: ", error);
    }
  };

  return (
    <Modal show={true} size="md" onClose={onCancel}>
      <Modal.Body>
        <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Add Balance</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amount"
                type="number"
                value={amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Button onClick={onCancel} color="gray">
                Cancel
              </Button>
              <Button onClick={handleAddBalance}>Add Balance</Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
