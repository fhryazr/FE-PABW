import React, { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";
import axios from "axios";
import Cookies from "js-cookie";

const TransactionHistoryModal = ({ showModal, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/transaction-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };

    if (showModal) {
      fetchTransactions();
    }
  }, [showModal, token]);

  return (
    <Modal show={showModal} size="lg" onClose={onClose}>
      <Modal.Header>
        Transaction History
      </Modal.Header>
      <Modal.Body>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Type Log</th>
                <th className="py-2 px-4 border-b">Message</th>
                <th className="py-2 px-4 border-b">Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={transaction.id_log}>
                    <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{transaction.type_log}</td>
                    <td className="py-2 px-4 border-b">{transaction.pesan}</td>
                    <td className="py-2 px-4 border-b">{new Date(transaction.waktu).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-2 px-4 border-b text-center">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionHistoryModal;
