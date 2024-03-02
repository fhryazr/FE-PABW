import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[50vw] lg:w-[20vw] gap-4 shadow-lg p-4">
        <h1 className="text-lg font-bold">Sign in</h1>
        <form className="flex flex-col gap-4" action="">
          <input
            className="border rounded p-2"
            type="text"
            placeholder="Email"
          />
          <input
            className="border rounded p-2"
            type="password"
            placeholder="Password"
          />
        </form>
        <a href="forget-password" className="flex justify-end text-neutral-400">
          Forgot password?
        </a>
        <Link to="/">
          <button className="h-[43px] w-full bg-green-400 rounded-[5px] text-white font-medium">
            Login
          </button>
        </Link>
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