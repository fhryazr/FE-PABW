import React, { useContext, useEffect, useState } from 'react';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { AuthContext } from "../../context/AuthContext";
import logo from '../../assets/logo.png';

function ProfilPage() {
  const { auth } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`/api/profile/${auth?.id}`);
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    }

    if (auth && auth.id) {
      fetchProfile();
    }
  }, [auth]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar auth={auth} />
        <div className="container mx-auto mt-10">
          {profile ? (
            <div className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="h-24 w-24 rounded-full mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold">{profile.fullname}</h1>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-gray-600">{profile.phoneNumber}</p>
                <p className="text-gray-600">{profile.address}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilPage;
