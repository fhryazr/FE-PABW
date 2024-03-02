import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[50vw] lg:w-[20vw] gap-4 shadow-lg p-4">
        <h1 className="text-lg font-bold">Sign up</h1>
        <form className="flex flex-col gap-4" action="">
          <input
            className="border rounded p-2"
            type="text"
            placeholder="Nama Lengkap"
          />
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
          <input
            className="border rounded p-2"
            type="password"
            placeholder="Masukkan Ulang Password"
          />
        </form>
        <Link to="login">
          <button className="h-[43px] w-full bg-green-400 rounded-[5px] text-white font-medium">
            Sign Up
          </button>
        </Link>
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
