import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profil from '../assets/icons/profil.png';

const UserMenu = ({ farmerName }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAccountClick = () => {
    setShowMenu(false); // fermer le menu
    navigate('/mon-compte'); // ✅ redirection
  };

  const handleLogout = () => {
    setShowMenu(false);
    // Ajoute ici ta logique de déconnexion
    navigate("/");
  };

  return (
    <div className="flex flex-col items-end mt-0 relative" ref={menuRef}>
      <img
        src={profil}
        alt="Profil"
        className="h-10 cursor-pointer rounded-full"
        onClick={() => setShowMenu(!showMenu)}
      />
      <span
        className="mt-1 text-sm font-medium cursor-pointer text-green-900"
        onClick={() => setShowMenu(!showMenu)}
      >
        {farmerName}
      </span>

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
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
