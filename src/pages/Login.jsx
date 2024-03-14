/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, login, error } = useContext(AuthContext);
  const navigate = useNavigate();

  // Efek untuk memantau perubahan nilai auth
  useEffect(() => {
    // Jika auth berubah menjadi tidak null, redirect ke halaman utama
    if (auth) {
      navigate('/');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Tidak perlu melakukan pengecekan lagi di sini
    } catch (error) {
      console.error("Error during login:", error.message);
      // Tambahkan logika penanganan error di sini jika diperlukan
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[50vw] lg:w-[20vw] gap-4 shadow-lg p-4">
        <h1 className="text-lg font-bold">Sign in</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            required
            className="border rounded p-2"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className="border rounded p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a
            href="forget-password"
            className="flex justify-end text-neutral-400">
            Forgot password?
          </a>
          <button
            type="submit"
            onSubmit={handleLogin}
            className="h-[43px] w-full bg-green-400 rounded-[5px] text-white font-medium">
            Login
          </button>
        </form>
        <p className="flex justify-center text-neutral-400">or sign in with</p>
        <button className="h-[43px] bg-white rounded-[5px] border border-black">
          Sign in using Google
        </button>
        <p className="flex justify-center text-neutral-400">
          Don&apos;t have account?
          <a href="register" className="text-green-400 font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
