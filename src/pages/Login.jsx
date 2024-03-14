import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/');
      navigate(0);
    } catch (error) {
      console.error("Error during login:", error.message);
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
