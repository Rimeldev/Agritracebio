import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import profil from "../assets/icons/profil.png";
import { logoutUser } from "@/services/logoutService";

const AdminHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAccountClick = () => {
    setShowMenu(false);
    navigate("/admin/account");
  };

  const handleLogout = async () => {
  try {
    await logoutUser();
  } catch (error) {
    console.error("Erreur de déconnexion :", error);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user_id");

  setShowMenu(false);
  navigate("/");
};

  return (
    <header className="bg-[#284411] px-6 py-4 flex justify-between items-center shadow">
      {/* Logo + Titre */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src={logo} alt="Logo AgriTraceBio" className="h-14" />
        </Link>
        <div>
          <h1 className="text-xl text-white font-bold leading-tight">
            Administration AgriTraceBio
          </h1>
        </div>
      </div>

      {/* Profil */}
      <div className="relative ml-auto" ref={menuRef}>
        <div
          className="flex flex-col items-end cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img
            src={profil}
            alt="Profil"
            className="h-10 rounded-full"
          />
          <span className="mt-1 text-sm font-medium text-white">Administrateur</span>
        </div>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
            <button
              onClick={handleAccountClick}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Mon compte
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-red-600 px-4 py-2 hover:bg-gray-100"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
