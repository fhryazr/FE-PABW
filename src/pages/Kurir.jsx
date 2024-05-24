import { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import ProfilPage from './../components/kurir/ProfilPage';

function Kurir() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <Sidebar auth={auth} />
      <Navbar auth={auth} />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/kurir/*" element={<ProfilPage />} />
      </Routes>
    </>
  );
}

export default Kurir;
