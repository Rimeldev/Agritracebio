import React, { useState, useRef, useEffect } from "react";
import { FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Import Link ajouté
import logo from "../assets/logo.png";

const AdminHeader = ({ username = "Administrateur" }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

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

  return (
    <header className="bg-[#284411] text-white px-6 py-4 flex justify-between items-center shadow">
      {/* Logo + Titre */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src={logo} alt="Logo AgriTraceBio" className="h-14" />
        </Link>
        <div>
          <h1 className="text-xl font-bold leading-tight">Administration AgriTraceBio</h1>
          <p className="text-sm text-white/90">Gestion avancée du système de traçabilité</p>
        </div>
      </div>

      {/* Profil utilisateur */}
      <div className="relative flex items-center gap-3 cursor-pointer" ref={menuRef}>
        <FaUserShield size={30}  onClick={() => setShowMenu((prev) => !prev)} className="text-white" />
       
        <span  onClick={() => setShowMenu((prev) => !prev)} className="text-sm font-medium">{username}</span>

        {showMenu && (
          <div className="absolute right-0 top-full mt-2 w-44 bg-white text-gray-800 rounded-md shadow-lg z-50">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => alert("Mon compte")}
            >
              Mon compte
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => alert("Déconnexion")}
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
