import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { getMe } from "../api/auth";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function MyProfile() {
  const [userData, setUserData] = useState({
    fullname: "",
    alamat: "",
    nomorTelepon: "",
    // Menambahkan field lainnya, namun awalnya kosong
    email: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMe(token);
        const { fullname, alamat, nomorTelepon, email, role } = response;
        setUserData({ fullname, alamat, nomorTelepon, email, role });
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data: ", error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:3000/edit-profile",
        userData,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      alert("Data berhasil disimpan");
      console.log("Profile updated successfully: ", response.data);
      navigate("/");
    } catch (error) {
      console.error("Failed to update profile: ", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Navbar auth={auth} />
      <div className="flex-grow mx-auto p-6 w-[70%]">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* Menampilkan data email dan role namun tidak bisa diedit */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled
              className="mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 bg-gray-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={userData.fullname}
              onChange={handleChange}
              className="mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="alamat"
              value={userData.alamat}
              onChange={handleChange}
              className="mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="nomorTelepon"
              value={userData.nomorTelepon}
              onChange={handleChange}
              className="mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 ml-4 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Back
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default MyProfile;
