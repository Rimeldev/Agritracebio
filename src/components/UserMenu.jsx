import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile } from "@/services/getMyProfileService";
import defaultAvatar from "../assets/icons/profil.png";
import { logoutUser } from "@/services/logoutService";

const UserMenu = ({ nameColor = "text-green-900" }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMyProfile();
        setUser(data);
      } catch (error) {
        console.error("Erreur de chargement du profil :", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAccountClick = () => {
    setShowMenu(false);
    navigate('/mon-compte');
  };

  const handleLogout = async () => {
  try {
    await logoutUser(); // appel API
  } catch (error) {
    console.error("Erreur de déconnexion :", error);
    // tu peux ajouter un toast ici si tu veux
  }

  setShowMenu(false);
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  navigate("/");
};


  const getAvatarUrl = () => {
    if (user?.avatar) {
      // Nettoie le chemin et ajoute un timestamp pour forcer le rafraîchissement après upload
      const cleanedPath = user.avatar.replace("files/", "").replace(/^\/+/, '');
      return `http://127.0.0.1:5000/${cleanedPath}?t=${Date.now()}`;
    }
    return defaultAvatar;
  };

  return (
    <div className="flex flex-col items-end mt-0 relative" ref={menuRef}>
      <img
        src={getAvatarUrl()}
        alt="Profil"
        className="h-10 w-10 cursor-pointer rounded-full object-cover border"
        onClick={() => setShowMenu(!showMenu)}
        onError={(e) => (e.target.src = defaultAvatar)} // fallback si erreur
      />

      {user?.nom && (
        <span
          className={`mt-1 text-sm font-medium cursor-pointer ${nameColor}`}
          onClick={() => setShowMenu(!showMenu)}
        >
          {user.nom}
        </span>
      )}

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
  );
};

export default UserMenu;
