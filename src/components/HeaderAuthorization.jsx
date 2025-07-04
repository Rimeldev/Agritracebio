import React, { useState, useRef, useEffect } from 'react';
import profil from '../assets/icons/profil.png';

const HeaderAuthorization = ({ authorityName = "Autorité phytosanitaire" }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

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

  return (
    <div className="mb-6 relative">
      <div className="flex justify-between items-start">
        {/* Titre principal */}
        <div>
          <h1 className="text-2xl font-bold text-green-900 mb-1">
            Tableau de bord
          </h1>
          <p className="text-sm text-gray-700">
            Gestion des demandes d'autorisation et inspections
          </p>
        </div>

        {/* Profil utilisateur */}
        <div className="flex flex-col items-end" ref={menuRef}>
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
            {authorityName}
          </span>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Mon compte
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderAuthorization;
