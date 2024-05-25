import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Verify() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const navigate = useNavigate();

  // State untuk menunjukkan apakah verifikasi telah selesai atau belum
  const [verificationComplete, setVerificationComplete] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/verify-email?token=${token}`
        );
        toast.success(response.data.message);
        setVerificationComplete(true);
      } catch (error) {
        toast.error(error.response.data.error);
        // Handle error
      }
    };

    // Hanya lakukan verifikasi jika token tersedia
    if (token) {
      verifyEmail();
    }
  }, [token]);

  // Redirect ke halaman profil setelah 3 detik
  useEffect(() => {
    if (verificationComplete) {
      const redirectTimer = setTimeout(() => {
        navigate("/profile");
      }, 2000);

      // Membersihkan timeout saat komponen dilepas
      return () => clearTimeout(redirectTimer);
    }
  }, [verificationComplete, navigate]);

  return <ToastContainer />;
}

export default Verify;
