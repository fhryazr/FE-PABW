import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <main className="w-screen h-screen">
        <Outlet />
        <Link to="login">
          <button className="h-[43px] w-[10rem] bg-green-400 rounded-[5px] text-white font-medium">
            Login
          </button>
        </Link>
      </main>
    </>
  );
}

export default App;
