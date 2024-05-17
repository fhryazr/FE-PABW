import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { getUsers } from "../../api/auth";

function UserList() {
  const [users, setUsers] = useState([]);
  const [newUserData, setNewUserData] = useState({
    fullname: "",
    email: "",
    alamat: "",
    nomorTelepon: "",
    role: "",
  });
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

  // const handleDelete = async (userId) => {
    
  //   try {
  //     await deleteUser(userId, token);
  //     await fetchUsers();
  //     console.log("User deleted successfully");
  //   } catch (error) {
  //     console.error("Failed to delete user: ", error);
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/admin/users", newUserData, {
        headers: { Authorization: "Bearer " + token },
      });
      await fetchUsers();
      console.log("User created successfully");
      setNewUserData({
        fullname: "",
        email: "",
        alamat: "",
        nomorTelepon: "",
        role: "",
      });
    } catch (error) {
      console.error("Failed to create user: ", error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New User</h2>
        <form onSubmit={handleCreateUser}>
          <div className="mb-2">
            <input
              type="text"
              name="fullname"
              value={newUserData.fullname}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <input
              type="email"
              name="email"
              value={newUserData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <input
              type="text"
              name="alamat"
              value={newUserData.alamat}
              onChange={handleInputChange}
              placeholder="Address"
              className="mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <input
              type="text"
              name="nomorTelepon"
              value={newUserData.nomorTelepon}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <select
              name="role"
              value={newUserData.role}
              onChange={handleInputChange}
              className="mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
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
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => {
                      // Handle edit user action here
                      console.log("Edit User:", user.id_user);
                    }}
                    className="btn btn-sm btn-primary mr-2"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                  >
                    Delete
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
