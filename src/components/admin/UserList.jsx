import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { getUsers } from "../../api/auth";
import ModalUser from "./ModalUser";
import { ModalConfirmation } from "./ModalConfirmation";
import ModalEditUser from "./ModalEditUser";
import ModalAddBalance from "./ModalAddbalance"; // Import modal untuk menambah saldo elektronik
import {
  HiOutlineTrash,
  HiOutlinePencilAlt,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState(null);
  const [addBalanceUserId, setAddBalanceUserId] = useState(null); // State untuk menyimpan ID pengguna yang akan ditambahkan saldo elektronik
  const token = Cookies.get("token");

  const fetchUsers = useCallback(async () => {
    try {
      const response = await getUsers(token);
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/users/${userId}`, {
        headers: { Authorization: "Bearer " + token },
      });
      fetchUsers();
      setConfirmDeleteUserId(null);
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user: ", error);
    }
  };

  const handleSaveEdit = async (editedUser) => {
    try {
      await axios.patch(
        `http://localhost:3000/admin/users/${editUserId}`,
        editedUser,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      fetchUsers();
      setEditUserId(null);
      console.log("User edited successfully");
    } catch (error) {
      console.error("Failed to edit user: ", error);
    }
  };

  // Fungsi untuk menambah saldo elektronik pengguna
  const handleAddBalance = async (userId, amount) => {
    try {
      await axios.post(
        `http://localhost:3000/admin/users/${userId}`,
        { saldoElektronik: parseFloat(amount) },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      fetchUsers();
      setAddBalanceUserId(null);
      console.log("Balance added successfully");
    } catch (error) {
      console.error("Failed to add balance: ", error);
    }
  };

  return (
    <div>
      {confirmDeleteUserId && (
        <ModalConfirmation
          onConfirm={() => {
            handleDelete(confirmDeleteUserId);
          }}
          onCancel={() => setConfirmDeleteUserId(null)}
        />
      )}

      {editUserId && (
        <ModalEditUser
          user={users.find((user) => user.id_user === editUserId)}
          onSave={handleSaveEdit}
          onCancel={() => setEditUserId(null)}
        />
      )}

      {/* Modal untuk menambah saldo elektronik */}
      {addBalanceUserId && (
        <ModalAddBalance
          userId={addBalanceUserId}
          onAddBalance={(amount) => handleAddBalance(addBalanceUserId, amount)}
          onCancel={() => setAddBalanceUserId(null)}
        />
      )}

      <ModalUser fetch={fetchUsers} />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>SaldoElektronik</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_user}>
                <td>{user.id_user}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.alamat}</td>
                <td>{user.nomorTelepon}</td>
                <td>{user.saldoElektronik}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => setEditUserId(user.id_user)}
                    className="btn btn-sm bg-blue-500 mr-2"
                  >
                    <HiOutlinePencilAlt />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteUserId(user.id_user)}
                    className="btn btn-sm bg-red-500 text-white mr-2"
                  >
                    <HiOutlineTrash />
                  </button>
                  <button
                    onClick={() => setAddBalanceUserId(user.id_user)} // Buka modal untuk menambah saldo
                    className="btn btn-sm bg-green-500 text-white"
                  >
                    <HiOutlineCurrencyDollar />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
