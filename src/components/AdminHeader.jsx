import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png"; // ← Ton logo ananas
import profil from "../assets/icons/profil.png"; // ← Icône par défaut si pas d'avatar
import { getMyProfile } from "@/services/getMyProfileService";
import { logoutUser } from "@/services/logoutService";

const AdminHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Récupérer le profil utilisateur
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setUser(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };
    fetchProfile();
  }, []);

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

  // Avatar dynamique ou image par défaut
  const getAvatarUrl = () => {
    if (user?.avatar) {
      const cleanedPath = user.avatar.replace("files/", "").replace(/^\/+/, '');
      return `http://127.0.0.1:5000/${cleanedPath}?t=${Date.now()}`;
    }
    return profil; // ← Icône de profil (ananas) par défaut
  };

  return (
    <header className="bg-[#284411] px-6 py-4 flex justify-between items-center shadow">
      {/* Logo (ananas) + Titre */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            src={logo}
            alt="Logo AgriTraceBio"
            className="h-10 w-10 object-contain"
          />
        </Link>
        <h1 className="text-xl text-white font-bold leading-tight">
          Administration AgriTraceBio
        </h1>
      </div>

      {/* Profil avec menu déroulant */}
      <div className="relative ml-auto" ref={menuRef}>
        <div
          className="flex flex-col items-end cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img
            src={getAvatarUrl()}
            alt="Avatar"
            className="h-10 w-10 rounded-full object-cover border"
            onError={(e) => (e.target.src = profil)} // fallback en cas d’erreur
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
