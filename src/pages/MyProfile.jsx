import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { getMe } from "../api/auth";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaCheckCircle } from "react-icons/fa";

function MyProfile() {
  const [userData, setUserData] = useState({
    fullname: "",
    alamat: "",
    nomorTelepon: "",
    email: "",
    verificationToken: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState(false); // State untuk menandai apakah sedang dalam proses verifikasi email
  const token = Cookies.get("token");
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMe(token);
        const {
          fullname,
          alamat,
          nomorTelepon,
          email,
          isVerified,
          verificationToken,
        } = response;
        setUserData({
          fullname,
          alamat,
          nomorTelepon,
          email,
          verificationToken,
        });
        setIsLoading(false);
        setIsVerified(isVerified);
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

  const handleEmailVerification = async () => {
    setIsLoadingVerify(true); // Set isLoadingVerify menjadi true saat proses verifikasi dimulai
    try {
      const response = await axios.post(
        "http://localhost:3000/send-email-verif",
        {
          email: userData.email,
          verificationToken: userData.verificationToken,
        }
      );
      alert(response.data.message);
      setIsLoadingVerify(false); // Set isLoadingVerify menjadi false setelah proses verifikasi selesai
    } catch (error) {
      console.log(error);
      setIsLoadingVerify(false); // Set isLoadingVerify menjadi false jika terjadi kesalahan dalam proses verifikasi
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Navbar auth={auth} />
      <div className="flex-grow mx-auto p-6 w-[70%]">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="flex text-sm font-medium text-gray-700">
              Email
              {isVerified ? (
                <div className="flex items-center gap-1">
                  <FaCheckCircle className="text-green-500 ml-2" />
                  <span>Verified</span>
                </div>
              ) : (
                <div className="text-yellow-500 ml-2">Not Verified</div>
              )}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled
                className="mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 bg-gray-200"
              />
              {!isVerified && (
                <button
                  type="button"
                  className="relative z-1 right-0 bg-blue-500 w-[5rem] h-10 text-xs text-white py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  onClick={() => handleEmailVerification()}
                >
                  {isLoadingVerify ? ( // Tampilkan spinner jika isLoadingVerify true, jika tidak tampilkan "Verify Email"
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Verify Email"
                  )}
                </button>
              )}
            </div>
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
