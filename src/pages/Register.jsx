import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi formulir
    if (!fullname || !email || !password || !confirmPassword) {
      setError("Semua kolom harus diisi");
      return;
    }

    // Validasi password dan confirmPassword
    if (password !== confirmPassword) {
      setError("Password dan Confirm Password harus sama");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Display success message
        navigate('/login')
      } else {
        const errorResult = await response.json();
        console.error("Error during registration:", errorResult);
        setError(errorResult.message)
      }
    } catch (error) {
      console.error("GAGAL:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[50vw] lg:w-[20vw] gap-4 shadow-lg p-4">
        <h1 className="text-lg font-bold">Sign up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <input
            className="border rounded p-2"
            type="text"
            placeholder="Nama Lengkap"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            className="border rounded p-2"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border rounded p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="border rounded p-2"
            type="password"
            placeholder="Masukkan Ulang Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            onSubmit={handleRegister}
            className="h-[43px] w-full bg-green-400 rounded-[5px] text-white font-medium">
            Sign Up
          </button>
        </form>
        <p className="flex justify-center text-neutral-400">or sign up with</p>
        <button className="h-[43px] bg-white rounded-[5px] border border-black">
          Sign up using Google
        </button>
        <p className="flex justify-center text-neutral-400">
          I already have an account?
          <a href="login" className="text-green-400 font-medium">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
